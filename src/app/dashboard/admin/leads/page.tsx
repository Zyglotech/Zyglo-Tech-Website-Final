'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Users, Mail, Phone, Building2, Calendar, Tag,
  RefreshCw, Download, Filter, Search, CheckCircle2,
  Clock, TrendingUp, XCircle, ChevronDown,
} from 'lucide-react';

interface Lead {
  id: string;
  type: 'contact' | 'lead';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  service?: string;
  budget?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: string;
}

const STATUS_COLORS: Record<Lead['status'], string> = {
  new: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  contacted: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  qualified: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  converted: 'text-green-400 bg-green-400/10 border-green-400/20',
  lost: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
};

const STATUS_LABELS: Record<Lead['status'], string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  converted: 'Converted',
  lost: 'Lost',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      setLeads(data.leads ?? []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  async function updateStatus(id: string, status: Lead['status']) {
    setUpdatingId(id);
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
      if (selectedLead?.id === id) setSelectedLead((prev) => prev ? { ...prev, status } : prev);
    } finally {
      setUpdatingId(null);
    }
  }

  function exportCSV() {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Type', 'Service', 'Budget', 'Status', 'Source', 'Date'];
    const rows = filtered.map((l) => [
      l.name, l.email, l.phone ?? '', l.company ?? '',
      l.type, l.service ?? '', l.budget ?? '',
      l.status, l.source ?? '', new Date(l.createdAt).toLocaleDateString('en-IN'),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `zyglo-leads-${Date.now()}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.company ?? '').toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || l.status === filterStatus;
    const matchType = filterType === 'all' || l.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    converted: leads.filter((l) => l.status === 'converted').length,
    today: leads.filter((l) => new Date(l.createdAt).toDateString() === new Date().toDateString()).length,
  };

  return (
    <div className="min-h-screen" style={{ background: '#060B17' }}>
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0B1424] px-6 py-5">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-[13px] text-slate-400 transition hover:text-white">
              ← Home
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <div>
              <h1 className="text-[18px] font-black text-white">Lead Management</h1>
              <p className="text-[12px] text-slate-500">{leads.length} total submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchLeads}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] font-medium text-slate-300 transition hover:bg-white/8">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
            <button onClick={exportCSV}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold text-[#060B17] transition"
              style={{ background: '#06CCE8' }}>
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Leads', value: stats.total, icon: Users, color: '#06CCE8' },
            { label: 'New Today', value: stats.today, icon: Calendar, color: '#3B82F6' },
            { label: 'Awaiting Action', value: stats.new, icon: Clock, color: '#F59E0B' },
            { label: 'Converted', value: stats.converted, icon: TrendingUp, color: '#10B981' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/[0.07] bg-[#0B1424] p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${s.color}15` }}>
                <s.icon className="h-4 w-4" style={{ color: s.color }} />
              </div>
              <p className="text-[28px] font-black text-white">{s.value}</p>
              <p className="mt-0.5 text-[12px] text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Table */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#0B1424] overflow-hidden">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.06] p-4">
              <div className="flex flex-1 items-center gap-2 min-w-[200px] rounded-xl border border-white/10 bg-[#0F1C32] px-3.5 py-2.5">
                <Search className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <input
                  placeholder="Search name, email, company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-[13px] text-white outline-none placeholder-slate-600"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-slate-500" />
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-xl border border-white/10 bg-[#0F1C32] px-3 py-2.5 text-[12px] text-white outline-none">
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
                  className="rounded-xl border border-white/10 bg-[#0F1C32] px-3 py-2.5 text-[12px] text-white outline-none">
                  <option value="all">All Types</option>
                  <option value="lead">Demo Requests</option>
                  <option value="contact">Contact Form</option>
                </select>
              </div>
            </div>

            {/* Table body */}
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Users className="mb-4 h-10 w-10 text-slate-700" />
                <p className="text-[15px] font-semibold text-slate-400">No leads yet</p>
                <p className="mt-1 text-[13px] text-slate-600">Submissions from your contact and demo forms will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {filtered.map((lead) => (
                  <button key={lead.id} onClick={() => setSelectedLead(lead)}
                    className={`w-full text-left px-5 py-4 transition hover:bg-white/[0.02] ${selectedLead?.id === lead.id ? 'bg-cyan-400/5' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-[13px] font-black text-cyan-400">
                        {lead.name[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-semibold text-white truncate">{lead.name}</p>
                          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${STATUS_COLORS[lead.status]}`}>
                            {STATUS_LABELS[lead.status]}
                          </span>
                          <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium text-slate-500 border border-white/[0.06]">
                            {lead.type === 'lead' ? 'Demo' : 'Contact'}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[12px] text-slate-500 truncate">{lead.email} {lead.company ? `· ${lead.company}` : ''}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-[11px] text-slate-600">{new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                        {lead.service && <p className="mt-0.5 text-[11px] text-slate-600 max-w-[100px] truncate">{lead.service}</p>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#0B1424] overflow-hidden self-start sticky top-6">
            {selectedLead ? (
              <div>
                <div className="border-b border-white/[0.06] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-[16px] font-black text-cyan-400">
                        {selectedLead.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-white">{selectedLead.name}</p>
                        <p className="text-[12px] text-slate-500">{selectedLead.type === 'lead' ? 'Demo Request' : 'Contact Form'}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedLead(null)} className="text-slate-500 hover:text-white">
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Status changer */}
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</p>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(STATUS_LABELS) as Lead['status'][]).map((s) => (
                        <button key={s} disabled={updatingId === selectedLead.id}
                          onClick={() => updateStatus(selectedLead.id, s)}
                          className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${selectedLead.status === s ? STATUS_COLORS[s] : 'border-white/[0.07] text-slate-500 hover:border-white/20'}`}>
                          {STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Contact Info</p>
                    <a href={`mailto:${selectedLead.email}`}
                      className="flex items-center gap-2.5 text-[13px] text-slate-300 hover:text-cyan-400 transition">
                      <Mail className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                      {selectedLead.email}
                    </a>
                    {selectedLead.phone && (
                      <a href={`tel:${selectedLead.phone}`}
                        className="flex items-center gap-2.5 text-[13px] text-slate-300 hover:text-cyan-400 transition">
                        <Phone className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                        {selectedLead.phone}
                      </a>
                    )}
                    {selectedLead.company && (
                      <div className="flex items-center gap-2.5 text-[13px] text-slate-300">
                        <Building2 className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                        {selectedLead.company}
                      </div>
                    )}
                  </div>

                  {/* Lead details */}
                  {(selectedLead.service || selectedLead.budget) && (
                    <div className="space-y-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Request Details</p>
                      {selectedLead.service && (
                        <div className="flex items-center gap-2.5 text-[13px] text-slate-300">
                          <Tag className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                          {selectedLead.service}
                        </div>
                      )}
                      {selectedLead.budget && (
                        <div className="flex items-start gap-2.5 text-[13px] text-slate-300">
                          <ChevronDown className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                          Budget: {selectedLead.budget}
                        </div>
                      )}
                    </div>
                  )}

                  {selectedLead.message && (
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Message</p>
                      <div className="rounded-xl border border-white/[0.06] bg-[#0F1C32] p-3.5">
                        <p className="text-[13px] leading-6 text-slate-300">{selectedLead.message}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[11.5px] text-slate-600">
                    <Calendar className="h-3 w-3" />
                    {new Date(selectedLead.createdAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
                  </div>

                  {/* Quick actions */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
                    <a href={`mailto:${selectedLead.email}?subject=Following up from Zyglo Tech&body=Hi ${selectedLead.name},%0A%0AThank you for reaching out to Zyglo Tech Enterprise.`}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-[13px] font-semibold text-white transition hover:border-cyan-400/30">
                      <Mail className="h-3.5 w-3.5" />
                      Send Email
                    </a>
                    {selectedLead.phone && (
                      <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}?text=Hi ${encodeURIComponent(selectedLead.name)}, this is Zyglo Tech team. Thank you for your inquiry!`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold text-[#060B17] transition"
                        style={{ background: '#25D366' }}>
                        WhatsApp
                      </a>
                    )}
                    <button onClick={() => updateStatus(selectedLead.id, 'converted')}
                      className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold text-[#060B17] transition"
                      style={{ background: '#06CCE8' }}>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Mark Converted
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Users className="mb-4 h-10 w-10 text-slate-700" />
                <p className="text-[13px] text-slate-500">Select a lead to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
