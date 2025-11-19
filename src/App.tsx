import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Resources from './components/Resources';
import SymptomTracking from './components/SymptomTracking';
import Insights from './components/Insights';
import Footer from './components/Footer';
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header activeView={activeView} onViewChange={setActiveView} />

      <main className="flex-grow">
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
      </main>

      <Footer />
    </div>
  );
}

export default App;
