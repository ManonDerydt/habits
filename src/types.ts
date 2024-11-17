export interface Habit {
  id: string;
  title: string;
  emoji: string;
  description: string;
  time: string;
  duration: string;
  completed: boolean;
  streakDays: number;
  dailyRecords: {
    [date: string]: boolean;
  };
  selectedDays: string[];
  category: string;
  benefit: string;
  frequency: string;
  goalDays?: number;
  startDate: string;
}