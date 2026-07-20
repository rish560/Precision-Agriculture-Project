export const SectionHeader = ({ title, subtitle, badge, action }) => {
  return (
    <div className="flex flex-col gap-3 rounded-[1.5rem] bg-white/80 p-5 shadow-sm shadow-slate-200/50 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        {badge && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">{badge}</p>}
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h2>
        {subtitle && <p className="max-w-3xl text-sm leading-6 text-slate-600">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
