// Predefined colors for habits (colorblind-friendly palette)
export const HABIT_COLORS = [
  '#FF8C00', // Dark Orange
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#9C27B0', // Purple
  '#FF5252', // Red
  '#00BCD4', // Cyan
  '#795548', // Brown
  '#607D8B', // Blue Grey
  '#FFC107', // Amber
  '#673AB7', // Deep Purple
];

export const getHabitColor = (index: number): string => {
  return HABIT_COLORS[index % HABIT_COLORS.length];
};