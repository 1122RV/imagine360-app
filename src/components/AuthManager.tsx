import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Key, 
  Mail, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ExternalLink,
  Code,
  UserCheck
} from 'lucide-react';
import { getSupabase, extractProjectRef, getActiveCredentials } from '../lib/supabase';

export const AuthManager: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const creds = getActiveCredentials();
  const projectRef = extractProjectRef(creds.url);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const supabase = getSupabase();
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const supabase = getSupabase();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      const supabase = getSupabase();
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user && !data.session) {
          setMessage({
            type: 'success',
            text: 'Sign up successful! Please check your email to confirm your account (or disable email confirmation in your Supabase Auth settings for instant logins).',
          });
        } else {
          setMessage({
            type: 'success',
            text: 'Account created and signed in successfully!',
          });
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage({
          type: 'success',
          text: `Welcome back, ${data.user?.email}!`,
        });
      }
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'Authentication error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setMessage({
        type: 'success',
        text: 'Successfully signed out.',
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Intro Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Supabase Authentication & JWT Sessions
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Native user authentication integrated with PostgreSQL Row Level Security (RLS)
              </p>
            </div>
          </div>

          <a
            href={`https://supabase.com/dashboard/project/${projectRef}/auth/users`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <span>Supabase Users Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Auth Status & Forms */}
      {user ? (
        /* Authenticated View */
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  Active Session
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">{user.email}</h3>
                <p className="text-xs font-mono text-slate-500">ID: {user.id}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/60 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-500">Role</span>
              <p className="font-mono text-white font-medium">{user.role || 'authenticated'}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-500">Email Confirmed</span>
              <p className="font-mono text-emerald-400 font-medium">
                {user.email_confirmed_at ? 'Confirmed' : 'Pending Confirmation'}
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-500">Created At</span>
              <p className="font-mono text-slate-300">
                {user.created_at ? new Date(user.created_at).toLocaleString() : '—'}
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-500">Last Sign In</span>
              <p className="font-mono text-slate-300">
                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : '—'}
              </p>
            </div>
          </div>

          {/* Decoded Session Token Info */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold flex items-center gap-1.5 text-slate-300">
                <Code className="w-3.5 h-3.5 text-purple-400" />
                <span>JWT Access Token Claims</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Expires: {session?.expires_at ? new Date(session.expires_at * 1000).toLocaleTimeString() : '—'}
              </span>
            </div>
            <pre className="text-[11px] font-mono text-purple-300/90 overflow-x-auto p-2 bg-slate-900/50 rounded-xl">
              {JSON.stringify({ aud: user.aud, role: user.role, email: user.email, app_metadata: user.app_metadata }, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        /* Sign In / Sign Up Card */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Mode Switcher */}
          <div className="flex rounded-2xl bg-slate-950 p-1.5 border border-slate-800 max-w-xs mx-auto">
            <button
              onClick={() => {
                setAuthMode('signin');
                setMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                authMode === 'signin'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode('signup');
                setMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                authMode === 'signup'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Notification Message */}
          {message && (
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 text-xs leading-relaxed ${
                message.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-700/60 text-rose-300'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">{message.text}</div>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Minimum 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-colors shadow-lg shadow-emerald-950/60"
            >
              {submitting
                ? 'Processing...'
                : authMode === 'signup'
                ? 'Create Supabase Account'
                : 'Sign In to Supabase'}
            </button>
          </form>

          {/* RLS explanation footer */}
          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 text-center">
            Sign-ups and logins are processed directly against the Supabase Auth service.
          </div>
        </div>
      )}
    </div>
  );
};
