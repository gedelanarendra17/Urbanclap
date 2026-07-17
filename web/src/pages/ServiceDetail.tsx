import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StarRating from '../components/StarRating';
import { useAuthStore } from '../store/authStore';
import type { Service } from '../types';

const categoryImages: Record<string, string> = {
  Plumbing:    'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=400&fit=crop&auto=format',
  Electrician: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop&auto=format',
  Cleaning:    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop&auto=format',
  Painting:    'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=400&fit=crop&auto=format',
  Gardening:   'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop&auto=format',
  Security:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&auto=format',
  'AC Repair': 'https://images.unsplash.com/photo-1631545806609-35038059f5fe?w=800&h=400&fit=crop&auto=format',
  Bathroom:    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=400&fit=crop&auto=format',
};

// Demo fallback for when service isn't in DB
const demoServices: Record<number, Service> = {
  1: { id: 1, name: 'Home Cleaning', category: 'Cleaning', description: 'Our professional deep cleaning service covers every corner of your home. We use eco-friendly products and modern equipment to ensure a spotless result. Includes dusting, mopping, bathroom sanitization, and kitchen cleaning.', base_price: 499, duration_minutes: 120, provider_id: 1, rating: 4.8, total_reviews: 243 },
  2: { id: 2, name: 'Pipe Repair', category: 'Plumbing', description: 'Expert plumbers fix leaking pipes, faucets, drainage issues and more. We carry all common parts so most jobs are completed in a single visit.', base_price: 299, duration_minutes: 60, provider_id: 2, rating: 4.6, total_reviews: 118 },
  3: { id: 3, name: 'Wiring & Switchboard', category: 'Electrician', description: 'Certified electricians handle all wiring, switchboard installations and repairs. Safety-first approach with proper inspections.', base_price: 349, duration_minutes: 90, provider_id: 3, rating: 4.7, total_reviews: 89 },
};

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const { is_authenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchService(Number(id));
  }, [id]);

  const fetchService = async (serviceId: number) => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/api/services/${serviceId}`);
      setService(res.data);
    } catch {
      // fallback to demo
      setService(demoServices[serviceId] ?? null);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    if (!is_authenticated) {
      navigate('/login');
      return;
    }
    navigate(`/booking?service_id=${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin w-10 h-10 text-indigo-600 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-gray-500">Loading service...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-center px-4">
          <div>
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Service not found</h2>
            <p className="text-gray-500 mb-6">This service doesn't exist or has been removed.</p>
            <Link to="/services" className="btn-primary">Browse All Services</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-indigo-600">Services</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{service.name}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero image */}
            <div className="relative rounded-2xl overflow-hidden h-72">
              <img
                src={categoryImages[service.category] ?? 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&h=400&fit=crop&auto=format'}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Title & meta */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-indigo-50 text-indigo-700">{service.category}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{service.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {service.rating && (
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={service.rating} />
                    <span className="font-medium text-gray-700">{service.rating}</span>
                    <span>({service.total_reviews} reviews)</span>
                  </div>
                )}
                <span className="flex items-center gap-1">⏱ {service.duration_minutes} minutes</span>
              </div>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">About this service</h2>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>

            {/* What's included */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">What's included</h2>
              <ul className="space-y-2">
                {[
                  'Verified & background-checked professional',
                  'Transparent pricing, no hidden charges',
                  'Service warranty for 7 days',
                  'On-time arrival guarantee',
                  'Eco-friendly materials where applicable',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="text-3xl font-extrabold text-indigo-600 mb-1">
                ₹{service.base_price}
              </div>
              <p className="text-sm text-gray-500 mb-5">Starting price · Final price may vary</p>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-gray-900">{service.duration_minutes} min</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-900">{service.category}</span>
                </div>
                {service.rating && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500">Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="font-medium text-gray-900">{service.rating}</span>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={handleBook} className="btn-primary w-full text-center mb-3">
                {is_authenticated ? 'Book Now' : 'Login to Book'}
              </button>

              {!is_authenticated && (
                <p className="text-xs text-center text-gray-400">
                  <Link to="/register" className="text-indigo-600 hover:underline">Create a free account</Link> to book
                </p>
              )}

              <div className="mt-5 p-3 bg-green-50 rounded-xl text-xs text-green-700 text-center">
                🛡️ 100% secure booking · No payment until confirmed
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
