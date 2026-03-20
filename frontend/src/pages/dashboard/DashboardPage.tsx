import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Badge from '../../components/ui/Badge';
import { Alert } from '../../types';
import { getProjects, getScores, getAlerts } from '../../services/api';

export default function DashboardPage() {
  const [scores, setScores]   = useState<{ name: string; score: number }[]>([]);
  const [alerts, setAlerts]   = useState<Alert[]>([]);
  const [projectName, setProjectName] = useState('');
  const [loadingScores, setLoadingScores] = useState(true);
  const [loadingAlerts, setLoadingAlerts] = useState(true);

  useEffect(() => {
    // first get projects, then fetch scores + alerts for the first one
    getProjects().then(projects => {
      if (projects.length === 0) {
        setLoadingScores(false);
        setLoadingAlerts(false);
        return;
      }

      const first = projects[0];
      setProjectName(first.name);

      getScores(first.id)
        .then(data => setScores(data ?? []))
        .catch(() => setScores([]))
        .finally(() => setLoadingScores(false));

      getAlerts(first.id)
        .then(data => setAlerts(data ?? []))
        .catch(() => setAlerts([]))
        .finally(() => setLoadingAlerts(false));
    }).catch(() => {
      setLoadingScores(false);
      setLoadingAlerts(false);
    });
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="flex flex-col gap-8">

        <section>
          <h2 className="text-white font-semibold mb-3">Developer Scores</h2>
          {loadingScores
            ? <p className="text-gray-400">Loading...</p>
            : scores.length === 0
              ? <p className="text-gray-500">No score data available.</p>
              : (
                <div className="grid grid-cols-3 gap-4">
                  {scores.map(dev => (
                    <div key={dev.name} className="bg-primary rounded-lg p-5">
                      <p className="text-gray-400 text-sm">{dev.name}</p>
                      <p className="text-accent text-3xl font-bold mt-1">{dev.score}</p>
                      <p className="text-gray-500 text-xs mt-1">out of 1000</p>
                    </div>
                  ))}
                </div>
              )
          }
        </section>

        <section>
          <h2 className="text-white font-semibold mb-3">Recent Alerts</h2>
          {loadingAlerts
            ? <p className="text-gray-400">Loading...</p>
            : alerts.length === 0
              ? <p className="text-gray-500">No recent alerts{projectName ? ` for ${projectName}` : ''}.</p>
              : (
                <div className="flex flex-col gap-2">
                  {alerts.map(alert => (
                    <div key={alert.id} className="bg-primary rounded-lg px-5 py-3 flex items-center gap-3">
                      <Badge label={alert.severity} severity={alert.severity as any} />
                      <span className="text-white text-sm">{alert.message}</span>
                    </div>
                  ))}
                </div>
              )
          }
        </section>

      </div>
    </Layout>
  );
}
