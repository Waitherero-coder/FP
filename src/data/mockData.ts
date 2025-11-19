import { Resource, SymptomLog, HealthMetric } from '../types';

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Understanding PCOS',
    category: 'Education',
    description: 'Learn about Polycystic Ovary Syndrome, its symptoms, and how it affects your body.',
    content: 'PCOS is a hormonal disorder affecting 1 in 10 women of reproductive age. Common symptoms include irregular periods, excess androgen levels, and polycystic ovaries. Understanding your condition is the first step toward managing it effectively.'
  },
  {
    id: '2',
    title: 'Nutrition for PCOS',
    category: 'Nutrition',
    description: 'Discover dietary approaches that can help manage PCOS symptoms.',
    content: 'A balanced diet low in refined carbohydrates and high in fiber can help manage insulin resistance. Focus on whole foods, lean proteins, healthy fats, and plenty of vegetables. Small, frequent meals can help stabilize blood sugar levels.'
  },
  {
    id: '3',
    title: 'Exercise and Movement',
    category: 'Fitness',
    description: 'Learn how physical activity can improve PCOS symptoms.',
    content: 'Regular exercise helps improve insulin sensitivity, manage weight, and reduce stress. Aim for 150 minutes of moderate activity per week. Mix cardio with strength training for best results. Even 10-minute walks can make a difference.'
  },
  {
    id: '4',
    title: 'Mental Health & PCOS',
    category: 'Mental Health',
    description: 'Address the emotional impact of living with PCOS.',
    content: 'PCOS can affect mental health, with higher rates of anxiety and depression. Stress management techniques like meditation, yoga, and connecting with support communities can help. Remember, seeking professional help is a sign of strength.'
  },
  {
    id: '5',
    title: 'Managing Irregular Periods',
    category: 'Symptoms',
    description: 'Tips for tracking and managing irregular menstrual cycles.',
    content: 'Keep a period tracker to identify patterns. Birth control pills or other medications may help regulate cycles. Lifestyle changes including stress reduction and maintaining a healthy weight can also improve regularity.'
  },
  {
    id: '6',
    title: 'Sleep and PCOS',
    category: 'Wellness',
    description: 'Why quality sleep matters for hormone balance.',
    content: 'Poor sleep can worsen insulin resistance and hormone imbalances. Aim for 7-9 hours of quality sleep. Create a bedtime routine, limit screen time before bed, and keep your bedroom cool and dark.'
  }
];

export const mockSymptomLogs: SymptomLog[] = [
  {
    id: '1',
    date: '2025-11-19',
    mood: 'Good',
    energyLevel: 7,
    sleepHours: 7.5,
    symptoms: ['Fatigue', 'Bloating'],
    notes: 'Felt better after morning walk'
  },
  {
    id: '2',
    date: '2025-11-18',
    mood: 'Tired',
    energyLevel: 5,
    sleepHours: 6,
    symptoms: ['Fatigue', 'Mood Swings', 'Cramps'],
    notes: 'Stressful day at work'
  },
  {
    id: '3',
    date: '2025-11-17',
    mood: 'Great',
    energyLevel: 8,
    sleepHours: 8,
    symptoms: [],
    notes: 'Feeling energized!'
  }
];

export const mockHealthMetrics: HealthMetric[] = [
  {
    id: '1',
    date: '2025-11-19',
    weight: 68.5,
    exerciseMinutes: 30,
    waterIntake: 2.5
  },
  {
    id: '2',
    date: '2025-11-18',
    weight: 68.8,
    exerciseMinutes: 15,
    waterIntake: 2.0
  },
  {
    id: '3',
    date: '2025-11-17',
    weight: 69.0,
    exerciseMinutes: 45,
    waterIntake: 3.0
  }
];
