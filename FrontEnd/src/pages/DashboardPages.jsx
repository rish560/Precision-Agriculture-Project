import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { NotificationsPanel } from '../components/dashboard/NotificationsPanel';
import { FarmMap } from '../components/features/FarmMap';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { farms, notifications } from '../mock/data';

export const RecordFormPage = ({ type }) => {
  const [saved, setSaved] = useState(false);
  const label = type === 'farm' ? 'Farm' : 'Crop';
  return <Card className="max-w-3xl space-y-5"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Farm management</p><h2 className="mt-2 text-2xl font-semibold text-slate-900">Add {label}</h2><p className="mt-2 text-sm text-slate-500">Create a record for one of your assigned farms.</p></div><form onSubmit={(event) => { event.preventDefault(); setSaved(true); }} className="grid gap-4 md:grid-cols-2"><label className="text-sm font-medium text-slate-700">{label} name<input required className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400" placeholder={`Enter ${label.toLowerCase()} name`} /></label><label className="text-sm font-medium text-slate-700">{type === 'farm' ? 'Location' : 'Assigned farm'}<input required className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400" placeholder={type === 'farm' ? 'City or region' : 'Select farm'} /></label><label className="text-sm font-medium text-slate-700 md:col-span-2">Notes<textarea className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400" placeholder="Add operational details" /></label><div className="md:col-span-2"><Button type="submit">Save {label}</Button></div></form>{saved && <p className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700"><CheckCircle2 className="h-4 w-4" />{label} form is complete.</p>}</Card>;
};

export const FarmMapPage = () => <FarmMap farms={farms} />;
export const NotificationsPage = () => <NotificationsPanel notifications={notifications} />;
