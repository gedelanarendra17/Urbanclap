import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  { icon: '🔧', name: 'Plumbing', color: 'bg-blue-50 text-blue-600' },
  { icon: '⚡', name: 'Electrician', color: 'bg-yellow-50 text-yellow-600' },
  { icon: '🧹', name: 'Cleaning', color: 'bg-green-50 text-green-600' },
  { icon: '🎨', name: 'Painting', color: 'bg-pink-50 text-pink-600' },
  { icon: '🌿', name: 'Gardening', color: 'bg-emerald-50 text-emerald-600' },
  { icon: '🔒', name: 'Security', color: 'bg-purple-50 text-purple-600' },
  { icon: '❄️', name: 'AC Repair', color: 'bg-cyan-50 text-cyan-600' },
  { icon: '🛁', name: 'Bathroom', color: 'bg-orange-50 text-orange-600' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Homeowner',
    text: 'Found an amazing electrician within minutes. Professional, on time, and reasonably priced. Highly recommend!',
    rating: 5,
    avatar: 'PS',
  },
  {
    name: 'Rahul Mehta',
    role: 'Office Manager',
    text: 'We use ServiceNow for all our office cleaning needs. Consistent quality every single time.',
    rating: 5,
    avatar: 'RM',
  },
  {
    name: 'Anjali Verma',
    role: 'Homeowner',
    text: 'The plumber was incredibly professional and fixed the leak in no time. Great experience!',
    rating: 4,
    avatar: 'AV',
  },
];

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '5,000+', label: 'Verified Providers' },
  { value: '100+', label: 'Service Categories' },
  { value: '4.8★', label: 'Average Rating' },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🎉 Trusted by 50,000+ customers across India
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Find Trusted Local<br />
            <span className="text-indigo-200">Professionals</span> Near You
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Book verified professionals for all your home and personal needs — in minutes, not hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-indigo-50 transition-colors shadow-lg">
              Browse Services
            </Link>
            <Link to="/register" className="border-2 border-white/60 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-white/10 transition-colors">
              Become a Provider →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-indigo-600">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Categories</h2>
          <p className="text-gray-500">Whatever you need, we've got a professional for it</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/services?category=${cat.name}`}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${cat.color}`}>
                {cat.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500">Book a service in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '🔍', title: 'Browse Services', desc: 'Explore hundreds of verified service providers near you.' },
              { step: '02', icon: '📅', title: 'Book Instantly', desc: 'Pick your date, time and address. Confirm in seconds.' },
              { step: '03', icon: '✅', title: 'Get It Done', desc: 'Your professional arrives on time and gets the job done right.' },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-3xl rounded-2xl mb-4">
                  {item.icon}
                </div>
                <span className="absolute top-0 right-1/2 translate-x-10 -translate-y-1 text-xs font-bold text-indigo-400 bg-indigo-100 px-2 py-0.5 rounded-full">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Why ServiceNow?</h2>
          <p className="text-gray-500">Everything you need for a seamless service experience</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🛡️', title: 'Verified Professionals', desc: 'Every provider is background-checked, trained, and rated by real customers.', color: 'bg-green-100' },
            { icon: '⚡', title: 'Instant Booking', desc: 'No phone calls needed. Book any service in under 2 minutes from your device.', color: 'bg-yellow-100' },
            { icon: '💳', title: 'Secure Payments', desc: 'Multiple payment options with end-to-end encryption. Pay only when satisfied.', color: 'bg-blue-100' },
          ].map((f) => (
            <div key={f.title} className="card p-8 text-center">
              <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
            <p className="text-gray-400">Real experiences from real people</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book your first service?</h2>
          <p className="text-indigo-200 mb-8">Join thousands of happy customers. Sign up in seconds.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              Get Started Free
            </Link>
            <Link to="/services" className="border-2 border-white/60 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors">
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
