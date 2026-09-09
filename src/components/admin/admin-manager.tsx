'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Save,
  RefreshCw,
  AlertCircle,
  LogOut,
  ShieldCheck,
  Database,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { apiFetch } from '@/lib/api/client';

/* ============================================================================
 * Panel CRUD generik untuk Admin/Panitia — digerakkan konfigurasi resource.
 * Semua operasi tulis memakai Bearer token (dari localStorage) → RBAC ditegakkan
 * backend (admin/panitia). Tidak ada data hardcoded; semua dari API.
 * ==========================================================================*/

export type FieldType = 'text' | 'textarea' | 'number' | 'url' | 'list' | 'boolean' | 'datetime' | 'select';

export type Field = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  /** Untuk type 'select': URL yang mengembalikan [{id,nama}] sebagai opsi. */
  optionsUrl?: string;
  placeholder?: string;
};

export type Resource = {
  key: string;
  label: string;
  icon?: LucideIcon;
  /** Deskripsi singkat resource untuk topbar dashboard. */
  hint?: string;
  /** Endpoint GET daftar (mis. '/timeline'). */
  listUrl: string;
  /** Base untuk tulis (POST base, PUT base/:id, DELETE base/:id). Default = listUrl. */
  writeBase?: string;
  /** Nama field id pada baris data. Default 'id'. */
  idField?: string;
  /** Bila true → create memakai PUT base/:idValue (dipakai settings by key). */
  usePutForCreate?: boolean;
  titleField: string;
  subtitleField?: string;
  categoryField?: string;
  fields: Field[];
};

type Row = Record<string, unknown>;

function authHeaders(): Record<string, string> {
  const t = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return t ? { Authorization: `Bearer ${t}` } : {};
}

/** Konversi ISO → nilai input datetime-local (YYYY-MM-DDTHH:mm) di timezone lokal. */
function isoToLocalInput(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

type AdminUserInfo = { name: string; email: string; role: string };

export function AdminManager({
  resources,
  user,
  onLogout,
}: {
  resources: Resource[];
  user?: AdminUserInfo;
  onLogout?: () => void;
}) {
  const [activeKey, setActiveKey] = useState(resources[0]?.key);
  const active = resources.find((r) => r.key === activeKey)!;
  const idField = active.idField ?? 'id';
  const writeBase = active.writeBase ?? active.listUrl;

  const getRowKey = (row: Row, index: number) => {
    const value = row[idField] ?? row.id ?? row.key ?? row.slug ?? row.nama ?? row.judul ?? row.pertanyaan;
    return value !== undefined && value !== null && String(value).trim() !== ''
      ? `${active.key}-${String(value)}`
      : `${active.key}-row-${index}`;
  };

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<Row | 'new' | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [options, setOptions] = useState<Record<string, { id: string; nama: string }[]>>({});

  // Konfirmasi hapus via modal custom (bukan confirm() native — diblokir Next 15 dev).
  const [pendingDelete, setPendingDelete] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<Row[]>(active.listUrl, { headers: authHeaders() });
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  }, [active.listUrl]);

  useEffect(() => {
    load();
  }, [load]);

  // Muat opsi untuk field select (mis. kategori FAQ)
  useEffect(() => {
    active.fields
      .filter((f) => f.type === 'select' && f.optionsUrl)
      .forEach(async (f) => {
        try {
          const data = await apiFetch<{ id: string; nama: string }[]>(f.optionsUrl!, { headers: authHeaders() });
          setOptions((prev) => ({ ...prev, [f.name]: data ?? [] }));
        } catch {
          /* abaikan */
        }
      });
  }, [active]);

  const openCreate = () => {
    setEditing('new');
    setFormError(null);
    const init: Record<string, string> = {};
    active.fields.forEach((f) => (init[f.name] = ''));
    setForm(init);
  };

  const openEdit = (row: Row) => {
    setEditing(row);
    setFormError(null);
    const init: Record<string, string> = {};
    active.fields.forEach((f) => {
      const v = row[f.name];
      if (f.type === 'list') init[f.name] = Array.isArray(v) ? (v as string[]).join('\n') : '';
      else if (f.type === 'boolean') init[f.name] = v ? 'true' : '';
      else if (f.type === 'datetime') init[f.name] = isoToLocalInput(v as string);
      else if (v === null || v === undefined) init[f.name] = '';
      else if (typeof v === 'object') init[f.name] = JSON.stringify(v);
      else init[f.name] = String(v);
    });
    setForm(init);
  };

  const buildPayload = (): Record<string, unknown> => {
    const out: Record<string, unknown> = {};
    active.fields.forEach((f) => {
      const raw = form[f.name] ?? '';
      if (f.type === 'list') {
        const arr = raw.split('\n').map((s) => s.trim()).filter(Boolean);
        if (arr.length || f.required) out[f.name] = arr;
      } else if (f.type === 'boolean') {
        out[f.name] = raw === 'true';
      } else if (f.type === 'number') {
        if (raw !== '') out[f.name] = Number(raw);
      } else if (f.type === 'datetime') {
        if (raw !== '') out[f.name] = new Date(raw).toISOString();
      } else {
        if (raw !== '' || f.required) out[f.name] = raw;
      }
    });
    return out;
  };

  const save = async () => {
    // Validasi required minimal
    for (const f of active.fields) {
      if (f.required && !String(form[f.name] ?? '').trim()) {
        setFormError(`Field "${f.label}" wajib diisi.`);
        return;
      }
    }
    setSaving(true);
    setFormError(null);
    try {
      const payload = buildPayload();
      if (editing === 'new') {
        if (active.usePutForCreate) {
          const idVal = String(form[idField] ?? '').trim();
          const { [idField]: _omit, ...body } = payload as Record<string, unknown>;
          await apiFetch(`${writeBase}/${encodeURIComponent(idVal)}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(body),
          });
        } else {
          await apiFetch(writeBase, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) });
        }
      } else if (editing) {
        const idVal = String((editing as Row)[idField]);
        await apiFetch(`${writeBase}/${encodeURIComponent(idVal)}`, {
          method: 'PUT',
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      }
      setEditing(null);
      await load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    setError(null);
    try {
      await apiFetch(`${writeBase}/${encodeURIComponent(String(pendingDelete[idField]))}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      setPendingDelete(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal menghapus');
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[268px_minmax(0,1fr)]">
      {/* ============ SIDEBAR NAV + PROFIL ============ */}
      <aside className="h-max rounded-3xl border border-sand/60 bg-cream/90 p-5 shadow-md lg:sticky lg:top-8">
        <div className="flex items-center gap-3 px-1 pb-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-forest-deep text-sand shadow-sm">
            <ShieldCheck size={20} />
          </div>
          <p className="font-display text-xl text-forest-deep">Panel Admin</p>
        </div>

        <nav className="flex gap-1.5 overflow-x-auto no-scrollbar lg:flex-col lg:gap-1.5 lg:overflow-visible">
          {resources.map((r) => {
            const Icon = r.icon ?? Database;
            const isActive = r.key === activeKey;
            return (
              <button
                key={r.key}
                onClick={() => setActiveKey(r.key)}
                className={`flex shrink-0 items-center gap-3 rounded-2xl px-3.5 py-3 text-[15px] font-bold transition-all cursor-pointer lg:w-full ${
                  isActive
                    ? 'bg-rust text-cream shadow-md shadow-rust/25'
                    : 'text-forest-deep hover:bg-sand/40'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-cream' : 'text-rust'} />
                <span className="whitespace-nowrap lg:truncate">{r.label}</span>
              </button>
            );
          })}
        </nav>

        {user && (
          <div className="mt-5 border-t border-sand/50 pt-5">
            <div className="flex items-center gap-3 rounded-2xl bg-sage/15 p-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-deep text-lg font-black uppercase text-cream">
                {(user.name || user.email || '?').charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold text-forest-deep">
                  {user.name || user.email.split('@')[0]}
                </p>
                <span className="mt-1 inline-block rounded-full bg-rust/15 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-rust">
                  {user.role}
                </span>
              </div>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-sand/70 px-3 py-2.5 text-sm font-bold text-forest-deep transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 cursor-pointer"
              >
                <LogOut size={16} /> Keluar
              </button>
            )}
          </div>
        )}
      </aside>

      {/* ============ MAIN CONTENT ============ */}
      <section className="min-w-0 space-y-5">
        {/* Topbar */}
        <div className="flex flex-col gap-4 rounded-3xl border border-sand/60 bg-cream/90 p-6 shadow-md sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl text-forest-deep">{active.label}</h2>
            <p className="mt-1 text-sm font-medium text-forest/70">
              {active.hint ?? 'Kelola data'} · {rows.length} item
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={load}
              className="flex size-11 items-center justify-center rounded-full border border-sand/70 text-forest-deep transition-colors hover:border-rust hover:text-rust cursor-pointer"
              aria-label="Muat ulang"
            >
              <RefreshCw size={17} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-full bg-rust px-5 py-2.5 text-sm font-bold text-cream shadow-md shadow-rust/25 transition-all hover:scale-[1.03] hover:bg-rust/90 cursor-pointer"
            >
              <Plus size={17} /> Tambah
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={17} /> {error}
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-sand/60 bg-cream/80 shadow-md">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-base text-forest/70">
            <Loader2 size={20} className="animate-spin" /> Memuat...
          </div>
        ) : rows.length === 0 ? (
          <div className="py-16 text-center text-base text-forest/60">Belum ada data. Klik “Tambah” untuk membuat.</div>
        ) : (
          <ul className="divide-y divide-sand/50">
            {rows.map((row, index) => (
              <li key={getRowKey(row, index)} className="flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-sage/15">
                <div className="min-w-0">
                  <p className="truncate text-base font-bold text-forest-deep sm:text-lg">{String(row[active.titleField] ?? '—')}</p>
                  <p className="mt-0.5 truncate text-sm text-forest/70">
                    {active.categoryField && row[active.categoryField] ? (
                      <span className="mr-2 rounded-md bg-sage/30 px-2 py-0.5 text-xs font-bold text-forest-deep">
                        {String(row[active.categoryField])}
                      </span>
                    ) : null}
                    {active.subtitleField ? String(row[active.subtitleField] ?? '') : ''}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => openEdit(row)}
                    className="rounded-xl p-2.5 text-forest-deep hover:bg-sand/40 transition-colors cursor-pointer"
                    aria-label="Edit"
                  >
                    <Pencil size={17} />
                  </button>
                  <button
                    onClick={() => setPendingDelete(row)}
                    className="rounded-xl p-2.5 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    aria-label="Hapus"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        </div>
      </section>

      {/* Modal Form */}
      {editing && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl bg-cream p-7 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-2xl text-forest-deep">
                {editing === 'new' ? `Tambah ${active.label}` : `Edit ${active.label}`}
              </h3>
              <button onClick={() => setEditing(null)} className="text-forest/60 hover:text-red-600 cursor-pointer">
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4">
              {active.fields.map((f) => {
                const disabledId = editing !== 'new' && f.name === idField && active.usePutForCreate;
                return (
                  <div key={f.name}>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest/70">
                      {f.label} {f.required && <span className="text-rust">*</span>}
                    </label>
                    {f.type === 'textarea' || f.type === 'list' ? (
                      <textarea
                        rows={f.type === 'list' ? 4 : 3}
                        value={form[f.name] ?? ''}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        placeholder={f.type === 'list' ? 'Satu item per baris' : f.placeholder}
                        className="w-full rounded-xl border border-sand bg-white/70 px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-rust focus:ring-2 focus:ring-rust/20"
                      />
                    ) : f.type === 'boolean' ? (
                      <label className="inline-flex items-center gap-2.5 text-[15px] font-medium text-forest-deep">
                        <input
                          type="checkbox"
                          checked={form[f.name] === 'true'}
                          onChange={(e) => setForm({ ...form, [f.name]: e.target.checked ? 'true' : '' })}
                          className="size-5 accent-rust"
                        />
                        <span>Aktif</span>
                      </label>
                    ) : f.type === 'select' ? (
                      <select
                        value={form[f.name] ?? ''}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="w-full rounded-xl border border-sand bg-white/70 px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-rust focus:ring-2 focus:ring-rust/20"
                      >
                        <option value="">— pilih —</option>
                        {(options[f.name] ?? []).map((o, index) => (
                          <option key={o.id ?? `${f.name}-${o.nama}-${index}`} value={o.id}>
                            {o.nama}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={f.type === 'number' ? 'number' : f.type === 'datetime' ? 'datetime-local' : f.type === 'url' ? 'url' : 'text'}
                        value={form[f.name] ?? ''}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        placeholder={f.placeholder}
                        disabled={disabledId}
                        className="w-full rounded-xl border border-sand bg-white/70 px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-rust focus:ring-2 focus:ring-rust/20 disabled:opacity-60"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {formError && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                <AlertCircle size={17} /> {formError}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                onClick={() => setEditing(null)}
                className="rounded-full border border-sand px-5 py-2.5 text-sm font-bold text-forest-deep hover:bg-sand/30 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-rust px-5 py-2.5 text-sm font-bold text-cream shadow-md shadow-rust/25 hover:bg-rust/90 disabled:opacity-70 cursor-pointer"
              >
                {saving ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />} Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {pendingDelete && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-cream p-7 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={24} />
            </div>
            <h3 className="font-display text-2xl text-forest-deep">Hapus data ini?</h3>
            <p className="mt-2 text-[15px] text-forest/70">
              <span className="font-bold text-forest-deep">
                {String(pendingDelete[active.titleField] ?? '')}
              </span>{' '}
              akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="mt-6 flex justify-center gap-2.5">
              <button
                onClick={() => setPendingDelete(null)}
                disabled={deleting}
                className="rounded-full border border-sand px-5 py-2.5 text-sm font-bold text-forest-deep hover:bg-sand/30 disabled:opacity-60 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-cream shadow-md shadow-red-600/25 hover:bg-red-700 disabled:opacity-70 cursor-pointer"
              >
                {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />} Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
