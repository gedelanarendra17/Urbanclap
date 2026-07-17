import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import apiClient from '../api/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StarRating from '../components/StarRating';
import type { Service } from '../types';

const categories = ['All', 'Plumbing', 'Electrician', 'Cleaning', 'Painting', 'Gardening', 'Security', 'AC Repair', 'Bathroom'];

const categoryIcons: Record<string, string> = {
  Plumbing: '🔧', Electrician: '⚡', Cleaning: '🧹', Painting: '🎨',
  Gardening: '🌿', Security: '🔒', 'AC Repair': '❄️', Bathroom: '🛁',
};

const categoryImages: Record<string, string> = {
  Plumbing:    'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=300&fit=crop&auto=format',
  Electrician: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=300&fit=crop&auto=format',
  Cleaning:    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=300&fit=crop&auto=format',
  Painting:    'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=300&fit=crop&auto=format',
  Gardening:   'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=300&fit=crop&auto=format',
  Security:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop&auto=format',
  'AC Repair': 'https://images.unsplash.com/photo-1631545806609-35038059f5fe?w=600&h=300&fit=crop&auto=format',
  Bathroom:    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=300&fit=crop&auto=format',
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/services');
      setServices(res.data);
    } catch {
      // show empty state
    } finally {
      setLoading(false);
    }
  };

  const setCategory = (cat: string) => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filtered = services.filter((s) => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Demo services shown when API returns empty
  const demoServices: Service[] = [
    { id: 1, name: 'Home Cleaning', category: 'Cleaning', description: 'Professional deep cleaning for your home', base_price: 499, duration_minutes: 120, provider_id: 1, rating: 4.8, total_reviews: 243 },
    { id: 2, name: 'Pipe Repair', category: 'Plumbing', description: 'Fix leaking pipes, faucets and drainage', base_price: 299, duration_minutes: 60, provider_id: 2, rating: 4.6, total_reviews: 118 },
    { id: 3, name: 'Wiring & Switchboard', category: 'Electrician', description: 'Safe and certified electrical work', base_price: 349, duration_minutes: 90, provider_id: 3, rating: 4.7, total_reviews: 89 },
    { id: 4, name: 'Wall Painting', category: 'Painting', description: 'Interior painting with premium paints', base_price: 1499, duration_minutes: 480, provider_id: 4, rating: 4.5, total_reviews: 62 },
    { id: 5, name: 'Garden Maintenance', category: 'Gardening', description: 'Pruning, weeding, and lawn care', base_price: 599, duration_minutes: 180, provider_id: 5, rating: 4.9, total_reviews: 34 },
    { id: 6, name: 'AC Service & Repair', category: 'AC Repair', description: 'AC servicing, gas refill, and repair', base_price: 699, duration_minutes: 90, provider_id: 6, rating: 4.7, total_reviews: 156 },
  ];

  const displayServices = filtered.length > 0 || loading ? filtered : demoServices.filter((s) => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">All Services</h1>
          <p className="text-indigo-200">Discover and book verified professionals</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Search bar */}
        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat !== 'All' && categoryIcons[cat] ? `${categoryIcons[cat]} ` : ''}{cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-gray-500 mb-4">
            {displayServices.length} service{displayServices.length !== 1 ? 's' : ''} found
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="w-full h-40 bg-gray-100 rounded-xl mb-4" />
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-full mb-4" />
                <div className="h-8 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : displayServices.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
            <p className="text-gray-400">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((s) => (
              <div key={s.id} className="card flex flex-col overflow-hidden group">
                {/* Service image */}
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                  <img
                    src={categoryImages[s.category] ?? 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=300&fit=crop&auto=format'}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 badge bg-white/90 text-indigo-700 text-xs font-semibold shadow">
                    {categoryIcons[s.category] ?? '🛠️'} {s.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-lg font-bold text-indigo-600">₹{s.base_price}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mt-2 mb-1">{s.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-3 line-clamp-2">{s.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    {s.rating && <StarRating rating={s.rating} />}
                    {s.rating && <span className="text-sm text-gray-500">({s.total_reviews ?? 0})</span>}
                    <span className="text-gray-300 mx-1">·</span>
                    <span className="text-sm text-gray-500">⏱ {s.duration_minutes} min</span>
                  </div>
                  <Link
                    to={`/services/${s.id}`}
                    className="btn-primary text-center text-sm py-2"
                  >
                    View & Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
