import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Alert } from '../../types';
import { getProjects, getAlerts } from '../../services/api';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    getProjects()
      .then(projects => {
        if (projects.length === 0) return [];
        return getAlerts(projects[0].id);
      })
      .then(setAlerts)
      .catch(() => setError('Could not load alerts.'))
      .finally(() => setLoading(false));
  }, []);

  const resolve = (id: number) =>
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, is_resolved: true } : a));

  return (
    <Layout title="Alerts">
      {loading && <p className="text-gray-400">Loading...</p>}
      {error   && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-3">
          {alerts.length === 0 && (
            <p className="text-gray-500">No alerts for this project.</p>
          )}
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
      )}
    </Layout>
  );
}
