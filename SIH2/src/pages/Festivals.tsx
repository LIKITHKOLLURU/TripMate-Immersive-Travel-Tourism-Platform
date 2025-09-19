import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Users,
  Globe,
  Play,
  Clock,
  MapPin,
  Ticket,
  Heart,
  Share2,
  Camera
} from 'lucide-react';

const Festivals = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedEvents, setLikedEvents] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'music', label: 'Music' },
    { id: 'food', label: 'Food & Drink' },
    { id: 'religious', label: 'Religious' },
    { id: 'art', label: 'Art & Performance' }
  ];

  const events = [
    {
      id: 'diwali-india',
      title: 'Diwali Festival of Lights',
      location: 'Varanasi, India',
      date: 'November 12, 2024',
      time: '6:00 PM IST',
      category: 'religious',
      image: 'https://images.pexels.com/photos/1543755/pexels-photo-1543755.jpeg',
      participants: 15420,
      type: 'VR Live',
      price: 'Free',
      description: 'Experience the magical festival of lights in the holy city of Varanasi',
      duration: '3 hours',
      highlights: ['Ganga Aarti', 'Fireworks Display', 'Traditional Music']
    },
    {
      id: 'carnival-rio',
      title: 'Rio Carnival Parade',
      location: 'Rio de Janeiro, Brazil',
      date: 'February 10, 2025',
      time: '8:00 PM BRT',
      category: 'cultural',
      image: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg',
      participants: 32850,
      type: 'VR + 360°',
      price: '$19.99',
      description: 'Join the world\'s biggest carnival celebration with samba and spectacular floats',
      duration: '4 hours',
      highlights: ['Samba Parade', 'Live Music', 'Costume Showcase']
    },
    {
      id: 'cherry-blossom',
      title: 'Cherry Blossom Festival',
      location: 'Tokyo, Japan',
      date: 'March 25, 2025',
      time: '2:00 PM JST',
      category: 'cultural',
      image: 'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg',
      participants: 8750,
      type: 'VR Experience',
      price: '$9.99',
      description: 'Witness the beauty of sakura season in Tokyo\'s most famous parks',
      duration: '2 hours',
      highlights: ['Hanami Picnic', 'Traditional Tea Ceremony', 'Sakura Gardens']
    },
    {
      id: 'oktoberfest',
      title: 'Oktoberfest Munich',
      location: 'Munich, Germany',
      date: 'September 16, 2024',
      time: '3:00 PM CEST',
      category: 'food',
      image: 'https://images.pexels.com/photos/5530259/pexels-photo-5530259.jpeg',
      participants: 21340,
      type: 'VR + Live Chat',
      price: '$14.99',
      description: 'Experience authentic Bavarian culture with beer, food, and traditional music',
      duration: '3 hours',
      highlights: ['Beer Hall Experience', 'Traditional Music', 'Local Cuisine']
    },
    {
      id: 'dia-muertos',
      title: 'Day of the Dead Celebration',
      location: 'Oaxaca, Mexico',
      date: 'November 1, 2024',
      time: '7:00 PM CST',
      category: 'cultural',
      image: 'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg',
      participants: 12580,
      type: 'VR Documentary',
      price: 'Free',
      description: 'Discover the beautiful traditions of Día de los Muertos in authentic Mexican setting',
      duration: '2.5 hours',
      highlights: ['Altar Displays', 'Traditional Offerings', 'Cultural Stories']
    },
    {
      id: 'coachella',
      title: 'Coachella Music Festival',
      location: 'California, USA',
      date: 'April 14, 2025',
      time: '5:00 PM PST',
      category: 'music',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      participants: 45200,
      type: 'VR Concert',
      price: '$24.99',
      description: 'Join the world\'s most famous music festival from anywhere in the world',
      duration: '6 hours',
      highlights: ['Live Performances', 'Art Installations', 'Desert Vibes']
    }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const toggleLike = (eventId: string) => {
    setLikedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Immersive
            <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Festivals
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience cultural celebrations from around the world in stunning VR. 
            Join festivals virtually and connect with global communities.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-orange-100 hover:text-orange-600 shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Event Image */}
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay Buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full"
                  >
                    <Play className="h-8 w-8" />
                  </motion.button>
                </div>

                {/* Event Type Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {event.type}
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                  {event.price}
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    onClick={() => toggleLike(event.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      likedEvents.includes(event.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className="h-4 w-4" fill={likedEvents.includes(event.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{event.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Meta */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time} • {event.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.participants.toLocaleString()} participants</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="text-xs font-medium text-gray-900 mb-2">Highlights:</div>
                  <div className="flex flex-wrap gap-1">
                    {event.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Join Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Globe className="h-4 w-4" />
                  <span>{event.price === 'Free' ? 'Join Free' : `Join for ${event.price}`}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience Festivals Like Never Before
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Our VR technology brings you closer to authentic cultural experiences. 
            Feel the energy, hear the music, and connect with people worldwide.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Camera className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">4K VR Quality</div>
              <div className="text-sm text-orange-100">Ultra-high definition immersion</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Live Interaction</div>
              <div className="text-sm text-orange-100">Chat with global participants</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Ticket className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Virtual Tickets</div>
              <div className="text-sm text-orange-100">Collectible NFT souvenirs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Globe className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Global Access</div>
              <div className="text-sm text-orange-100">Join from anywhere worldwide</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Festivals;