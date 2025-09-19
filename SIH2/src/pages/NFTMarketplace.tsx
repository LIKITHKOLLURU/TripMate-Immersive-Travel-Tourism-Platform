import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, Search, Palette, Camera, Music, 
  Crown, X, Sparkles, Info, Play, ChevronRight, Filter,
  Eye, TrendingUp, Shield, Globe, Users
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

interface NFT {
  id: string;
  title: string;
  artist: string;
  artistAvatar: string;
  location: string;
  price: number;
  currency: string;
  usdPrice: number;
  image: string;
  category: string;
  views: number;
  likes: number;
  rarity: Rarity;
  description: string;
  edition: string;
  royalty: string;
}

const NFTMarketplace: React.FC = () => {
  const { user } = useAuth();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>([]);
  const [recommendedNFTs, setRecommendedNFTs] = useState<NFT[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedNFTInfo, setSelectedNFTInfo] = useState<string | null>(null);
  const [showNFTExplanation, setShowNFTExplanation] = useState<boolean>(false);
  const [currentExplanationStep, setCurrentExplanationStep] = useState<number>(0);

  // Sample NFT data
  const sampleNFTs: NFT[] = [
    {
      id: 'paris-sunset',
      title: 'Paris Golden Hour',
      artist: 'Marie Dubois',
      artistAvatar: '👩‍🎨',
      location: 'Paris, France',
      price: 0.8,
      currency: 'ETH',
      usdPrice: 1280,
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
      category: 'photography',
      views: 2450,
      likes: 189,
      rarity: 'Rare',
      description: 'Captured during the magical golden hour at the iconic Eiffel Tower, this stunning NFT represents the timeless romantic essence of Paris. The photograph showcases the warm, amber light cascading over the iron lattice structure, creating dramatic shadows and highlighting the architectural beauty that has captivated visitors for over a century. This digital souvenir encapsulates the dreamy atmosphere of Parisian evenings, where lovers stroll along the Seine and the city transforms into a canvas of light and shadow. The artist has masterfully captured not just an image, but a feeling - the ineffable charm that makes Paris the City of Light and Love.',
      edition: '1 of 10',
      royalty: '10%'
    },
    {
      id: 'tokyo-neon',
      title: 'Tokyo Neon Dreams',
      artist: 'Hiroshi Tanaka',
      artistAvatar: '👨‍💻',
      location: 'Tokyo, Japan',
      price: 1.2,
      currency: 'ETH',
      usdPrice: 1920,
      image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg',
      category: 'art',
      views: 3200,
      likes: 267,
      rarity: 'Epic',
      description: 'An electrifying digital artwork inspired by Tokyo\'s pulsating nightlife and mesmerizing neon-lit streets. This piece captures the cyberpunk essence of modern Japan, where traditional culture meets cutting-edge technology in a symphony of light and color. The artwork depicts the bustling energy of Shibuya crossing at midnight, where millions of LED displays create a kaleidoscope of advertisements, street signs, and digital art installations. Each neon glow tells a story of innovation, dreams, and the relentless pace of urban life. The artist has woven together elements of manga aesthetics, futuristic architecture, and the raw emotion of city dwellers navigating through this digital maze, creating a visual narrative that speaks to the soul of contemporary Tokyo.',
      edition: '1 of 5',
      royalty: '15%'
    },
    {
      id: 'bali-temple',
      title: 'Sacred Temple of Bali',
      artist: 'Kadek Artana',
      artistAvatar: '🧘‍♂️',
      location: 'Bali, Indonesia',
      price: 0.5,
      currency: 'ETH',
      usdPrice: 800,
      image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
      category: 'photography',
      views: 1890,
      likes: 156,
      rarity: 'Common',
      description: 'A breathtaking photographic masterpiece showcasing the sacred spiritual architecture of ancient Balinese temples. This NFT captures the intricate stone carvings and ornate details of Pura Besakih, known as the "Mother Temple" of Bali. The photograph reveals centuries-old craftsmanship where every sculpture tells a story from Hindu mythology, and every architectural element serves both aesthetic and spiritual purposes. The morning mist gently embraces the temple complex, creating an ethereal atmosphere that speaks to the deep spiritual connection between the Balinese people and their sacred spaces. This digital souvenir preserves not just an image, but the profound sense of peace and reverence that permeates these holy grounds, where generations have come to pray, meditate, and connect with the divine.',
      edition: '1 of 25',
      royalty: '8%'
    },
    {
      id: 'venice-canal',
      title: 'Venice Morning Mist',
      artist: 'Giuseppe Romano',
      artistAvatar: '🎭',
      location: 'Venice, Italy',
      price: 2.1,
      currency: 'ETH',
      usdPrice: 3360,
      image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg',
      category: 'art',
      views: 4100,
      likes: 341,
      rarity: 'Legendary',
      description: 'A mesmerizing artistic interpretation of Venice\'s legendary canals captured during the mystical early morning hours when the city awakens from its slumber. This extraordinary NFT showcases the interplay between ancient Venetian architecture and the ever-changing moods of the Adriatic waters. The morning mist creates a dreamlike veil over the Gothic palazzos and Byzantine domes, while gondoliers begin their daily journey through the labyrinthine waterways that have remained unchanged for centuries. The artist has masterfully captured the reflection of ornate facades in the rippling canal waters, creating a mirror world that blurs the line between reality and fantasy. This piece embodies the timeless romance and mystery of La Serenissima, where every bridge tells a story of merchants, artists, and lovers who have walked these paths for over a millennium.',
      edition: '1 of 3',
      royalty: '20%'
    },
    {
      id: 'sahara-dunes',
      title: 'Sahara Desert Symphony',
      artist: 'Amina Hassan',
      artistAvatar: '🌙',
      location: 'Morocco',
      price: 0.9,
      currency: 'ETH',
      usdPrice: 1440,
      image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg',
      category: 'music',
      views: 2800,
      likes: 234,
      rarity: 'Rare',
      description: 'An immersive audio-visual NFT masterpiece that combines stunning Sahara desert photography with the haunting melodies of traditional Berber music. This unique digital souvenir captures the vast, undulating sand dunes of the world\'s largest hot desert, where golden grains shift like liquid silk under the scorching sun and starlit nights. The accompanying soundtrack features authentic Gnawa rhythms and Amazigh chants passed down through generations of nomadic tribes who have called this harsh yet beautiful landscape home for millennia. The visual narrative follows the journey of a caravan crossing the endless sea of sand, where mirages dance on the horizon and ancient trade routes whisper stories of salt merchants, scholars, and adventurers. This piece embodies the raw power and mystical beauty of the Sahara, where silence speaks louder than words and the desert\'s eternal rhythm becomes a symphony of survival and wonder.',
      edition: '1 of 15',
      royalty: '12%'
    },
    {
      id: 'aurora-norway',
      title: 'Northern Lights Magic',
      artist: 'Erik Nordström',
      artistAvatar: '❄️',
      location: 'Norway',
      price: 1.5,
      currency: 'ETH',
      usdPrice: 2400,
      image: 'https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg',
      category: 'photography',
      views: 5600,
      likes: 423,
      rarity: 'Epic',
      description: 'A breathtaking photographic capture of the aurora borealis dancing across the pristine Norwegian wilderness, where nature puts on its most spectacular light show. This NFT immortalizes the moment when charged particles from the solar wind collide with Earth\'s magnetic field, creating ribbons of green, purple, and blue light that cascade across the Arctic sky like celestial curtains. The photograph was taken during the polar night in Tromsø, where the photographer waited for hours in sub-zero temperatures to capture this fleeting moment of cosmic beauty. The foreground reveals snow-covered fjords and ancient pine forests, creating a perfect contrast between the earthly and the ethereal. This digital souvenir captures not just a natural phenomenon, but the profound sense of wonder and humility that comes from witnessing one of nature\'s most magnificent displays, reminding us of our place in the vast cosmos.',
      edition: '1 of 7',
      royalty: '18%'
    },
    {
      id: 'indian-spices',
      title: 'Spice Market Colors',
      artist: 'Priya Sharma',
      artistAvatar: '🌶️',
      location: 'Delhi, India',
      price: 0.6,
      currency: 'ETH',
      usdPrice: 960,
      image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg',
      category: 'art',
      views: 2100,
      likes: 178,
      rarity: 'Rare',
      description: 'A vibrant digital art masterpiece inspired by the sensory explosion of traditional Indian spice markets, where centuries-old trading traditions come alive in a kaleidoscope of colors, aromas, and textures. This NFT captures the bustling energy of Delhi\'s Khari Baoli, Asia\'s largest spice market, where mountains of turmeric create golden pyramids, crimson chili powder forms fiery landscapes, and emerald cardamom pods glisten like precious gems. The artwork weaves together the visual symphony of spice vendors calling out their wares, the intricate patterns of traditional packaging, and the warm glow of oil lamps illuminating narrow alleys filled with sacks of exotic spices from across the subcontinent. This digital souvenir embodies the rich cultural heritage of Indian cuisine and trade, where each spice tells a story of ancient trade routes, monsoon harvests, and the passionate dedication of families who have been perfecting their craft for generations.',
      edition: '1 of 12',
      royalty: '12%'
    },
    {
      id: 'machu-picchu',
      title: 'Ancient Inca Sunrise',
      artist: 'Carlos Mendoza',
      artistAvatar: '🏔️',
      location: 'Peru',
      price: 1.8,
      currency: 'ETH',
      usdPrice: 2880,
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg',
      category: 'collectibles',
      views: 3800,
      likes: 298,
      rarity: 'Epic',
      description: 'A historical collectible capturing the mystical beauty and profound spiritual significance of Machu Picchu at dawn, when the first rays of sunlight pierce through the Andean mist to illuminate this ancient Inca citadel. This NFT preserves the moment when Huayna Picchu mountain emerges from the clouds like a sleeping giant, and the precisely cut stone terraces reveal the incredible engineering prowess of a civilization that thrived 500 years ago. The photograph captures the sacred energy of this UNESCO World Heritage site, where every stone was placed with astronomical precision and every structure served both practical and ceremonial purposes. The morning light reveals the intricate stonework that has withstood centuries of earthquakes and weather, testament to the advanced knowledge of the Inca architects. This digital souvenir embodies the mystery and majesty of a lost civilization, where the harmony between human achievement and natural beauty creates a sense of wonder that transcends time itself.',
      edition: '1 of 8',
      royalty: '16%'
    }
  ];

  // Map user interests to NFT categories
  const interestToCategoryMap: Record<string, string[]> = {
    'culture': ['art', 'collectibles'],
    'food': ['art', 'photography'],
    'nature': ['photography', 'art'],
    'history': ['collectibles', 'art'],
    'art': ['art', 'collectibles'],
    'nightlife': ['photography', 'music'],
    'shopping': ['collectibles', 'art'],
    'sports': ['collectibles', 'photography']
  };

  // Initialize component
  useEffect(() => {
    // Simulate API call
    const fetchNFTs = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNfts(sampleNFTs);
        setFilteredNFTs(sampleNFTs);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  // Update recommendations when user interests change
  useEffect(() => {
    if (user?.preferences?.interests?.length) {
      const recommendedCategories = new Set<string>();
      user.preferences.interests.forEach((interest: string) => {
        (interestToCategoryMap[interest] || []).forEach(cat => recommendedCategories.add(cat));
      });

      if (recommendedCategories.size > 0) {
        const recommended = nfts.filter(nft => 
          Array.from(recommendedCategories).includes(nft.category)
        );
        setRecommendedNFTs(recommended);
      }
    }
  }, [user?.preferences?.interests, nfts]);

  // Filter NFTs based on search term and category
  useEffect(() => {
    let filtered = [...nfts];
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(nft => 
        nft.title.toLowerCase().includes(searchLower) ||
        nft.artist.toLowerCase().includes(searchLower) ||
        nft.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(nft => nft.category === selectedCategory);
    }

    setFilteredNFTs(filtered);
  }, [searchTerm, selectedCategory, nfts]);

  const toggleLike = (nftId: string) => {
    setLikedItems(prev => 
      prev.includes(nftId) 
        ? prev.filter(id => id !== nftId)
        : [...prev, nftId]
    );
  };

  const getRarityColor = (rarity: Rarity): string => {
    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100';
      case 'Rare': return 'text-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 bg-purple-100';
      case 'Legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const categories = [
    { id: 'all', label: 'All Items', icon: ShoppingBag },
    { id: 'art', label: 'Digital Art', icon: Palette },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'music', label: 'Music & Audio', icon: Music },
    { id: 'collectibles', label: 'Collectibles', icon: Crown }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <a 
              href="https://en.wikipedia.org/wiki/Non-fungible_token" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              Digital Souvenirs
            </a>
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Marketplace
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Discover and collect unique digital souvenirs from local artists around the world. 
            Own authentic pieces of culture through blockchain technology.
          </p>
          
          {/* What are NFTs Button */}
          <motion.button
            onClick={() => setShowNFTExplanation(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Info className="h-5 w-5" />
            <span>New to Digital Souvenirs? Click to Learn!</span>
            <Play className="h-4 w-4" />
          </motion.button>
        </motion.div>

        {/* NFT Explanation Modal */}
        <AnimatePresence>
          {showNFTExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowNFTExplanation(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Digital Souvenirs Made Simple! 🎨
                    </h2>
                    <button
                      onClick={() => setShowNFTExplanation(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Step Indicator */}
                  <div className="flex justify-center mb-8">
                    <div className="flex space-x-2">
                      {[0, 1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`w-3 h-3 rounded-full ${
                            step === currentExplanationStep
                              ? 'bg-purple-600'
                              : step < currentExplanationStep
                              ? 'bg-purple-300'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {currentExplanationStep === 0 && (
                      <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center"
                      >
                        <div className="text-6xl mb-6">🖼️</div>
                        <h3 className="text-2xl font-bold mb-4">What are Digital Souvenirs?</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          Digital souvenirs are unique digital artworks created by local artists from around the world. 
                          They capture the essence of places, cultures, and experiences in digital form. Think of them as 
                          collectible memories that you can own forever!
                        </p>
                      </motion.div>
                    )}

                    {currentExplanationStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center"
                      >
                        <div className="text-6xl mb-6">🔗</div>
                        <h3 className="text-2xl font-bold mb-4">Powered by Blockchain</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          Each digital souvenir is secured on the blockchain, making it truly yours. This technology 
                          ensures authenticity, prevents counterfeiting, and allows you to prove ownership. It's like 
                          having a digital certificate of authenticity for your collectible!
                        </p>
                      </motion.div>
                    )}

                    {currentExplanationStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center"
                      >
                        <div className="text-6xl mb-6">🎨</div>
                        <h3 className="text-2xl font-bold mb-4">Support Local Artists</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          When you purchase a digital souvenir, you're directly supporting talented local artists 
                          from different cultures. Each piece tells a story and helps preserve cultural heritage 
                          while providing artists with a new way to share their work globally.
                        </p>
                      </motion.div>
                    )}

                    {currentExplanationStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center"
                      >
                        <div className="text-6xl mb-6">🚀</div>
                        <h3 className="text-2xl font-bold mb-4">Start Your Collection</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                          Ready to start collecting? Browse our marketplace to discover amazing digital souvenirs 
                          from artists worldwide. Each piece is unique, authentic, and tells a story about its 
                          place of origin. Your digital travel memories await!
                        </p>
                        <button
                          onClick={() => setShowNFTExplanation(false)}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                        >
                          Start Exploring! ✨
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-8">
                    <button
                      onClick={() => setCurrentExplanationStep(Math.max(0, currentExplanationStep - 1))}
                      disabled={currentExplanationStep === 0}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        currentExplanationStep === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Previous
                    </button>
                    
                    {currentExplanationStep < 3 && (
                      <button
                        onClick={() => setCurrentExplanationStep(Math.min(3, currentExplanationStep + 1))}
                        className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
                      >
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recommended Section */}
        {recommendedNFTs.length > 0 && selectedCategory === 'all' && !searchTerm && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Sparkles className="text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Recommended For You</h2>
              <span className="ml-3 px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full">
                Based on your interests
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
              {recommendedNFTs.slice(0, 4).map((nft) => (
                <div key={`rec-${nft.id}`} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={nft.image} 
                      alt={nft.title} 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => toggleLike(nft.id)}
                      className={`absolute top-2 right-2 p-2 rounded-full ${
                        likedItems.includes(nft.id) 
                          ? 'text-red-500' 
                          : 'text-white bg-black/30 hover:bg-black/40'
                      }`}
                    >
                      <Heart 
                        className={`w-5 h-5 ${likedItems.includes(nft.id) ? 'fill-current' : ''}`} 
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{nft.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{nft.artist}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{nft.price} {nft.currency}</span>
                      <span className="text-sm text-gray-500">{nft.likes} likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
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
                placeholder="Search NFTs, artists, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Filter className="text-gray-400 h-5 w-5 flex-shrink-0" />
              <div className="flex space-x-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* NFT Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* NFT Image */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full"
                    onClick={() => setSelectedNFTInfo(nft.id)}
                  >
                    <Eye className="h-6 w-6" />
                  </motion.button>
                </div>

                {/* Rarity Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getRarityColor(nft.rarity)}`}>
                  {nft.rarity}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNFTInfo(nft.id);
                    }}
                    className="p-2 rounded-full bg-blue-500/80 backdrop-blur-sm text-white hover:bg-blue-600/80 transition-colors"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleLike(nft.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      likedItems.includes(nft.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className="h-4 w-4" fill={likedItems.includes(nft.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Stats */}
                <div className="absolute bottom-4 left-4 flex space-x-4 text-white text-sm">
                  <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
                    <Eye className="h-3 w-3" />
                    <span>{nft.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
                    <Heart className="h-3 w-3" />
                    <span>{nft.likes}</span>
                  </div>
                </div>
              </div>

              {/* NFT Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {nft.title}
                </h3>
                
                {/* Artist Info */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">{nft.artistAvatar}</span>
                  <div>
                    <p className="font-medium text-gray-900">{nft.artist}</p>
                    <p className="text-xs text-gray-500">{nft.location}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {nft.description}
                </p>

                {/* Edition & Royalty */}
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <span>Edition: {nft.edition}</span>
                  <span>Royalty: {nft.royalty}</span>
                </div>

                {/* Pricing */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {nft.price} {nft.currency}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${nft.usdPrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">+12%</span>
                  </div>
                </div>

                {/* Buy Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Redirect to payment page with NFT details
                    const paymentUrl = `/payment?nft=${nft.id}&price=${nft.price}&currency=${nft.currency}&title=${encodeURIComponent(nft.title)}&artist=${encodeURIComponent(nft.artist)}`;
                    window.location.href = paymentUrl;
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Buy Now</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredNFTs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Digital Souvenirs found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* NFT Details Modal */}
        <AnimatePresence>
          {selectedNFTInfo && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <motion.div 
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                {(() => {
                  const nft = nfts.find(n => n.id === selectedNFTInfo);
                  if (!nft) return null;
                  
                  return (
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">{nft.title}</h3>
                        <button
                          onClick={() => setSelectedNFTInfo(null)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="space-y-6">
                        {/* Image */}
                        <div className="aspect-square rounded-xl overflow-hidden">
                          <img src={nft.image} alt={nft.title} className="w-full h-full object-cover" />
                        </div>
                        
                        {/* Detailed Info */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Shield className="h-5 w-5 text-blue-600" />
                              <span className="font-semibold text-blue-900">Authenticity</span>
                            </div>
                            <p className="text-sm text-blue-700">Blockchain verified and tamper-proof</p>
                          </div>
                          
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Crown className="h-5 w-5 text-green-600" />
                              <span className="font-semibold text-green-900">Rarity</span>
                            </div>
                            <p className="text-sm text-green-700">{nft.rarity} - {nft.edition}</p>
                          </div>
                          
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Users className="h-5 w-5 text-purple-600" />
                              <span className="font-semibold text-purple-900">Artist Royalty</span>
                            </div>
                            <p className="text-sm text-purple-700">{nft.royalty} on resales</p>
                          </div>
                          
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Globe className="h-5 w-5 text-yellow-600" />
                              <span className="font-semibold text-yellow-900">Origin</span>
                            </div>
                            <p className="text-sm text-yellow-700">{nft.location}</p>
                          </div>
                        </div>

                        {/* Artist & Description */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-3xl">{nft.artistAvatar}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{nft.artist}</h4>
                              <p className="text-sm text-gray-600">{nft.location}</p>
                            </div>
                          </div>
                          <p className="text-gray-700">{nft.description}</p>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between items-center py-4 border-t border-gray-200">
                          <div className="flex space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{nft.views.toLocaleString()} views</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{nft.likes} likes</span>
                            </div>
                          </div>
                        </div>

                        {/* Purchase Section */}
                        <div className="border-t border-gray-200 pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-3xl font-bold text-purple-600">{nft.price} {nft.currency}</p>
                              <p className="text-lg text-gray-500">${nft.usdPrice.toLocaleString()} USD</p>
                            </div>
                            <div className="flex space-x-3">
                              <button 
                                onClick={() => toggleLike(nft.id)}
                                className={`p-3 rounded-full transition-colors ${
                                  likedItems.includes(nft.id) 
                                    ? 'text-red-500 bg-red-50' 
                                    : 'text-gray-400 hover:bg-gray-100'
                                }`}
                              >
                                <Heart 
                                  className={`w-6 h-6 ${likedItems.includes(nft.id) ? 'fill-current' : ''}`} 
                                />
                              </button>
                              <button 
                                onClick={() => {
                                  // Redirect to payment page with NFT details
                                  const paymentUrl = `/payment?nft=${nft.id}&price=${nft.price}&currency=${nft.currency}&title=${encodeURIComponent(nft.title)}&artist=${encodeURIComponent(nft.artist)}`;
                                  window.location.href = paymentUrl;
                                }}
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2"
                              >
                                <ShoppingBag className="h-5 w-5" />
                                <span>Purchase Now</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NFTMarketplace;
