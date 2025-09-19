import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Star, ArrowRight, ChevronDown, Check, X, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Place {
  id: string;
  name: string;
  image: string;
  rating: number;
  visitors: string;
  description: string;
  cityName: string;
  countryName: string;
  estimatedCost: number;
  duration: string;
}

interface City {
  id: string;
  name: string;
  image: string;
  places: Omit<Place, 'cityName' | 'countryName'>[];
}

interface Country {
  id: string;
  name: string;
  cities: City[];
}

const PlanTrip = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const countries: Country[] = [
    {
      id: 'france',
      name: 'France',
      cities: [
        {
          id: 'paris',
          name: 'Paris',
          image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
          places: [
            {
              id: 'eiffel-tower',
              name: 'Eiffel Tower',
              image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
              rating: 4.8,
              visitors: '2.1M',
              description: 'Iconic iron tower offering city views',
              estimatedCost: 25,
              duration: '2-3 hours'
            },
            {
              id: 'louvre',
              name: 'Louvre Museum',
              image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg',
              rating: 4.7,
              visitors: '1.8M',
              description: 'World\'s largest art museum',
              estimatedCost: 17,
              duration: '3-4 hours'
            }
          ]
        },
        {
          id: 'nice',
          name: 'Nice',
          image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
          places: [
            {
              id: 'promenade-des-anglais',
              name: 'Promenade des Anglais',
              image: 'https://images.pexels.com/photos/248771/pexels-photo-248771.jpeg',
              rating: 4.6,
              visitors: '800k',
              description: 'Seafront boulevard along the Mediterranean',
              estimatedCost: 0,
              duration: '1-2 hours'
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
          image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg',
          places: [
            {
              id: 'shibuya',
              name: 'Shibuya Crossing',
              image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg',
              rating: 4.9,
              visitors: '1.5M',
              description: 'World\'s busiest pedestrian crossing',
              estimatedCost: 0,
              duration: '1 hour'
            },
            {
              id: 'sensoji',
              name: 'Senso-ji Temple',
              image: 'https://images.pexels.com/photos/2609314/pexels-photo-2609314.jpeg',
              rating: 4.8,
              visitors: '1.2M',
              description: 'Ancient Buddhist temple in Asakusa',
              estimatedCost: 0,
              duration: '2 hours'
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
          id: 'delhi',
          name: 'Delhi',
          image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg',
          places: [
            {
              id: 'india-gate',
              name: 'India Gate',
              image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg',
              rating: 4.6,
              visitors: '3.2M',
              description: 'War memorial and popular promenade in New Delhi',
              estimatedCost: 0,
              duration: '1-2 hours'
            },
            {
              id: 'qutub-minar',
              name: 'Qutub Minar',
              image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg',
              rating: 4.7,
              visitors: '2.0M',
              description: 'UNESCO World Heritage Site and towering minaret',
              estimatedCost: 5,
              duration: '2 hours'
            }
          ]
        },
        {
          id: 'mumbai',
          name: 'Mumbai',
          image: 'https://images.pexels.com/photos/1796726/pexels-photo-1796726.jpeg',
          places: [
            {
              id: 'gateway-of-india',
              name: 'Gateway of India',
              image: 'https://images.pexels.com/photos/1796726/pexels-photo-1796726.jpeg',
              rating: 4.7,
              visitors: '3.1M',
              description: 'Triumphal arch monument overlooking the Arabian Sea',
              estimatedCost: 0,
              duration: '1 hour'
            }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    if (countries.length > 0) {
      setSelectedCountry(countries[0]);
      setSelectedCity(countries[0].cities[0]);
    }
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setSelectedCity(country.cities[0] || null);
    setIsCountryOpen(false);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setIsCityOpen(false);
  };

  const togglePlaceSelection = (place: Omit<Place, 'cityName' | 'countryName'>) => {
    const fullPlace: Place = {
      ...place,
      cityName: selectedCity?.name || '',
      countryName: selectedCountry?.name || ''
    };

    setSelectedPlaces(prev => {
      const isSelected = prev.some(p => p.id === place.id);
      if (isSelected) {
        return prev.filter(p => p.id !== place.id);
      } else {
        return [...prev, fullPlace];
      }
    });
  };

  const isPlaceSelected = (placeId: string) => {
    return selectedPlaces.some(p => p.id === placeId);
  };

  const removeSelectedPlace = (placeId: string) => {
    setSelectedPlaces(prev => prev.filter(p => p.id !== placeId));
  };

  const getTotalCost = () => {
    return selectedPlaces.reduce((total, place) => total + place.estimatedCost, 0);
  };

  const handleProceed = () => {
    if (selectedPlaces.length > 0) {
      // Store selected places in localStorage to pass to summary page
      localStorage.setItem('selectedPlaces', JSON.stringify(selectedPlaces));
      navigate('/trip-summary');
    }
  };

  const availablePlaces = selectedCity?.places || [];
  const filteredPlaces = availablePlaces.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plan Your
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Dream Trip
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select multiple destinations and create your perfect itinerary
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Selection Controls */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Select Destinations</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Country Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Country</div>
                      <div className="text-gray-900 font-medium">{selectedCountry?.name || 'Select Country'}</div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </button>
                  <AnimatePresence>
                    {isCountryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
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
                  <button
                    onClick={() => setIsCityOpen(!isCityOpen)}
                    className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-left">
                      <div className="text-xs text-gray-500">City</div>
                      <div className="text-gray-900 font-medium">{selectedCity?.name || 'Select City'}</div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </button>
                  <AnimatePresence>
                    {isCityOpen && selectedCountry && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                      >
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
              </div>

              {/* Search */}
              <input
                type="text"
                placeholder="Search places..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Places Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPlaces.map((place, index) => {
                const selected = isPlaceSelected(place.id);
                return (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      selected ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-xl'
                    }`}
                    onClick={() => togglePlaceSelection(place)}
                  >
                    {/* Selection Indicator */}
                    <div className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      selected ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-400'
                    }`}>
                      {selected ? <Check className="h-5 w-5" /> : <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />}
                    </div>

                    {/* Place Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Place Info */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{place.name}</h3>
                        <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{place.rating}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{place.description}</p>

                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{place.visitors}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{place.duration}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-green-600">
                            ${place.estimatedCost === 0 ? 'Free' : place.estimatedCost}
                          </span>
                          <span className="text-sm text-gray-500">per person</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Panel - Selected Places */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-4">Selected Places ({selectedPlaces.length})</h3>
              
              {selectedPlaces.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No places selected yet</p>
                  <p className="text-sm">Click on places to add them to your trip</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                    {selectedPlaces.map((place) => (
                      <div key={place.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{place.name}</h4>
                          <p className="text-sm text-gray-500">{place.cityName}, {place.countryName}</p>
                          <p className="text-sm font-medium text-green-600">
                            ${place.estimatedCost === 0 ? 'Free' : place.estimatedCost}
                          </p>
                        </div>
                        <button
                          onClick={() => removeSelectedPlace(place.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Places:</span>
                      <span className="font-medium">{selectedPlaces.length}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="font-bold text-green-600">${getTotalCost()}</span>
                    </div>
                  </div>

                  {/* Proceed Button */}
                  <motion.button
                    onClick={handleProceed}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Summary</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;
