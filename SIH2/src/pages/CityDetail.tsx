import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Eye, 
  Clock, 
  Users, 
  Ticket, 
  Heart,
  Share2,
  Globe,
  Camera,
  ArrowLeft
} from 'lucide-react';

const CityDetail = () => {
  const { cityId } = useParams();
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [likedPlaces, setLikedPlaces] = useState<string[]>([]);

  // Mock city data - in a real app, this would come from an API
  const cityData = {
    'paris': {
      name: 'Paris',
      country: 'France',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
      description: 'The City of Light beckons with its iconic landmarks, world-class museums, and romantic atmosphere.',
      weather: '22°C',
      timezone: 'CET (GMT+1)',
      currency: 'EUR',
      language: 'French',
      bestTime: 'April - October'
    }
  };

  const places = [
    {
      id: 'eiffel-tower',
      name: 'Eiffel Tower',
      description: 'Iconic iron lattice tower and symbol of Paris',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
      category: 'Landmark',
      rating: 4.8,
      visitors: '7M annually',
      duration: '2-3 hours',
      price: '€25',
      has3D: true,
      highlights: ['360° City Views', 'Evening Light Show', 'Historical Exhibits']
    },
    {
      id: 'louvre-museum',
      name: 'Louvre Museum',
      description: 'World\'s largest art museum and historic monument',
      image: 'https://images.pexels.com/photos/2894211/pexels-photo-2894211.jpeg',
      category: 'Museum',
      rating: 4.7,
      visitors: '10M annually',
      duration: '4-6 hours',
      price: '€17',
      has3D: true,
      highlights: ['Mona Lisa', 'Venus de Milo', 'Egyptian Antiquities']
    },
    {
      id: 'notre-dame',
      name: 'Notre-Dame Cathedral',
      description: 'Gothic architectural masterpiece',
      image: 'https://images.pexels.com/photos/1870618/pexels-photo-1870618.jpeg',
      category: 'Religious',
      rating: 4.6,
      visitors: '14M annually',
      duration: '1-2 hours',
      price: 'Free',
      has3D: false,
      highlights: ['Gothic Architecture', 'Rose Windows', 'Bell Towers']
    },
    {
      id: 'champs-elysees',
      name: 'Champs-Élysées',
      description: 'Famous avenue for shopping and entertainment',
      image: 'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg',
      category: 'Shopping',
      rating: 4.5,
      visitors: '300K daily',
      duration: '2-4 hours',
      price: 'Free to walk',
      has3D: true,
      highlights: ['Luxury Shopping', 'Arc de Triomphe', 'Cafés & Restaurants']
    },
    {
      id: 'montmartre',
      name: 'Montmartre District',
      description: 'Historic hilltop district with artistic heritage',
      image: 'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg',
      category: 'Neighborhood',
      rating: 4.7,
      visitors: '15M annually',
      duration: '3-5 hours',
      price: 'Free to explore',
      has3D: true,
      highlights: ['Sacré-Cœur Basilica', 'Artist Squares', 'Moulin Rouge']
    },
    {
      id: 'seine-cruise',
      name: 'Seine River Cruise',
      description: 'Scenic boat tour along the Seine River',
      image: 'https://images.pexels.com/photos/1308624/pexels-photo-1308624.jpeg',
      category: 'Activity',
      rating: 4.4,
      visitors: '5M annually',
      duration: '1 hour',
      price: '€15',
      has3D: false,
      highlights: ['River Views', 'Historic Bridges', 'City Panorama']
    }
  ];

  const currentCity = cityData[cityId as keyof typeof cityData];
  
  if (!currentCity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">City not found</h1>
          <Link to="/metaverse" className="text-blue-600 hover:underline">
            Return to Metaverse Hub
          </Link>
        </div>
      </div>
    );
  }

  const toggleLike = (placeId: string) => {
    setLikedPlaces(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={currentCity.image}
          alt={currentCity.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Back Button */}
        <Link
          to="/metaverse"
          className="absolute top-8 left-8 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        {/* City Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {currentCity.name}
            </h1>
            <p className="text-xl text-blue-100 mb-6 max-w-3xl">
              {currentCity.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <div className="text-blue-200">Weather</div>
                <div className="font-semibold">{currentCity.weather}</div>
              </div>
              <div>
                <div className="text-blue-200">Timezone</div>
                <div className="font-semibold">{currentCity.timezone}</div>
              </div>
              <div>
                <div className="text-blue-200">Currency</div>
                <div className="font-semibold">{currentCity.currency}</div>
              </div>
              <div>
                <div className="text-blue-200">Language</div>
                <div className="font-semibold">{currentCity.language}</div>
              </div>
              <div>
                <div className="text-blue-200">Best Time</div>
                <div className="font-semibold">{currentCity.bestTime}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Places Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Famous Places to Explore
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Place Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* 3D Badge */}
                  {place.has3D && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>3D View</span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                    {place.category}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button
                      onClick={() => toggleLike(place.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        likedPlaces.includes(place.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className="h-4 w-4" fill={likedPlaces.includes(place.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-blue-600/80 flex items-center justify-center"
                  >
                    <div className="text-center text-white">
                      <Globe className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-semibold">
                        {place.has3D ? 'View in 3D' : 'View Details'}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Place Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{place.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{place.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {place.description}
                  </p>

                  {/* Place Meta */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{place.visitors}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{place.duration}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-1">
                        <Ticket className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-600">{place.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-900 mb-2">Highlights:</div>
                    <div className="flex flex-wrap gap-1">
                      {place.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      {place.has3D ? (
                        <>
                          <Eye className="h-4 w-4" />
                          <span>3D Preview</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4" />
                          <span>View Details</span>
                        </>
                      )}
                    </motion.button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      Add to Trip
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hotels Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay in {currentCity.name}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover premium accommodations with 3D virtual tours. 
            Preview your room before booking and enjoy verified reviews.
          </p>
          
          <Link
            to="/hotels"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            <span>Browse Hotels</span>
            <ArrowLeft className="h-5 w-5 transform rotate-180" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CityDetail;