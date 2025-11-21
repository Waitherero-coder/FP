import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Auth from '../components/Auth';
import Dashboard from '../components/Dashboard';
import SymptomLogger from '../components/SymptomLogger';
import HealthMetrics from '../components/HealthMetrics';
import Insights from '../components/Insights';
import Resources from '../components/Resources';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentView('dashboard');
  };

  const handleAuthSuccess = () => {
    setCurrentView('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        user={user}
        onSignOut={handleSignOut}
      />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'log-symptoms' && <SymptomLogger />}
        {currentView === 'health-metrics' && <HealthMetrics />}
        {currentView === 'insights' && <Insights />}
        {currentView === 'resources' && <Resources />}
      </main>
    </div>
  );
}

export default App;
