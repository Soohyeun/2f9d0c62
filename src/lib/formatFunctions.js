/**
 * Format a date string into a human-readable time string.
 * @param {string} dateString - valid date format of date as a string
 * @returns {string} - The formatted time string in "HH:MM AM/PM" format (e.g., "12:05 PM")
 */
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format a date string into a human-readable.
 * @param {string} dateString - valid date format of date as a string
 * @returns {string} - The formatted date string in "MONTH DAY, YEAR" format (e.g., "JANUARY 1, 2024")
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
};
