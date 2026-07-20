import { Activity, ClipboardList, Tractor, UserRound, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { getCrops, getFarms, getUsers } from '../../services/mockApi';

export const ManagerFarmsPage = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    getFarms().then(setFarms);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard title="Operational Farms" value={farms.length.toString()} subtitle="Healthy and monitored" icon={Tractor} />
        <StatCard title="Workers on Shift" value="14" subtitle="Prepared for field operations" icon={UserRound} />
      </div>
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Farm catalog</p>
        <div className="space-y-3">
          {farms.map((farm) => (
            <div key={farm.id} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">{farm.name}</p>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{farm.status}</span>
              </div>
              <p className="mt-2">Manager: {farm.manager} • Area: {farm.area} • Current crop: {farm.currentCrop}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export const ManagerCropsPage = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    getCrops().then(setCrops);
  }, []);

  return (
    <Card className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Crop operations</p>
      <div className="grid gap-4 md:grid-cols-2">
        {crops.map((crop) => (
          <div key={crop.id} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">{crop.name}</p>
            <p className="mt-2">Growth stage: {crop.stage} • Health: {crop.health} • Expected yield: {crop.expectedYield}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const ManagerWorkersPage = () => (
  <Card className="space-y-4">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Worker management</p>
    <div className="grid gap-3 md:grid-cols-2">
      {['Ramesh', 'Suriya', 'Nisha', 'Bharath'].map((worker) => (
        <div key={worker} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">{worker} • Today’s task: Irrigation support</div>
      ))}
    </div>
  </Card>
);

export const ManagerReportsPage = () => (
  <Card className="space-y-4">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Reports</p>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
        <div className="flex items-center gap-2"><ClipboardList className="h-4 w-4 text-emerald-700" /> Daily task summary</div>
      </div>
      <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
        <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-emerald-700" /> Field performance summary</div>
      </div>
    </div>
  </Card>
);

export const ManagerProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getUsers().then((data) => setProfile(data.find((user) => user.role === 'Farm Manager')));
  }, []);

  return (
    <Card className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Manager profile</p>
      <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 text-sm text-slate-700">
        <p className="text-lg font-semibold text-slate-900">{profile?.fullName ?? 'Loading...'}</p>
        <p className="mt-2">{profile?.bio ?? 'Operations lead'} • {profile?.address ?? 'Loading location'}</p>
        <p className="mt-2">Experience: {profile?.experience ?? '—'} • Farms managed: {profile?.farmCount ?? '—'}</p>
      </div>
    </Card>
  );
};
