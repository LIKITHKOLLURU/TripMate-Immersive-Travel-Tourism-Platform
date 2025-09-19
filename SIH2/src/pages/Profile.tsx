import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Heart, Settings, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    preferences: {
      travelStyle: user?.preferences?.travelStyle || 'adventure',
      interests: user?.preferences?.interests || [],
    }
  });
  const [message, setMessage] = useState('');

  const travelStyles = [
    { value: 'adventure', label: 'Adventure', emoji: '🏔️' },
    { value: 'luxury', label: 'Luxury', emoji: '✨' },
    { value: 'budget', label: 'Budget', emoji: '💰' },
    { value: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { value: 'solo', label: 'Solo', emoji: '🚶‍♂️' },
    { value: 'business', label: 'Business', emoji: '💼' }
  ];

  const interestOptions = [
    { value: 'culture', label: 'Culture', emoji: '🏛️' },
    { value: 'food', label: 'Food', emoji: '🍜' },
    { value: 'nature', label: 'Nature', emoji: '🌿' },
    { value: 'history', label: 'History', emoji: '📚' },
    { value: 'art', label: 'Art', emoji: '🎨' },
    { value: 'nightlife', label: 'Nightlife', emoji: '🌙' },
    { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
    { value: 'sports', label: 'Sports', emoji: '⚽' }
  ];

  const handleSave = async () => {
    const updateData = {
      name: formData.name,
      preferences: {
        ...formData.preferences,
        notifications: user?.preferences?.notifications || { email: true, push: true }
      }
    };
    const result = await updateProfile(updateData);
    setMessage(result.message);
    if (result.success) {
      setIsEditing(false);
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleInterest = (interest: string) => {
    const currentInterests = formData.preferences.interests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        interests: newInterests
      }
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account and travel preferences</p>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-6 p-4 rounded-lg ${
                message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {message}
            </motion.div>
          )}

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg">{user.name}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Email Address
              </label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">{user.email}</div>
            </div>
          </div>

          {/* Travel Style */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              <MapPin className="inline h-4 w-4 mr-1" />
              Travel Style
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {travelStyles.map((style) => (
                <button
                  key={style.value}
                  disabled={!isEditing}
                  onClick={() => setFormData({
                    ...formData,
                    preferences: { ...formData.preferences, travelStyle: style.value }
                  })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.preferences.travelStyle === style.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="text-2xl mb-2">{style.emoji}</div>
                  <div className="font-medium">{style.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              <Heart className="inline h-4 w-4 mr-1" />
              Interests
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest.value}
                  disabled={!isEditing}
                  onClick={() => toggleInterest(interest.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.preferences.interests.includes(interest.value)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="text-xl mb-1">{interest.emoji}</div>
                  <div className="text-sm font-medium">{interest.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user.name,
                      preferences: user.preferences
                    });
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSave}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Edit Profile</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
