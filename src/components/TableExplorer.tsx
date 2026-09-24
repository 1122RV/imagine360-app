import React, { useState, useEffect } from 'react';
import { 
  Table2, 
  Search, 
  RefreshCw, 
  Download, 
  Plus, 
  Trash2, 
  Code, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { getSupabase, extractProjectRef, getActiveCredentials } from '../lib/supabase';

export const TableExplorer: React.FC = () => {
  const [tableName, setTableName] = useState('tasks');
  const [limit, setLimit] = useState(25);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latencyMs, setLatencyMs] = useState(0);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  // Raw JSON Inspector tab
  const [viewMode, setViewMode] = useState<'table' | 'json'>('table');

  // Insert Row Modal
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [newRowJson, setNewRowJson] = useState('{\n  "title": "New record",\n  "status": "todo"\n}');
  const [insertError, setInsertError] = useState<string | null>(null);
  const [inserting, setInserting] = useState(false);

  const creds = getActiveCredentials();
  const projectRef = extractProjectRef(creds.url);

  const popularTables = ['tasks', 'notes', 'items', 'profiles', 'todos', 'products'];

  const executeQuery = async (targetTable: string = tableName) => {
    if (!targetTable.trim()) return;
    setLoading(true);
    setError(null);
    const start = performance.now();

    try {
      const supabase = getSupabase();
      const { data: rows, error: qError, count } = await supabase
        .from(targetTable.trim())
        .select('*', { count: 'exact' })
        .limit(limit);

      setLatencyMs(Math.round(performance.now() - start));

      if (qError) {
        setError(qError.message);
        setData([]);
        setTotalCount(null);
      } else {
        setData(rows || []);
        setTotalCount(count ?? rows?.length ?? 0);
      }
    } catch (err: any) {
      setLatencyMs(Math.round(performance.now() - start));
      setError(err?.message || 'Query execution failed');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeQuery();
  }, [tableName, limit]);

  // Delete row by ID
  const handleDeleteRow = async (id: any) => {
    if (!confirm(`Delete row with ID ${id} from "${tableName}"?`)) return;
    try {
      const supabase = getSupabase();
      const { error: delError } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (delError) {
        alert('Delete failed: ' + delError.message);
      } else {
        setData((prev) => prev.filter((r) => r.id !== id));
        if (totalCount !== null) setTotalCount((c) => Math.max(0, (c || 1) - 1));
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  // Insert row via JSON payload
  const handleInsertRow = async (e: React.FormEvent) => {
    e.preventDefault();
    setInsertError(null);
    setInserting(true);

    try {
      const parsed = JSON.parse(newRowJson);
      const supabase = getSupabase();
      const { error: insError } = await supabase
        .from(tableName)
        .insert(Array.isArray(parsed) ? parsed : [parsed]);

      if (insError) {
        setInsertError(insError.message);
      } else {
        setIsInsertModalOpen(false);
        executeQuery();
      }
    } catch (e: any) {
      setInsertError('Invalid JSON format: ' + e.message);
    } finally {
      setInserting(false);
    }
  };

  // Export to CSV
  const exportCsv = () => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((h) => {
            const val = row[h];
            if (val === null || val === undefined) return '';
            const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
            return `"${str.replace(/"/g, '""')}"`;
          })
          .join(',')
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableName}_export_${Date.now()}.csv`;
    a.click();
  };

  // Export to JSON
  const exportJson = () => {
    if (data.length === 0) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableName}_export_${Date.now()}.json`;
    a.click();
  };

  // Extract columns from data
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="space-y-6">
      {/* Top Query & Controls Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Table Selector & Query Input */}
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 max-w-sm">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">
                public.
              </span>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="table_name"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-16 pr-3.5 py-2 text-xs sm:text-sm font-mono text-emerald-400 placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700/80 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-500"
            >
              <option value={10}>Limit 10</option>
              <option value={25}>Limit 25</option>
              <option value={50}>Limit 50</option>
              <option value={100}>Limit 100</option>
            </select>

            <button
              onClick={() => executeQuery()}
              disabled={loading}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Query</span>
            </button>
          </div>

          {/* Action Buttons: Insert, Export, Mode */}
          <div className="flex items-center gap-2 self-end md:self-center">
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('json')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  viewMode === 'json' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Raw JSON
              </button>
            </div>

            <button
              onClick={() => setIsInsertModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium border border-slate-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Insert Row</span>
            </button>

            {data.length > 0 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={exportCsv}
                  title="Export to CSV"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium border border-slate-700 transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-blue-400" />
                </button>
                <button
                  onClick={exportJson}
                  title="Export to JSON"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Popular table quick picks */}
        <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-800/60 text-xs">
          <span className="text-slate-500 font-medium">Quick Tables:</span>
          {popularTables.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTableName(t);
                executeQuery(t);
              }}
              className={`px-2.5 py-1 rounded-lg font-mono transition-colors ${
                tableName === t
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Query Status Bar */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span>
            Table: <strong className="font-mono text-emerald-400">public.{tableName}</strong>
          </span>
          {totalCount !== null && (
            <span>
              Total Rows: <strong className="text-white">{totalCount}</strong>
            </span>
          )}
          {latencyMs > 0 && (
            <span className="inline-flex items-center gap-1 text-slate-400 font-mono">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{latencyMs}ms</span>
            </span>
          )}
        </div>

        <a
          href={`https://supabase.com/dashboard/project/${projectRef}/editor`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <span>Open Table in Supabase Table Editor</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl p-4 flex items-start gap-3 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <p className="font-semibold text-rose-200">Query Error</p>
            <p className="font-mono text-slate-300">{error}</p>
            {error.includes('Could not find the table') && (
              <p className="text-rose-300/80 pt-1">
                Tip: Go to the <strong>SQL Migrations</strong> tab to create this table in your Supabase project in 1 click!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Results View */}
      {loading ? (
        <div className="p-16 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
          <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-300 font-medium">Executing PostgREST query...</p>
        </div>
      ) : data.length === 0 && !error ? (
        <div className="p-16 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
          <Table2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h4 className="text-sm font-semibold text-slate-300">No records found</h4>
          <p className="text-xs text-slate-500 mt-1">
            Table <code className="text-slate-400 font-mono">{tableName}</code> is currently empty.
          </p>
          <button
            onClick={() => setIsInsertModalOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Insert First Row</span>
          </button>
        </div>
      ) : viewMode === 'table' ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60">
                  <th className="p-3.5 text-slate-400 font-mono uppercase tracking-wider font-semibold w-12 text-center">
                    #
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="p-3.5 text-slate-300 font-mono font-semibold tracking-wider whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                  <th className="p-3.5 text-slate-400 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {data.map((row, idx) => (
                  <tr
                    key={row.id ?? idx}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="p-3.5 text-slate-500 text-center font-mono">
                      {idx + 1}
                    </td>
                    {columns.map((col) => {
                      const val = row[col];
                      const isJson = typeof val === 'object' && val !== null;
                      const display = isJson ? JSON.stringify(val) : String(val ?? '—');

                      return (
                        <td
                          key={col}
                          className="p-3.5 text-slate-200 font-mono max-w-xs truncate"
                          title={display}
                        >
                          {col === 'status' ? (
                            <span className="px-2 py-0.5 rounded-md text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                              {display}
                            </span>
                          ) : col === 'priority' ? (
                            <span className="px-2 py-0.5 rounded-md text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30">
                              {display}
                            </span>
                          ) : (
                            display
                          )}
                        </td>
                      );
                    })}
                    <td className="p-3.5 text-right">
                      {row.id !== undefined && (
                        <button
                          onClick={() => handleDeleteRow(row.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                          title="Delete row"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Raw JSON view */
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-x-auto shadow-sm">
          <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {/* Insert Modal */}
      {isInsertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">
                Insert Row into <code className="text-emerald-400 font-mono">public.{tableName}</code>
              </h3>
              <button
                onClick={() => setIsInsertModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInsertRow} className="p-6 space-y-4">
              <p className="text-xs text-slate-400">
                Provide a valid JSON object representing the row columns and values to insert:
              </p>

              <textarea
                rows={8}
                value={newRowJson}
                onChange={(e) => setNewRowJson(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-xs text-emerald-400 font-mono focus:outline-hidden focus:border-emerald-500"
              />

              {insertError && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300">
                  {insertError}
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsInsertModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inserting}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-colors"
                >
                  {inserting ? 'Inserting...' : 'Execute Insert'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
