import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Unauthorized } from '../pages/Unauthorized';
import { RoleDashboard } from '../pages/RoleDashboard';
import { ReportsPage } from '../pages/Reports';
import { SettingsPage } from '../pages/Settings';
import { ProfilePage } from '../pages/Profile';
import { AboutPage } from '../pages/About';
import { HelpPage } from '../pages/Help';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { roleHomeRoute } from '../config/roleRoutes';
import { FarmMapPage, NotificationsPage } from '../pages/DashboardPages';
import { FarmerSoilPage, FarmerWeatherPage } from '../pages/Farmer/RolePages';
import { RecordManagement } from '../pages/RecordManagement';

const RoleRedirect = () => {
  const { role } = useAuth();
  return <Navigate to={roleHomeRoute(role)} replace />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected dashboard shell */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['FARMER', 'GUEST', 'FARM_MANAGER', 'ADMIN']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Index: role-based landing */}
          <Route index element={<RoleDashboard />} />
          <Route path="farmer"  element={<RoleRedirect />} />
          <Route path="manager" element={<RoleRedirect />} />
          <Route path="admin"   element={<RoleRedirect />} />

          {/* ── Admin / Creator ── */}
          <Route
            path="add-farm"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <RecordManagement resource="farms" canManage title="Add and manage farms" />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-crop"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <RecordManagement resource="crops" canManage title="Add and manage crops" />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-farms"
            element={
              <ProtectedRoute allowedRoles={['FARM_MANAGER']}>
                <RecordManagement resource="farms" canManage title="My farms" />
              </ProtectedRoute>
            }
          />
          <Route
            path="production"
            element={
              <ProtectedRoute allowedRoles={['FARM_MANAGER']}>
                <RecordManagement resource="crops" canManage title="Crop production" />
              </ProtectedRoute>
            }
          />

          {/* ── Admin – users ── */}
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <RecordManagement resource="users" canManage title="Manage users" />
              </ProtectedRoute>
            }
          />
          <Route
            path="farmers"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <RecordManagement resource="users" canManage roleFilter="Farmer" title="View farmers" />
              </ProtectedRoute>
            }
          />
          <Route
            path="farm-managers"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <RecordManagement resource="users" canManage roleFilter="Farm Manager" title="Manage farm managers" />
              </ProtectedRoute>
            }
          />
          <Route
            path="guests"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <RecordManagement resource="users" canManage roleFilter="Guest" title="View guests" />
              </ProtectedRoute>
            }
          />

          {/* ── Admin / Guest – farms & crops ── */}
          <Route
            path="farms"
            element={
              <ProtectedRoute allowedRoles={['GUEST', 'ADMIN']}>
                <RecordManagement resource="farms" canManage title="Manage farms" />
              </ProtectedRoute>
            }
          />
          <Route
            path="crops"
            element={
              <ProtectedRoute allowedRoles={['GUEST', 'ADMIN']}>
                <RecordManagement resource="crops" canManage title="Manage crops" />
              </ProtectedRoute>
            }
          />

          {/* ── Shared: Insights ── */}
          <Route
            path="soil"
            element={
              <ProtectedRoute allowedRoles={['GUEST', 'FARM_MANAGER']}>
                <FarmerSoilPage />
              </ProtectedRoute>
            }
          />

          {/* ── Reports / Analytics ── */}
          <Route
            path="reports"
            element={
              <ProtectedRoute allowedRoles={['FARM_MANAGER', 'ADMIN']}>
                <ReportsPage />
              </ProtectedRoute>
            }
          />

          {/* ── Notifications / Settings ── */}
          <Route
            path="notifications"
            element={
              <ProtectedRoute allowedRoles={['FARM_MANAGER', 'ADMIN']}>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'FARM_MANAGER']}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* ── Profile (all roles) ── */}
          <Route path="profile" element={<ProfilePage />} />

          {/* ── Guest-only info pages ── */}
          <Route
            path="about"
            element={
              <ProtectedRoute allowedRoles={['GUEST', 'FARMER']}>
                <AboutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="help"
            element={
              <ProtectedRoute allowedRoles={['GUEST', 'FARMER']}>
                <HelpPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center text-2xl font-semibold text-slate-700">
              404 • Page not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
