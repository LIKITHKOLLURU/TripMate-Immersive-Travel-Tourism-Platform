export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// In production, create order from your backend using SECRET. This is a mock for demo only.
export const createMockOrder = async (amountInRupees: number) => {
  return {
    id: `order_${Date.now()}`,
    amount: amountInRupees * 100, // paise
    currency: 'INR',
  };
};
