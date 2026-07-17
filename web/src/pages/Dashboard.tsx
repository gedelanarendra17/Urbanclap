import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import type { Booking } from '../types';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

// Demo bookings shown when API has no data
const demoBookings: Booking[] = [
  {
    id: 1,
    service_id: 1,
    provider_id: 1,
    status: 'completed',
    scheduled_date: new Date(Date.now() - 86400000 * 3).toISOString(),
    address: '12A, MG Road, Bengaluru',
    total_price: 499,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    service: { id: 1, name: 'Home Cleaning', category: 'Cleaning', description: '', base_price: 499, duration_minutes: 120, provider_id: 1 },
  },
  {
    id: 2,
    service_id: 2,
    provider_id: 2,
    status: 'pending',
    scheduled_date: new Date(Date.now() + 86400000 * 2).toISOString(),
    address: '5B, Koramangala, Bengaluru',
    total_price: 299,
    created_at: new Date().toISOString(),
    service: { id: 2, name: 'Pipe Repair', category: 'Plumbing', description: '', base_price: 299, duration_minutes: 60, provider_id: 2 },
  },
];

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, is_authenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');

  useEffect(() => {
    if (!is_authenticated) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [is_authenticated]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/bookings');
      setBookings(res.data.length > 0 ? res.data : demoBookings);
    } catch {
      setBookings(demoBookings);
    } finally {
      setLoading(false);
    }
  };

  const filtered = bookings.filter((b) => {
    if (activeTab === 'upcoming') return ['pending', 'confirmed', 'in_progress'].includes(b.status);
    if (activeTab === 'completed') return ['completed', 'cancelled'].includes(b.status);
    return true;
  });

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter((b) => ['pending', 'confirmed', 'in_progress'].includes(b.status)).length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    spent: bookings.filter((b) => b.status === 'completed').reduce((sum, b) => sum + b.total_price, 0),
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.full_name?.split(' ')[0] ?? 'there'} 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your bookings and account</p>
          </div>
          <Link to="/services" className="btn-primary text-sm py-2">
            + Book a Service
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: stats.total, icon: '📋', color: 'text-indigo-600' },
            { label: 'Upcoming', value: stats.upcoming, icon: '📅', color: 'text-blue-600' },
            { label: 'Completed', value: stats.completed, icon: '✅', color: 'text-green-600' },
            { label: 'Total Spent', value: `₹${stats.spent}`, icon: '💳', color: 'text-purple-600' },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{s.icon}</span>
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bookings */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">My Bookings</h2>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              {(['all', 'upcoming', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${
                    activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-1/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="font-semibold text-gray-700 mb-2">No bookings found</h3>
              <p className="text-gray-400 text-sm mb-5">
                {activeTab === 'all' ? "You haven't made any bookings yet" : `No ${activeTab} bookings`}
              </p>
              <Link to="/services" className="btn-primary text-sm">Browse Services</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((b) => (
                <div key={b.id} className="p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    🛠️
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {b.service?.name ?? `Service #${b.service_id}`}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{b.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`badge ${statusColors[b.status]}`}>
                          {statusLabels[b.status]}
                        </span>
                        <span className="font-bold text-indigo-600 text-sm">₹{b.total_price}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>
                        📅 {new Date(b.scheduled_date).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                      <span>
                        🕐 {new Date(b.scheduled_date).toLocaleTimeString('en-IN', {
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile card */}
        <div className="mt-6 card p-6">
          <h2 className="font-bold text-gray-900 mb-4">My Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-xl font-bold text-indigo-600">
              {(user?.full_name ?? 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{user?.full_name ?? '—'}</p>
              <p className="text-sm text-gray-500">{user?.email ?? '—'}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge bg-indigo-50 text-indigo-700 capitalize">{user?.role ?? 'customer'}</span>
                {user?.is_verified ? (
                  <span className="badge bg-green-50 text-green-700">✓ Verified</span>
                ) : (
                  <span className="badge bg-yellow-50 text-yellow-700">⚠ Unverified</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="text-sm text-red-500 hover:text-red-600 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
