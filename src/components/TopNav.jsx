import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function TopNav({ setActivePage, setMenuOpen, menuOpen, setShowLogModal, setIsChatOpen }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationCount] = useState(2);

  const quickActions = [
    { id: 'log-task', label: 'Log Experience', icon: '■' },
    { id: 'matches', label: 'Find Matches', icon: '★' },
    { id: 'ai-chat', label: 'AI Assistant', icon: '◆' },
  ];

  const menuItems = [
    { id: 'notifications', label: 'Notifications', icon: '⊙', badge: notificationCount },
    { id: 'separator' },
    ...quickActions,
    { id: 'separator' },
    { id: 'profile', label: 'My Profile', icon: '●' },
    { id: 'preferences', label: 'Preferences', icon: '◇' },
    { id: 'appearance', label: 'Appearance', icon: '◐', submenu: true },
    { id: 'help', label: 'Help', icon: '?' },
    { id: 'about', label: 'About', icon: 'ⓘ' },
    { id: 'logout', label: 'Logout', icon: '⊠', danger: true },
  ];

  const appearanceOptions = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'system', label: 'System' },
  ];

  const handleMenuItemClick = (id) => {
    if (id === 'separator') return;
    if (id === 'notifications') {
      setActivePage('notifications');
      setProfileMenuOpen(false);
    } else if (id === 'profile') {
      setActivePage('profile');
      setProfileMenuOpen(false);
    } else if (id === 'log-task') {
      setShowLogModal?.(true);
      setProfileMenuOpen(false);
    } else if (id === 'matches') {
      setActivePage('matches');
      setProfileMenuOpen(false);
    } else if (id === 'ai-chat') {
      setIsChatOpen?.(true);
      setProfileMenuOpen(false);
    } else if (id === 'logout') {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 72,
        background: `var(--color-sidebar)`,
        borderBottom: `1px solid var(--color-border)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: '16px',
        zIndex: 1000,
        boxShadow: `var(--shadow-sm)`,
      }}
    >
      {/* Left: Menu Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          title="Toggle menu"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: `var(--color-text)`,
            fontSize: 24,
          }}
        >
          ☰
        </button>

        {/* Logo (desktop only) */}
        <div
          style={{
            display: 'none',
            '@media (min-width: 768px)': {
              display: 'flex',
            },
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: `var(--color-primary)`,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L18 7v6l-8 5-8-5V7L10 2z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M10 2v16M2 7l8 5 8-5" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: `var(--font-display)`,
                fontWeight: 800,
                color: `var(--color-text)`,
                fontSize: 18,
                letterSpacing: '-0.3px',
                lineHeight: 1,
              }}
            >
              Aspira
            </div>
          </div>
        </div>
      </div>

      {/* Right: Profile Menu */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: `var(--color-text)`,
            fontSize: 24,
            borderRadius: 8,
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `var(--color-surface)`)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          ●
        </button>

        {/* Profile Dropdown Menu */}
        {profileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 8,
              background: `var(--color-sidebar)`,
              border: `1px solid var(--color-border)`,
              borderRadius: 12,
              boxShadow: `var(--shadow-lg)`,
              minWidth: 220,
              zIndex: 1001,
              overflow: 'hidden',
            }}
          >
            {menuItems.map((item, idx) => (
              <div key={item.id || idx}>
                {item.id === 'separator' ? (
                  <div style={{ height: 1, background: `var(--color-border)`, margin: '4px 0' }} />
                ) : item.submenu ? (
                  <div>
                    <div
                      style={{
                        padding: '12px 16px',
                        fontSize: 14,
                        fontWeight: 600,
                        color: `var(--color-text)`,
                        borderBottom: `1px solid var(--color-border)`,
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {appearanceOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            toggleTheme(opt.id);
                            setProfileMenuOpen(false);
                          }}
                          style={{
                            background: theme === opt.id ? `var(--color-primary)` : 'transparent',
                            color: theme === opt.id ? 'white' : `var(--color-text)`,
                            border: `1px solid ${theme === opt.id ? `var(--color-primary)` : `var(--color-border)`}`,
                            borderRadius: 8,
                            padding: '8px 12px',
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleMenuItemClick(item.id)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: 14,
                      fontWeight: 500,
                      background: 'transparent',
                      border: 'none',
                      color: item.danger ? '#C93A3A' : `var(--color-text)`,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      borderBottom: idx !== menuItems.length - 1 && menuItems[idx + 1]?.id !== 'separator' ? `1px solid var(--color-border)` : 'none',
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `var(--color-surface)`)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        style={{
                          marginLeft: 'auto',
                          background: `var(--color-primary)`,
                          color: 'white',
                          fontSize: 11,
                          fontWeight: 700,
                          borderRadius: 999,
                          padding: '1px 7px',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
