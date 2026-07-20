import { Activity, AlertTriangle, ArrowRight, Clock3, Droplets, Landmark, Leaf, MapPin, Sprout, SunMedium, TrendingUp, Wheat } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FarmMap } from '../../components/features/FarmMap';
import { Card } from '../../components/ui/Card';
import { LoadingState } from '../../components/ui/LoadingState';
import { StatCard } from '../../components/ui/StatCard';
import { getCrops, getFarms, getMarketPrices, getSchemes, getSoilReports, getWeather, getUpagStats } from '../../services/mockApi';

const EmptyState = ({ title, description, icon: Icon }) => (
  <div className="rounded-[1.6rem] border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 text-center text-slate-600">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-sm">{description}</p>
  </div>
);

export const FarmerFarmsPage = () => {
  const [farms, setFarms] = useState([]);
  const [sortDirection, setSortDirection] = useState('desc');
  const [showOptimizedOnly, setShowOptimizedOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFarms().then((data) => {
      setFarms(data);
      setLoading(false);
    });
  }, []);

  const averageEfficiency = useMemo(
    () => (farms.length ? Math.round(farms.reduce((sum, farm) => sum + (farm.efficiency ?? 0), 0) / farms.length) : 0),
    [farms],
  );

  const topFarm = useMemo(
    () => farms.reduce((best, farm) => {
      if (!best || (farm.efficiency ?? 0) > (best.efficiency ?? 0)) return farm;
      return best;
    }, null),
    [farms],
  );

  const displayedFarms = useMemo(
    () => farms
      .filter((farm) => !showOptimizedOnly || (farm.efficiency ?? 0) >= 90)
      .sort((a, b) => {
        const aEff = a.efficiency ?? 0;
        const bEff = b.efficiency ?? 0;
        return sortDirection === 'desc' ? bEff - aEff : aEff - bEff;
      }),
    [farms, showOptimizedOnly, sortDirection],
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Healthy Farms" value={farms.filter((farm) => farm.status === 'Healthy').length} subtitle="Excellent field condition" icon={Leaf} />
        <StatCard title="Avg. Efficiency" value={`${averageEfficiency}%`} subtitle="Performance across farms" icon={Sprout} />
        <StatCard title="Water Source" value={farms[0]?.waterSource ?? 'N/A'} subtitle="Primary field system" icon={Droplets} />
        <StatCard title="Soil Stability" value="94%" subtitle="Balanced nutrition" icon={Activity} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'))} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Sort efficiency: {sortDirection === 'desc' ? 'High → Low' : 'Low → High'}
          </button>
          <button type="button" onClick={() => setShowOptimizedOnly((prev) => !prev)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            {showOptimizedOnly ? 'Show all farms' : 'Show optimized farms'}
          </button>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Top farm: {topFarm?.name ?? 'Loading...'} • {topFarm?.efficiency ?? '--'}%
        </div>
      </div>
      <FarmMap farms={displayedFarms} />
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Farm portfolio</p>
        <div className="grid gap-4 lg:grid-cols-2">
          {displayedFarms.length ? displayedFarms.map((farm) => (
            <div key={farm.id} className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-sm">
              <img src={farm.image} alt={farm.name} className="h-36 w-full object-cover" />
              <div className="p-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">{farm.name}</h3>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{farm.status}</span>
                </div>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-700" />{farm.location} • {farm.area}</p>
                  <p className="flex items-center gap-2"><Sprout className="h-4 w-4 text-emerald-700" />Current crop: {farm.currentCrop}</p>
                  <p className="flex items-center gap-2"><Droplets className="h-4 w-4 text-emerald-700" />Water source: {farm.waterSource}</p>
                  <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-emerald-700" />Last updated: {farm.lastUpdated}</p>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 text-sm">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${farm.efficiency >= 90 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>Efficiency {farm.efficiency}%</span>
                  <span className="text-slate-500">Health score {farm.healthScore}%</span>
                </div>
              </div>
            </div>
          )) : <EmptyState title="No farms match this view" description="Adjust the filters to explore more portfolio data." icon={Leaf} />}
        </div>
      </Card>
    </div>
  );
};

export const FarmerCropsPage = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    getCrops().then(setCrops);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {crops.length ? crops.map((crop) => (
        <Card key={crop.id} className="space-y-3 overflow-hidden p-0">
          <img src={crop.image} alt={crop.name} className="h-40 w-full object-cover" />
          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{crop.name}</h3>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{crop.health}</span>
            </div>
            <div className="grid gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
              <p><span className="font-medium text-slate-900">Growth stage:</span> {crop.stage}</p>
              <p><span className="font-medium text-slate-900">Planting date:</span> {crop.plantingDate}</p>
              <p><span className="font-medium text-slate-900">Harvest date:</span> {crop.harvestDate}</p>
              <p><span className="font-medium text-slate-900">Disease status:</span> {crop.diseaseStatus}</p>
              <p><span className="font-medium text-slate-900">Yield prediction:</span> {crop.expectedYield}</p>
              <p><span className="font-medium text-slate-900">Market price:</span> {crop.marketPrice}</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-3 text-sm text-slate-700">
              <Wheat className="h-4 w-4 text-emerald-700" />
              Field advisory: monitor {crop.name.toLowerCase()} conditions during the next irrigation cycle.
            </div>
          </div>
        </Card>
      )) : <EmptyState title="No crop records" description="Crop data will appear here as soon as field records are synced." icon={Wheat} />}
    </div>
  );
};

export const FarmerWeatherPage = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeather().then(setWeather);
  }, []);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Weather monitoring</p>
        <div className="rounded-[1.5rem] bg-gradient-to-br from-emerald-600 to-emerald-500 p-5 text-white shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">{weather?.location ?? 'Coimbatore'}</p>
              <p className="mt-2 text-4xl font-semibold">{weather?.current?.temp ?? '--'}°C</p>
              <p className="mt-2 text-sm text-emerald-50">Humidity {weather?.current?.humidity ?? '--'}% • Wind {weather?.current?.windSpeed ?? '--'} km/h • UV {weather?.current?.uvIndex ?? '--'}</p>
            </div>
            <SunMedium className="h-10 w-10" />
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-white/20 p-3 text-sm"><p className="text-emerald-50">Rainfall</p><p className="mt-1 font-semibold">{weather?.current?.rainfall ?? '--'}%</p></div>
            <div className="rounded-2xl bg-white/20 p-3 text-sm"><p className="text-emerald-50">Condition</p><p className="mt-1 font-semibold">{weather?.current?.condition ?? '--'}</p></div>
            <div className="rounded-2xl bg-white/20 p-3 text-sm"><p className="text-emerald-50">Sunset</p><p className="mt-1 font-semibold">{weather?.current?.sunset ?? '--'}</p></div>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {weather?.forecast?.map((day) => (
            <div key={day.day} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{day.day}</span>
                <span className="text-emerald-700">{day.condition}</span>
              </div>
              <p className="mt-2">High {day.high}° • Low {day.low}° • Rain {day.rainfall}%</p>
            </div>
          ))}
        </div>
      </Card>
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Weather alerts</p>
        <div className="space-y-3 text-sm text-slate-700">
          {weather?.alerts?.length ? weather.alerts.map((alert) => (
            <div key={alert.type} className="rounded-2xl border border-amber-100 bg-amber-50 p-3 text-amber-800">
              <div className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4" />{alert.type}</div>
              <p className="mt-2">{alert.message}</p>
            </div>
          )) : <EmptyState title="No active alerts" description="Weather conditions are stable for now." icon={AlertTriangle} />}
        </div>
      </Card>
    </div>
  );
};

export const FarmerSoilPage = () => {
  const [soilReports, setSoilReports] = useState([]);

  useEffect(() => {
    getSoilReports().then(setSoilReports);
  }, []);

  const activeReport = soilReports[0];

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Soil analysis</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Soil health score</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{activeReport ? '94/100' : '--'}</p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">NPK balance</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">Nitrogen: {activeReport?.nitrogen ?? '--'} • Phosphorus: {activeReport?.phosphorus ?? '--'} • Potassium: {activeReport?.potassium ?? '--'}</p>
          </div>
        </div>
        {activeReport ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.4rem] border border-slate-100 bg-white p-4 text-sm text-slate-600"><p className="font-semibold text-slate-900">pH Value</p><p className="mt-2">{activeReport.ph}</p></div>
            <div className="rounded-[1.4rem] border border-slate-100 bg-white p-4 text-sm text-slate-600"><p className="font-semibold text-slate-900">Organic Matter</p><p className="mt-2">{activeReport.organicMatter}</p></div>
            <div className="rounded-[1.4rem] border border-slate-100 bg-white p-4 text-sm text-slate-600"><p className="font-semibold text-slate-900">Moisture</p><p className="mt-2">{activeReport.moisture}</p></div>
            <div className="rounded-[1.4rem] border border-slate-100 bg-white p-4 text-sm text-slate-600"><p className="font-semibold text-slate-900">Soil Type</p><p className="mt-2">{activeReport.soilType}</p></div>
          </div>
        ) : null}
        <div className="rounded-[1.4rem] border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
          <p className="font-semibold">Recommendation</p>
          <p className="mt-2">{activeReport?.recommendation ?? 'Sample analysis is being prepared for your latest field checks.'}</p>
        </div>
      </Card>
    </div>
  );
};

export const FarmerMarketPage = () => {
  const [prices, setPrices] = useState([]);
  const [upagStats, setUpagStats] = useState(null);

  useEffect(() => {
    getMarketPrices().then(setPrices);
    getUpagStats().then(setUpagStats);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Market intelligence</p>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {prices.length ? prices.map((price) => (
            <div key={price.crop} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">{price.crop}</p>
                <TrendingUp className="h-4 w-4 text-emerald-700" />
              </div>
              <p className="mt-2">Market: {price.marketName}</p>
              <p className="mt-1">Price today: {price.priceToday}</p>
              <p className="mt-1">Yesterday: {price.yesterdayPrice}</p>
              <p className="mt-1">Trend: {price.trend}</p>
              {price.bestMarket ? <p className="mt-2 text-emerald-700">Best market for this crop</p> : null}
            </div>
          )) : <EmptyState title="No market data" description="Pricing feeds will populate as soon as market updates are synced." icon={TrendingUp} />}
        </div>
      </Card>

      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">UPAg official stats</p>
            <h3 className="text-xl font-semibold text-slate-900">Real government crop data</h3>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">UPAg 2025-26</div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Rice Production (3rd estimate)</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">{upagStats?.riceProductionThirdAdvance ?? '--'} lakh tonnes</p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Top rice states</p>
            <ul className="mt-2 space-y-2">
              {upagStats?.riceTopStates?.slice(0, 3).map((item) => (
                <li key={item.state} className="flex items-center justify-between">
                  <span>{item.state}</span>
                  <span className="font-semibold text-slate-900">{item.value} LT</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {upagStats?.commercialCropProduction?.map((crop) => (
            <div key={crop.crop} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">{crop.crop}</p>
              <p className="mt-2">{crop.value} {crop.unit}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export const FarmerGovernmentPage = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    getSchemes().then(setSchemes);
  }, []);

  return (
    <Card className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Government schemes</p>
      <div className="space-y-3">
        {schemes.length ? schemes.map((scheme) => (
          <div key={scheme.id} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{scheme.title}</p>
                <p className="mt-2">{scheme.description}</p>
              </div>
              <Landmark className="h-4 w-4 text-emerald-700" />
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-3 text-sm text-slate-600">
              <p><span className="font-medium text-slate-900">Eligibility:</span> {scheme.eligibility}</p>
              <p><span className="font-medium text-slate-900">Last date:</span> {scheme.lastDate}</p>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 font-medium text-emerald-700">Apply <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        )) : <EmptyState title="No schemes available" description="New schemes will appear here when they are published." icon={Landmark} />}
      </div>
    </Card>
  );
};

export const FarmerProfilePage = () => (
  <Card className="space-y-4">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Farmer profile</p>
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50">
      <div className="relative h-44 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80" alt="Agriculture field and irrigation system" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur">Connected farm operations</div>
      </div>
      <div className="grid gap-4 p-6 text-sm text-slate-700 md:grid-cols-2">
        <div>
          <p className="text-xl font-semibold text-slate-900">Asha Nair</p>
          <p className="mt-2">Role: Farmer</p>
          <p className="mt-2">Mobile: +91 9876543210</p>
          <p className="mt-2">Email: asha@agrisense.com</p>
          <p className="mt-2">Address: Coimbatore, Tamil Nadu</p>
        </div>
        <div>
          <p className="mt-2">Farm count: 3</p>
          <p className="mt-2">Crop count: 8</p>
          <p className="mt-2">Experience: 8 years</p>
          <p className="mt-2">Specialty: Climate-resilient irrigation and market planning</p>
        </div>
      </div>
    </div>
  </Card>
);
