
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
      description: 'Captured during the golden hour at Eiffel Tower, this NFT represents the romantic essence of Paris.',
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
      description: 'Digital artwork inspired by Tokyo\'s vibrant nightlife and neon-lit streets.',
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
      description: 'Ancient temple photography showcasing Balinese spiritual architecture.',
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
      description: 'Artistic interpretation of Venice canals during early morning hours.',
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
      description: 'Audio-visual NFT combining desert photography with traditional Berber music.',
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
      description: 'Stunning aurora borealis captured in the Norwegian wilderness.',
      edition: '1 of 7',
      royalty: '18%'
    }
    setLikedItems(prev => 
      prev.includes(nftId) 
        ? prev.filter(id => id !== nftId)
        : [...prev, nftId]
    );
  };

    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100';
      case 'Rare': return 'text-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 bg-purple-100';
      case 'Legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
            Digital Souvenirs
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
                        <motion.div
                          key={step}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            step <= currentExplanationStep ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                          animate={step === currentExplanationStep ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5, repeat: step === currentExplanationStep ? Infinity : 0 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Explanation Steps */}
                  <AnimatePresence mode="wait">
                    {currentExplanationStep === 0 && (
                      <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center"
                      >
                        <div className="flex justify-center items-center space-x-4 mb-6">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-6xl"
                          >
                            📸
                          </motion.div>
                          <motion.div
                            animate={{ x: [0, 20, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-4xl"
                          >
                            ➡️
                          </motion.div>
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="text-6xl"
                          >
                            💎
                          </motion.div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">What is a Digital Souvenir?</h3>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                          Imagine you bought a beautiful postcard from Paris. A Digital Souvenir is like that postcard, but on your phone or computer! 
                          It's a special digital memory from your travels that <strong>only you</strong> can own - like having a unique photo that no one else in the world has.
                        </p>
                        <div className="mt-6 bg-blue-50 p-4 rounded-xl max-w-xl mx-auto">
                          <p className="text-blue-700 text-sm">
                            💡 <strong>Simple Example:</strong> Like owning the original Mona Lisa painting vs. having a copy - your digital souvenir is the "original"!
                          </p>
                        </div>
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
                        <div className="flex justify-center items-center space-x-6 mb-6">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-5xl"
                          >
                            🏦
                          </motion.div>
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-3xl"
                          >
                            🔒
                          </motion.div>
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-5xl"
                          >
                            📋
                          </motion.div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">How Do We Keep It Safe?</h3>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                          Think of it like a <strong>super secure bank</strong> that keeps a record of who owns what. 
                          When you buy a digital souvenir, it's like the bank writing your name in a special book that everyone can see, 
                          but no one can erase or change. This way, everyone knows it's truly yours!
                        </p>
                        <div className="mt-6 bg-green-50 p-4 rounded-xl max-w-xl mx-auto">
                          <p className="text-green-700 text-sm">
                            🏆 <strong>Like This:</strong> Your name is permanently written next to your souvenir - no one can steal it or claim it's theirs!
                          </p>
                        </div>
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
                        <div className="flex justify-center items-center space-x-4 mb-6">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-5xl"
                          >
                            👤
                          </motion.div>
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-4xl"
                          >
                            💝
                          </motion.div>
                          <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-5xl"
                          >
                            🎨
                          </motion.div>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                            className="text-4xl"
                          >
                            💰
                          </motion.div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Helping Real Artists</h3>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                          When you buy a digital souvenir, it's like <strong>buying directly from the artist</strong> at a local market! 
                          Your money goes straight to them. Even better - if someone else buys it from you later, 
                          the artist still gets a small tip each time. It's like they get a thank-you gift forever!
                        </p>
                        <div className="mt-6 bg-purple-50 p-4 rounded-xl max-w-xl mx-auto">
                          <p className="text-purple-700 text-sm">
                            ❤️ <strong>Real Impact:</strong> You're helping a real person (maybe a photographer in Paris or painter in Tokyo) make a living from their art!
                          </p>
                        </div>
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
                        <div className="flex justify-center items-center space-x-3 mb-6">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-4xl"
                          >
                            📱
                          </motion.div>
                          <motion.div
                            animate={{ rotate: [0, 20, -20, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-5xl"
                          >
                            📚
                          </motion.div>
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-4xl"
                          >
                            ❤️
                          </motion.div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Your Travel Memory Album</h3>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                          Think of it like collecting <strong>special stickers or trading cards</strong> from your travels! 
                          You can show them to friends on your phone, keep them as memories, or even trade them with other travelers. 
                          Each one reminds you of an amazing place you've been or want to visit!
                        </p>
                        
                        {/* Interactive Memory Collection */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl max-w-2xl mx-auto">
                          <h4 className="font-semibold mb-4 text-gray-800">Your Collection Could Look Like:</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                              { emoji: '🗼', name: 'Paris Tower', delay: 0 },
                              { emoji: '🏛️', name: 'Rome Temple', delay: 0.2 },
                              { emoji: '🏔️', name: 'Swiss Alps', delay: 0.4 },
                              { emoji: '🏖️', name: 'Bali Beach', delay: 0.6 }
                            ].map((item, idx) => (
                              <motion.div
                                key={idx}
                                animate={{ 
                                  y: [0, -8, 0],
                                  rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity, 
                                  delay: item.delay,
                                  ease: "easeInOut"
                                }}
                                className="bg-white p-3 rounded-xl shadow-sm border-2 border-purple-200 hover:border-purple-400 transition-colors cursor-pointer"
                              >
                                <div className="text-2xl mb-1">{item.emoji}</div>
                                <div className="text-xs text-gray-600 font-medium">{item.name}</div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-6 bg-yellow-50 p-4 rounded-xl max-w-xl mx-auto">
                          <p className="text-yellow-700 text-sm">
                            🌟 <strong>Best Part:</strong> Unlike regular photos, these are special - only you have the "original" version, making them extra meaningful!
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-8">
                    <button
                      onClick={() => setCurrentExplanationStep(Math.max(0, currentExplanationStep - 1))}
                      disabled={currentExplanationStep === 0}
                      className="px-6 py-2 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                    >
                      Previous
                    </button>
                    
                    {currentExplanationStep < 3 ? (
                      <button
                        onClick={() => setCurrentExplanationStep(currentExplanationStep + 1)}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowNFTExplanation(false);
                          setCurrentExplanationStep(0);
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all"
                      >
                        Start Exploring!
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* NFT Info Modal */}
        <AnimatePresence>
          {selectedNFTInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedNFTInfo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
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
                        
                        {/* Description */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center space-x-2">
                            <Sparkles className="h-5 w-5 text-gray-600" />
                            <span>Story Behind This Piece</span>
                          </h4>
                          <p className="text-gray-700">{nft.description}</p>
                        </div>
                        
                        {/* Technical Details */}
                        <div className="border-t pt-4">
                          <h4 className="font-semibold mb-3">Technical Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Blockchain:</span>
                              <span className="ml-2 font-medium">Ethereum</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Token Standard:</span>
                              <span className="ml-2 font-medium">ERC-721</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Views:</span>
                              <span className="ml-2 font-medium">{nft.views.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Likes:</span>
                              <span className="ml-2 font-medium">{nft.likes}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Purchase Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <ShoppingBag className="h-5 w-5" />
                          <span>Buy for {nft.price} {nft.currency}</span>
                        </motion.button>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Authentic Digital Souvenirs
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Every digital souvenir is verified authentic and supports local artists directly. 
            Collect unique pieces of culture and own part of your travel memories forever.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Zap className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Instant Ownership</div>
              <div className="text-sm text-purple-100">Secure blockchain verified</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Star className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Artist Royalties</div>
              <div className="text-sm text-purple-100">Support creators directly</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Crown className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Limited Editions</div>
              <div className="text-sm text-purple-100">Exclusive collectibles</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Easy Trading</div>
              <div className="text-sm text-purple-100">Buy, sell, and trade freely</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NFTMarketplace;