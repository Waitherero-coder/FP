export interface Database {
  public: {
    Tables: {
      symptom_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          mood: 'excellent' | 'good' | 'fair' | 'poor';
          symptoms: string[];
          energy_level: number;
          sleep_hours: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date?: string;
          mood: 'excellent' | 'good' | 'fair' | 'poor';
          symptoms?: string[];
          energy_level: number;
          sleep_hours: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          mood?: 'excellent' | 'good' | 'fair' | 'poor';
          symptoms?: string[];
          energy_level?: number;
          sleep_hours?: number;
          notes?: string | null;
          created_at?: string;
        };
      };
      health_metrics: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          exercise_minutes: number;
          exercise_type: string | null;
          weight: number | null;
          water_intake: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date?: string;
          exercise_minutes?: number;
          exercise_type?: string | null;
          weight?: number | null;
          water_intake?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          exercise_minutes?: number;
          exercise_type?: string | null;
          weight?: number | null;
          water_intake?: number | null;
          created_at?: string;
        };
      };
      resources: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: 'nutrition' | 'exercise' | 'mental-health' | 'medical' | 'lifestyle';
          url: string | null;
          content: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: 'nutrition' | 'exercise' | 'mental-health' | 'medical' | 'lifestyle';
          url?: string | null;
          content?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: 'nutrition' | 'exercise' | 'mental-health' | 'medical' | 'lifestyle';
          url?: string | null;
          content?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
