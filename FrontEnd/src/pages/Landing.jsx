import { motion } from 'framer-motion';
import { ArrowRight, Droplets, Leaf, Menu, ShieldCheck, Sparkles, SunMedium, Trees, TrendingUp, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StatCard } from '../components/ui/StatCard';

const features = [
  {
    icon: Leaf,
    title: 'Crop health intelligence',
    text: 'Monitor plant stress, soil quality, and pest risk in one polished dashboard.',
  },
  {
    icon: SunMedium,
    title: 'Weather-driven planning',
    text: 'Plan irrigation and field work around accurate, local forecasts.',
  },
  {
    icon: Droplets,
    title: 'Water optimization',
    text: 'Reduce waste with smart irrigation guidance and efficiency alerts.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-based operations',
    text: 'Secure workflows for farmers, managers, experts, and admins.',
  },
];

const stats = [
  {
    title: 'Active farms',
    value: '250+',
    subtitle: 'Monitored across the network',
    icon: Trees,
  },
  {
    title: 'Insights delivered',
    value: '18k+',
    subtitle: 'Daily recommendations generated',
    icon: TrendingUp,
  },
  {
    title: 'Irrigation savings',
    value: '32%',
    subtitle: 'Average water efficiency gains',
    icon: Droplets,
  },
  {
    title: 'Platform trust',
    value: '4.9/5',
    subtitle: 'User satisfaction score',
    icon: UserCircle,
  },
];

const pillars = [
  {
    title: 'Field-level clarity',
    text: 'See crop performance, soil health, and field activity in a unified dashboard.',
  },
  {
    title: 'Faster decisions',
    text: 'Use actionable signals to respond quickly to changing weather and crop conditions.',
  },
  {
    title: 'Team alignment',
    text: 'Keep every role on the same page with secure, role-aware access.',
  },
];

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(180deg,_#f5fbf3,_#eef5ec)] text-slate-900">
      <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-green-500 p-3 text-white shadow-xl shadow-emerald-900/20">
            <Leaf className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">FarmVerse</p>
            <p className="text-sm text-slate-600">Modern agriculture SaaS</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          <a href="#features" className="transition hover:text-emerald-700">Features</a>
          <a href="#insights" className="transition hover:text-emerald-700">Insights</a>
          <a href="#contact" className="transition hover:text-emerald-700">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="secondary" className="px-4 py-2.5">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="px-4 py-2.5">Register</Button>
          </Link>
          <button className="rounded-full border border-slate-200 bg-white/80 p-2 text-slate-600 shadow-sm lg:hidden" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <section className="grid gap-10 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_35px_140px_-35px_rgba(0,0,0,0.24)] backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700 shadow-sm shadow-emerald-200/80">
              <Sparkles className="h-4 w-4" />
              Built for modern farm operations
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Turn farm data into confident decisions with beautiful agriculture software.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              FarmVerse brings crop planning, weather intelligence, and role-based workflows into a single modern dashboard for farmers, managers, experts, and admins.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/register">
                <Button className="px-6 py-3">Start free</Button>
              </Link>
              <a href="#features">
                <Button variant="secondary" className="px-6 py-3">Explore features</Button>
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <StatCard
                  key={item.title}
                  title={item.title}
                  value={item.value}
                  subtitle={item.subtitle}
                  icon={item.icon}
                />
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative mt-4 lg:mt-0">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-slate-950/5 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=80"
                alt="Modern farm field monitored by precision agriculture tools"
                className="h-[420px] w-full rounded-[1.5rem] object-cover"
              />

              <div className="absolute inset-x-0 bottom-6 mx-4 rounded-[1.5rem] border border-white/20 bg-white/90 p-5 shadow-xl backdrop-blur-lg">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Farm health index</p>
                    <p className="text-3xl font-semibold text-emerald-700">94%</p>
                  </div>
                  <div className="rounded-3xl bg-emerald-600 p-3 text-white shadow-lg shadow-emerald-900/20">
                    <Trees className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Water saved</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">18.6K L</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Yield growth</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">+24%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="features" className="mt-16">
          <SectionHeader
            badge="Product features"
            title="A modern agriculture control plane for every role."
            subtitle="Glassmorphism cards, polished interactions, and responsive design make FarmVerse feel premium from first visit to daily operations."
            action={
              <a href="#contact">
                <Button variant="secondary" className="px-5 py-3">Contact sales</Button>
              </a>
            }
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="group space-y-5 border border-emerald-100/80 bg-gradient-to-br from-white to-emerald-50/70" hover>
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-lg shadow-emerald-900/10 transition group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{feature.text}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="insights" className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="space-y-6 border border-emerald-100/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.95),_rgba(236,253,245,0.92))]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Insights</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Stay ahead with real-time agriculture signals.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-700">Weather outlook</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-700">Sunny</p>
                <p className="mt-2 text-sm text-slate-500">24°C • Light breeze • 6h sun</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-700">Soil moisture</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-700">62%</p>
                <p className="mt-2 text-sm text-slate-500">Optimal hydration levels for crops</p>
              </div>
            </div>
          </Card>
          <Card className="space-y-6 border border-slate-200 bg-white/90 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Why FarmVerse</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">A polished platform built for teams and scale.</h2>
            </div>
            <div className="grid gap-4">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-3xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
                  <p className="font-semibold text-slate-900">{pillar.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section id="contact" className="mt-16 rounded-[2rem] border border-emerald-100 bg-[linear-gradient(135deg,_rgba(16,185,129,0.14),_rgba(255,255,255,0.95))] p-8 shadow-[0_20px_80px_-35px_rgba(16,185,129,0.35)] sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Ready to modernize your farm operations?</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Book a walkthrough, explore a demo, or start your agriculture transformation with a tailored setup.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/register">
                <Button>Start free</Button>
              </Link>
              <a href="mailto:hello@farmverse.com">
                <Button variant="secondary">hello@farmverse.com</Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/70 bg-white/60 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 FarmVerse. Built for precision agriculture teams.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#features" className="transition hover:text-emerald-700">Features</a>
            <a href="#insights" className="transition hover:text-emerald-700">Insights</a>
            <a href="#contact" className="transition hover:text-emerald-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
