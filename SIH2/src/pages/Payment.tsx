import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, CheckCircle, Wallet, Smartphone, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loadRazorpay } from '../utils/razorpay';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [nftDetails, setNftDetails] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'crypto'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    // Get NFT details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const details = {
      id: urlParams.get('nft'),
      price: urlParams.get('price'),
      currency: urlParams.get('currency'),
      title: decodeURIComponent(urlParams.get('title') || ''),
      artist: decodeURIComponent(urlParams.get('artist') || '')
    };
    setNftDetails(details);
  }, []);


  const handleRazorpayPayment = async () => {
    if (!nftDetails) return;
    
    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        throw new Error('Failed to load Razorpay checkout.');
      }

      const priceInINR = parseFloat(nftDetails.price) * 83; // Convert ETH to INR (approximate)
      const payableAmount = Math.max(1, Math.round(priceInINR)); // Razorpay requires amount >= ₹1
      const key = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;

      if (!key) {
        throw new Error('Razorpay Key ID is not configured. Add VITE_RAZORPAY_KEY_ID to your .env and restart the dev server.');
      }
      
      const options: any = {
        key,
        amount: payableAmount * 100, // paise
        currency: 'INR',
        name: 'TripMate Digital Souvenirs',
        description: `Purchase ${nftDetails.title} by ${nftDetails.artist}`,
        retry: { enabled: true, max_count: 1 },
        handler: function (response: any) {
          console.log('Payment successful:', response);
          setPaymentComplete(true);
        },
        prefill: {
          name: 'Guest User',
          email: 'guest@example.com',
          contact: '+919999999999'
        },
        notes: {
          nft_id: nftDetails.id,
          nft_title: nftDetails.title,
          nft_artist: nftDetails.artist
        },
        theme: {
          color: '#9333ea'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      // @ts-ignore - global injected by Razorpay script
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleCryptoPayment = async () => {
    setIsProcessing(true);
    // Simulate crypto payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setPaymentComplete(true);
  };

  const handlePayment = () => {
    if (paymentMethod === 'razorpay') {
      setIsProcessing(true);
      handleRazorpayPayment();
    } else {
      handleCryptoPayment();
    }
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Congratulations! You now own "{nftDetails?.title}" by {nftDetails?.artist}
          </p>
          <button
            onClick={() => navigate('/nft-marketplace')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Return to Marketplace
          </button>
        </motion.div>
      </div>
    );
  }

  if (!nftDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/nft-marketplace')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Marketplace
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* NFT Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Purchase Summary</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{nftDetails.title}</h3>
                <p className="text-gray-600">by {nftDetails.artist}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-xl">
                    {nftDetails.price} {nftDetails.currency}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Gas Fee:</span>
                  <span className="text-gray-900">0.005 ETH</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-xl text-purple-600">
                    {(parseFloat(nftDetails.price) + 0.005).toFixed(3)} {nftDetails.currency}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">Secure Transaction</span>
                </div>
                <p className="text-sm text-blue-700">
                  Your purchase is protected by blockchain technology and smart contracts.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>

            {/* Payment Method Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'razorpay'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Smartphone className="h-6 w-6 mx-auto mb-2" />
                <span className="font-medium">Razorpay</span>
              </button>
              <button
                onClick={() => setPaymentMethod('crypto')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'crypto'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Wallet className="h-6 w-6 mx-auto mb-2" />
                <span className="font-medium">Crypto Wallet</span>
              </button>
            </div>

            {/* Payment Form */}
            {paymentMethod === 'razorpay' ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Smartphone className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-blue-900">Razorpay Payment</h3>
                      <p className="text-sm text-blue-700">Secure payment gateway</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Credit/Debit Cards</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wallet className="h-4 w-4" />
                      <span>UPI, Net Banking, Wallets</span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mt-3">
                    Amount will be converted to INR: ₹{(parseFloat(nftDetails?.price || '0') * 83).toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wallet Address
                  </label>
                  <input
                    type="text"
                    placeholder="0x..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    Make sure you have sufficient {nftDetails?.currency} in your wallet to complete this transaction.
                  </p>
                </div>
              </div>
            )}

            {/* Purchase Button */}
            <motion.button
              onClick={handlePayment}
              disabled={isProcessing}
              whileHover={{ scale: isProcessing ? 1 : 1.02 }}
              whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span>Processing Payment...</span>
                </div>
              ) : (
                paymentMethod === 'razorpay' 
                  ? `Pay ₹${(parseFloat(nftDetails.price) * 83).toLocaleString()} via Razorpay`
                  : `Complete Purchase - ${(parseFloat(nftDetails.price) + 0.005).toFixed(3)} ${nftDetails.currency}`
              )}
            </motion.button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
