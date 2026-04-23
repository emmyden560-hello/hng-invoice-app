// Option A: Using date-fns (Best for production)
import { format } from 'date-fns';

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(amount);
};

export const formatDate = (dateString) => {
    if (!dateString) return '';

    // 1. Robust Date Parsing
    const date = new Date(dateString);

    // 2. Safety Check: If date is invalid, return raw string or fallback
    if (isNaN(date.getTime())) {
        return dateString;
    }

    // 3. Format
    try {
        return format(date, 'd MMM yyyy');
    } catch (e) {
        // Fallback if date-fns fails or isn't installed
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
};
