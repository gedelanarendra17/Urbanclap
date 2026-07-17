import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { is_authenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) =>
    location.pathname === path ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600';

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SN</span>
          </div>
          <span className="text-xl font-bold text-indigo-600">ServiceNow</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm transition-colors ${isActive('/')}`}>Home</Link>
          <Link to="/services" className={`text-sm transition-colors ${isActive('/services')}`}>Services</Link>
          <Link to="/gardening" className={`text-sm transition-colors ${isActive('/gardening')}`}>🌿 Gardening</Link>
          {is_authenticated && (
            <Link to="/dashboard" className={`text-sm transition-colors ${isActive('/dashboard')}`}>Dashboard</Link>
          )}
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          {is_authenticated ? (
            <>
              <span className="hidden sm:block text-sm text-gray-600">
                Hi, <span className="font-medium text-gray-900">{user?.full_name?.split(' ')[0] ?? 'User'}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-4">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
