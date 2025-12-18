import { useState, useEffect } from 'react';

const ALLOWED = ['GBP', 'USD', 'NGN'];

export function useCurrency() {
  const [currency, setCurrency] = useState('GBP');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selected-currency');

      // ✅ only accept valid codes
      if (saved && ALLOWED.includes(saved)) {
        setCurrency(saved);
      } else {
        setCurrency('GBP');
        localStorage.setItem('selected-currency', 'GBP');
      }
    }
  }, []);

  return currency;
}
