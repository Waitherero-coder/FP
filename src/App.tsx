import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Resources from './components/Resources';
import SymptomTracking from './components/SymptomTracking';
import Insights from './components/Insights';
import { mockResources, mockSymptomLogs, mockHealthMetrics } from './data/mockData';
import { SymptomLog, HealthMetric } from './types';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>(mockSymptomLogs);
  const [healthMetrics] = useState<HealthMetric[]>(mockHealthMetrics);

  const handleAddLog = (log: Omit<SymptomLog, 'id'>) => {
    const newLog: SymptomLog = {
      ...log,
      id: Date.now().toString()
    };
    setSymptomLogs([newLog, ...symptomLogs]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeView={activeView} onViewChange={setActiveView} />

      {activeView === 'dashboard' && (
        <Dashboard
          symptomLogs={symptomLogs}
          healthMetrics={healthMetrics}
          onNavigate={setActiveView}
        />
      )}

      {activeView === 'tracking' && (
        <SymptomTracking
          symptomLogs={symptomLogs}
          onAddLog={handleAddLog}
        />
      )}

      {activeView === 'resources' && (
        <Resources resources={mockResources} />
      )}

      {activeView === 'insights' && (
        <Insights
          symptomLogs={symptomLogs}
          healthMetrics={healthMetrics}
        />
      )}
    </div>
  );
}

export default App;
