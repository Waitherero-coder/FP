import { useState } from 'react';
import { Heart, Moon, Zap, Plus } from 'lucide-react';

const COMMON_SYMPTOMS = [
  'Irregular periods',
  'Acne',
  'Hair loss',
  'Weight gain',
  'Fatigue',
  'Mood swings',
  'Anxiety',
  'Depression',
  'Difficulty sleeping',
  'Headaches',
  'Bloating',
  'Cramps',
];

export default function SymptomLogger() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [sleepHours, setSleepHours] = useState(7);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Send data to your Express backend
      const res = await fetch('/api/symptom-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          mood,
          symptoms: selectedSymptoms,
          energy_level: energyLevel,
          sleep_hours: sleepHours,
          notes: notes || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to log symptoms');
      }

      setMessage('Symptom log added successfully!');
      setSelectedSymptoms([]);
      setNotes('');
      setMood('good');
      setEnergyLevel(5);
      setSleepHours(7);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to log symptoms');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Log Your Symptoms</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date input */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Heart className="inline w-4 h-4 mr-1" />
            How are you feeling?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['excellent', 'good', 'fair', 'poor'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                  mood === m
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Symptoms
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {COMMON_SYMPTOMS.map((symptom) => (
              <button
                key={symptom}
                type="button"
                onClick={() => toggleSymptom(symptom)}
                className={`py-2 px-3 text-sm rounded-lg border transition-colors ${
                  selectedSymptoms.includes(symptom)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        {/* Energy Level */}
        <div>
          <label htmlFor="energy" className="block text-sm font-medium text-gray-700 mb-2">
            <Zap className="inline w-4 h-4 mr-1" />
            Energy Level: {energyLevel}/10
          </label>
          <input
            type="range"
            id="energy"
            min="1"
            max="10"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Sleep Hours */}
        <div>
          <label htmlFor="sleep" className="block text-sm font-medium text-gray-700 mb-2">
            <Moon className="inline w-4 h-4 mr-1" />
            Hours of Sleep
          </label>
          <input
            type="number"
            id="sleep"
            min="0"
            max="24"
            step="0.5"
            value={sleepHours}
            onChange={(e) => setSleepHours(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any additional details you'd like to record..."
          />
        </div>

        {/* Message */}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {loading ? 'Adding Log...' : 'Add Log'}
        </button>
      </form>
    </div>
  );
}
