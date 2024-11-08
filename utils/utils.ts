export const getContrastingColor = (hexColor: string): string => {
  // Handle Tamagui token colors
  if (hexColor.startsWith("$")) {
    // Default to dark text for light themed tokens
    return "#000000";
  }

  // Remove the # if present
  hexColor = hexColor.replace("#", "");

  // Parse RGB values
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);

  // Calculate relative luminance using sRGB color space
  // Using the formula from WCAG 2.0
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Use a higher threshold for better contrast
  return luminance > 0.6 ? "#000000" : "#FFFFFF";
};
