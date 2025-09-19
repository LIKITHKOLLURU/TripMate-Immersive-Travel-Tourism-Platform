import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Calendar, Clock, DollarSign, User, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loadRazorpay } from '../utils/razorpay';

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

interface Guide {
  id: string;
  name: string;
  image: string;
  rating: number;
  experience: string;
  languages: string[];
  specialties: string[];
  pricePerDay: number;
  reviews: number;
  description: string;
}

const TripSummary = () => {
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [tripDuration, setTripDuration] = useState(3);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const guides: Guide[] = [
    {
      id: 'guide-1',
      name: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      rating: 4.9,
      experience: '8 years',
      languages: ['English', 'French', 'Spanish'],
      specialties: ['Cultural Tours', 'Photography', 'History'],
      pricePerDay: 120,
      reviews: 247,
      description: 'Passionate local guide with extensive knowledge of hidden gems and cultural insights.'
    },
    {
      id: 'guide-2',
      name: 'Michael Chen',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      rating: 4.8,
      experience: '6 years',
      languages: ['English', 'Mandarin', 'Japanese'],
      specialties: ['Adventure Tours', 'Food Tours', 'Local Markets'],
      pricePerDay: 100,
      reviews: 189,
      description: 'Adventure enthusiast who loves showing travelers the authentic local experience.'
    },
    {
      id: 'guide-3',
      name: 'Elena Rodriguez',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      rating: 4.7,
      experience: '5 years',
      languages: ['English', 'Spanish', 'Portuguese'],
      specialties: ['Art & Architecture', 'Museums', 'Walking Tours'],
      pricePerDay: 90,
      reviews: 156,
      description: 'Art historian turned guide, perfect for culture and architecture enthusiasts.'
    }
  ];

  useEffect(() => {
    const storedPlaces = localStorage.getItem('selectedPlaces');
    if (storedPlaces) {
      setSelectedPlaces(JSON.parse(storedPlaces));
    } else {
      navigate('/plan-trip');
    }
  }, [navigate]);

  const getTotalPlaceCost = () => {
    return selectedPlaces.reduce((total, place) => total + place.estimatedCost, 0);
  };

  const getGuideCost = () => {
    return selectedGuide ? selectedGuide.pricePerDay * tripDuration : 0;
  };

  const getTotalCost = () => {
    return getTotalPlaceCost() + getGuideCost();
  };

  const handleGuideSelect = (guide: Guide) => {
    setSelectedGuide(selectedGuide?.id === guide.id ? null : guide);
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        throw new Error('Failed to load Razorpay checkout.');
      }

      const totalAmount = getTotalCost(); // amount in rupees
      const key = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;

      if (!key) {
        throw new Error('Razorpay Key ID is not configured. Add VITE_RAZORPAY_KEY_ID to your .env and restart the dev server.');
      }

      // Razorpay requires amount >= ₹1 for test payments
      const payableAmount = Math.max(1, Math.round(totalAmount));

      const options: any = {
        key,
        amount: payableAmount * 100, // paise
        currency: 'INR',
        name: 'Travel-Friendly',
        description: 'Trip Booking Payment',
        retry: { enabled: true, max_count: 1 },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
          },
        },
        handler: (response: any) => {
          // TODO: Verify payment on backend using signature
          console.log('Payment success:', response);
          alert('Payment successful! Your trip has been booked.');
          navigate('/');
        },
        prefill: {
          name: 'Guest User',
          email: 'guest@example.com',
          contact: '+919999999999',
        },
        theme: { color: '#3B82F6' },
      };

      // @ts-ignore - global injected by Razorpay script
      const rzp = new window.Razorpay(options);
      // @ts-ignore
      rzp.on('payment.failed', (resp: any) => {
        console.error('Payment failed:', resp);
        alert('Payment failed or cancelled. Please try again.');
      });
      rzp.open();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (selectedPlaces.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No places selected</h2>
          <button
            onClick={() => navigate('/plan-trip')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go back to planning
          </button>
        </div>
      </div>
    );
  }

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
            Trip
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Summary
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review your itinerary, select a guide, and complete your booking
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Trip Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Selected Places */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-blue-600" />
                Your Destinations ({selectedPlaces.length})
              </h3>
              
              <div className="space-y-4">
                {selectedPlaces.map((place, index) => (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {index + 1}
                    </div>
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{place.name}</h4>
                      <p className="text-gray-600">{place.cityName}, {place.countryName}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{place.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{place.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{place.estimatedCost === 0 ? 'Free' : `₹${place.estimatedCost}`}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Guide Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <User className="h-6 w-6 mr-2 text-green-600" />
                Select Your Guide (Optional)
              </h3>
              
              <div className="grid md:grid-cols-1 gap-4">
                {guides.map((guide) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleGuideSelect(guide)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedGuide?.id === guide.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={guide.image}
                        alt={guide.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{guide.name}</h4>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">₹{guide.pricePerDay}/day</div>
                            <div className="text-sm text-gray-500">{guide.experience} exp.</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{guide.rating}</span>
                            <span className="text-gray-500">({guide.reviews} reviews)</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          {guide.languages.map((lang) => (
                            <span key={lang} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {lang}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {guide.specialties.map((specialty) => (
                            <span key={specialty} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trip Duration */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-purple-600" />
                Trip Duration
              </h3>
              
              <div className="flex items-center space-x-4">
                <label className="text-gray-700">Number of days:</label>
                <select
                  value={tripDuration}
                  onChange={(e) => setTripDuration(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((days) => (
                    <option key={days} value={days}>
                      {days} {days === 1 ? 'day' : 'days'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Panel - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-6">Booking Summary</h3>
              
              {/* Cost Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Places ({selectedPlaces.length})</span>
                  <span className="font-medium">₹{getTotalPlaceCost()}</span>
                </div>
                
                {selectedGuide && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Guide ({tripDuration} days)</span>
                    <span className="font-medium">₹{getGuideCost()}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₹{getTotalCost()}</span>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold mb-3">Trip Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>{tripDuration} {tripDuration === 1 ? 'day' : 'days'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Places:</span>
                    <span>{selectedPlaces.length} destinations</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guide:</span>
                    <span>{selectedGuide ? selectedGuide.name : 'No guide selected'}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <motion.button
                onClick={handlePayment}
                disabled={isProcessingPayment}
                whileHover={{ scale: isProcessingPayment ? 1 : 1.02 }}
                whileTap={{ scale: isProcessingPayment ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isProcessingPayment
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-xl'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span>
                  {isProcessingPayment ? 'Processing...' : `Pay ₹${getTotalCost()}`}
                </span>
              </motion.button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
