// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation for Tanzania
export const isValidPhoneNumber = (phone) => {
  // Accept Tanzania phone numbers: +255, 0, or 255
  const phoneRegex = /^(\+255|0|255)[67][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Password validation
export const isValidPassword = (password) => {
  // At least 6 characters, one uppercase, one number
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+255${cleaned.substring(1)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('255')) {
    return `+${cleaned}`;
  }
  return phone;
};

// Format date
export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format time
export const formatTime = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Format datetime
export const formatDateTime = (date) => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get GBV type label
export const getGBVTypeLabel = (type) => {
  const types = {
    physical: 'Physical Violence',
    sexual: 'Sexual Violence',
    psychological: 'Psychological Abuse',
    economic: 'Economic Abuse',
    harassment: 'Harassment',
    other: 'Other',
  };
  return types[type] || 'Unknown';
};

// Validate required fields
export const validateRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

// Form validation
export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const fieldRules = rules[field];

    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = 'This field is required';
    }

    if (value && fieldRules.pattern && !fieldRules.pattern.test(value)) {
      errors[field] = fieldRules.message || 'Invalid format';
    }

    if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `Minimum ${fieldRules.minLength} characters required`;
    }

    if (value && fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = `Maximum ${fieldRules.maxLength} characters allowed`;
    }

    if (fieldRules.custom && value) {
      const customError = fieldRules.custom(value);
      if (customError) {
        errors[field] = customError;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
