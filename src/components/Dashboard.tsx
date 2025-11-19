import { Activity, Brain, Droplet, Moon, TrendingUp } from 'lucide-react';
import { SymptomLog, HealthMetric } from '../types';

interface DashboardProps {
  symptomLogs: SymptomLog[];
  healthMetrics: HealthMetric[];
  onNavigate: (view: string) => void;
}

export default function Dashboard({ symptomLogs, healthMetrics, onNavigate }: DashboardProps) {
  const latestLog = symptomLogs[0];
  const latestMetric = healthMetrics[0];

  const avgEnergyLevel = symptomLogs.length > 0
    ? (symptomLogs.reduce((sum, log) => sum + log.energyLevel, 0) / symptomLogs.length).toFixed(1)
    : 0;

  const avgSleepHours = symptomLogs.length > 0
    ? (symptomLogs.reduce((sum, log) => sum + log.sleepHours, 0) / symptomLogs.length).toFixed(1)
    : 0;

  const totalExercise = healthMetrics.reduce((sum, m) => sum + (m.exerciseMinutes || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
        <p className="text-gray-600">Here's your wellness overview for today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Brain className="h-6 w-6" />}
          label="Current Mood"
          value={latestLog?.mood || 'Not tracked'}
          color="bg-blue-500"
        />
        <StatCard
          icon={<Activity className="h-6 w-6" />}
          label="Avg Energy Level"
          value={`${avgEnergyLevel}/10`}
          color="bg-green-500"
        />
        <StatCard
          icon={<Moon className="h-6 w-6" />}
          label="Avg Sleep"
          value={`${avgSleepHours}h`}
          color="bg-purple-500"
        />
        <StatCard
          icon={<Droplet className="h-6 w-6" />}
          label="Water Today"
          value={`${latestMetric?.waterIntake || 0}L`}
          color="bg-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <TrendingUp className="h-5 w-5 text-rose-500" />
          </div>
          <div className="space-y-4">
            <ActivityItem
              label="Exercise this week"
              value={`${totalExercise} minutes`}
              progress={(totalExercise / 150) * 100}
            />
            <ActivityItem
              label="Symptoms logged"
              value={`${symptomLogs.length} entries`}
              progress={100}
            />
            <ActivityItem
              label="Resources read"
              value="3 articles"
              progress={50}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('tracking')}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all"
            >
              Log Today's Symptoms
            </button>
            <button
              onClick={() => onNavigate('resources')}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Explore Resources
            </button>
            <button
              onClick={() => onNavigate('insights')}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              View My Insights
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Tip</h3>
        <p className="text-gray-700">
          Stay hydrated! Drinking adequate water can help reduce bloating and improve energy levels.
          Aim for 8-10 glasses throughout the day.
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function ActivityItem({ label, value, progress }: { label: string; value: string; progress: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
