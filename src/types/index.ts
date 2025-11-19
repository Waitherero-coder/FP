export interface SymptomLog {
  id: string;
  date: string;
  mood: string;
  energyLevel: number;
  sleepHours: number;
  symptoms: string[];
  notes: string;
}

export interface HealthMetric {
  id: string;
  date: string;
  weight?: number;
  bloodSugar?: number;
  exerciseMinutes?: number;
  waterIntake?: number;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
}

export interface UserProfile {
  fullName: string;
  age?: number;
  diagnosisDate?: string;
}
