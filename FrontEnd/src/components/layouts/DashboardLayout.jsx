import { motion } from 'framer-motion';
import {
  Bell,
  ChevronRight,
  LayoutGrid,
  Menu,
  Radar,
  Search,
  Settings,
  SunMoon,
  UserCircle,
  FileText,
  LogOut,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../features/LanguageSwitcher';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { normalizeRole } from '../../config/roleRoutes';
import { navConfig } from '../../config/navConfig';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const currentRole = normalizeRole(user?.role);
  const filteredNav = useMemo(
    () => navConfig.filter((item) => item.allowedRoles.includes(currentRole)),
    [currentRole],
  );

  const navSections = useMemo(() => {
    return filteredNav.reduce((acc, item) => {
      const section = item.section || 'Primary';
      if (!acc[section]) acc[section] = [];
      acc[section].push(item);
      return acc;
    }, {});
  }, [filteredNav]);

  const pathLabel = location.pathname.replace('/dashboard/', '').replace('/', ' ') || 'overview';

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(135deg,_#f7fcf9,_#f2efe7)] text-slate-800">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className={`fixed inset-y-0 left-0 z-30 w-72 transform border-r border-white/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.95),_rgba(236,253,245,0.95))] p-6 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl transition ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold tracking-tight text-slate-900">FarmVerse</p>
              <p className="text-sm text-slate-500">{user?.role || 'User'} workspace</p>
            </div>
            <button className="rounded-xl border border-slate-200 bg-white/80 p-2 lg:hidden" onClick={() => setMobileOpen(false)}>
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 rounded-[1.25rem] border border-emerald-100 bg-gradient-to-br from-emerald-600 to-green-500 p-4 text-white shadow-lg shadow-emerald-900/10">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-semibold">Operational command</span>
            </div>
            <p className="mt-2 text-sm text-emerald-50">Drive farm performance with intelligent workflows and live telemetry.</p>
          </div>

          <nav className="mt-6 space-y-5">
            {Object.entries(navSections).map(([section, items]) => (
              <div key={section}>
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400">{section}</p>
                <div className="space-y-1">
                  {items.map(({ to, label, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                        }`
                      }
                    >
                      <span className="flex items-center gap-3">
                        <span className="rounded-xl bg-white/80 p-2 text-emerald-700">
                          <Icon className="h-4 w-4" />
                        </span>
                        {label}
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <button type="button" onClick={() => { logout(); navigate('/login'); }} className="mt-5 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-700">
            <span className="flex items-center gap-3"><span className="rounded-xl bg-rose-50 p-2 text-rose-600"><LogOut className="h-4 w-4" /></span>Logout</span><ChevronRight className="h-4 w-4" />
          </button>

          <div className="mt-6 rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 shadow-sm">
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              System status
            </div>
            <div className="mt-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span>{user?.address || 'Field operations active'}</span>
            </div>
          </div>
        </aside>

        <div className="flex-1 p-3 lg:p-6">
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-3 z-20 mb-4 rounded-[1.5rem] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.3)] backdrop-blur-xl lg:px-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button className="rounded-xl border border-slate-200 bg-white/80 p-2 lg:hidden" onClick={() => setMobileOpen(true)}>
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">{user?.role || 'Farm'} dashboard</p>
                  <p className="text-xl font-semibold capitalize">{pathLabel}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                  Live field sync • 24/7 monitor
                </div>
                <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                  <Search className="h-4 w-4" />
                  <input onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addToast('Use the search controls on each data page to search records.', 'info'); } }} className="w-24 bg-transparent outline-none sm:w-40" placeholder="Search" aria-label="Search records" />
                </label>
                <LanguageSwitcher />
                <button className="rounded-full border border-slate-200 bg-white p-2" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                  <SunMoon className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Open notifications" onClick={() => currentRole === 'GUEST' ? addToast('Guests do not receive operational notifications.', 'info') : navigate('/dashboard/notifications')} className="rounded-full border border-slate-200 bg-white p-2">
                  <Bell className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                  <UserCircle className="h-7 w-7 text-emerald-700" />
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold">{user?.fullName}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.header>

          <Outlet />
        </div>
      </div>
    </div>
  );
};
