import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  {
    name: 'Plumbing',
    color: 'bg-blue-50',
    img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=80&h=80&fit=crop&auto=format',
    href: '/services?category=Plumbing',
  },
  {
    name: 'Electrician',
    color: 'bg-yellow-50',
    img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=80&h=80&fit=crop&auto=format',
    href: '/services?category=Electrician',
  },
  {
    name: 'Cleaning',
    color: 'bg-green-50',
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=80&h=80&fit=crop&auto=format',
    href: '/services?category=Cleaning',
  },
  {
    name: 'Painting',
    color: 'bg-pink-50',
    img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=80&h=80&fit=crop&auto=format',
    href: '/services?category=Painting',
  },
  {
    name: 'Gardening',
    color: 'bg-emerald-50',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=80&h=80&fit=crop&auto=format',
    href: '/gardening',
  },
  {
    name: 'Security',
    color: 'bg-purple-50',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&auto=format',
    href: '/services?category=Security',
  },
  {
    name: 'AC Repair',
    color: 'bg-cyan-50',
    img: 'https://images.unsplash.com/photo-1631545806609-35038059f5fe?w=80&h=80&fit=crop&auto=format',
    href: '/services?category=AC Repair',
  },
  {
    name: 'Bathroom',
    color: 'bg-orange-50',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=80&h=80&fit=crop&auto=format',
    href: '/services?category=Bathroom',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Homeowner',
    text: 'Found an amazing electrician within minutes. Professional, on time, and reasonably priced. Highly recommend!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
  },
  {
    name: 'Rahul Mehta',
    role: 'Office Manager',
    text: 'We use ServiceNow for all our office cleaning needs. Consistent quality every single time.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
  },
  {
    name: 'Anjali Verma',
    role: 'Homeowner',
    text: 'The plumber was incredibly professional and fixed the leak in no time. Great experience!',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format',
  },
];

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '5,000+', label: 'Verified Providers' },
  { value: '100+', label: 'Service Categories' },
  { value: '4.8★', label: 'Average Rating' },
];

const howItWorks = [
  {
    step: '01',
    title: 'Browse Services',
    desc: 'Explore hundreds of verified service providers near you.',
    img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=260&fit=crop&auto=format',
  },
  {
    step: '02',
    title: 'Book Instantly',
    desc: 'Pick your date, time and address. Confirm in seconds.',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=260&fit=crop&auto=format',
  },
  {
    step: '03',
    title: 'Get It Done',
    desc: 'Your professional arrives on time and gets the job done right.',
    img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=260&fit=crop&auto=format',
  },
];

const features = [
  {
    title: 'Verified Professionals',
    desc: 'Every provider is background-checked, trained, and rated by real customers.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format',
    badge: '✓ Background checked',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    title: 'Instant Booking',
    desc: 'No phone calls needed. Book any service in under 2 minutes from your device.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&auto=format',
    badge: '⚡ Book in 2 min',
    badgeColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    title: 'Secure Payments',
    desc: 'Multiple payment options with end-to-end encryption. Pay only when satisfied.',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format',
    badge: '🔒 100% Secure',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=900&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <div>
              <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                🎉 Trusted by 50,000+ customers across India
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Find Trusted Local<br />
                <span className="text-indigo-200">Professionals</span> Near You
              </h1>
              <p className="text-lg text-indigo-100 mb-10 max-w-lg">
                Book verified professionals for all your home and personal needs — in minutes, not hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/services" className="bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-indigo-50 transition-colors shadow-lg text-center">
                  Browse Services
                </Link>
                <Link to="/register" className="border-2 border-white/60 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-white/10 transition-colors text-center">
                  Become a Provider →
                </Link>
              </div>
            </div>
            {/* Right hero image */}
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=500&fit=crop&auto=format"
                  alt="Professional at work"
                  className="rounded-3xl shadow-2xl w-full object-cover h-96"
                />
                {/* Floating card */}
                <div className="absolute -bottom-4 -left-6 bg-white text-gray-900 rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg">✓</div>
                  <div>
                    <p className="font-bold text-sm">Booking Confirmed!</p>
                    <p className="text-xs text-gray-500">AC Repair · Today 3:00 PM</p>
                  </div>
                </div>
                {/* Floating rating card */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900">4.9 / 5</p>
                    <p className="text-xs text-gray-400">2,400+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
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

      {/* ── Categories ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Categories</h2>
          <p className="text-gray-500">Whatever you need, we've got a professional for it</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.href}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-14 h-14 rounded-xl overflow-hidden ${cat.color} flex items-center justify-center`}>
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500">Book a service in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Step {item.step}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why ServiceNow ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Why ServiceNow?</h2>
          <p className="text-gray-500">Everything you need for a seamless service experience</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="card overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute bottom-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${f.badgeColor}`}>
                  {f.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
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
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = 'none';
                      el.parentElement!.innerHTML = `<div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">${t.name.charAt(0)}</div>` + el.parentElement!.innerHTML;
                    }}
                  />
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

      {/* ── CTA ── */}
      <section className="relative bg-indigo-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=500&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
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
