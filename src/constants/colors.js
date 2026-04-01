export const colors = {
  primary: '#1E88E5',
  secondary: '#43A047',
  accent: '#FB8C00',
  danger: '#E53935',
  warning: '#FFA726',
  success: '#43A047',
  info: '#29B6F6',
  light: '#ECEFF1',
  dark: '#212121',
  lightGray: '#F5F5F5',
  mediumGray: '#BDBDBD',
  gray: '#757575',
  darkGray: '#424242',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const GBV_TYPES = [
  { id: 1, label: 'Physical Violence', value: 'physical' },
  { id: 2, label: 'Sexual Violence', value: 'sexual' },
  { id: 3, label: 'Psychological Abuse', value: 'psychological' },
  { id: 4, label: 'Economic Abuse', value: 'economic' },
  { id: 5, label: 'Harassment', value: 'harassment' },
  { id: 6, label: 'Other', value: 'other' },
];

export const EMERGENCY_CONTACTS = [
  {
    id: 1,
    name: 'Police Emergency',
    phone: '112',
    country: 'Tanzania',
  },
  {
    id: 2,
    name: 'Emergency Medical',
    phone: '995',
    country: 'Tanzania',
  },
  {
    id: 3,
    name: 'Fire & Rescue',
    phone: '114',
    country: 'Tanzania',
  },
];
