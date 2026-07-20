import { Bell, Languages, MoonStar, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { useLanguage } from '../context/LanguageContext';

export const SettingsPage = () => {
  const { t } = useLanguage();

  const baseSettings = [
    { key: 'notificationsSetting', title: t('notificationsSetting'), icon: Bell, detail: 'SMS, email, and push alerts enabled', enabled: true },
    { key: 'languageSetting', title: t('languageSetting'), icon: Languages, detail: t('language'), enabled: true },
    { key: 'themeSetting', title: t('themeSetting'), icon: MoonStar, detail: 'Light, dark, and auto mode supported', enabled: true },
    { key: 'securitySetting', title: t('securitySetting'), icon: ShieldCheck, detail: 'OTP and session protection active', enabled: true },
    { key: 'devicesSetting', title: t('devicesSetting'), icon: Smartphone, detail: 'Two connected devices synced', enabled: false },
    { key: 'experienceSetting', title: t('experienceSetting'), icon: Sparkles, detail: 'Feature-rich premium interface', enabled: true },
  ];

  const [settings, setSettings] = useState(baseSettings);

  const toggleSetting = (key) => {
    setSettings((current) => current.map((item) => (item.key === key ? { ...item, enabled: !item.enabled } : item)));
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-4 border-emerald-100/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(240,253,244,0.9))]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{t('preferences')}</p>
            <h2 className="text-2xl font-semibold text-slate-900">{t('fineTuneWorkspace')}</h2>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
            {t('lastSynced')} <span className="ml-1 font-semibold text-slate-900">2 min ago</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {settings.map(({ key, title, icon: Icon, detail, enabled }) => (
            <div key={key} className="rounded-[1.5rem] border border-slate-100 bg-white/80 p-4 text-sm text-slate-700 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
                <button
                  type="button"
                  onClick={() => toggleSetting(key)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${enabled ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  {enabled ? t('onLabel') : t('offLabel')}
                </button>
              </div>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-2 text-slate-600">{detail}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
