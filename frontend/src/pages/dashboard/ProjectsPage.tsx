import Layout from '../../components/layout/Layout';
import { Project } from '../../types';

const mockProjects: Project[] = [
  { id: 1, name: 'OCP Agent',       repo_url: 'github.com/ocp/agent',   status: 'active',   score: 870 },
  { id: 2, name: 'Data Pipeline',   repo_url: 'github.com/ocp/pipeline', status: 'active',   score: 720 },
  { id: 3, name: 'Legacy Migrator', repo_url: 'github.com/ocp/legacy',  status: 'archived', score: 490 },
];

export default function ProjectsPage() {
  return (
    <Layout title="Projects">
      <div className="bg-primary rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-accent text-white">
              <th className="text-left px-5 py-3 font-semibold">Name</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-left px-5 py-3 font-semibold">Score</th>
              <th className="text-left px-5 py-3 font-semibold">Repo URL</th>
            </tr>
          </thead>
          <tbody>
            {mockProjects.map((p, i) => (
              <tr key={p.id} className={i % 2 === 0 ? 'bg-primary' : 'bg-gray-800'}>
                <td className="px-5 py-3 text-white font-medium">{p.name}</td>
                <td className="px-5 py-3">
                  <span className={`capitalize font-medium ${
                    p.status === 'active' ? 'text-accent' : 'text-gray-400'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-white">{p.score}</td>
                <td className="px-5 py-3 text-gray-400">{p.repo_url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
