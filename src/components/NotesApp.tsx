import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  Pin, 
  Trash2, 
  Edit3, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Tag, 
  Sparkles,
  Bookmark
} from 'lucide-react';
import { getSupabase, extractProjectRef, getActiveCredentials, SQL_PRESETS } from '../lib/supabase';
import { NoteItem } from '../types';

const INITIAL_DEMO_NOTES: NoteItem[] = [
  {
    id: 1,
    title: 'Welcome to Supabase PostgreSQL',
    content: 'Supabase provides a complete Postgres database with instant auto-generated REST APIs, GraphQL, real-time websockets subscriptions, file storage, and built-in authentication.',
    category: 'Architecture',
    is_pinned: true,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    title: 'Row Level Security (RLS) Best Practices',
    content: 'Always enable Row Level Security on your tables in production. Use auth.uid() = user_id to ensure users can only read and write their own documents.',
    category: 'Security',
    is_pinned: true,
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 3,
    title: 'Realtime Subscriptions in React',
    content: 'Listen to database changes in real-time using supabase.channel("table_name").on("postgres_changes", { event: "*", schema: "public", table: "notes" }, callback).subscribe()',
    category: 'React & Vite',
    is_pinned: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableExists, setTableExists] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteItem | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [isPinned, setIsPinned] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const creds = getActiveCredentials();
  const projectRef = extractProjectRef(creds.url);
  const notesSqlPreset = SQL_PRESETS.find((p) => p.id === 'notes');

  const loadNotes = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        if (
          error.message.includes('Could not find the table') ||
          error.message.includes('relation "public.notes" does not exist') ||
          error.code === '42P01' ||
          error.code === 'PGRST204' ||
          error.code === 'PGRST200'
        ) {
          setTableExists(false);
          if (notes.length === 0) {
            setNotes(INITIAL_DEMO_NOTES);
            setIsDemoMode(true);
          }
        }
      } else if (data) {
        setTableExists(true);
        setIsDemoMode(false);
        setNotes(data as NoteItem[]);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  }, [notes.length]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Realtime subscription
  useEffect(() => {
    if (!tableExists || isDemoMode) return;
    const supabase = getSupabase();
    const channel = supabase
      .channel('public:notes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notes' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setNotes((prev) => [payload.new as NoteItem, ...prev.filter((n) => n.id !== payload.new.id)]);
          } else if (payload.eventType === 'UPDATE') {
            setNotes((prev) => prev.map((n) => (n.id === payload.new.id ? (payload.new as NoteItem) : n)));
          } else if (payload.eventType === 'DELETE') {
            setNotes((prev) => prev.filter((n) => n.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableExists, isDemoMode]);

  const togglePin = async (note: NoteItem) => {
    const nextPinned = !note.is_pinned;
    if (isDemoMode || !tableExists) {
      setNotes((prev) =>
        prev.map((n) => (n.id === note.id ? { ...n, is_pinned: nextPinned } : n))
      );
      return;
    }

    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('notes')
        .update({ is_pinned: nextPinned, updated_at: new Date().toISOString() })
        .eq('id', note.id);

      if (error) {
        alert(error.message);
      } else {
        setNotes((prev) =>
          prev.map((n) => (n.id === note.id ? { ...n, is_pinned: nextPinned } : n))
        );
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const deleteNote = async (id: string | number) => {
    if (!confirm('Delete this note?')) return;
    if (isDemoMode || !tableExists) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      return;
    }

    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) {
        alert(error.message);
      } else {
        setNotes((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const openCreateModal = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
    setCategory('General');
    setIsPinned(false);
    setIsModalOpen(true);
  };

  const openEditModal = (note: NoteItem) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category || 'General');
    setIsPinned(!!note.is_pinned);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSaving(true);
    try {
      if (isDemoMode || !tableExists) {
        if (editingNote) {
          setNotes((prev) =>
            prev.map((n) =>
              n.id === editingNote.id
                ? {
                    ...n,
                    title: title.trim(),
                    content: content.trim(),
                    category: category.trim() || 'General',
                    is_pinned: isPinned,
                    updated_at: new Date().toISOString(),
                  }
                : n
            )
          );
        } else {
          const newNote: NoteItem = {
            id: Date.now(),
            title: title.trim(),
            content: content.trim(),
            category: category.trim() || 'General',
            is_pinned: isPinned,
            created_at: new Date().toISOString(),
          };
          setNotes((prev) => [newNote, ...prev]);
        }
        setIsModalOpen(false);
        return;
      }

      const supabase = getSupabase();
      if (editingNote) {
        const { error } = await supabase
          .from('notes')
          .update({
            title: title.trim(),
            content: content.trim(),
            category: category.trim() || 'General',
            is_pinned: isPinned,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingNote.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('notes').insert([
          {
            title: title.trim(),
            content: content.trim(),
            category: category.trim() || 'General',
            is_pinned: isPinned,
          },
        ]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      loadNotes();
    } catch (err: any) {
      alert('Error saving note: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const copySqlToClipboard = () => {
    if (!notesSqlPreset) return;
    navigator.clipboard.writeText(notesSqlPreset.sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      (n.category && n.category.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || n.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(notes.map((n) => n.category || 'General').filter(Boolean)));

  return (
    <div className="space-y-6">
      {/* Missing Table Banner */}
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
                    Create the <code className="text-amber-300 font-mono">notes</code> table in Supabase
                  </h3>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-medium">
                    Demo Mode Active
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Your Supabase project is active, but the <code className="text-amber-300">notes</code> table hasn't been created yet.
                  Copy the SQL script below and run it in the Supabase SQL editor to enable persistent cloud storage.
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
                onClick={loadNotes}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Search & Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes or categories..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {categories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-500"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-emerald-950/60 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`bg-slate-900/90 border rounded-2xl p-5 flex flex-col justify-between transition-all group ${
              note.is_pinned
                ? 'border-emerald-500/40 shadow-md shadow-emerald-950/30'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              {/* Header: Title & Pin */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-base font-semibold text-white tracking-tight break-words">
                  {note.title}
                </h4>
                <button
                  onClick={() => togglePin(note)}
                  className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                    note.is_pinned
                      ? 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                  }`}
                  title={note.is_pinned ? 'Unpin note' : 'Pin note to top'}
                >
                  <Pin className={`w-3.5 h-3.5 ${note.is_pinned ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Note Content */}
              <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                {note.content}
              </p>
            </div>

            {/* Footer: Category & Actions */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60">
                <Tag className="w-3 h-3 text-emerald-400" />
                <span>{note.category || 'General'}</span>
              </span>

              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(note)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Edit note"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                  title="Delete note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Supabase Edge Functions overview"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Content *
                </label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note markdown or text here..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="General"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-950"
                  />
                  <label htmlFor="isPinned" className="text-xs text-slate-300 font-medium cursor-pointer">
                    Pin note to top
                  </label>
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
                  disabled={saving}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Saving...' : editingNote ? 'Update Note' : 'Create Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
