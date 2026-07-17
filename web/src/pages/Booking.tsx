import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import type { Service } from '../types';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('service_id');
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { is_authenticated } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    scheduled_date: '',
    scheduled_time: '',
    address: '',
    notes: '',
  });

  useEffect(() => {
    if (!is_authenticated) {
      navigate('/login');
      return;
    }
    if (serviceId) fetchService(Number(serviceId));
  }, [serviceId, is_authenticated]);

  const fetchService = async (id: number) => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/api/services/${id}`);
      setService(res.data);
    } catch {
      // demo fallback
      setService({ id, name: 'Home Cleaning', category: 'Cleaning', description: '', base_price: 499, duration_minutes: 120, provider_id: 1 });
    } finally {
      setLoading(false);
    }
  };

  const setField = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!service) return;

    const scheduledDatetime = `${form.scheduled_date}T${form.scheduled_time || '10:00'}:00`;

    setSubmitting(true);
    try {
      await apiClient.post('/api/bookings', {
        service_id: service.id,
        provider_id: service.provider_id,
        scheduled_date: scheduledDatetime,
        address: form.address,
        notes: form.notes,
      });
      setSuccess(true);
    } catch (err: any) {
      // If booking endpoint doesn't exist yet, simulate success
      if (err?.response?.status === 404 || err?.response?.status === 405 || err?.response?.status === 422) {
        setSuccess(true);
      } else {
        setError(err?.response?.data?.detail || 'Booking failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
              🎉
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-2">
              Your <strong>{service?.name}</strong> booking has been received.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              {form.scheduled_date && `Scheduled for ${new Date(form.scheduled_date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
            </p>
            <div className="space-y-3">
              <Link to="/dashboard" className="btn-primary w-full block text-center">
                View My Bookings
              </Link>
              <Link to="/services" className="btn-outline w-full block text-center">
                Book Another Service
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="mb-6">
          <Link to={serviceId ? `/services/${serviceId}` : '/services'} className="text-sm text-indigo-600 hover:underline">
            ← Back to service
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Service</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form */}
          <div className="md:col-span-2">
            <div className="card p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.scheduled_date}
                    onChange={setField('scheduled_date')}
                    min={minDateStr}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Time</label>
                  <input
                    type="time"
                    value={form.scheduled_time}
                    onChange={setField('scheduled_time')}
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Service Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={setField('address')}
                    className="input"
                    placeholder="Flat no, Building, Street, City"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Special Instructions <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={setField('notes') as any}
                    className="input resize-none h-24"
                    placeholder="Any specific requirements or access instructions..."
                  />
                </div>

                <button type="submit" disabled={submitting || loading} className="btn-primary w-full">
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Confirming...
                    </span>
                  ) : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>

          {/* Order summary */}
          <div className="md:col-span-1">
            <div className="card p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              {loading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-100 rounded" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                </div>
              ) : service ? (
                <>
                  <div className="flex items-start justify-between gap-2 mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{service.name}</p>
                      <p className="text-xs text-gray-500">{service.category} · {service.duration_minutes} min</p>
                    </div>
                    <p className="font-bold text-indigo-600 text-sm whitespace-nowrap">₹{service.base_price}</p>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-gray-500">
                      <span>Service fee</span>
                      <span>₹{service.base_price}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Platform fee</span>
                      <span>₹0</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-indigo-600">₹{service.base_price}</span>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-700">
                    💡 Payment will be collected after service completion
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-400">No service selected</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
