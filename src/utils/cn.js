/**
 * Utility function to combine class names conditionally
 * @param {...any} classes - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim();
} 