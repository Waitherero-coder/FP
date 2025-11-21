import React, { useState, useEffect, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';

// Lazy load main components
const Dashboard = lazy(() => import('./components/Dashboard'));
const Insights = lazy(() => import('./components/Insights'));
const Resources = lazy(() => import('./components/Resources'));
const SymptomLogger = lazy(() => import('./components/SymptomLogger'));

// Unified loading spinner
function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      <p className="ml-4 text-gray-600 text-lg">Loading...</p>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <Loading />;

  if (!user) {
    return <Auth onAuthSuccess={() => setUser(supabase.auth.getUser())} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">PCOS Connect</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          onClick={async () => {
            await supabase.auth.signOut();
            setUser(null);
          }}
        >
          Sign Out
        </button>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <Insights />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <SymptomLogger />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <Resources />
        </Suspense>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
