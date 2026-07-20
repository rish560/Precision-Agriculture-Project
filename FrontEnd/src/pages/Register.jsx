import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ChevronDown, Eye, EyeOff, Lock, Mail, Phone, Sparkles, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

const roleOptions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Farm Manager', label: 'Farm Manager' },
  { value: 'Guest User', label: 'Guest User' },
];

export const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState('');

  const password = watch('password', '');

  const getPasswordStrength = (value) => {
    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[a-z]/.test(value)) score += 1;
    if (/\d/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    if (score <= 2) return { label: 'Weak', width: '25%', color: 'bg-rose-500' };
    if (score <= 3) return { label: 'Fair', width: '50%', color: 'bg-amber-500' };
    if (score <= 4) return { label: 'Strong', width: '75%', color: 'bg-sky-500' };
    return { label: 'Excellent', width: '100%', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const onSubmit = async (values) => {
    const response = await registerUser(values);
    if (response.success) {
      setStatus('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 600);
    } else {
      setStatus(response.message);
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(135deg,_#f7fcf9,_#eff7ee)]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex min-h-[38vh] flex-1 items-center justify-center overflow-hidden bg-slate-900 px-6 py-8 text-white lg:min-h-screen lg:px-10 lg:py-10"
        >
          <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=80" alt="Farming landscape with irrigation infrastructure" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(2,6,23,0.84),_rgba(5,46,22,0.72),_rgba(6,95,70,0.58))]" />

          <div className="relative z-10 flex w-full max-w-xl flex-col justify-between rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-[0_25px_90px_-25px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-8 lg:min-h-[70vh]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-sm font-medium text-emerald-50 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Premium onboarding
              </div>
              <h1 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">Create your AgriSense account</h1>
              <p className="mt-3 text-sm leading-7 text-emerald-50/90 sm:text-base">Join a secure, role-aware workspace designed for modern farms, field managers, agricultural experts, and enterprise admins.</p>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-white/20 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-2 font-medium text-emerald-100">
                <CheckCircle2 className="h-4 w-4" />
                Simulated validation and secure onboarding
              </div>
              <p className="mt-2 text-sm text-emerald-50/80">Your account setup remains fully functional while benefiting from a polished premium experience.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-1 items-center justify-center bg-white/70 px-4 py-8 backdrop-blur-xl sm:px-6 lg:px-10"
        >
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_25px_90px_-30px_rgba(15,23,42,0.35)] backdrop-blur-2xl sm:p-8">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Create account</p>
              <h2 className="text-3xl font-semibold text-slate-900">Join AgriSense</h2>
              <p className="text-sm text-slate-500">Secure onboarding with role-based access and premium validation.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Full Name</span>
                  <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition focus-within:border-emerald-400 focus-within:bg-white">
                    <UserRound className="mr-2 h-4 w-4 text-slate-400" />
                    <input {...register('fullName', { required: 'Full name is required', minLength: { value: 3, message: 'Minimum 3 characters' } })} className="w-full bg-transparent outline-none" placeholder="Asha Nair" />
                  </div>
                  {errors.fullName ? <p className="mt-2 flex items-center gap-2 text-sm text-rose-600"><AlertCircle className="h-4 w-4" />{errors.fullName.message}</p> : <p className="mt-2 text-sm text-slate-500">Enter the name you want displayed.</p>}
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Phone</span>
                  <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition focus-within:border-emerald-400 focus-within:bg-white">
                    <Phone className="mr-2 h-4 w-4 text-slate-400" />
                    <input {...register('phone', { required: 'Phone is required', pattern: { value: /^[0-9+\- ]{10,15}$/, message: 'Enter a valid phone number' } })} className="w-full bg-transparent outline-none" placeholder="+91 9876543210" />
                  </div>
                  {errors.phone ? <p className="mt-2 flex items-center gap-2 text-sm text-rose-600"><AlertCircle className="h-4 w-4" />{errors.phone.message}</p> : <p className="mt-2 text-sm text-slate-500">We will use this for account recovery.</p>}
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition focus-within:border-emerald-400 focus-within:bg-white">
                  <Mail className="mr-2 h-4 w-4 text-slate-400" />
                  <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /.+@.+\..+/, message: 'Enter a valid email' } })} className="w-full bg-transparent outline-none" placeholder="name@agrisense.com" />
                </div>
                {errors.email ? <p className="mt-2 flex items-center gap-2 text-sm text-rose-600"><AlertCircle className="h-4 w-4" />{errors.email.message}</p> : <p className="mt-2 text-sm text-slate-500">This will be your sign-in address.</p>}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Role</span>
                <div className="relative flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition focus-within:border-emerald-400 focus-within:bg-white">
                  <select
                    defaultValue=""
                    {...register('role', { required: 'Select your role' })}
                    className="w-full appearance-none bg-transparent pr-8 text-slate-700 outline-none"
                  >
                    <option value="" disabled>Select your role</option>
                    {roleOptions.map((role) => (
                      <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" />
                </div>
                {errors.role ? <p className="mt-2 flex items-center gap-2 text-sm text-rose-600"><AlertCircle className="h-4 w-4" />{errors.role.message}</p> : <p className="mt-2 text-sm text-slate-500">Role-based access stays fully functional after signup.</p>}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition focus-within:border-emerald-400 focus-within:bg-white">
                  <Lock className="mr-2 h-4 w-4 text-slate-400" />
                  <input type={showPassword ? 'text' : 'password'} {...register('password', { required: 'Password is required', validate: (value) => /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/.test(value) || 'Use 8+ chars incl. uppercase, lowercase, number, and special character' })} className="w-full bg-transparent outline-none" placeholder="Create password" />
                  <button type="button" className="ml-2 text-slate-400" onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                </div>
                {errors.password ? <p className="mt-2 flex items-center gap-2 text-sm text-rose-600"><AlertCircle className="h-4 w-4" />{errors.password.message}</p> : <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Password strength</span>
                    <span className={`font-semibold ${strength.label === 'Weak' ? 'text-rose-600' : strength.label === 'Fair' ? 'text-amber-600' : strength.label === 'Strong' ? 'text-sky-600' : 'text-emerald-600'}`}>{strength.label}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className={`h-full rounded-full transition-all ${strength.color}`} style={{ width: strength.width }} />
                  </div>
                </div>}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Confirm Password</span>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition focus-within:border-emerald-400 focus-within:bg-white">
                  <Lock className="mr-2 h-4 w-4 text-slate-400" />
                  <input type={showConfirm ? 'text' : 'password'} {...register('confirmPassword', { required: 'Confirm password', validate: (value) => value === password || 'Passwords do not match' })} className="w-full bg-transparent outline-none" placeholder="Repeat password" />
                  <button type="button" className="ml-2 text-slate-400" onClick={() => setShowConfirm((prev) => !prev)}>{showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                </div>
                {errors.confirmPassword ? <p className="mt-2 flex items-center gap-2 text-sm text-rose-600"><AlertCircle className="h-4 w-4" />{errors.confirmPassword.message}</p> : <p className="mt-2 text-sm text-slate-500">Re-enter the same password.</p>}
              </label>

              {status && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`rounded-2xl px-3 py-2 text-sm ${status.includes('successful') ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{status}</motion.p>}

              <Button type="submit" className="w-full py-3">Create Account</Button>
            </form>

            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 text-sm text-emerald-700">
              <div className="flex items-center gap-2 font-medium"><CheckCircle2 className="h-4 w-4" /> OTP verification and duplicate email checks are simulated</div>
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-emerald-700">Login</Link></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
