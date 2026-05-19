import fs from 'fs';
import path from 'path';

export interface Lead {
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

const DATA_FILE = path.join(process.cwd(), 'data', 'leads.json');

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

export function readLeads(): Lead[] {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

export function appendLead(lead: Lead) {
  ensureDataFile();
  const leads = readLeads();
  leads.unshift(lead);
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

export function updateLeadStatus(id: string, status: Lead['status']): Lead | null {
  ensureDataFile();
  const leads = readLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leads[idx].status = status;
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  return leads[idx];
}
