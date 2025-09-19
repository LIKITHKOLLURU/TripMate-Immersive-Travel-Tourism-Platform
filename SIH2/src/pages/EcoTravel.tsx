import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Award, 
  TrendingUp, 
  Target,
  Car,
  Train,
  Bike,
  TreePine,
  Users,
  Globe,
  Gift,
  Zap
} from 'lucide-react';

const EcoTravel = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const userStats = {
    greenTokens: 2450,
    carbonSaved: 185,
    level: 'Gold Traveler',
    rank: 42,
    streak: 12
  };

  const achievements = [
    { id: 1, title: 'Eco Warrior', description: 'Choose eco-friendly transport 10 times', unlocked: true },
    { id: 2, title: 'Carbon Neutral', description: 'Offset 100kg of CO₂', unlocked: true },
    { id: 3, title: 'Green Explorer', description: 'Visit 5 eco-certified destinations', unlocked: false },
    { id: 4, title: 'Sustainable Traveler', description: 'Complete 20 green challenges', unlocked: false }
  ];

  const challenges = [
    {
      id: 'public-transport',
      title: 'Use Public Transport',
      description: 'Choose trains, buses or metro for your next trip',
      reward: 50,
      icon: Train,
      difficulty: 'Easy',
      timeLeft: '3 days',
      carbonSaved: 15
    },
    {
      id: 'bike-rental',
      title: 'Bike Around the City',
      description: 'Rent a bike for city exploration instead of taxis',
      reward: 75,
      icon: Bike,
      difficulty: 'Medium',
      timeLeft: '5 days',
      carbonSaved: 8
    },
    {
      id: 'eco-hotel',
      title: 'Stay at Eco-Certified Hotel',
      description: 'Book accommodation with green certification',
      reward: 100,
      icon: Leaf,
      difficulty: 'Easy',
      timeLeft: '1 week',
      carbonSaved: 25
    },
    {
      id: 'nature-tourism',
      title: 'Choose Nature Tourism',
      description: 'Visit national parks or eco-reserves',
      reward: 120,
      icon: TreePine,
      difficulty: 'Medium',
      timeLeft: '2 weeks',
      carbonSaved: 30
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', tokens: 5420, avatar: '👩‍💻' },
    { rank: 2, name: 'Alex Rodriguez', tokens: 4890, avatar: '👨‍🎨' },
    { rank: 3, name: 'Maya Patel', tokens: 4650, avatar: '👩‍🔬' },
    { rank: 4, name: 'You', tokens: userStats.greenTokens, avatar: '👤', isUser: true },
    { rank: 5, name: 'James Wilson', tokens: 2380, avatar: '👨‍💼' }
  ];

  const rewards = [
    { id: 1, title: '10% Hotel Discount', cost: 500, type: 'discount', available: true },
    { id: 2, title: 'Free Airport Lounge Access', cost: 800, type: 'service', available: true },
    { id: 3, title: 'Eco Tour Voucher', cost: 1200, type: 'experience', available: false },
    { id: 4, title: 'Carbon Offset Certificate', cost: 300, type: 'certificate', available: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Eco
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Travel Rewards
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Travel sustainably, earn green tokens, and unlock exclusive rewards. 
            Join thousands of eco-conscious travelers making a positive impact.
          </p>
        </motion.div>

        {/* User Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-8 text-white mb-12"
        >
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{userStats.greenTokens.toLocaleString()}</div>
              <div className="text-green-100 text-sm">Green Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{userStats.carbonSaved}kg</div>
              <div className="text-green-100 text-sm">CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">{userStats.level}</div>
              <div className="text-green-100 text-sm">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">#{userStats.rank}</div>
              <div className="text-green-100 text-sm">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{userStats.streak}</div>
              <div className="text-green-100 text-sm">Day Streak</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Challenges */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 mr-2 text-green-600" />
                Active Challenges
              </h2>

              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    onClick={() => setSelectedChallenge(
                      selectedChallenge === challenge.id ? null : challenge.id
                    )}
                    className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <challenge.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-2">{challenge.title}</h3>
                          <p className="text-gray-600 mb-3">{challenge.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <span className={`px-2 py-1 rounded-full ${
                              challenge.difficulty === 'Easy' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {challenge.difficulty}
                            </span>
                            <span className="text-gray-500">⏱️ {challenge.timeLeft}</span>
                            <span className="text-gray-500">🌱 -{challenge.carbonSaved}kg CO₂</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">+{challenge.reward}</div>
                        <div className="text-xs text-gray-500">tokens</div>
                      </div>
                    </div>

                    {selectedChallenge === challenge.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            Accept Challenge
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                            Learn More
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="h-6 w-6 mr-2 text-yellow-600" />
                Achievements
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border ${
                      achievement.unlocked
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-yellow-100'
                          : 'bg-gray-100'
                      }`}>
                        <Award className={`h-6 w-6 ${
                          achievement.unlocked
                            ? 'text-yellow-600'
                            : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          achievement.unlocked
                            ? 'text-gray-900'
                            : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Leaderboard
              </h3>

              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      user.isUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                      #{user.rank}
                    </div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1">
                      <div className={`font-medium ${user.isUser ? 'text-blue-600' : 'text-gray-900'}`}>
                        {user.name}
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">
                      {user.tokens.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Rewards Store */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Gift className="h-5 w-5 mr-2 text-purple-600" />
                Rewards Store
              </h3>

              <div className="space-y-3">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`p-3 rounded-lg border ${
                      reward.available
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          reward.available ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {reward.title}
                        </h4>
                        <div className="text-lg font-bold text-green-600 mt-1">
                          {reward.cost} tokens
                        </div>
                      </div>
                      <button
                        disabled={!reward.available}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          reward.available
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {reward.available ? 'Redeem' : 'Locked'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Global Impact Together
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join our community of eco-conscious travelers and make a real difference 
            for our planet while exploring the world sustainably.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Globe className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">125K</div>
              <div className="text-sm text-green-100">Eco Travelers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Leaf className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">50M kg</div>
              <div className="text-sm text-green-100">CO₂ Prevented</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Zap className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">500K</div>
              <div className="text-sm text-green-100">Green Actions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EcoTravel;