import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/login');
    } catch {
      setError('Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="w-full max-w-sm bg-gray-900 rounded-lg p-8 flex flex-col gap-6">

        <div className="text-center">
          <h1 className="text-accent text-2xl font-bold">OCP Tracker</h1>
          <p className="text-gray-400 text-sm mt-1">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Name" name="name" placeholder="Ahmed Benali"
            value={name} onChange={e => setName(e.target.value)} />
          <Input label="Email" name="email" type="email" placeholder="you@um6p.ma"
            value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Password" name="password" type="password" placeholder="••••••••"
            value={password} onChange={e => setPassword(e.target.value)} />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button label={loading ? 'Creating account…' : 'Register'} type="submit"
            variant="primary" disabled={loading} />
        </form>

        <p className="text-gray-400 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
