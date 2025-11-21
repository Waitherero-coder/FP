import { useEffect, useState } from 'react';
import type { SymptomLog, Insight, TrendData } from '../types';
import { TrendingUp, AlertCircle, Lightbulb, CheckCircle } from 'lucide-react';

export default function Insights() {
  const [trends, setTrends] = useState<TrendData | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      // Replace with your logged-in user ID from your auth system
      const userId = '12345'; // TODO: replace with real user ID

      if (!userId) return;

      // Fetch symptom logs from Express + MongoDB
      const res = await fetch(`http://localhost:5000/api/symptom-logs?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch symptom logs');

      const logs: SymptomLog[] = await res.json();
      if (!logs || logs.length === 0) {
        setLoading(false);
        return;
      }

      const trendData = calculateTrends(logs);
      setTrends(trendData);
      setInsights(generateInsights(trendData));
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTrends = (logs: SymptomLog[]): TrendData => {
    const totalLogs = logs.length;
    const avgEnergy = logs.reduce((sum, log) => sum + log.energy_level, 0) / totalLogs;
    const avgSleep = logs.reduce((sum, log) => sum + log.sleep_hours, 0) / totalLogs;

    const symptomCounts: Record<string, number> = {};
    logs.forEach((log) => {
      log.symptoms.forEach((symptom) => {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
      });
    });

    const mostCommonSymptoms = Object.entries(symptomCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([symptom, count]) => ({ symptom, count }));

    const moodDistribution: Record<string, number> = {};
    logs.forEach((log) => {
      moodDistribution[log.mood] = (moodDistribution[log.mood] || 0) + 1;
    });

    return {
      average_energy: avgEnergy,
      average_sleep: avgSleep,
      most_common_symptoms: mostCommonSymptoms,
      mood_distribution: moodDistribution,
      total_logs: totalLogs,
    };
  };

  const generateInsights = (data: TrendData): Insight[] => {
    const generatedInsights: Insight[] = [];

    if (data.average_energy < 4) {
      generatedInsights.push({
        type: 'alert',
        title: 'Low Energy Levels',
        description:
          'Your average energy level is quite low. Consider consulting with your healthcare provider about fatigue management strategies.',
        severity: 'warning',
      });
    } else if (data.average_energy >= 7) {
      generatedInsights.push({
        type: 'recommendation',
        title: 'Great Energy Levels',
        description:
          "You're maintaining good energy levels! Keep up with your current lifestyle habits.",
        severity: 'success',
      });
    }

    if (data.average_sleep < 7) {
      generatedInsights.push({
        type: 'recommendation',
        title: 'Improve Sleep Quality',
        description:
          'Try to get 7-9 hours of sleep per night. Good sleep is crucial for managing PCOS symptoms.',
        severity: 'warning',
      });
    } else if (data.average_sleep >= 7 && data.average_sleep <= 9) {
      generatedInsights.push({
        type: 'trend',
        title: 'Healthy Sleep Pattern',
        description:
          "You're getting adequate sleep. This can help with hormone regulation and overall well-being.",
        severity: 'success',
      });
    }

    if (data.most_common_symptoms.length > 0) {
      const topSymptom = data.most_common_symptoms[0];
      generatedInsights.push({
        type: 'trend',
        title: `Most Common Symptom: ${topSymptom.symptom}`,
        description: `You've reported "${topSymptom.symptom}" ${topSymptom.count} times. Consider discussing this with your healthcare provider.`,
        severity: 'info',
      });
    }

    const poorMoodCount = data.mood_distribution['poor'] || 0;
    const fairMoodCount = data.mood_distribution['fair'] || 0;
    const totalNegativeMood = poorMoodCount + fairMoodCount;

    if (totalNegativeMood > data.total_logs * 0.5) {
      generatedInsights.push({
        type: 'alert',
        title: 'Mood Concerns',
        description:
          'You\'ve been experiencing lower moods frequently. Mental health is important - consider reaching out to a mental health professional.',
        severity: 'warning',
      });
    }

    generatedInsights.push({
      type: 'recommendation',
      title: 'Stay Consistent',
      description:
        'Keep logging your symptoms regularly. The more data you track, the better insights you can gain about your health patterns.',
      severity: 'info',
    });

    return generatedInsights;
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="w-6 h-6" />;
      case 'alert':
        return <AlertCircle className="w-6 h-6" />;
      case 'recommendation':
        return <Lightbulb className="w-6 h-6" />;
      default:
        return <CheckCircle className="w-6 h-6" />;
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Analyzing your data...</div>
      </div>
    );
  }

  if (!trends) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Yet</h2>
          <p className="text-gray-600">
            Start logging your symptoms to see personalized insights and trends!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Health Insights</h2>
        <p className="text-gray-600">
          Based on {trends.total_logs} logged entries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Average Energy</h3>
          <p className="text-3xl font-bold text-blue-600">
            {trends.average_energy.toFixed(1)}/10
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Average Sleep</h3>
          <p className="text-3xl font-bold text-green-600">
            {trends.average_sleep.toFixed(1)}h
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Logs</h3>
          <p className="text-3xl font-bold text-purple-600">{trends.total_logs}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Top Symptoms</h3>
        {trends.most_common_symptoms.length === 0 ? (
          <p className="text-gray-500">No symptoms recorded yet</p>
        ) : (
          <div className="space-y-3">
            {trends.most_common_symptoms.map(({ symptom, count }) => (
              <div key={symptom} className="flex items-center justify-between">
                <span className="text-gray-700">{symptom}</span>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-200 rounded-full h-2 w-32">
                    <div
                      className="bg-blue-500 rounded-full h-2"
                      style={{
                        width: `${(count / trends.total_logs) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Personalized Recommendations</h3>
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-6 ${getSeverityColor(insight.severity)}`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">{getInsightIcon(insight.type)}</div>
              <div>
                <h4 className="font-bold text-lg mb-2">{insight.title}</h4>
                <p className="text-sm leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
