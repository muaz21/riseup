export interface Gradient {
  from: string;
  to: string;
}

export interface Theme {
  gradients: {
    [key: string]: Gradient;
  };
  // You can add other theme properties here in the future
  // e.g., fonts, spacing, radii, etc.
}

export const theme: Theme = {
  gradients: {
    'purple-pink': { from: '#2563eb', to: '#3b82f6' }, // Blue-600 to Blue-500
    'blue-purple': { from: '#2563eb', to: '#1d4ed8' }, // Blue-600 to Blue-700
    'teal-blue': { from: '#3b82f6', to: '#2563eb' }, // Blue-500 to Blue-600
    'pink-orange': { from: '#2563eb', to: '#3b82f6' }, // Blue-600 to Blue-500
    'indigo-pink': { from: '#1d4ed8', to: '#2563eb' }, // Blue-700 to Blue-600
    'green-teal': { from: '#2563eb', to: '#3b82f6' }, // Blue-600 to Blue-500
  },
};

/**
 * Utility function to get a gradient from the theme by its name or index.
 */
export const getGradientByName = (name: string): Gradient | undefined => {
  return theme.gradients[name];
};

export const getGradientByIndex = (index: number): Gradient => {
  const gradientKeys = Object.keys(theme.gradients);
  const key = gradientKeys[index % gradientKeys.length];
  return theme.gradients[key];
};