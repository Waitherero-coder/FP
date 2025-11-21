import { useEffect, useState } from 'react';
import type { SymptomLog, HealthMetric } from '../types';
import { Calendar, TrendingUp, Activity, Heart } from 'lucide-react';

export default function Dashboard() {
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace Supabase user with your own auth or placeholder
      const userId = '12345'; // TODO: Replace with actual logged-in user ID

      if (!userId) return;

      // Fetch symptom logs and health metrics from your Express backend
      const [symptomsRes, metricsRes] = await Promise.all([
        fetch(`http://localhost:5000/api/symptom-logs?userId=${userId}`),
        fetch(`http://localhost:5000/api/health-metrics?userId=${userId}`),
      ]);

      if (!symptomsRes.ok || !metricsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const symptomsData = await symptomsRes.json();
      const metricsData = await metricsRes.json();

      setSymptomLogs(symptomsData);
      setHealthMetrics(metricsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-blue-100 text-blue-800',
      fair: 'bg-yellow-100 text-yellow-800',
      poor: 'bg-red-100 text-red-800',
    };
    return colors[mood as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading your data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Health Dashboard</h2>
        <p className="text-gray-600">Track your progress and stay informed about your health</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Logs</p>
              <p className="text-3xl font-bold mt-1">{symptomLogs.length}</p>
            </div>
            <Calendar className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Health Metrics</p>
              <p className="text-3xl font-bold mt-1">{healthMetrics.length}</p>
            </div>
            <Activity className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Avg Energy</p>
              <p className="text-3xl font-bold mt-1">
                {symptomLogs.length > 0
                  ? (
                      symptomLogs.reduce((sum, log) => sum + log.energy_level, 0) /
                      symptomLogs.length
                    ).toFixed(1)
                  : '0'}
                /10
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-pink-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Recent Symptom Logs
          </h3>
          {symptomLogs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No symptom logs yet</p>
          ) : (
            <div className="space-y-3">
              {symptomLogs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{log.date}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(
                        log.mood
                      )}`}
                    >
                      {log.mood}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>
                      <strong>Energy:</strong> {log.energy_level}/10 |{' '}
                      <strong>Sleep:</strong> {log.sleep_hours}h
                    </p>
                    {log.symptoms.length > 0 && (
                      <p className="mt-1">
                        <strong>Symptoms:</strong> {log.symptoms.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Recent Health Metrics
          </h3>
          {healthMetrics.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No health metrics yet</p>
          ) : (
            <div className="space-y-3">
              {healthMetrics.slice(0, 5).map((metric) => (
                <div
                  key={metric.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{metric.date}</span>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <strong>Exercise:</strong> {metric.exercise_minutes} minutes
                      {metric.exercise_type && ` (${metric.exercise_type})`}
                    </p>
                    {metric.weight && (
                      <p>
                        <strong>Weight:</strong> {metric.weight} kg
                      </p>
                    )}
                    {metric.water_intake && (
                      <p>
                        <strong>Water:</strong> {metric.water_intake} L
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
