import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadRazorpay } from '../utils/razorpay';
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Play,
  X,
  ChevronDown,
  Search
} from 'lucide-react';

const Events = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  interface EventItem {
    id: string;
    name: string;
    image: string;
    videoUrl: string;
    date: string;
    time: string;
    duration: string;
    location: string;
    price: number;
    originalPrice: number;
    rating: number;
    attendees: number;
    category: string;
    description: string;
    highlights: string[];
  }

  interface City {
    id: string;
    name: string;
    events: EventItem[];
  }

  interface Country {
    id: string;
    name: string;
    cities: City[];
  }

  const countries: Country[] = [
    {
      id: 'france',
      name: 'France',
      cities: [
        {
          id: 'paris',
          name: 'Paris',
          events: [
            {
              id: 'paris-fashion-week',
              name: 'Paris Fashion Week',
              image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              date: '2024-03-20',
              time: '18:00',
              duration: '3 hours',
              location: 'Grand Palais, Paris',
              price: 299,
              originalPrice: 399,
              rating: 4.9,
              attendees: 2500,
              category: 'fashion',
              description: 'Experience the world\'s most prestigious fashion event with exclusive runway shows.',
              highlights: ['Exclusive runway access', 'Designer meet & greet', 'VIP reception', 'Fashion photography']
            },
            {
              id: 'louvre-night-tour',
              name: 'Louvre Night Tour',
              image: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
              date: '2024-03-22',
              time: '20:00',
              duration: '2.5 hours',
              location: 'Louvre Museum, Paris',
              price: 89,
              originalPrice: 129,
              rating: 4.8,
              attendees: 150,
              category: 'culture',
              description: 'Private after-hours tour of the world\'s most famous museum.',
              highlights: ['After-hours access', 'Expert guide', 'Mona Lisa viewing', 'Wine tasting']
            }
          ]
        },
        {
          id: 'nice',
          name: 'Nice',
          events: [
            {
              id: 'nice-jazz-festival',
              name: 'Nice Jazz Festival',
              image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              date: '2024-07-15',
              time: '19:30',
              duration: '4 hours',
              location: 'Place Masséna, Nice',
              price: 159,
              originalPrice: 199,
              rating: 4.7,
              attendees: 5000,
              category: 'music',
              description: 'World-class jazz performances on the French Riviera.',
              highlights: ['International artists', 'Outdoor venue', 'Food & drinks', 'VIP seating']
            }
          ]
        }
      ]
    },
    {
      id: 'japan',
      name: 'Japan',
      cities: [
        {
          id: 'tokyo',
          name: 'Tokyo',
          events: [
            {
              id: 'cherry-blossom-festival',
              name: 'Cherry Blossom Festival',
              image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
              date: '2024-04-05',
              time: '10:00',
              duration: '6 hours',
              location: 'Ueno Park, Tokyo',
              price: 79,
              originalPrice: 99,
              rating: 4.9,
              attendees: 10000,
              category: 'nature',
              description: 'Celebrate Japan\'s most beautiful season with traditional hanami.',
              highlights: ['Traditional tea ceremony', 'Picnic under sakura', 'Cultural performances', 'Photography workshop']
            },
            {
              id: 'tokyo-anime-expo',
              name: 'Tokyo Anime Expo',
              image: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
              date: '2024-08-10',
              time: '09:00',
              duration: '8 hours',
              location: 'Tokyo Big Sight',
              price: 199,
              originalPrice: 249,
              rating: 4.8,
              attendees: 15000,
              category: 'entertainment',
              description: 'Asia\'s largest anime and manga convention.',
              highlights: ['Celebrity voice actors', 'Exclusive merchandise', 'Cosplay contest', 'Preview screenings']
            }
          ]
        },
        {
          id: 'kyoto',
          name: 'Kyoto',
          events: [
            {
              id: 'gion-matsuri',
              name: 'Gion Matsuri Festival',
              image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
              date: '2024-07-17',
              time: '14:00',
              duration: '5 hours',
              location: 'Gion District, Kyoto',
              price: 129,
              originalPrice: 169,
              rating: 4.9,
              attendees: 8000,
              category: 'culture',
              description: 'One of Japan\'s most famous traditional festivals.',
              highlights: ['Traditional floats', 'Geisha performances', 'Street food', 'Cultural workshops']
            }
          ]
        }
      ]
    },
    {
      id: 'usa',
      name: 'USA',
      cities: [
        {
          id: 'new-york',
          name: 'New York',
          events: [
            {
              id: 'broadway-exclusive',
              name: 'Broadway Exclusive Show',
              image: 'https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
              date: '2024-05-15',
              time: '20:00',
              duration: '2.5 hours',
              location: 'Times Square Theater',
              price: 349,
              originalPrice: 449,
              rating: 4.8,
              attendees: 1200,
              category: 'entertainment',
              description: 'Exclusive Broadway show with backstage access.',
              highlights: ['Premium seating', 'Backstage tour', 'Meet the cast', 'VIP reception']
            },
            {
              id: 'central-park-concert',
              name: 'Central Park Summer Concert',
              image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
              date: '2024-06-20',
              time: '19:00',
              duration: '3 hours',
              location: 'Central Park, New York',
              price: 89,
              originalPrice: 119,
              rating: 4.7,
              attendees: 5000,
              category: 'music',
              description: 'Open-air concert in the heart of Manhattan.',
              highlights: ['World-class musicians', 'Outdoor setting', 'Food vendors', 'Picnic area']
            }
          ]
        }
      ]
    },
    {
      id: 'india',
      name: 'India',
      cities: [
        {
          id: 'mumbai',
          name: 'Mumbai',
          events: [
            {
              id: 'bollywood-awards',
              name: 'Bollywood Film Awards',
              image: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
              date: '2024-02-28',
              time: '18:00',
              duration: '4 hours',
              location: 'NSCI Dome, Mumbai',
              price: 499,
              originalPrice: 699,
              rating: 4.9,
              attendees: 8000,
              category: 'entertainment',
              description: 'Glamorous night celebrating Indian cinema.',
              highlights: ['Celebrity appearances', 'Live performances', 'Red carpet access', 'After-party invitation']
            }
          ]
        },
        {
          id: 'vizag',
          name: 'Vizag',
          events: [
            {
              id: 'vizag-beach-festival',
              name: 'Vizag Beach Festival',
              image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
              date: '2024-12-15',
              time: '17:00',
              duration: '6 hours',
              location: 'RK Beach, Vizag',
              price: 149,
              originalPrice: 199,
              rating: 4.6,
              attendees: 3000,
              category: 'music',
              description: 'Beachside music festival with local and international artists.',
              highlights: ['Beach venue', 'Multiple stages', 'Local cuisine', 'Water sports']
            }
          ]
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'music', label: 'Music' },
    { id: 'culture', label: 'Culture' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'nature', label: 'Nature' }
  ];

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setSelectedCity(country.cities[0] || null);
    setIsCountryOpen(false);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setIsCityOpen(false);
  };

  const getEventsInScope = () => {
    if (!selectedCountry) return [];
    if (!selectedCity) {
      return selectedCountry.cities.flatMap(city => 
        city.events.map(event => ({ ...event, cityName: city.name }))
      );
    }
    return selectedCity.events.map(event => ({ ...event, cityName: selectedCity.name }));
  };

  const filteredEvents = getEventsInScope().filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openEventPreview = (event: any) => {
    setSelectedEvent(event);
  };

  const closeEventPreview = () => {
    setSelectedEvent(null);
  };

  const handleBookEvent = async (event: any) => {
    try {
      setIsProcessingPayment(true);
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Failed to load Razorpay');
      const key = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
      if (!key) throw new Error('Missing VITE_RAZORPAY_KEY_ID in .env');
      
      const total = Math.max(1, Math.round(event.price));
      const options: any = {
        key,
        amount: total * 100,
        currency: 'INR',
        name: 'Travel-Friendly',
        description: `${event.name} • ${event.location} • ${new Date(event.date).toLocaleDateString()}`,
        prefill: { name: 'Guest User', email: 'guest@example.com', contact: '+919999999999' },
        theme: { color: '#3B82F6' },
        modal: { ondismiss: () => setIsProcessingPayment(false) },
        handler: () => {
          alert('Payment successful! Your event ticket has been booked.');
          setIsProcessingPayment(false);
          closeEventPreview();
        },
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      // @ts-ignore
      rzp.on('payment.failed', () => {
        alert('Payment failed or cancelled. Please try again.');
        setIsProcessingPayment(false);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Unable to start payment. Please check your configuration.');
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience unforgettable moments with exclusive events around the world
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100 p-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Country Selector */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <button
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-sm border border-blue-200 rounded-lg hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-sm"
                >
                  <span className="text-gray-900">
                    {selectedCountry ? selectedCountry.name : 'Select Country'}
                  </span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
                
                <AnimatePresence>
                  {isCountryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                      {countries.map((country) => (
                        <button
                          key={country.id}
                          onClick={() => handleCountrySelect(country)}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors"
                        >
                          {country.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* City Selector */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <button
                  onClick={() => setIsCityOpen(!isCityOpen)}
                  disabled={!selectedCountry}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-sm border border-blue-200 rounded-lg hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <span className="text-gray-900">
                    {selectedCity ? selectedCity.name : 'Select City'}
                  </span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
                
                <AnimatePresence>
                  {isCityOpen && selectedCountry && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                      <button
                        onClick={() => setSelectedCity(null)}
                        className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-colors border-b border-blue-100"
                      >
                        All Cities
                      </button>
                      {selectedCountry.cities.map((city) => (
                        <button
                          key={city.id}
                          onClick={() => handleCitySelect(city)}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors"
                        >
                          {city.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => openEventPreview(event)}
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-transparent to-green-600/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-white/95 backdrop-blur-lg rounded-full p-3 shadow-lg">
                    <Play className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span>{event.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-green-600">₹{event.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">₹{event.originalPrice}</span>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-blue-300 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </div>

      {/* Event Preview Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/80 via-blue-900/50 to-green-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeEventPreview}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-blue-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeEventPreview}
                  className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-lg rounded-full p-2 hover:bg-white transition-colors shadow-lg"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <video
                  src={selectedEvent.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
                  poster={selectedEvent.image}
                />
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedEvent.name}</h2>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{selectedEvent.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">₹{selectedEvent.price}</div>
                    <div className="text-sm text-gray-500 line-through">₹{selectedEvent.originalPrice}</div>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">{selectedEvent.rating} ({selectedEvent.attendees} attending)</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{selectedEvent.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedEvent.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleBookEvent(selectedEvent)}
                    disabled={isProcessingPayment}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                      isProcessingPayment 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isProcessingPayment ? 'Processing...' : 'Book Now'}
                  </button>
                  <button className="px-6 py-3 border border-blue-200 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-colors shadow-sm">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
