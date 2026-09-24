export interface TaskItem {
  id: string | number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category?: string;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface NoteItem {
  id: string | number;
  title: string;
  content: string;
  category?: string;
  is_pinned?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  projectId: string;
}

export interface TableColumn {
  name: string;
  type: string;
  sampleValue: any;
}

export interface QueryResult {
  data: any[] | null;
  error: string | null;
  count: number | null;
  latencyMs: number;
}
