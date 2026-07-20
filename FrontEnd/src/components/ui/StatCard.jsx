import { Card } from './Card';

export const StatCard = ({ title, value, subtitle, icon: Icon }) => (
  <Card className="space-y-3 border-emerald-100/80 bg-gradient-to-br from-white via-emerald-50/50 to-white">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      {Icon && <div className="rounded-2xl bg-emerald-600/10 p-2 text-emerald-700"><Icon className="h-5 w-5" /></div>}
    </div>
    <p className="text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
    <p className="text-sm text-emerald-700">{subtitle}</p>
  </Card>
);
