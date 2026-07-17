import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StarRating from '../components/StarRating';

const gardeningServices = [
  {
    id: 'lawn-care',
    name: 'Lawn Care & Mowing',
    description: 'Professional lawn mowing, edging, and trimming to keep your grass neat and healthy all season long.',
    price: 499,
    duration: 120,
    rating: 4.9,
    reviews: 187,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format',
    tags: ['Mowing', 'Edging', 'Trimming'],
  },
  {
    id: 'plant-planting',
    name: 'Plant & Tree Planting',
    description: 'Expert planting of flowers, shrubs, trees, and seasonal plants. Proper soil preparation and placement included.',
    price: 799,
    duration: 180,
    rating: 4.8,
    reviews: 124,
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&auto=format',
    tags: ['Flowers', 'Shrubs', 'Trees'],
  },
  {
    id: 'garden-design',
    name: 'Garden Design & Landscaping',
    description: 'Transform your outdoor space with a custom garden design. We handle layout planning, plant selection, and installation.',
    price: 2499,
    duration: 480,
    rating: 4.7,
    reviews: 56,
    img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop&auto=format',
    tags: ['Design', 'Landscaping', 'Layout'],
  },
  {
    id: 'pruning-trimming',
    name: 'Pruning & Trimming',
    description: 'Skilled pruning of trees, hedges, and ornamental plants to promote healthy growth and beautiful shapes.',
    price: 599,
    duration: 150,
    rating: 4.8,
    reviews: 98,
    img: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=600&h=400&fit=crop&auto=format',
    tags: ['Pruning', 'Hedges', 'Shaping'],
  },
  {
    id: 'weeding',
    name: 'Weeding & Soil Care',
    description: 'Complete removal of weeds from garden beds, lawns, and pathways. Includes soil aeration and mulching.',
    price: 399,
    duration: 90,
    rating: 4.6,
    reviews: 143,
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&auto=format',
    tags: ['Weeding', 'Mulching', 'Soil'],
  },
  {
    id: 'drip-irrigation',
    name: 'Drip Irrigation Setup',
    description: 'Installation of water-efficient drip irrigation systems for gardens, lawns, and potted plant collections.',
    price: 1999,
    duration: 240,
    rating: 4.9,
    reviews: 41,
    img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&h=400&fit=crop&auto=format',
    tags: ['Irrigation', 'Watering', 'Installation'],
  },
  {
    id: 'potted-plants',
    name: 'Potted Plant Service',
    description: 'Selection, planting, and arrangement of indoor and outdoor potted plants. Repotting and fertilizing included.',
    price: 349,
    duration: 60,
    rating: 4.7,
    reviews: 211,
    img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=400&fit=crop&auto=format',
    tags: ['Indoor', 'Outdoor', 'Repotting'],
  },
  {
    id: 'pest-control-garden',
    name: 'Garden Pest Control',
    description: 'Eco-friendly pest and disease treatment for plants, lawns, and vegetable gardens. Safe for kids and pets.',
    price: 699,
    duration: 120,
    rating: 4.5,
    reviews: 78,
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&auto=format',
    tags: ['Pest Control', 'Eco-friendly', 'Treatment'],
  },
  {
    id: 'kitchen-garden',
    name: 'Kitchen Garden Setup',
    description: 'Create your own organic kitchen garden. Includes bed setup, soil prep, and planting of vegetables and herbs.',
    price: 1299,
    duration: 300,
    rating: 4.9,
    reviews: 63,
    img: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?w=600&h=400&fit=crop&auto=format',
    tags: ['Organic', 'Vegetables', 'Herbs'],
  },
];

const tips = [
  { icon: '💧', title: 'Water Wisely', desc: 'Water at the base of plants early morning to minimize evaporation and prevent leaf disease.' },
  { icon: '☀️', title: 'Right Sunlight', desc: 'Match plants to your garden\'s sun exposure — full sun, partial shade, or full shade.' },
  { icon: '🌱', title: 'Healthy Soil', desc: 'Enrich your soil with compost and organic matter to give plants the nutrients they need.' },
  { icon: '✂️', title: 'Regular Pruning', desc: 'Prune dead or damaged branches regularly to encourage healthy new growth.' },
];

export default function Gardening() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&h=600&fit=crop&auto=format"
          alt="Gardening"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-green-300 text-sm mb-3">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-white">Services</Link>
              <span>/</span>
              <span className="text-white">Gardening & Planting</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
              🌿 Gardening & Planting
            </h1>
            <p className="text-green-100 text-lg max-w-xl">
              Expert garden care, planting, landscaping, and maintenance by certified horticulture professionals.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <div className="flex items-center gap-1.5 bg-white/20 text-white text-sm px-3 py-1.5 rounded-full">
                <span className="text-yellow-300">★</span> 4.8 avg rating
              </div>
              <div className="bg-white/20 text-white text-sm px-3 py-1.5 rounded-full">
                500+ jobs done
              </div>
              <div className="bg-white/20 text-white text-sm px-3 py-1.5 rounded-full">
                Eco-friendly products
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose gardening services */}
      <section className="bg-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🌱', value: '500+', label: 'Gardens Transformed' },
              { icon: '👨‍🌾', value: '50+', label: 'Expert Gardeners' },
              { icon: '♻️', value: '100%', label: 'Eco-Friendly' },
              { icon: '⭐', value: '4.8', label: 'Average Rating' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="text-2xl font-extrabold text-green-600">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Gardening Services</h2>
          <p className="text-gray-500">From basic lawn care to complete garden transformations</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gardeningServices.map((s) => (
            <div key={s.id} className="card flex flex-col overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  ₹{s.price}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{s.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-3 line-clamp-2">
                  {s.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={s.rating} />
                  <span className="text-sm text-gray-500">({s.reviews})</span>
                  <span className="text-gray-300 mx-1">·</span>
                  <span className="text-sm text-gray-500">⏱ {s.duration} min</span>
                </div>
                <Link
                  to={`/services?category=Gardening`}
                  className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gardening Tips */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">🌻 Pro Gardening Tips</h2>
            <p className="text-gray-400">Advice from our expert horticulturalists</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((t) => (
              <div key={t.title} className="bg-gray-800 rounded-2xl p-6">
                <div className="text-4xl mb-4">{t.icon}</div>
                <h3 className="font-bold text-lg mb-2">{t.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal planting guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Seasonal Planting Guide</h2>
          <p className="text-gray-500">Know what to plant and when for the best results</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              season: 'Spring',
              emoji: '🌸',
              color: 'bg-pink-50 border-pink-200',
              header: 'bg-pink-500',
              plants: ['Marigolds', 'Tomatoes', 'Sunflowers', 'Cucumbers', 'Herbs'],
            },
            {
              season: 'Summer',
              emoji: '☀️',
              color: 'bg-yellow-50 border-yellow-200',
              header: 'bg-yellow-500',
              plants: ['Zinnias', 'Basil', 'Peppers', 'Eggplant', 'Okra'],
            },
            {
              season: 'Autumn',
              emoji: '🍂',
              color: 'bg-orange-50 border-orange-200',
              header: 'bg-orange-500',
              plants: ['Spinach', 'Garlic', 'Broccoli', 'Carrots', 'Pansies'],
            },
            {
              season: 'Winter',
              emoji: '❄️',
              color: 'bg-blue-50 border-blue-200',
              header: 'bg-blue-500',
              plants: ['Peas', 'Lettuce', 'Radishes', 'Coriander', 'Fenugreek'],
            },
          ].map((s) => (
            <div key={s.season} className={`rounded-2xl border overflow-hidden ${s.color}`}>
              <div className={`${s.header} text-white p-4 flex items-center gap-2`}>
                <span className="text-2xl">{s.emoji}</span>
                <h3 className="font-bold text-lg">{s.season}</h3>
              </div>
              <ul className="p-4 space-y-2">
                {s.plants.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-500">🌱</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-green-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&h=400&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your garden?</h2>
          <p className="text-green-200 mb-8">
            Book a certified gardening professional today — same-day availability in most areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services?category=Gardening"
              className="bg-white text-green-700 px-8 py-3.5 rounded-xl font-bold hover:bg-green-50 transition-colors"
            >
              Book a Gardener
            </Link>
            <Link
              to="/services"
              className="border-2 border-white/60 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors"
            >
              Browse All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
