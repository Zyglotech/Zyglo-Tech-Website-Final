'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, ShieldCheck } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';

interface AdminUser {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  isAdmin: boolean;
  createdAt: string;
  creditWallet: { balance: number } | null;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (q: string) => {
    setLoading(true);
    const { ok, data, error: err } = await safeFetchJson<{ users: AdminUser[] }>(
      `/api/admin/users${q ? `?q=${encodeURIComponent(q)}` : ''}`
    );
    setLoading(false);
    if (!ok || !data) {
      setError(err ?? 'Could not load users.');
      return;
    }
    setUsers(data.users);
  }, []);

  useEffect(() => { fetchUsers(''); }, [fetchUsers]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchUsers(query);
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

        <div className="mt-6 rounded-2xl border border-white/[0.08] overflow-hidden" style={{ background: '#0B1424' }}>
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
