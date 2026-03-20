import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Alert } from '../../types';

const initialAlerts: Alert[] = [
  { id: 1, type: 'CI',   severity: 'critical', message: 'Build pipeline failed on main',       is_resolved: false },
  { id: 2, type: 'MR',   severity: 'high',     message: 'Merge request open for 4+ days',      is_resolved: false },
  { id: 3, type: 'Jira', severity: 'medium',   message: 'Sprint task overdue by 2 days',       is_resolved: false },
  { id: 4, type: 'Code', severity: 'low',      message: 'Code coverage dropped below 70%',     is_resolved: false },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const resolve = (id: number) =>
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, is_resolved: true } : a));

  return (
    <Layout title="Alerts">
      <div className="flex flex-col gap-3">
        {alerts.map(alert => (
          <div key={alert.id}
            className={`bg-primary rounded-lg px-5 py-4 flex items-center justify-between ${
              alert.is_resolved ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <Badge label={alert.severity} severity={alert.severity as any} />
              <span className="text-white text-sm">{alert.message}</span>
            </div>

            {!alert.is_resolved
              ? <Button label="Resolve" variant="secondary" onClick={() => resolve(alert.id)} />
              : <span className="text-accent text-xs font-medium">Resolved</span>
            }
          </div>
        ))}
      </div>
    </Layout>
  );
}
