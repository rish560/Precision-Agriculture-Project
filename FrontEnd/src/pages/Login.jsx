import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, Sprout } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { normalizeRole, roleHomeRoute } from '../config/roleRoutes';

const loginSchema = z.object({
  email: z.string().min(1, 'Email or mobile is required'),
  password: z.string().min(1, 'Password is required'),
});

const highlights = [
  'Real-time field monitoring and smart irrigation guidance.',
  'Secure access for farmers, managers, experts, and admins.',
  'AI-powered recommendations tailored to every crop cycle.',
];

export const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('');

  const onSubmit = async (values) => {
    setStatus('');
    const response = await login(values.email, values.password);

    if (response.success) {
      const role = normalizeRole(response.user?.role ?? response.role);
      setStatus('Login successful. Redirecting...');
      setTimeout(() => navigate(roleHomeRoute(role)), 600);
    } else {
      setStatus(response.message || 'Login failed. Check your credentials.');
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(135deg,_#eafaf1,_#f8fdf9)] text-slate-900">
      <div className="relative flex min-h-screen flex-col lg:flex-row">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(22,163,74,0.18),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.14),_transparent_20%)] pointer-events-none" />

        <motion.section
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex min-h-[48vh] flex-1 items-center justify-center overflow-hidden bg-slate-950 text-white lg:min-h-screen"
        >
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80"
            alt="Agriculture field with rich greenery"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col gap-6 px-6 py-12 sm:px-10 lg:px-14">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">
                <Sparkles className="h-4 w-4" /> FarmVerse Premium
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">Modern agriculture insights for every field.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                Access your personalized farm intelligence dashboard with weather, crop, and operational signals designed for sustainable growth.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="group rounded-[1.6rem] border border-white/15 bg-white/10 p-5 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.7)] transition hover:border-emerald-300/40 hover:bg-emerald-50/20">
                  <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/10 text-emerald-200 transition group-hover:bg-white/20">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-12"
        >
          <div className="w-full max-w-xl rounded-[2rem] border border-slate-200/70 bg-white/95 p-8 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Sign in to FarmVerse</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">Welcome back</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Secure access with silent role detection and polished farm workflows.</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email or mobile</span>
                <div className="mt-2 flex items-center rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    {...register('email')}
                    className="ml-3 w-full border-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                    placeholder="name@farmverse.com or +91 98765 43210"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                </div>
                {errors.email ? (
                  <p className="mt-2 text-sm text-rose-600" role="alert"><AlertCircle className="mr-1 inline h-4 w-4 align-text-bottom" />{errors.email.message}</p>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">Enter the credentials associated with your account.</p>
                )}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <div className="mt-2 flex items-center rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
                  <Lock className="h-5 w-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className="ml-3 w-full border-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                    placeholder="Enter password"
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                  <button type="button" className="ml-3 text-slate-500 transition hover:text-slate-700" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password ? (
                  <p className="mt-2 text-sm text-rose-600" role="alert"><AlertCircle className="mr-1 inline h-4 w-4 align-text-bottom" />{errors.password.message}</p>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">Use a strong password to keep your account secure.</p>
                )}
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                  Remember me
                </label>
                <a href="#" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">Forgot password?</a>
              </div>

              {status && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl px-4 py-3 text-sm ${status.includes('successful') ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`} role="status" aria-live="polite">
                  {status}
                </motion.div>
              )}

              <Button type="submit" disabled={loading} className="w-full py-3.5 flex items-center justify-center gap-3">
                {loading && <LoadingSpinner />}
                {loading ? 'Signing in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-8 rounded-[1.8rem] border border-emerald-100 bg-emerald-50/70 p-5 text-sm text-slate-700 shadow-sm">
              <div className="flex items-center gap-2 font-semibold text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
                Secure access with AI-powered farm intelligence
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <span className="rounded-2xl bg-white px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">AI insights</span>
                <span className="rounded-2xl bg-white px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">Real-time alerts</span>
                <span className="rounded-2xl bg-white px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">Role-aware routing</span>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account? <Link to="/register" className="font-semibold text-emerald-700 hover:text-emerald-800">Create Account</Link>
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
