import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import AIChat from './components/AIChat';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Experiences from './pages/Experiences';
import Matches from './pages/Matches';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

const PAGES = {
  dashboard: Dashboard,
  experiences: Experiences,
  matches: Matches,
  profile: Profile,
  notifications: Notifications,
  credentials: Experiences, // Map credentials to experiences
};

function AppContent() {
  const [activePage, setActivePage] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPremium] = useState(false); // TODO: Get from user auth/profile
  const [hasEnteredApp, setHasEnteredApp] = useState(false);

  // Show welcome page on first load
  if (!hasEnteredApp) {
    return <Welcome onEnterApp={() => setHasEnteredApp(true)} />;
  }

  const PageComponent = PAGES[activePage] || Dashboard;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: `var(--color-background)`,
        color: `var(--color-text)`,
      }}
    >
      {/* Top Navigation */}
      <div className="top-nav">
        <TopNav 
          setActivePage={setActivePage} 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen}
          setShowLogModal={setShowLogModal}
          setIsChatOpen={setIsChatOpen}
        />
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </div>

      {/* Main content */}
      <main
        id="main-content"
      >
        <PageComponent setActivePage={setActivePage} showLogModal={showLogModal} setShowLogModal={setShowLogModal} />
      </main>

      {/* Bottom Navigation for mobile */}
      <div className="bottom-nav">
        <BottomNav activePage={activePage} setActivePage={setActivePage} />
      </div>

      {/* Floating AI Chat Button */}
      <button
        className="ai-chat-fab"
        onClick={() => setIsChatOpen(true)}
        title="AI Assistant"
      >
        🤖
      </button>

      {/* AI Chat */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} isPremium={isPremium} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
