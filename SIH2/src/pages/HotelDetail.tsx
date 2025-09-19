import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { 
  ArrowLeft,
  Star,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Waves,
  Eye,
  Users,
  Calendar,
  CreditCard,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import { loadRazorpay } from '../utils/razorpay';

const HotelDetail = () => {
  const { hotelId } = useParams();
  const [checkIn, setCheckIn] = useState('2024-03-15');
  const [checkOut, setCheckOut] = useState('2024-03-18');
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Hotel data for all hotels from Hotels page
  const hotelData = {
    'grand-palace-paris': {
      name: 'Grand Palace Hotel',
      city: 'Paris',
      address: '123 Champs-Élysées, 75008 Paris, France',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      rating: 4.9,
      reviews: 1247,
      price: 299,
      originalPrice: 399,
      description: 'Experience Parisian elegance at its finest with luxurious accommodations in the heart of the City of Light.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Car, label: 'Valet Parking' },
        { icon: Utensils, label: 'Fine Dining' },
        { icon: Waves, label: 'Spa & Pool' }
      ],
      features: [
        '24-hour concierge service',
        'Rooftop terrace with city views',
        'Michelin-starred restaurant',
        'Fitness center and spa',
        'Business center',
        'Pet-friendly policies'
      ],
      contact: {
        phone: '+33 1 42 61 50 50',
        email: 'reservations@grandpalaceparis.com',
        website: 'www.grandpalaceparis.com'
      }
    },
    'seine-view-suites': {
      name: 'Seine View Suites',
      city: 'Paris',
      address: '456 Rue de Rivoli, 75001 Paris, France',
      image: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
      rating: 4.7,
      reviews: 864,
      price: 219,
      originalPrice: 289,
      description: 'Boutique hotel with stunning Seine river views and contemporary French design.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Utensils, label: 'Restaurant' }
      ],
      features: [
        'Seine river views',
        'Contemporary design',
        'Boutique experience',
        'Central location',
        'Concierge service'
      ],
      contact: {
        phone: '+33 1 42 60 34 12',
        email: 'info@seineviewsuites.com',
        website: 'www.seineviewsuites.com'
      }
    },
    'promenade-resort': {
      name: 'Promenade Resort & Spa',
      city: 'Nice',
      address: '789 Promenade des Anglais, 06000 Nice, France',
      image: 'https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg',
      rating: 4.6,
      reviews: 711,
      price: 189,
      originalPrice: 249,
      description: 'Luxury resort on the French Riviera with spa facilities and Mediterranean views.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Utensils, label: 'Restaurant' },
        { icon: Waves, label: 'Spa & Pool' }
      ],
      features: [
        'Mediterranean sea views',
        'Full-service spa',
        'Private beach access',
        'Fitness center',
        'Multiple restaurants'
      ],
      contact: {
        phone: '+33 4 93 16 64 00',
        email: 'reservations@promenaderesort.com',
        website: 'www.promenaderesort.com'
      }
    },
    'tokyo-sky-tower': {
      name: 'Tokyo Sky Tower',
      city: 'Tokyo',
      address: '1-1-1 Shibuya, Tokyo 150-0002, Japan',
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      rating: 4.8,
      reviews: 892,
      price: 189,
      originalPrice: 249,
      description: 'Modern business hotel in the heart of Tokyo with panoramic city views.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Utensils, label: 'Restaurant' },
        { icon: Waves, label: 'Pool' }
      ],
      features: [
        'Panoramic city views',
        'Business center',
        'Rooftop pool',
        'Multiple dining options',
        '24/7 fitness center'
      ],
      contact: {
        phone: '+81 3-5555-1234',
        email: 'info@tokyoskytower.com',
        website: 'www.tokyoskytower.com'
      }
    },
    'shinjuku-business': {
      name: 'Shinjuku Business Inn',
      city: 'Tokyo',
      address: '2-2-2 Shinjuku, Tokyo 160-0022, Japan',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      rating: 4.4,
      reviews: 512,
      price: 129,
      originalPrice: 179,
      description: 'Efficient business hotel perfect for corporate travelers in Shinjuku district.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Utensils, label: 'Restaurant' }
      ],
      features: [
        'Business center',
        'Meeting rooms',
        'Express check-in/out',
        'Convenient location',
        'Corporate rates'
      ],
      contact: {
        phone: '+81 3-5555-5678',
        email: 'reservations@shinjukubusiness.com',
        website: 'www.shinjukubusiness.com'
      }
    },
    'kyoto-garden-ryokan': {
      name: 'Kyoto Garden Ryokan',
      city: 'Kyoto',
      address: '123 Gion District, Kyoto 605-0001, Japan',
      image: 'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg',
      rating: 4.7,
      reviews: 623,
      price: 209,
      originalPrice: 279,
      description: 'Traditional Japanese ryokan with beautiful gardens in historic Gion district.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Utensils, label: 'Traditional Dining' }
      ],
      features: [
        'Traditional Japanese rooms',
        'Beautiful gardens',
        'Tea ceremony',
        'Onsen hot springs',
        'Cultural experiences'
      ],
      contact: {
        phone: '+81 75-555-9876',
        email: 'info@kyotogardenryokan.com',
        website: 'www.kyotogardenryokan.com'
      }
    },
    'central-park-view': {
      name: 'Central Park View',
      city: 'New York',
      address: '789 Fifth Avenue, New York, NY 10065, USA',
      image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
      rating: 4.7,
      reviews: 1589,
      price: 349,
      originalPrice: 449,
      description: 'Luxury hotel overlooking Central Park in the heart of Manhattan.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Car, label: 'Valet Parking' },
        { icon: Utensils, label: 'Fine Dining' }
      ],
      features: [
        'Central Park views',
        'Luxury spa',
        'Michelin-starred restaurant',
        'Concierge service',
        'Premium location'
      ],
      contact: {
        phone: '+1 212-555-0123',
        email: 'reservations@centralparkview.com',
        website: 'www.centralparkview.com'
      }
    },
    'manhattan-boutique': {
      name: 'Manhattan Boutique',
      city: 'New York',
      address: '456 Broadway, New York, NY 10013, USA',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      rating: 4.5,
      reviews: 942,
      price: 199,
      originalPrice: 249,
      description: 'Stylish boutique hotel in trendy SoHo with contemporary design.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Utensils, label: 'Restaurant' }
      ],
      features: [
        'Boutique design',
        'SoHo location',
        'Art gallery',
        'Rooftop bar',
        'Shopping nearby'
      ],
      contact: {
        phone: '+1 212-555-4567',
        email: 'info@manhattanboutique.com',
        website: 'www.manhattanboutique.com'
      }
    },
    'golden-gate-resort': {
      name: 'Golden Gate Resort',
      city: 'San Francisco',
      address: '123 Fisherman\'s Wharf, San Francisco, CA 94133, USA',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      rating: 4.6,
      reviews: 688,
      price: 229,
      originalPrice: 299,
      description: 'Waterfront resort with Golden Gate Bridge views and luxury amenities.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Car, label: 'Valet Parking' },
        { icon: Waves, label: 'Pool' }
      ],
      features: [
        'Golden Gate views',
        'Waterfront location',
        'Outdoor pool',
        'Spa services',
        'Bay Area tours'
      ],
      contact: {
        phone: '+1 415-555-7890',
        email: 'reservations@goldengateresort.com',
        website: 'www.goldengateresort.com'
      }
    },
    'london-boutique': {
      name: 'London Boutique Inn',
      city: 'London',
      address: '456 Oxford Street, London W1C 1AP, UK',
      image: 'https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg',
      rating: 4.6,
      reviews: 734,
      price: 159,
      originalPrice: 199,
      description: 'Charming boutique inn in the heart of London with classic British hospitality.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Utensils, label: 'Restaurant' }
      ],
      features: [
        'Classic British style',
        'Central London location',
        'Traditional afternoon tea',
        'Shopping nearby',
        'Historic charm'
      ],
      contact: {
        phone: '+44 20 7555 1234',
        email: 'info@londonboutique.co.uk',
        website: 'www.londonboutique.co.uk'
      }
    },
    'royal-mile-suites': {
      name: 'Royal Mile Suites',
      city: 'Edinburgh',
      address: '123 Royal Mile, Edinburgh EH1 1RE, UK',
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      rating: 4.5,
      reviews: 521,
      price: 179,
      originalPrice: 229,
      description: 'Historic suites on Edinburgh\'s famous Royal Mile with castle views.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Utensils, label: 'Restaurant' }
      ],
      features: [
        'Historic Royal Mile location',
        'Castle views',
        'Scottish heritage',
        'Walking distance to attractions',
        'Traditional Scottish cuisine'
      ],
      contact: {
        phone: '+44 131 555 5678',
        email: 'reservations@royalmilesuites.co.uk',
        website: 'www.royalmilesuites.co.uk'
      }
    },
    'dubai-luxury-resort': {
      name: 'Dubai Luxury Resort',
      city: 'Dubai',
      address: '789 Jumeirah Beach Road, Dubai, UAE',
      image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
      rating: 5.0,
      reviews: 2156,
      price: 599,
      originalPrice: 799,
      description: 'Ultra-luxury resort on Jumeirah Beach with world-class amenities and service.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Car, label: 'Valet Parking' },
        { icon: Utensils, label: 'Fine Dining' },
        { icon: Waves, label: 'Spa & Pool' }
      ],
      features: [
        'Private beach access',
        'Multiple pools',
        'World-class spa',
        'Michelin-starred dining',
        'Butler service',
        'Desert safari tours'
      ],
      contact: {
        phone: '+971 4 555 1234',
        email: 'reservations@dubailuxuryresort.com',
        website: 'www.dubailuxuryresort.com'
      }
    },
    'corniche-grand': {
      name: 'Corniche Grand Hotel',
      city: 'Abu Dhabi',
      address: '456 Corniche Road, Abu Dhabi, UAE',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      rating: 4.7,
      reviews: 842,
      price: 279,
      originalPrice: 349,
      description: 'Grand hotel on Abu Dhabi Corniche with stunning waterfront views.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Utensils, label: 'Restaurant' },
        { icon: Waves, label: 'Pool' }
      ],
      features: [
        'Corniche waterfront views',
        'Multiple restaurants',
        'Outdoor pool',
        'Business center',
        'Cultural tours'
      ],
      contact: {
        phone: '+971 2 555 5678',
        email: 'info@cornichegrand.com',
        website: 'www.cornichegrand.com'
      }
    },
    'marine-drive-inn': {
      name: 'Marine Drive Inn',
      city: 'Mumbai',
      address: '123 Marine Drive, Mumbai 400020, India',
      image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
      rating: 4.6,
      reviews: 653,
      price: 189,
      originalPrice: 239,
      description: 'Business hotel on iconic Marine Drive with Arabian Sea views.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Utensils, label: 'Restaurant' }
      ],
      features: [
        'Marine Drive location',
        'Arabian Sea views',
        'Business facilities',
        'Local cuisine',
        'Gateway of India nearby'
      ],
      contact: {
        phone: '+91 22 2555 1234',
        email: 'reservations@marinedriveinn.com',
        website: 'www.marinedriveinn.com'
      }
    },
    'rk-beach-resort': {
      name: 'RK Beach Resort',
      city: 'Vizag',
      address: '456 RK Beach Road, Visakhapatnam 530003, India',
      image: 'https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg',
      rating: 4.5,
      reviews: 489,
      price: 149,
      originalPrice: 199,
      description: 'Beachfront resort on RK Beach with traditional hospitality and modern amenities.',
      amenities: [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Car, label: 'Parking' },
        { icon: Utensils, label: 'Restaurant' }
      ],
      features: [
        'Beachfront location',
        'Traditional hospitality',
        'Beach activities',
        'Local seafood',
        'Araku Valley tours'
      ],
      contact: {
        phone: '+91 891 255 5678',
        email: 'info@rkbeachresort.com',
        website: 'www.rkbeachresort.com'
      }
    }
  };

  const rooms = [
    {
      id: 'deluxe-room',
      name: 'Deluxe Room',
      size: '35 m²',
      occupancy: 2,
      price: 299,
      originalPrice: 399,
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      has3D: true,
      features: ['King bed', 'City view', 'Marble bathroom', 'Mini bar'],
      description: 'Elegant room with contemporary furnishings and stunning city views.'
    },
    {
      id: 'executive-suite',
      name: 'Executive Suite',
      size: '65 m²',
      occupancy: 3,
      price: 499,
      originalPrice: 649,
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      has3D: true,
      features: ['Separate living area', 'Eiffel Tower view', 'Premium bathroom', 'Nespresso machine'],
      description: 'Spacious suite with separate living area and breathtaking Eiffel Tower views.'
    },
    {
      id: 'presidential-suite',
      name: 'Presidential Suite',
      size: '120 m²',
      occupancy: 4,
      price: 999,
      originalPrice: 1299,
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      has3D: true,
      features: ['Private terrace', 'Butler service', 'Dining room', 'Master bedroom'],
      description: 'Ultimate luxury with private terrace, butler service, and panoramic city views.'
    }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Absolutely stunning hotel with impeccable service. The 3D preview helped us choose the perfect room with an amazing view!'
    },
    {
      id: 2,
      name: 'Michel Dubois',
      avatar: '',
      rating: 5,
      date: '1 month ago',
      comment: 'The virtual tour was incredibly accurate. When we arrived, everything was exactly as shown. Exceptional experience!'
    },
    {
      id: 3,
      name: 'Emma Chen',
      avatar: '',
      rating: 4,
      date: '6 weeks ago',
      comment: 'Beautiful hotel in a prime location. Staff was very professional and the rooms are exactly as advertised in the VR preview.'
    }
  ];

  const currentHotel = hotelData[hotelId as keyof typeof hotelData];

  if (!currentHotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h1>
          <Link to="/hotels" className="text-blue-600 hover:underline">
            Return to Hotels
          </Link>
        </div>
      </div>
    );
  }

  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  };

  const getCurrentPrice = () => {
    return selectedRoom ? selectedRoom.price : currentHotel.price;
  };

  const getCurrentOriginalPrice = () => {
    return selectedRoom ? selectedRoom.originalPrice : currentHotel.originalPrice;
  };

  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={currentHotel.image}
          alt={currentHotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Back Button */}
        <Link
          to="/hotels"
          className="absolute top-8 left-8 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        {/* Hotel Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {currentHotel.name}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">{currentHotel.rating}</span>
                <span className="text-blue-200">({currentHotel.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-200">
                <MapPin className="h-4 w-4" />
                <span>{currentHotel.city}</span>
              </div>
            </div>
            <p className="text-blue-100 max-w-3xl">
              {currentHotel.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Room Selection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Room</h2>
              
              <div className="space-y-6">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="md:flex">
                      {/* Room Image */}
                      <div className="md:w-1/3 relative">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-48 md:h-full object-cover"
                        />
                        {room.has3D && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>3D View</span>
                          </div>
                        )}
                      </div>

                      {/* Room Details */}
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <span>{room.size}</span>
                              <span>Max {room.occupancy} guests</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">₹{room.price}</div>
                            <div className="text-sm text-gray-500 line-through">₹{room.originalPrice}</div>
                            <div className="text-xs text-gray-500">per night</div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{room.description}</p>

                        {/* Room Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {room.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Room Actions */}
                        <div className="flex space-x-3">
                          {room.has3D && (
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                              <Eye className="h-4 w-4" />
                              <span>3D Preview</span>
                            </button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleRoomSelect(room)}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                              selectedRoom?.id === room.id
                                ? 'bg-green-600 text-white'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {selectedRoom?.id === room.id ? 'Selected' : 'Select Room'}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Services</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Hotel Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {currentHotel.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <amenity.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
                  <ul className="space-y-2">
                    {currentHotel.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{review.avatar}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{review.name}</div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="sticky top-8"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ₹{getCurrentPrice()}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="line-through">₹{getCurrentOriginalPrice()}</span> per night
                  </div>
                  <div className="text-xs text-red-600 font-semibold">
                    {Math.round((1 - getCurrentPrice() / getCurrentOriginalPrice()) * 100)}% OFF
                  </div>
                  {selectedRoom && (
                    <div className="text-xs text-blue-600 font-medium mt-2">
                      {selectedRoom.name} selected
                    </div>
                  )}
                </div>

                {/* Booking Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>₹{getCurrentPrice()} × {calculateNights()} nights</span>
                    <span>₹{getCurrentPrice() * calculateNights()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Taxes & fees</span>
                    <span>₹{Math.round(getCurrentPrice() * calculateNights() * 0.15)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>₹{Math.round(getCurrentPrice() * calculateNights() * 1.15)}</span>
                  </div>
                </div>

                {/* Book Button */}
                <motion.button
                  whileHover={{ scale: isProcessingPayment ? 1 : 1.02 }}
                  whileTap={{ scale: isProcessingPayment ? 1 : 0.98 }}
                  disabled={isProcessingPayment}
                  onClick={async () => {
                    try {
                      setIsProcessingPayment(true);
                      const loaded = await loadRazorpay();
                      if (!loaded) throw new Error('Failed to load Razorpay');
                      const key = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
                      if (!key) throw new Error('Missing VITE_RAZORPAY_KEY_ID in .env');
                      const nights = Math.max(1, calculateNights());
                      const base = getCurrentPrice() * nights;
                      const taxes = Math.round(base * 0.15);
                      const total = Math.max(1, Math.round(base + taxes));
                      const options: any = {
                        key,
                        amount: total * 100,
                        currency: 'INR',
                        name: 'Travel-Friendly',
                        description: `${currentHotel.name} • ${currentHotel.city} • ${selectedRoom ? selectedRoom.name : 'Standard Room'} • ${nights} night(s) • ${guests} guest(s)`,
                        prefill: { name: 'Guest User', email: 'guest@example.com', contact: '+919999999999' },
                        theme: { color: '#3B82F6' },
                        modal: { ondismiss: () => setIsProcessingPayment(false) },
                        handler: () => {
                          alert('Payment successful! Your room has been booked.');
                          setIsProcessingPayment(false);
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
                  }}
                  className={`w-full ${isProcessingPayment ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700'} text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>{isProcessingPayment ? 'Processing...' : 'Book Now'}</span>
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Free cancellation up to 24 hours before check-in
                </p>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                <h3 className="font-bold text-gray-900 mb-4">Contact Hotel</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{currentHotel.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{currentHotel.contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{currentHotel.contact.website}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{currentHotel.address}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;