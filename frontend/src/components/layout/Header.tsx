import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="
      fixed top-0 left-64 right-0 h-16
      bg-primary border-b-2 border-accent
      flex items-center justify-between px-6 z-10
    ">
      <h1 className="text-white text-lg font-semibold">{title}</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm">{user?.email}</span>
        <Button label="Logout" variant="secondary" onClick={logout} />
      </div>
    </header>
  );
}
