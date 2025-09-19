import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  Hotel, 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Utensils, 
  Waves,
  Eye,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react';
// Payment happens on HotelDetail page after user reviews details

const Hotels = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  interface HotelItem {
    id: string;
    name: string;
    image: string;
    rating: number;
    price: number;
    originalPrice: number;
    reviews: number;
    amenities: string[];
    category: 'luxury' | 'business' | 'boutique' | 'resort';
    has3D: boolean;
  }

  interface City {
    id: string;
    name: string;
    image: string;
    hotels: HotelItem[];
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
          image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
          hotels: [
            {
              id: 'grand-palace-paris',
              name: 'Grand Palace Hotel',
              image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
              rating: 4.9,
              price: 299,
              originalPrice: 399,
              reviews: 1247,
              amenities: ['wifi', 'parking', 'restaurant', 'pool'],
              category: 'luxury',
              has3D: true,
            },
            {
              id: 'seine-view-suites',
              name: 'Seine View Suites',
              image: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
              rating: 4.7,
              price: 219,
              originalPrice: 289,
              reviews: 864,
              amenities: ['wifi', 'restaurant'],
              category: 'boutique',
              has3D: false,
            },
          ],
        },
        {
          id: 'nice',
          name: 'Nice',
          image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
          hotels: [
            {
              id: 'promenade-resort',
              name: 'Promenade Resort & Spa',
              image: 'https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg',
              rating: 4.6,
              price: 189,
              originalPrice: 249,
              reviews: 711,
              amenities: ['wifi', 'restaurant', 'pool'],
              category: 'resort',
              has3D: true,
            },
          ],
        },
      ],
    },
    {
      id: 'japan',
      name: 'Japan',
      cities: [
        {
          id: 'tokyo',
          name: 'Tokyo',
          image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg',
          hotels: [
            {
              id: 'tokyo-sky-tower',
              name: 'Tokyo Sky Tower',
              image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
              rating: 4.8,
              price: 189,
              originalPrice: 249,
              reviews: 892,
              amenities: ['wifi', 'restaurant', 'pool'],
              category: 'business',
              has3D: true,
            },
            {
              id: 'shinjuku-business',
              name: 'Shinjuku Business Inn',
              image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
              rating: 4.4,
              price: 129,
              originalPrice: 179,
              reviews: 512,
              amenities: ['wifi', 'restaurant'],
              category: 'business',
              has3D: false,
            },
          ],
        },
        {
          id: 'kyoto',
          name: 'Kyoto',
          image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
          hotels: [
            {
              id: 'kyoto-garden-ryokan',
              name: 'Kyoto Garden Ryokan',
              image: 'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg',
              rating: 4.7,
              price: 209,
              originalPrice: 279,
              reviews: 623,
              amenities: ['wifi', 'restaurant'],
              category: 'boutique',
              has3D: false,
            },
          ],
        },
      ],
    },
    {
      id: 'usa',
      name: 'USA',
      cities: [
        {
          id: 'new-york',
          name: 'New York',
          image: 'https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg',
          hotels: [
            {
              id: 'central-park-view',
              name: 'Central Park View',
              image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
              rating: 4.7,
              price: 349,
              originalPrice: 449,
              reviews: 1589,
              amenities: ['wifi', 'parking', 'restaurant'],
              category: 'luxury',
              has3D: true,
            },
            {
              id: 'manhattan-boutique',
              name: 'Manhattan Boutique',
              image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
              rating: 4.5,
              price: 199,
              originalPrice: 249,
              reviews: 942,
              amenities: ['wifi', 'restaurant'],
              category: 'boutique',
              has3D: false,
            },
          ],
        },
        {
          id: 'san-francisco',
          name: 'San Francisco',
          image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
          hotels: [
            {
              id: 'golden-gate-resort',
              name: 'Golden Gate Resort',
              image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
              rating: 4.6,
              price: 229,
              originalPrice: 299,
              reviews: 688,
              amenities: ['wifi', 'parking', 'pool'],
              category: 'resort',
              has3D: true,
            },
          ],
        },
      ],
    },
    {
      id: 'uk',
      name: 'UK',
      cities: [
        {
          id: 'london',
          name: 'London',
          image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
          hotels: [
            {
              id: 'london-boutique',
              name: 'London Boutique Inn',
              image: 'https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg',
              rating: 4.6,
              price: 159,
              originalPrice: 199,
              reviews: 734,
              amenities: ['wifi', 'restaurant'],
              category: 'boutique',
              has3D: false,
            },
          ],
        },
        {
          id: 'edinburgh',
          name: 'Edinburgh',
          image: 'https://images.pexels.com/photos/284457/pexels-photo-284457.jpeg',
          hotels: [
            {
              id: 'royal-mile-suites',
              name: 'Royal Mile Suites',
              image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
              rating: 4.5,
              price: 179,
              originalPrice: 229,
              reviews: 521,
              amenities: ['wifi', 'restaurant'],
              category: 'business',
              has3D: false,
            },
          ],
        },
      ],
    },
    {
      id: 'uae',
      name: 'UAE',
      cities: [
        {
          id: 'dubai',
          name: 'Dubai',
          image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
          hotels: [
            {
              id: 'dubai-luxury-resort',
              name: 'Dubai Luxury Resort',
              image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
              rating: 5.0,
              price: 599,
              originalPrice: 799,
              reviews: 2156,
              amenities: ['wifi', 'parking', 'restaurant', 'pool'],
              category: 'luxury',
              has3D: true,
            },
          ],
        },
        {
          id: 'abu-dhabi',
          name: 'Abu Dhabi',
          image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
          hotels: [
            {
              id: 'corniche-grand',
              name: 'Corniche Grand Hotel',
              image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
              rating: 4.7,
              price: 279,
              originalPrice: 349,
              reviews: 842,
              amenities: ['wifi', 'restaurant', 'pool'],
              category: 'resort',
              has3D: false,
            },
          ],
        },
      ],
    },
    {
      id: 'india',
      name: 'India',
      cities: [
        {
          id: 'mumbai',
          name: 'Mumbai',
          image: 'https://images.pexels.com/photos/1796726/pexels-photo-1796726.jpeg',
          hotels: [
            {
              id: 'marine-drive-inn',
              name: 'Marine Drive Inn',
              image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
              rating: 4.6,
              price: 189,
              originalPrice: 239,
              reviews: 653,
              amenities: ['wifi', 'restaurant'],
              category: 'business',
              has3D: true,
            },
          ],
        },
        {
          id: 'vizag',
          name: 'Vizag',
          image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
          hotels: [
            {
              id: 'rk-beach-resort',
              name: 'RK Beach Resort',
              image: 'https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg',
              rating: 4.5,
              price: 149,
              originalPrice: 199,
              reviews: 489,
              amenities: ['wifi', 'parking', 'restaurant'],
              category: 'resort',
              has3D: false,
            },
          ],
        },
      ],
    },
  ];

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    if (countries.length > 0) {
      setSelectedCountry(countries[0]);
      setSelectedCity(countries[0].cities[0] ?? null);
    }
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#country-dropdown') && !target.closest('#country-button')) {
        setIsCountryOpen(false);
      }
      if (!target.closest('#city-dropdown') && !target.closest('#city-button')) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    restaurant: Utensils,
    pool: Waves
  };

  const filters = [
    { id: 'all', label: 'All Hotels' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'business', label: 'Business' },
    { id: 'boutique', label: 'Boutique' },
    { id: 'resort', label: 'Resort' }
  ];

  type HotelWithCity = HotelItem & { cityName: string };
  const hotelsInScope: HotelWithCity[] = selectedCountry
    ? selectedCity
      ? selectedCity.hotels.map((h) => ({ ...h, cityName: selectedCity.name }))
      : selectedCountry.cities.flatMap((city) => city.hotels.map((h) => ({ ...h, cityName: city.name })))
    : [];

  const filteredHotels = hotelsInScope.filter((hotel) => {
    const matchesFilter = selectedFilter === 'all' || hotel.category === selectedFilter;
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.cityName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCountrySelect = (c: Country) => {
    setSelectedCountry(c);
    setSelectedCity(c.cities[0] ?? null);
    setIsCountryOpen(false);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setIsCityOpen(false);
  };

  // Booking and payment occur on the HotelDetail page

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Hotels
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Preview hotel rooms in stunning 3D before booking. Experience virtual tours 
            and make informed decisions with our digital twin technology.
          </p>
        </motion.div>

        {/* Country & City Selector */}
        <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <button
              id="country-button"
              onClick={() => setIsCountryOpen((v) => !v)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow focus:outline-none"
            >
              <div className="text-left">
                <div className="text-xs text-gray-500">Country</div>
                <div className="text-gray-900 font-semibold">{selectedCountry?.name ?? 'Select Country'}</div>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
            <AnimatePresence>
              {isCountryOpen && (
                <motion.div
                  id="country-dropdown"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                >
                  {countries.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCountrySelect(c)}
                      className={`w-full text-left px-4 py-3 hover:bg-blue-50 ${selectedCountry?.id === c.id ? 'bg-blue-50' : ''}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* City Selector */}
          <div className="relative w-full md:w-1/3">
            <button
              id="city-button"
              onClick={() => setIsCityOpen((v) => !v)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow focus:outline-none disabled:opacity-50"
              disabled={!selectedCountry}
            >
              <div className="text-left">
                <div className="text-xs text-gray-500">City</div>
                <div className="text-gray-900 font-semibold">{selectedCity?.name ?? 'Select City'}</div>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
            <AnimatePresence>
              {isCityOpen && selectedCountry && (
                <motion.div
                  id="city-dropdown"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                >
                  {selectedCountry.cities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full text-left px-4 py-3 hover:bg-blue-50 ${selectedCity?.id === city.id ? 'bg-blue-50' : ''}`}
                    >
                      {city.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search hotels or cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 h-5 w-5" />
              <div className="flex space-x-2">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hotels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <Link to={`/hotel/${hotel.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* 3D Badge */}
                  {hotel.has3D && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>3D View</span>
                    </div>
                  )}

                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {Math.round((1 - hotel.price / hotel.originalPrice) * 100)}% OFF
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{(hotel as HotelWithCity).cityName}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{hotel.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500">{hotel.reviews} reviews</div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center space-x-3 mb-4">
                    {hotel.amenities.map(amenity => {
                      const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                      return (
                        <div key={amenity} className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="h-4 w-4 text-gray-600" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Pricing */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-green-600">₹{hotel.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">₹{hotel.originalPrice}</span>
                      <div className="text-xs text-gray-500">per night</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700`}
                    >
                      {hotel.has3D ? 'Preview & Book' : 'View & Book'}
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredHotels.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Hotel className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            3D Digital Twin Technology
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Experience hotel rooms exactly as they are with our photorealistic 3D technology. 
            Walk through spaces, check views, and make confident booking decisions.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Eye className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Virtual Walkthrough</div>
              <div className="text-sm text-blue-100">Explore every corner</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Hotel className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Real-time Availability</div>
              <div className="text-sm text-blue-100">Live booking updates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Star className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Verified Reviews</div>
              <div className="text-sm text-blue-100">AI-curated feedback</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hotels;