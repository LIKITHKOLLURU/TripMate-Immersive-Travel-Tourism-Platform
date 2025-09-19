# Razorpay Payment Gateway Setup

This guide will help you set up Razorpay payment gateway for the NFT Marketplace.

## Prerequisites

1. Create a Razorpay account at [https://razorpay.com](https://razorpay.com)
2. Get your API keys from the Razorpay dashboard

## Setup Steps

### 1. Get Razorpay API Keys

1. Login to your Razorpay dashboard
2. Go to Settings → API Keys
3. Generate API keys for your account
4. Copy the Key ID and Key Secret

### 2. Update Environment Variables

Add the following to your `.env` file:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
```

### 3. Update Payment Component

In `src/pages/Payment.tsx`, replace the test key with your actual key:

```typescript
const options = {
  key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_9999999999', // Your actual key
  // ... other options
};
```

### 4. Backend Integration (Optional)

For production use, you should verify payments on the backend:

1. Create a payment verification endpoint
2. Use Razorpay webhooks to handle payment status
3. Update NFT ownership in your database

## Test Mode

The current implementation uses test mode. Test payments will work with:

- **Test Card Numbers**: 4111 1111 1111 1111
- **Any future expiry date**
- **Any CVV**

## Production Checklist

- [ ] Replace test keys with live keys
- [ ] Add payment verification on backend
- [ ] Set up webhooks for payment status
- [ ] Add proper error handling
- [ ] Implement refund functionality
- [ ] Add payment history tracking

## Features Included

✅ **Payment Methods Supported:**
- Credit/Debit Cards
- UPI
- Net Banking
- Digital Wallets
- EMI options

✅ **Security Features:**
- PCI DSS compliant
- 256-bit SSL encryption
- Fraud detection
- 3D Secure authentication

✅ **User Experience:**
- Mobile responsive
- Multiple payment options
- Real-time payment status
- Automatic currency conversion (ETH to INR)

## Currency Conversion

The system automatically converts NFT prices from ETH to INR:
- Current rate: 1 ETH = ₹83,000 (approximate)
- Update the conversion rate in `Payment.tsx` as needed

## Support

For Razorpay integration issues:
- Documentation: [https://razorpay.com/docs](https://razorpay.com/docs)
- Support: [https://razorpay.com/support](https://razorpay.com/support)
