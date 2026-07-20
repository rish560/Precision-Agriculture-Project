import { motion } from 'framer-motion';
import { Sprout, Compass, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const AboutPage = () => {
  const values = [
    { icon: Compass, title: 'Precision Agriculture', desc: 'Harnessing real-time sensor metrics and AI-driven alerts for optimum crop lifecycle guidance.' },
    { icon: ShieldCheck, title: 'Secure Infrastructure', desc: 'Enterprise-grade role-based access control protecting telemetry and agricultural data.' },
    { icon: HeartHandshake, title: 'Farmer First', desc: 'Simulated guidance and official statistics designed to support decision making on the ground.' },
    { icon: Award, title: 'Operational Excellence', desc: 'Standardized crop production reporting, soil recommendations, and mapping tools.' }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-emerald-100 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(236,253,245,0.92))]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Platform Vision</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">About FarmVerse</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          FarmVerse is an industry-level, precision agriculture management platform designed to orchestrate and simplify
          modern agricultural operations. By bridging physical telemetry (soil moisture, nutrient levels, weather forecast) 
          with decision workflows, FarmVerse empowers farmers, managers, and administrators.
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {values.map(({ icon: Icon, title, desc }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col items-start gap-4">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="text-center py-8">
        <Sprout className="mx-auto h-12 w-12 text-emerald-600 animate-pulse" />
        <h3 className="mt-4 font-semibold text-slate-900 text-lg">Agronomic Intel Sync Active</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          Currently running v1.0.4. Live syncing is simulated across regional nodes. Contact your platform administrator for integrations.
        </p>
      </Card>
    </div>
  );
};
