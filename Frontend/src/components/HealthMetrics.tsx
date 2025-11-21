import { useState } from 'react';
import { Activity, Droplet, Scale, Plus } from 'lucide-react';

export default function HealthMetrics() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [exerciseMinutes, setExerciseMinutes] = useState(0);
  const [exerciseType, setExerciseType] = useState('');
  const [weight, setWeight] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Replace Supabase user with your own auth or placeholder
      const userId = '12345'; // TODO: Replace with actual logged-in user ID

      if (!userId) {
        setMessage('Please sign in to log health metrics');
        return;
      }

      // Call your Express backend
      const response = await fetch('http://localhost:5000/api/health-metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          date,
          exerciseMinutes,
          exerciseType: exerciseType || null,
          weight: weight ? parseFloat(weight) : null,
          waterIntake: waterIntake ? parseFloat(waterIntake) : null,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to log metrics');
      }

      setMessage('Health metrics logged successfully!');
      setExerciseMinutes(0);
      setExerciseType('');
      setWeight('');
      setWaterIntake('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to log metrics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Track Health Metrics</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="exercise" className="block text-sm font-medium text-gray-700 mb-2">
              <Activity className="inline w-4 h-4 mr-1" />
              Exercise Duration (minutes)
            </label>
            <input
              type="number"
              id="exercise"
              min="0"
              value={exerciseMinutes}
              onChange={(e) => setExerciseMinutes(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="exerciseType" className="block text-sm font-medium text-gray-700 mb-2">
              Exercise Type
            </label>
            <input
              type="text"
              id="exerciseType"
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              placeholder="e.g., Walking, Yoga, Gym"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
              <Scale className="inline w-4 h-4 mr-1" />
              Weight (kg) - Optional
            </label>
            <input
              type="number"
              id="weight"
              step="0.1"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 65.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="water" className="block text-sm font-medium text-gray-700 mb-2">
              <Droplet className="inline w-4 h-4 mr-1" />
              Water Intake (liters) - Optional
            </label>
            <input
              type="number"
              id="water"
              step="0.1"
              min="0"
              value={waterIntake}
              onChange={(e) => setWaterIntake(e.target.value)}
              placeholder="e.g., 2.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.includes('success')
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {loading ? 'Logging...' : 'Log Metrics'}
        </button>
      </form>
    </div>
  );
}
