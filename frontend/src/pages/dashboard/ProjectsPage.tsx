import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Project } from '../../types';
import { getProjects } from '../../services/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setError('Could not load projects.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="Projects">
      {loading && <p className="text-gray-400">Loading...</p>}
      {error   && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
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
              {projects.map((p, i) => (
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
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-6 text-center text-gray-500">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
