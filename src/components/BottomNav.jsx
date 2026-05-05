import { useState } from 'react';

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Home',
    icon: 'H',
  },
  {
    id: 'experiences',
    label: 'Progress',
    icon: 'P',
  },
  {
    id: 'credentials', // center fab
    label: 'Credentials',
    icon: 'C',
  },
  {
    id: 'notifications',
    label: 'Alerts',
    icon: 'A',
  },
  {
    id: 'profile',
    label: 'Settings',
    icon: 'S',
  },
];

export default function BottomNav({ activePage, setActivePage }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 68,
        background: 'white',
        borderTop: `1px solid var(--gray-2)`,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        zIndex: 900,
        borderRadius: '0 0 44px 44px',
        padding: '0 8px 14px',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {NAV_ITEMS.slice(0, 2).map((item) => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            background: 'transparent',
            border: 'none',
            color: activePage === item.id ? 'var(--blue-mid)' : 'var(--gray-4)',
            cursor: 'pointer',
            padding: '0',
            fontSize: 9,
            fontWeight: 700,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 700 }}>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}

      {/* Center FAB */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          position: 'relative',
          top: -18,
        }}
      >
        <button
          onClick={() => setActivePage('credentials')}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: `linear-gradient(135deg, var(--blue-mid), var(--accent))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            boxShadow: '0 6px 20px rgba(59,91,219,0.45)',
            border: '3px solid white',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          C
        </button>
        <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--blue-mid)' }}>
          Credentials
        </span>
      </div>

      {NAV_ITEMS.slice(3).map((item) => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            background: 'transparent',
            border: 'none',
            color: activePage === item.id ? 'var(--blue-mid)' : 'var(--gray-4)',
            cursor: 'pointer',
            padding: '0',
            fontSize: 9,
            fontWeight: 700,
          }}
        >
          <span style={{ fontSize: 18 }}>{item.icon}</span>
          <span style={{ fontWeight: 'bold' }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
