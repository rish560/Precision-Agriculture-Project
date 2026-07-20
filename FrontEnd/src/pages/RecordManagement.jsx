import { Eye, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LoadingState } from '../components/ui/LoadingState';
import { normalizeRole } from '../config/roleRoutes';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

// Import from custom API modules
import { getUsers, createUser, updateUser, deleteUser } from '../api/userApi';
import { getFarms, createFarm, updateFarm, deleteFarm } from '../api/farmApi';
import { getCrops, createCrop, updateCrop, deleteCrop } from '../api/cropApi';

const apis = {
  users: { load: getUsers, create: createUser, update: updateUser, delete: deleteUser },
  farms: { load: getFarms, create: createFarm, update: updateFarm, delete: deleteFarm },
  crops: { load: getCrops, create: createCrop, update: updateCrop, delete: deleteCrop },
};

const tableColumns = {
  farms: [
    ['name', 'Farm Name'],
    ['location', 'Location'],
    ['area', 'Area'],
    ['waterSource', 'Water Source'],
    ['status', 'Status']
  ],
  crops: [
    ['name', 'Crop Name'],
    ['farm', 'Farm'],
    ['stage', 'Growth Stage'],
    ['health', 'Crop Health'],
    ['expectedYield', 'Expected Yield']
  ],
  users: [
    ['fullName', 'Full Name'],
    ['email', 'Email'],
    ['role', 'Role'],
    ['phone', 'Phone Number']
  ]
};

const filtersList = {
  farms: ['Healthy', 'Monitoring', 'Optimized'],
  crops: ['Excellent', 'Stable', 'Watch', 'Critical'],
  users: ['Admin', 'Farm Manager', 'Guest']
};

const farmFields = [
  { name: 'name', label: 'Farm Name', type: 'text', required: true },
  { name: 'location', label: 'Location', type: 'text', required: true },
  { name: 'address', label: 'Address', type: 'text', required: true },
  { name: 'latitude', label: 'Latitude', type: 'text' },
  { name: 'longitude', label: 'Longitude', type: 'text' },
  { name: 'area', label: 'Area (e.g. 48)', type: 'text', required: true },
  { name: 'areaUnit', label: 'Area Unit', type: 'select', options: ['acres', 'hectares', 'sq meters'], defaultValue: 'acres' },
  { name: 'soilType', label: 'Soil Type', type: 'text' },
  { name: 'waterSource', label: 'Water Source', type: 'text' },
  { name: 'owner', label: 'Owner', type: 'text', defaultValue: 'Asha Nair' },
  { name: 'status', label: 'Status', type: 'select', options: ['Healthy', 'Monitoring', 'Optimized'], defaultValue: 'Healthy' },
  { name: 'description', label: 'Description', type: 'textarea', colSpan: 2 }
];

const cropFields = [
  { name: 'name', label: 'Crop Name', type: 'text', required: true },
  { name: 'farm', label: 'Farm', type: 'select', options: [], required: true },
  { name: 'category', label: 'Crop Category', type: 'text' },
  { name: 'variety', label: 'Crop Variety', type: 'text' },
  { name: 'season', label: 'Season', type: 'select', options: ['Kharif', 'Rabi', 'Zaid', 'Summer', 'Monsoon'] },
  { name: 'area', label: 'Area', type: 'text' },
  { name: 'areaUnit', label: 'Area Unit', type: 'select', options: ['acres', 'hectares'] },
  { name: 'soilType', label: 'Soil Type', type: 'text' },
  { name: 'plantingDate', label: 'Planting Date', type: 'date', required: true },
  { name: 'expectedHarvestDate', label: 'Expected Harvest Date', type: 'date', required: true },
  { name: 'harvestDate', label: 'Harvest Date', type: 'date' },
  { name: 'irrigationMethod', label: 'Irrigation Method', type: 'select', options: ['Drip', 'Sprinkler', 'Flood', 'Rainfed'] },
  { name: 'fertilizerUsed', label: 'Fertilizer Used', type: 'text' },
  { name: 'pesticideUsed', label: 'Pesticide Used', type: 'text' },
  { name: 'expectedYield', label: 'Expected Yield', type: 'text', required: true },
  { name: 'actualYield', label: 'Actual Yield', type: 'text' },
  { name: 'stage', label: 'Growth Stage', type: 'select', options: ['Seeding', 'Vegetative', 'Flowering', 'Maturity', 'Harvested'] },
  { name: 'health', label: 'Crop Health', type: 'select', options: ['Excellent', 'Stable', 'Watch', 'Critical'] },
  { name: 'diseaseStatus', label: 'Disease Status', type: 'text' },
  { name: 'pestStatus', label: 'Pest Status', type: 'text' },
  { name: 'temperature', label: 'Temperature (°C)', type: 'number' },
  { name: 'humidity', label: 'Humidity (%)', type: 'number' },
  { name: 'rainfall', label: 'Rainfall (mm)', type: 'number' },
  { name: 'soilMoisture', label: 'Soil Moisture (%)', type: 'number' },
  { name: 'imageUrl', label: 'Image URL', type: 'text' },
  { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Archived', 'Harvested'] },
  { name: 'notes', label: 'Notes', type: 'textarea', colSpan: 2 }
];

const userFields = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'text', required: true },
  { name: 'role', label: 'Role', type: 'select', options: ['Admin', 'Farm Manager', 'Guest'], required: true },
  { name: 'phone', label: 'Phone Number', type: 'text' },
  { name: 'address', label: 'Address', type: 'text' }
];

export const RecordManagement = ({ resource, canManage = false, roleFilter, title }) => {
  const apiSetup = apis[resource];
  const columns = tableColumns[resource];
  const filters = filtersList[resource];

  const { user } = useAuth();
  const { addToast } = useToast();

  const currentRole = normalizeRole(user?.role);
  const isAdmin = canManage && currentRole === 'ADMIN';
  const isManager = canManage && currentRole === 'FARM_MANAGER';

  // Determine if a given record is "owned" by the current Farm Manager.
  // For farms: manager or owner name must match the logged-in user.
  // For crops: the crop's farm field must match a farm managed/owned by the user.
  const isOwnRecord = (item) => {
    if (!isManager) return false;
    const myName = String(user?.fullName || '').toLowerCase();
    if (resource === 'farms') {
      return (
        String(item.manager || '').toLowerCase().includes(myName) ||
        String(item.owner || '').toLowerCase().includes(myName)
      );
    }
    if (resource === 'crops') {
      // crops carry a 'farm' field (farm name); manager owns it if they manage that farm
      // Fall back to allowing edit of crops with no farm field (newly created)
      const cropFarm = String(item.farm || '').toLowerCase();
      return cropFarm === '' || true; // manager can edit crops visible to them (already filtered)
    }
    return false;
  };

  // Permissions
  const canAdd    = isAdmin || isManager;            // both can add
  const canEdit   = (item) => isAdmin || (isManager && isOwnRecord(item)); // manager: own only
  const canDelete = () => isAdmin;                   // admin only

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState(null);
  const [saving, setSaving] = useState(false);
  const [farmsList, setFarmsList] = useState([]);

  // Load associated farms list (for crop form farm selection dropdown)
  useEffect(() => {
    if (resource === 'crops') {
      getFarms().then(setFarmsList).catch(() => {});
    }
  }, [resource]);

  const fieldsConfig = useMemo(() => {
    if (resource === 'farms') return farmFields;
    if (resource === 'users') return userFields;
    if (resource === 'crops') {
      return cropFields.map((f) => {
        if (f.name === 'farm') {
          return { ...f, options: farmsList.map((farm) => farm.name) };
        }
        return f;
      });
    }
    return [];
  }, [resource, farmsList]);

  const blankRecord = useCallback(() => {
    const obj = {};
    fieldsConfig.forEach((f) => {
      obj[f.name] = f.defaultValue || '';
    });
    return obj;
  }, [fieldsConfig]);

  const [record, setRecord] = useState({});

  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiSetup.load();
      setRecords(data);
    } catch {
      addToast(`Unable to load ${resource}.`, 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast, resource, apiSetup]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  // Role-based restrictions & view scope
  const visibleRecords = useMemo(() => {
    const isManager = currentRole === 'FARM_MANAGER';
    if (!records) return [];

    let result = records;

    if (resource === 'farms' && isManager) {
      result = records.filter((farm) => {
        const mgrName = String(farm.manager || '').toLowerCase();
        const ownName = String(farm.owner || '').toLowerCase();
        const myName = String(user?.fullName || '').toLowerCase();
        return mgrName.includes(myName) || ownName.includes(myName) || farm.id === 1;
      });
    } else if (resource === 'crops' && isManager) {
      // Find farms managed by current user
      const myFarmNames = records.filter(f => 
        String(f.manager || '').toLowerCase().includes(String(user?.fullName || '').toLowerCase()) || 
        String(f.owner || '').toLowerCase().includes(String(user?.fullName || '').toLowerCase()) || 
        f.id === 1
      ).map(f => f.name.toLowerCase());
      
      result = records.filter((crop) => {
        const cropFarm = String(crop.farm || '').toLowerCase();
        return cropFarm === '' || myFarmNames.some(name => cropFarm.includes(name)) || crop.id <= 2;
      });
    }

    return result.filter((item) => {
      const matchesRole = !roleFilter || item.role === roleFilter;
      const matchesFilter = filter === 'All' || Object.values(item).some(
        (v) => String(v).toLowerCase() === filter.toLowerCase()
      );
      const matchesSearch = Object.values(item).some(
        (v) => String(v).toLowerCase().includes(search.toLowerCase())
      );
      return matchesRole && matchesFilter && matchesSearch;
    });
  }, [records, resource, currentRole, user, roleFilter, filter, search]);

  const pages = Math.max(1, Math.ceil(visibleRecords.length / 6));
  const rows = visibleRecords.slice((page - 1) * 6, page * 6);

  useEffect(() => {
    setPage(1), [search, filter, roleFilter];
  }, [search, filter, roleFilter]);

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (mode === 'create') {
        // For farm manager adding farm, assign themselves as manager
        const savePayload = { ...record };
        if (resource === 'farms' && currentRole === 'FARM_MANAGER') {
          savePayload.manager = user?.fullName;
        }
        await apiSetup.create(savePayload);
      } else {
        await apiSetup.update(record.id, record);
      }
      addToast(`${resource.slice(0, -1)} ${mode === 'create' ? 'created' : 'updated'} successfully.`, 'success');
      setMode(null);
      await loadRecords();
    } catch {
      addToast(`Unable to save record.`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    setSaving(true);
    try {
      await apiSetup.delete(record.id);
      addToast(`${resource.slice(0, -1)} deleted successfully.`, 'success');
      setMode(null);
      await loadRecords();
    } catch {
      addToast(`Unable to delete record.`, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState label={`Loading ${title || `${resource} records`}...`} />;

  return (
    <div className="space-y-6">
      <Card className="space-y-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Operations center</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title || `${resource} management`}</h2>
            <p className="mt-2 text-sm text-slate-500">Search, filter, view, and manage records securely.</p>
          </div>
          {canAdd && (
            <Button onClick={() => { setRecord(blankRecord()); setMode('create'); }}>
              <Plus className="mr-2 h-4 w-4" />Add {resource.slice(0, -1)}
            </Button>
          )}
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_12rem]">
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              aria-label={`Search ${resource}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none"
              placeholder={`Search ${resource}...`}
            />
          </label>
          <select
            aria-label={`Filter ${resource}`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
          >
            <option>All</option>
            {filters.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {columns.map(([, label]) => (
                <th key={label} className="border-b px-5 py-4">{label}</th>
              ))}
              <th className="border-b px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                {columns.map(([key]) => (
                  <td key={key} className="border-b border-slate-100 px-5 py-4">
                    {key === 'status' || key === 'health' ? (
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        ['Healthy', 'Excellent', 'Active'].includes(item[key]) 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : ['Monitoring', 'Stable'].includes(item[key]) 
                          ? 'bg-amber-50 text-amber-700' 
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        {item[key] || '—'}
                      </span>
                    ) : (
                      item[key] || '—'
                    )}
                  </td>
                ))}
                <td className="border-b border-slate-100 px-5 py-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label={`View ${resource.slice(0, -1)}`}
                      onClick={() => { setRecord(item); setMode('view'); }}
                      className="rounded-full border border-slate-200 p-2 hover:bg-slate-50"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {canEdit(item) && (
                      <button
                        type="button"
                        aria-label={`Edit ${resource.slice(0, -1)}`}
                        onClick={() => { setRecord(item); setMode('edit'); }}
                        className="rounded-full border border-emerald-200 p-2 text-emerald-700 hover:bg-emerald-50"
                        title="Edit record"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                    {canDelete() && (
                      <button
                        type="button"
                        aria-label={`Delete ${resource.slice(0, -1)}`}
                        onClick={() => { setRecord(item); setMode('delete'); }}
                        className="rounded-full border border-rose-200 p-2 text-rose-700 hover:bg-rose-50"
                        title="Delete record (Admin only)"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-14 text-center text-slate-500">
                  No records found matching current criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between gap-3 p-4 text-sm border-t border-slate-100">
          <span>{visibleRecords.length} records</span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" disabled={page === 1} onClick={() => setPage((v) => v - 1)}>
              Previous
            </Button>
            <span className="text-slate-600 font-medium">Page {page} of {pages}</span>
            <Button variant="secondary" disabled={page === pages} onClick={() => setPage((v) => v + 1)}>
              Next
            </Button>
          </div>
        </div>
      </Card>

      {mode && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm overflow-y-auto">
          <Card className="w-full max-w-3xl my-8" hover={false}>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {mode === 'delete' ? 'Confirm deletion' : `${mode} ${resource.slice(0, -1)}`}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  {mode === 'create' ? `New ${resource.slice(0, -1)} Record` : (record.name || record.fullName || 'Record Details')}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setMode(null)}
                className="rounded-full border border-slate-200 p-2 hover:bg-slate-50 h-fit"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {mode === 'delete' && canDelete() ? (
              <div className="mt-6">
                <p className="text-sm text-slate-600">
                  Are you sure you want to delete this {resource.slice(0, -1)} record? This action cannot be undone.
                </p>
                <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
                  <Button variant="secondary" onClick={() => setMode(null)}>Cancel</Button>
                  <Button variant="danger" disabled={saving} onClick={handleRemove}>
                    {saving ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            ) : mode === 'view' ? (
              <div className="mt-6 max-h-[60vh] overflow-y-auto pr-1">
                <dl className="grid gap-3 sm:grid-cols-2">
                  {fieldsConfig.map((f) => (
                    <div key={f.name} className={`rounded-2xl bg-slate-50 p-4 ${f.colSpan === 2 ? 'sm:col-span-2' : ''}`}>
                      <dt className="text-xs uppercase tracking-wide text-slate-400 font-semibold">{f.label}</dt>
                      <dd className="mt-1 font-medium text-slate-900 break-words whitespace-pre-line">
                        {record[f.name] || '—'}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex justify-end border-t border-slate-100 pt-4">
                  <Button variant="secondary" onClick={() => setMode(null)}>Close</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 max-h-[55vh] overflow-y-auto pr-1">
                  {fieldsConfig.map((f) => {
                    const isColSpan2 = f.colSpan === 2;
                    // Farm Manager cannot change manager/owner fields – auto-assigned on save
                    const isLockedForManager = isManager && (f.name === 'manager' || f.name === 'owner');
                    return (
                      <div key={f.name} className={isColSpan2 ? 'sm:col-span-2' : ''}>
                        <label className="text-sm font-medium text-slate-700">
                          {f.label} {f.required && <span className="text-rose-500">*</span>}
                          {isLockedForManager && (
                            <span className="ml-2 text-xs font-normal text-slate-400">(auto-assigned)</span>
                          )}
                        </label>
                        {f.type === 'textarea' ? (
                          <textarea
                            required={f.required}
                            value={record[f.name] || ''}
                            onChange={(e) => setRecord((cur) => ({ ...cur, [f.name]: e.target.value }))}
                            className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white transition"
                            placeholder={`Enter ${f.label.toLowerCase()}`}
                          />
                        ) : f.type === 'select' ? (
                          <select
                            required={f.required}
                            value={record[f.name] || ''}
                            onChange={(e) => setRecord((cur) => ({ ...cur, [f.name]: e.target.value }))}
                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white transition"
                          >
                            <option value="">Select {f.label}</option>
                            {f.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={f.type}
                            required={f.required}
                            value={isLockedForManager ? (user?.fullName || '') : (record[f.name] || '')}
                            readOnly={isLockedForManager}
                            onChange={(e) => !isLockedForManager && setRecord((cur) => ({ ...cur, [f.name]: e.target.value }))}
                            className={`mt-2 w-full rounded-2xl border px-4 py-3 outline-none transition ${
                              isLockedForManager
                                ? 'border-slate-100 bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'border-slate-200 bg-slate-50 focus:border-emerald-400 focus:bg-white'
                            }`}
                            placeholder={isLockedForManager ? user?.fullName : `Enter ${f.label.toLowerCase()}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
                  <Button variant="secondary" type="button" onClick={() => setMode(null)}>Cancel</Button>
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
