// Simple helpers to make numbers look nice for humans

// Turn numbers into rupees (₹1,00,000 instead of 100000)
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Format numbers the Indian way (1,00,000 instead of 100,000)
export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-IN').format(number);
};

// Clean percentage display (12.50% instead of messy decimals)
export const formatPercentage = (value) => {
  return `${Number(value).toFixed(2)}%`;
};

// Get readable time (like "2:30:45 PM")
export const formatTime = (date) => {
  return date.toLocaleTimeString();
};