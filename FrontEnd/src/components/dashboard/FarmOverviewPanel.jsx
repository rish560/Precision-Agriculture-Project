import { MapPin, Seedling, Layers } from 'lucide-react';
import { Card } from '../ui/Card';

export const FarmOverviewPanel = ({ farms }) => {
  const totalArea = farms.reduce((sum, farm) => sum + (Number(farm.areaHa) || 0), 0).toFixed(1);
  return (
    <Card className="rounded-[1.7rem] border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/50">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Farm overview</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Managed fields at a glance</h3>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{farms.length} sites</div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-[1.4rem] bg-slate-50 p-4 text-sm shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700"><MapPin className="h-4 w-4" /> Location diversity</div>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{new Set(farms.map((farm) => farm.location)).size}</p>
        </div>
        <div className="rounded-[1.4rem] bg-slate-50 p-4 text-sm shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700"><Seedling className="h-4 w-4" /> Total crop types</div>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{new Set(farms.map((farm) => farm.currentCrop)).size}</p>
        </div>
        <div className="rounded-[1.4rem] bg-slate-50 p-4 text-sm shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700"><Layers className="h-4 w-4" /> Total land</div>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{totalArea} ha</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        {farms.slice(0, 2).map((farm) => (
          <div key={farm.id} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-slate-900">{farm.name}</p>
                <p className="mt-1 text-sm text-slate-500">{farm.location} • {farm.area}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{farm.status}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900">Crop</p>
                <p className="mt-1">{farm.currentCrop}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Health</p>
                <p className="mt-1">{farm.healthScore}%</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Water</p>
                <p className="mt-1">{farm.waterSource}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
