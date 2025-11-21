import mongoose from 'mongoose';
import Resource from './models/Resources';

const resources = [
  {
    title: 'Healthy Meal Plans for PCOS',
    description: 'A guide to plan your meals to manage PCOS symptoms effectively.',
    content: 'Include lots of fiber, protein, and low glycemic index foods...',
    category: 'nutrition',
    url: 'https://example.com/meal-plans',
  },
  {
    title: 'PCOS-friendly Workouts',
    description: 'Exercise routines that can help manage PCOS.',
    content: 'Focus on cardio and strength training, 3-5 times per week...',
    category: 'exercise',
    url: 'https://example.com/pcos-workouts',
  },
  {
    title: 'Managing Stress with Mindfulness',
    description: 'Tips and exercises to reduce stress and improve mental health.',
    content: 'Daily meditation, journaling, and yoga practices...',
    category: 'mental-health',
    url: 'https://example.com/mindfulness',
  },
  {
    title: 'Understanding PCOS',
    description: 'Comprehensive medical information about PCOS.',
    category: 'medical',
    url: 'https://example.com/pcos-info',
  },
  {
    title: 'Lifestyle Changes for Hormonal Balance',
    description: 'Practical lifestyle tips for managing PCOS.',
    content: 'Sleep 7-9 hours, avoid processed foods, and stay active...',
    category: 'lifestyle',
    url: 'https://example.com/lifestyle-tips',
  },
];

async function seed() {
  try {
    await mongoose.connect('mongodb://localhost:27017/pcos_connect', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    await Resource.deleteMany({});
    await Resource.insertMany(resources);

    console.log('Resources seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
