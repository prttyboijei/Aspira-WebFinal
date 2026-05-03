import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import AIChat from './components/AIChat';
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
};

function AppContent() {
  const [activePage, setActivePage] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPremium] = useState(false); // TODO: Get from user auth/profile

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
      <TopNav setActivePage={setActivePage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Sidebar - Show on desktop, hide on mobile when menuOpen is false */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* Main content */}
      <main
        style={{
          flex: 1,
          marginTop: 72, // TopNav height
          marginBottom: 80, // BottomNav height for mobile
          minHeight: 'calc(100vh - 152px)',
          overflowY: 'auto',
          paddingBottom: 16,
          '@media (max-width: 768px)': {
            marginLeft: 0,
          },
        }}
        id="main-content"
      >
        <PageComponent setActivePage={setActivePage} showLogModal={showLogModal} setShowLogModal={setShowLogModal} />
      </main>

      {/* Bottom Navigation - Mobile only */}
      <BottomNav setActivePage={setActivePage} onLogTask={() => setShowLogModal(true)} />

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
