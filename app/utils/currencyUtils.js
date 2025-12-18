export const conversionRates = {
  GBP: { GBP: 1, USD: 1.26, NGN: 1700 },
  USD: { GBP: 0.79, USD: 1, NGN: 1350 },
  NGN: { GBP: 0.00059, USD: 0.00074, NGN: 1 },
};

const ALLOWED = Object.keys(conversionRates);

/**
 * Convert a price from one currency to another
 */
export function convertPrice(amount, from, to) {
  if (!ALLOWED.includes(from) || !ALLOWED.includes(to)) {
    console.warn(`Invalid currency conversion: ${from} → ${to}`);
    return amount; // fallback: no conversion
  }

  const rate = conversionRates[from]?.[to];
  if (!rate) return amount; // fallback if no rate available

  return amount * rate;
}

/**
 * Format a price safely
 */
export function formatCurrency(amount, currency) {
  if (!ALLOWED.includes(currency)) {
    console.warn(`Invalid currency code: ${currency}, defaulting to GBP`);
    currency = 'GBP';
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch (err) {
    console.error('formatCurrency failed:', err);
    return `£${amount.toFixed(2)}`; // safe fallback
  }
}
