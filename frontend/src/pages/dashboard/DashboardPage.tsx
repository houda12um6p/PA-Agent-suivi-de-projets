import Layout from '../../components/layout/Layout';
import Badge from '../../components/ui/Badge';
import { Alert } from '../../types';

const mockScores = [
  { name: 'Ahmed Parif',   score: 870 },
  { name: 'Sara Idrissi', score: 740 },
  { name: 'Youssef Rami',   score: 610 },
];

const mockAlerts: Alert[] = [
  { id: 1, type: 'CI', severity: 'critical', message: 'Build failed on main branch',    is_resolved: false },
  { id: 2, type: 'MR', severity: 'high',     message: 'MR open for more than 3 days',  is_resolved: false },
  { id: 3, type: 'Jira', severity: 'medium', message: 'Task overdue by 2 days',         is_resolved: false },
];

export default function DashboardPage() {
  return (
    <Layout title="Dashboard">
      <div className="flex flex-col gap-8">

        <section>
          <h2 className="text-white font-semibold mb-3">Developer Scores</h2>
          <div className="grid grid-cols-3 gap-4">
            {mockScores.map(dev => (
              <div key={dev.name} className="bg-primary rounded-lg p-5">
                <p className="text-gray-400 text-sm">{dev.name}</p>
                <p className="text-accent text-3xl font-bold mt-1">{dev.score}</p>
                <p className="text-gray-500 text-xs mt-1">out of 1000</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-3">Project Progress</h2>
          <div className="bg-primary rounded-lg p-5">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>OCP Agent Project</span>
              <span>65%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-accent h-3 rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-3">Recent Alerts</h2>
          <div className="flex flex-col gap-2">
            {mockAlerts.map(alert => (
              <div key={alert.id} className="bg-primary rounded-lg px-5 py-3 flex items-center gap-3">
                <Badge label={alert.severity} severity={alert.severity as any} />
                <span className="text-white text-sm">{alert.message}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  );
}
