import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw, 
  Layers,
  Sparkles,
  Calendar,
  Tag,
  ArrowUpDown
} from 'lucide-react';
import { getSupabase, extractProjectRef, getActiveCredentials, SQL_PRESETS } from '../lib/supabase';
import { TaskItem } from '../types';

const INITIAL_DEMO_TASKS: TaskItem[] = [
  {
    id: 1,
    title: 'Initialize Supabase Database',
    description: 'Set up your PostgreSQL database tables, schemas, and Row Level Security policies.',
    status: 'completed',
    priority: 'high',
    category: 'Database',
    due_date: '2026-09-30',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Build Live Data UI with Realtime Subscriptions',
    description: 'Create interactive dashboards and kanban workflows that update live across all connected clients.',
    status: 'in_progress',
    priority: 'high',
    category: 'Frontend',
    due_date: '2026-10-05',
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Configure Row Level Security (RLS)',
    description: 'Write PostgreSQL policies to secure user records and enforce tenant isolation.',
    status: 'todo',
    priority: 'medium',
    category: 'Security',
    due_date: '2026-10-10',
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Deploy to Production with Custom Domain',
    description: 'Verify build, test edge CDN latency, and hook up custom production domain.',
    status: 'todo',
    priority: 'low',
    category: 'DevOps',
    due_date: '2026-10-15',
    created_at: new Date().toISOString(),
  },
];

export const TaskTracker: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tableExists, setTableExists] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in_progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPriority, setFormPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [formCategory, setFormCategory] = useState('General');
  const [formDueDate, setFormDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Copied SQL state
  const [copiedSql, setCopiedSql] = useState(false);

  const creds = getActiveCredentials();
  const projectRef = extractProjectRef(creds.url);
  const taskSqlPreset = SQL_PRESETS.find((p) => p.id === 'tasks');

  // Fetch tasks from Supabase
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (
          error.message.includes('Could not find the table') ||
          error.message.includes('relation "public.tasks" does not exist') ||
          error.code === '42P01' ||
          error.code === 'PGRST204' ||
          error.code === 'PGRST200'
        ) {
          setTableExists(false);
          if (tasks.length === 0) {
            setTasks(INITIAL_DEMO_TASKS);
            setIsDemoMode(true);
          }
        } else {
          setErrorMessage(error.message);
        }
      } else if (data) {
        setTableExists(true);
        setIsDemoMode(false);
        setTasks(data as TaskItem[]);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error communicating with Supabase');
    } finally {
      setLoading(false);
    }
  }, [tasks.length]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Realtime subscription when table exists
  useEffect(() => {
    if (!tableExists || isDemoMode) return;

    const supabase = getSupabase();
    const channel = supabase
      .channel('public:tasks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks((prev) => [payload.new as TaskItem, ...prev.filter((t) => t.id !== payload.new.id)]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks((prev) => prev.map((t) => (t.id === payload.new.id ? (payload.new as TaskItem) : t)));
          } else if (payload.eventType === 'DELETE') {
            setTasks((prev) => prev.filter((t) => t.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableExists, isDemoMode]);

  // Handle task status toggle
  const toggleStatus = async (task: TaskItem) => {
    const nextStatusMap: Record<TaskItem['status'], TaskItem['status']> = {
      todo: 'in_progress',
      in_progress: 'completed',
      completed: 'todo',
    };
    const nextStatus = nextStatusMap[task.status];

    if (isDemoMode || !tableExists) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t))
      );
      return;
    }

    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('tasks')
        .update({ status: nextStatus, updated_at: new Date().toISOString() })
        .eq('id', task.id);

      if (error) {
        alert('Failed to update task: ' + error.message);
      } else {
        setTasks((prev) =>
          prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t))
        );
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Handle delete task
  const deleteTask = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    if (isDemoMode || !tableExists) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      return;
    }

    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (error) {
        alert('Failed to delete task: ' + error.message);
      } else {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Open modal for Create or Edit
  const openCreateModal = () => {
    setEditingTask(null);
    setFormTitle('');
    setFormDescription('');
    setFormPriority('medium');
    setFormCategory('General');
    setFormDueDate('');
    setIsModalOpen(true);
  };

  const openEditModal = (task: TaskItem) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormDescription(task.description || '');
    setFormPriority(task.priority);
    setFormCategory(task.category || 'General');
    setFormDueDate(task.due_date || '');
    setIsModalOpen(true);
  };

  // Save task
  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    setSubmitting(true);
    try {
      if (isDemoMode || !tableExists) {
        if (editingTask) {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === editingTask.id
                ? {
                    ...t,
                    title: formTitle.trim(),
                    description: formDescription.trim(),
                    priority: formPriority,
                    category: formCategory.trim() || 'General',
                    due_date: formDueDate || undefined,
                    updated_at: new Date().toISOString(),
                  }
                : t
            )
          );
        } else {
          const newTask: TaskItem = {
            id: Date.now(),
            title: formTitle.trim(),
            description: formDescription.trim(),
            status: 'todo',
            priority: formPriority,
            category: formCategory.trim() || 'General',
            due_date: formDueDate || undefined,
            created_at: new Date().toISOString(),
          };
          setTasks((prev) => [newTask, ...prev]);
        }
        setIsModalOpen(false);
        return;
      }

      // Real Supabase persistence
      const supabase = getSupabase();
      if (editingTask) {
        const { error } = await supabase
          .from('tasks')
          .update({
            title: formTitle.trim(),
            description: formDescription.trim(),
            priority: formPriority,
            category: formCategory.trim() || 'General',
            due_date: formDueDate || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingTask.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('tasks').insert([
          {
            title: formTitle.trim(),
            description: formDescription.trim(),
            status: 'todo',
            priority: formPriority,
            category: formCategory.trim() || 'General',
            due_date: formDueDate || null,
          },
        ]);

        if (error) throw error;
      }

      setIsModalOpen(false);
      loadTasks();
    } catch (err: any) {
      alert('Error saving task: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const copySqlToClipboard = () => {
    if (!taskSqlPreset) return;
    navigator.clipboard.writeText(taskSqlPreset.sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(search.toLowerCase())) ||
      (t.category && t.category.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const uniqueCategories = Array.from(
    new Set(tasks.map((t) => t.category || 'General').filter(Boolean))
  );

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    highPriority: tasks.filter((t) => t.priority === 'high').length,
  };

  return (
    <div className="space-y-6">
      {/* Table Not Found Warning & 1-Click SQL Setup */}
      {!tableExists && (
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border border-amber-500/40 rounded-2xl p-5 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    Create the <code className="text-amber-300 font-mono">tasks</code> table in Supabase
                  </h3>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-medium">
                    Demo Mode Active
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Your Supabase project is connected, but the <code className="text-amber-300">tasks</code> table hasn't been created yet.
                  Copy the SQL script below, paste it into the Supabase SQL Editor, and click <strong>Run</strong> to activate live PostgreSQL sync.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                onClick={copySqlToClipboard}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-900/30 transition-all"
              >
                {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? 'SQL Copied!' : 'Copy SQL Schema'}</span>
              </button>

              <a
                href={`https://supabase.com/dashboard/project/${projectRef}/sql/new`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
              >
                <span>Open SQL Editor</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={loadTasks}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                title="Refresh table check"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Total Tasks</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            {tableExists ? 'Synced to Supabase' : 'Local preview'}
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{stats.completed}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            {stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}% done` : '0%'}
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">In Progress</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">{stats.inProgress}</div>
          <div className="text-[11px] text-slate-500 mt-1">Active execution</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">High Priority</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400">{stats.highPriority}</div>
          <div className="text-[11px] text-slate-500 mt-1">Requires focus</div>
        </div>
      </div>

      {/* Controls Bar: Search, Filters, Add Button */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks, descriptions, tags..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-500"
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e: any) => setPriorityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          {/* Category Filter */}
          {uniqueCategories.length > 1 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-500"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          {/* Refresh button */}
          <button
            onClick={loadTasks}
            disabled={loading}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-950 border border-slate-700/80 hover:bg-slate-800 transition-colors disabled:opacity-50"
            title="Refresh from Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Add Task Button */}
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-emerald-950/60 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {loading && tasks.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-300 font-medium">Connecting to Supabase...</p>
            <p className="text-xs text-slate-500 mt-1">Fetching records from PostgreSQL</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
            <CheckCircle2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-slate-300">No tasks found</h4>
            <p className="text-xs text-slate-500 mt-1">
              {search || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'Try clearing your filters or search term.'
                : 'Create your first task to get started.'}
            </p>
            <button
              onClick={openCreateModal}
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Task</span>
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed';
            const isInProgress = task.status === 'in_progress';

            const priorityBadge = {
              high: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
              medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
              low: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
            }[task.priority];

            const statusBadge = {
              completed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
              in_progress: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
              todo: 'bg-slate-700/50 text-slate-300 border-slate-600/50',
            }[task.status];

            const statusLabel = {
              completed: 'Done',
              in_progress: 'In Progress',
              todo: 'To Do',
            }[task.status];

            return (
              <div
                key={task.id}
                className={`group bg-slate-900/90 border transition-all rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'border-slate-800/80 bg-slate-950/40 opacity-75'
                    : 'border-slate-800 hover:border-slate-700 shadow-sm'
                }`}
              >
                {/* Left: Checkbox & Info */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => toggleStatus(task)}
                    className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/40'
                        : isInProgress
                        ? 'border-blue-400 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                        : 'border-slate-600 bg-slate-950 hover:border-emerald-400'
                    }`}
                    title={`Click to mark as ${
                      task.status === 'todo'
                        ? 'In Progress'
                        : task.status === 'in_progress'
                        ? 'Completed'
                        : 'To Do'
                    }`}
                  >
                    {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                    {isInProgress && <Clock className="w-3.5 h-3.5" />}
                  </button>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4
                        className={`text-sm sm:text-base font-semibold text-white tracking-tight break-words ${
                          isCompleted ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {task.title}
                      </h4>

                      {/* Status chip */}
                      <span
                        onClick={() => toggleStatus(task)}
                        className={`cursor-pointer text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase tracking-wider ${statusBadge}`}
                      >
                        {statusLabel}
                      </span>

                      {/* Priority chip */}
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase tracking-wider ${priorityBadge}`}
                      >
                        {task.priority}
                      </span>

                      {/* Category chip */}
                      {task.category && (
                        <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />
                          <span>{task.category}</span>
                        </span>
                      )}
                    </div>

                    {task.description && (
                      <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                        {task.description}
                      </p>
                    )}

                    {task.due_date && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Due: {task.due_date}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1 sm:opacity-90 group-hover:opacity-100 transition-opacity self-end sm:self-center shrink-0">
                  <button
                    onClick={() => openEditModal(task)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Edit task"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Implement user authentication"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Details, acceptance criteria, or notes..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Priority
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e: any) => setFormPriority(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="General"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                  >
                  </input>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-colors"
                >
                  {submitting ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
