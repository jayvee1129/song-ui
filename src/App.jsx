import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Homepage from './pages/Homepage';
import WatchPage from './pages/WatchPage';
import PlaceholderPage from './pages/PlaceholderPage';
import { useSongs } from './hook/useSongs';

function AppShell() {
  const [searchQuery, setSearchQuery] = useState('');
  const { songs, loading, error } = useSongs();

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Header onSearch={setSearchQuery} />

      {/* Sidebar (hidden on mobile) */}
      <Sidebar />

      {/* Main content */}
      <main className="pt-14 md:pl-56">
        <div className="px-4 py-6 md:px-6">
          <Routes>
            <Route
              path="/"
              element={
                <Homepage
                  songs={songs}
                  loading={loading}
                  error={error}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/library" element={<PlaceholderPage title="Library" />} />
            <Route path="/trending" element={<PlaceholderPage title="Trending" />} />
            <Route path="/history" element={<PlaceholderPage title="History" />} />
            <Route path="/subscriptions" element={<PlaceholderPage title="Subscriptions" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}