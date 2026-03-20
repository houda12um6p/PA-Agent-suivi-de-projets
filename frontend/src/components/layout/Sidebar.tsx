import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const links = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Projects',  to: '/dashboard/projects' },
  { label: 'Alerts',    to: '/dashboard/alerts' },
];

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-primary flex flex-col z-10">

      <div className="px-6 py-5 border-b border-gray-700">
        <span className="text-accent text-xl font-bold tracking-wide">OCP Tracker</span>
      </div>

      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {links.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              `px-4 py-2 rounded text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent text-white'
                  : 'text-white hover:bg-accent/20'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-gray-700">
        <p className="text-gray-400 text-xs">Signed in as</p>
        <p className="text-white text-sm font-medium truncate">{user?.name}</p>
      </div>

    </aside>
  );
}
