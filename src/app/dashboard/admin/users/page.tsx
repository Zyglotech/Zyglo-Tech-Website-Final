'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Search, ShieldCheck, Clock, Ban } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';

interface AdminUser {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  isAdmin: boolean;
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
  creditWallet: { balance: number } | null;
}

type StatusFilter = 'all' | 'pending' | 'inactive';

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending approval' },
  { value: 'inactive', label: 'Inactive' },
];

function AdminUsersContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get('status');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>(
    initialStatus === 'pending' || initialStatus === 'inactive' ? initialStatus : 'all'
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (q: string, s: StatusFilter) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (s !== 'all') params.set('status', s);
    const qs = params.toString();
    const { ok, data, error: err } = await safeFetchJson<{ users: AdminUser[] }>(`/api/admin/users${qs ? `?${qs}` : ''}`);
    setLoading(false);
    if (!ok || !data) {
      setError(err ?? 'Could not load users.');
      return;
    }
    setUsers(data.users);
  }, []);

  useEffect(() => { fetchUsers(query, status); }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchUsers(query, status);
  }

  return (
    <div className="min-h-screen" style={{ background: '#060B17' }}>
      <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <Link href="/dashboard/admin" className="flex items-center gap-2 text-[13px] font-medium text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Admin
        </Link>
        <h1 className="mt-4 text-[28px] font-black text-white sm:text-[32px]">Users</h1>

        <form onSubmit={handleSearch} className="mt-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, phone, or company"
              className="w-full rounded-xl border border-white/10 bg-[#0F1C32] py-2.5 pl-10 pr-4 text-[14px] text-white outline-none focus:border-cyan-400/40"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl px-5 py-2.5 text-[13.5px] font-bold text-[#060B17]"
            style={{ background: '#06CCE8' }}>
            Search
          </button>
        </form>

        <div className="mt-4 flex gap-2">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatus(tab.value)}
              className={`rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold transition ${
                status === tab.value
                  ? 'bg-cyan-400/15 text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-white/[0.08] overflow-hidden" style={{ background: '#0B1424' }}>
          {loading ? (
            <div className="flex items-center gap-2 p-6 text-[13px] text-slate-500">
              <Spinner className="h-4 w-4" /> Loading...
            </div>
          ) : error ? (
            <p className="p-6 text-[13px] text-red-400">{error}</p>
          ) : users.length === 0 ? (
            <p className="p-6 text-[13.5px] text-slate-500">No users found.</p>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {users.map((u) => (
                <Link
                  key={u.id}
                  href={`/dashboard/admin/users/${u.id}`}
                  className="flex items-center justify-between px-5 py-4 transition hover:bg-white/[0.02]">
                  <div>
                    <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-white">
                      {u.name || u.companyName || 'Unnamed user'}
                      {u.isAdmin && <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />}
                      {!u.isApproved && (
                        <span className="flex items-center gap-1 rounded-md bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
                          <Clock className="h-2.5 w-2.5" /> PENDING
                        </span>
                      )}
                      {!u.isActive && (
                        <span className="flex items-center gap-1 rounded-md bg-red-400/10 px-1.5 py-0.5 text-[10px] font-bold text-red-400">
                          <Ban className="h-2.5 w-2.5" /> INACTIVE
                        </span>
                      )}
                    </p>
                    <p className="text-[11.5px] text-slate-500">
                      {u.email} {u.phone ? `· +91 ${u.phone}` : ''}
                    </p>
                  </div>
                  <p className="text-[13.5px] font-bold text-white">
                    {(u.creditWallet?.balance ?? 0).toLocaleString('en-US')} <span className="font-normal text-slate-500">credits</span>
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#060B17' }}>
        <Spinner className="h-8 w-8 text-cyan-400" />
      </div>
    }>
      <AdminUsersContent />
    </Suspense>
  );
}
