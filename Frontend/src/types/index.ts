export interface SymptomLog {
  id: string;
  user_id: string;
  date: string;
  mood: 'excellent' | 'good' | 'fair' | 'poor';
  energy_level: number;
  sleep_hours: number;
  symptoms: string[];
  notes?: string;
}

export interface HealthMetric {
  id: string;
  user_id: string;
  date: string;
  exercise_minutes?: number;
  exercise_type?: string;
  weight?: number;
  water_intake?: number;
  [key: string]: any;
}

export interface TrendData {
  average_energy: number;
  average_sleep: number;
  most_common_symptoms: { symptom: string; count: number }[];
  mood_distribution: Record<'excellent' | 'good' | 'fair' | 'poor', number>;
  total_logs: number;
}

export interface Insight {
  type: 'trend' | 'alert' | 'recommendation';
  title: string;
  description: string;
  severity?: 'warning' | 'success' | 'info';
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'all' | 'nutrition' | 'exercise' | 'mental-health' | 'medical' | 'lifestyle';
  content?: string;
  url?: string;
  created_at?: string;
}

