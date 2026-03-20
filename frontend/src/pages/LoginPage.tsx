import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, me } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: saveSession } = useAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { access_token } = await login(email, password);
      localStorage.setItem('token', access_token);
      const user = await me();
      saveSession(access_token, user);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="w-full max-w-sm bg-gray-900 rounded-lg p-8 flex flex-col gap-6">

        <div className="text-center">
          <h1 className="text-accent text-2xl font-bold">OCP Tracker</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Email" name="email" type="email" placeholder="you@um6p.ma"
            value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Password" name="password" type="password" placeholder="••••••••"
            value={password} onChange={e => setPassword(e.target.value)} />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button label={loading ? 'Signing in…' : 'Sign In'} type="submit"
            variant="primary" disabled={loading} />
        </form>

        <p className="text-gray-400 text-sm text-center">
          No account?{' '}
          <Link to="/register" className="text-accent hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
