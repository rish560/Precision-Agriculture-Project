export const LoadingState = ({ label = 'Loading intelligent insights...' }) => (
  <div className="flex min-h-[240px] items-center justify-center rounded-[1.6rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 text-center text-slate-600 shadow-sm">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
      <p className="text-sm font-medium text-slate-700">{label}</p>
    </div>
  </div>
);
