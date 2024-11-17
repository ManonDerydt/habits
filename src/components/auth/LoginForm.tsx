import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const { login, signup } = useAuth(); // Changed from signIn, signUp to match AuthContext
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to authenticate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#424242]">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#424242] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#424242] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f8f4b2] text-[#424242] py-2 px-4 rounded-lg hover:bg-[#f5f0a0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#424242] hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;