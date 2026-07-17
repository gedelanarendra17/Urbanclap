import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import apiClient from '../api/client';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface GoogleButtonProps {
  label?: string;
}

export default function GoogleButton({ label = 'Continue with Google' }: GoogleButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setTokens, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    // Use authorization code flow — exchange code on backend
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      setLoading(true);
      setError('');
      try {
        // Exchange the authorization code for tokens on our backend
        const res = await apiClient.post('/api/auth/google/callback', {
          code: codeResponse.code,
        });
        const { access_token, refresh_token } = res.data;
        setTokens(access_token, refresh_token);
        // Fetch user profile
        try {
          const me = await apiClient.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          setUser(me.data);
        } catch {
          // ignore
        }
        navigate('/dashboard');
      } catch (err: any) {
        setError(err?.response?.data?.detail || 'Google sign-in failed. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    onError: (err) => {
      console.error('Google OAuth error:', err);
      setError('Google sign-in was cancelled or failed.');
    },
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => handleGoogleLogin()}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {loading ? (
          <svg className="animate-spin w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          /* Google logo SVG */
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#4285F4" d="M47.53 24.56c0-1.64-.15-3.22-.42-4.74H24v8.98h13.2c-.57 3.03-2.29 5.6-4.88 7.33v6.09h7.9c4.63-4.27 7.31-10.55 7.31-17.66z"/>
            <path fill="#34A853" d="M24 48c6.64 0 12.21-2.2 16.27-5.97l-7.9-6.09c-2.2 1.48-5.01 2.35-8.37 2.35-6.43 0-11.88-4.34-13.82-10.18H2.02v6.27C6.07 43.08 14.42 48 24 48z"/>
            <path fill="#FBBC04" d="M10.18 28.11A14.88 14.88 0 0 1 9.6 24c0-1.42.25-2.8.58-4.11v-6.27H2.02A23.94 23.94 0 0 0 0 24c0 3.86.92 7.51 2.02 10.38l8.16-6.27z"/>
            <path fill="#E94235" d="M24 9.54c3.62 0 6.87 1.25 9.43 3.69l7.07-7.07C36.2 2.19 30.63 0 24 0 14.42 0 6.07 4.92 2.02 13.62l8.16 6.27C12.12 13.88 17.57 9.54 24 9.54z"/>
          </svg>
        )}
        <span>{loading ? 'Signing in...' : label}</span>
      </button>
      {error && (
        <p className="mt-2 text-xs text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
