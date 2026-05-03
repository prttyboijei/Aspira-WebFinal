import { useState } from 'react';

const QUICK_ACTIONS = [
  {
    id: 'log-task',
    label: 'Log Task',
    icon: '+',
    action: 'log',
  },
  {
    id: 'experiences',
    label: 'Experiences',
    icon: '■',
    action: 'page',
  },
  {
    id: 'matches',
    label: 'Matches',
    icon: '★',
    action: 'page',
  },
  {
    id: 'ai-chat',
    label: 'AI Chat',
    icon: '◆',
    action: 'page',
  },
];

export default function BottomNav({ setActivePage, onLogTask }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        background: `var(--color-sidebar)`,
        borderTop: `1px solid var(--color-border)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 900,
        boxShadow: `0 -2px 8px rgba(0,0,0,0.1)`,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.id}
          onClick={() => {
            if (action.action === 'log') {
              onLogTask();
            } else if (action.action === 'page') {
              setActivePage(action.id);
            }
          }}
          title={action.label}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            background: 'transparent',
            border: 'none',
            color: `var(--color-text)`,
            cursor: 'pointer',
            padding: '8px 0',
            fontSize: 12,
            fontWeight: 500,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = `var(--color-primary)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = `var(--color-text)`;
          }}
        >
          <span style={{ fontSize: 24 }}>{action.icon}</span>
          <span style={{ fontSize: 11 }}>{action.label}</span>
        </button>
      ))}
    </div>
  );
}
