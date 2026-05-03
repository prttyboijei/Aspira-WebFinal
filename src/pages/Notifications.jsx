import { useState } from 'react';
import { notifications as initialNotifs } from '../data/mockData';

const TYPE_STYLE = {
  validation:   { icon: '✓', color: '#1A9E6E', bg: '#E0F5EF', bar: '#1A9E6E' },
  profile_view: { icon: '○',  color: '#0E8A7C', bg: '#E8F5F3', bar: '#0E8A7C' },
  match:        { icon: '★', color: '#C9963A', bg: '#F5F0E8', bar: '#C9963A' },
  system:       { icon: '⊙', color: '#6B7A90', bg: '#E8EBF0', bar: '#6B7A90' },
};

export default function Notifications({ setActivePage }) {
  const [notifs, setNotifs] = useState(initialNotifs);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismiss = (id) => setNotifs((prev) => prev.filter((n) => n.id !== id));
  const markRead = (id) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const unreadCount = notifs.filter((n) => !n.read).length;

  const handleCta = (notif) => {
    markRead(notif.id);
    if (notif.type === 'match') setActivePage('matches');
    else if (notif.type === 'profile_view') setActivePage('profile');
    else if (notif.type === 'validation') setActivePage('experiences');
  };

  return (
    <div style={{ padding: '36px 40px', maxWidth: 720, margin: '0 auto' }}>
      {/* Header */}
      <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', color: '#6B7A90', textTransform: 'uppercase', marginBottom: 6 }}>
            Activity
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 32, color: '#0D1F3C' }}>
            Notifications
            {unreadCount > 0 && (
              <span style={{
                marginLeft: 12, background: '#0E8A7C', color: 'white',
                borderRadius: 999, padding: '3px 12px', fontSize: 16, fontWeight: 700,
                verticalAlign: 'middle',
              }}>
                {unreadCount}
              </span>
            )}
          </h1>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{
              background: 'transparent', border: 'none',
              color: '#0E8A7C', fontWeight: 600, fontSize: 14, cursor: 'pointer',
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      {notifs.length === 0 ? (
        <div className="fade-in" style={{ textAlign: 'center', padding: '80px 0', color: '#6B7A90' }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>⊙</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>You're all caught up</div>
          <div style={{ fontSize: 14 }}>No new notifications right now.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {notifs.map((notif, i) => {
            const ts = TYPE_STYLE[notif.type] || TYPE_STYLE.system;
            return (
              <div
                key={notif.id}
                className="fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div
                  style={{
                    background: notif.read ? '#F7F5F0' : 'white',
                    borderRadius: 12,
                    padding: '16px 20px',
                    boxShadow: notif.read ? 'none' : '0 2px 12px rgba(13,31,60,0.07)',
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                    borderLeft: `4px solid ${notif.read ? '#E8EBF0' : ts.bar}`,
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: ts.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>
                    {ts.icon}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: notif.read ? 500 : 700, fontSize: 14, color: '#0D1F3C', marginBottom: 3 }}>
                      {notif.title}
                    </div>
                    <div style={{ fontSize: 13, color: '#6B7A90', lineHeight: 1.5, marginBottom: 10 }}>
                      {notif.detail}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <button
                        onClick={() => handleCta(notif)}
                        style={{
                          background: ts.bg, color: ts.color, border: 'none',
                          borderRadius: 6, padding: '5px 12px', fontSize: 12, fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {notif.cta}
                      </button>
                      <span style={{ fontSize: 12, color: '#6B7A90' }}>{notif.timestamp}</span>
                    </div>
                  </div>

                  {/* Dismiss */}
                  <button
                    onClick={() => dismiss(notif.id)}
                    style={{
                      background: 'none', border: 'none', color: '#C0C7D0',
                      fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: '0 4px',
                      flexShrink: 0,
                    }}
                    title="Dismiss"
                  >
                    ×
                  </button>

                  {/* Unread dot */}
                  {!notif.read && (
                    <div style={{
                      position: 'absolute', top: 16, right: 48,
                      width: 8, height: 8, borderRadius: '50%', background: '#0E8A7C',
                    }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
