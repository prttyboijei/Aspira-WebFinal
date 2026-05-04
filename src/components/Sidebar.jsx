import { useState } from 'react';

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '🏠',
  },
  {
    id: 'experiences',
    label: 'Log Task',
    icon: '📝',
  },
  {
    id: 'matches',
    label: 'Internships',
    icon: '💼',
    badge: '3',
  },
  {
    id: 'profile',
    label: 'My Profile',
    icon: '👤',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: '🔔',
    badge: '2',
  },
];

export default function Sidebar({ activePage, setActivePage, isOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay - proper z-index layering */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 98,
            display: 'none',
            pointerEvents: 'auto',
          }}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className="sidebar-container"
        style={{
          width: collapsed ? 68 : 240,
          minHeight: '100vh',
          background: `var(--color-sidebar)`,
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.25s ease, transform 0.25s ease',
          position: 'fixed',
          left: 0,
          top: 72,
          bottom: 0,
          zIndex: 99,
          overflow: 'hidden',
          borderRight: `1px solid var(--color-border)`,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          style={{
            display: 'none',
            position: 'absolute',
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'transparent',
            border: 'none',
            color: `var(--color-textSecondary)`,
            cursor: 'pointer',
            fontSize: 20,
            zIndex: 100,
            padding: 0,
            lineHeight: 1,
          }}
          className="mobile-close-btn"
          title="Close menu"
        >
          ✕
        </button>
        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map((item) => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  onClose?.();
                }}
                title={collapsed ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: collapsed ? '12px 14px' : '11px 14px',
                  borderRadius: 10,
                  background: active ? `rgba(var(--color-primary), 0.1)` : 'transparent',
                  color: active ? `var(--color-primary)` : `var(--color-textSecondary)`,
                  fontWeight: active ? 600 : 400,
                  fontSize: 14,
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = `var(--color-surface)`;
                  if (!active) e.currentTarget.style.color = `var(--color-text)`;
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = 'transparent';
                  if (!active) e.currentTarget.style.color = `var(--color-textSecondary)`;
                }}
              >
                {active && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      bottom: '20%',
                      width: 3,
                      background: `var(--color-primary)`,
                      borderRadius: '0 3px 3px 0',
                    }}
                  />
                )}
                <span style={{ flexShrink: 0, fontSize: 18 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.badge && (
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
                {collapsed && item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: `var(--color-primary)`,
                      borderRadius: 999,
                      width: 8,
                      height: 8,
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 10px', borderTop: `1px solid var(--color-border)` }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 10,
              background: 'transparent',
              color: `var(--color-textSecondary)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-end',
              gap: 8,
              fontSize: 13,
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = `var(--color-text)`)}
            onMouseLeave={(e) => (e.currentTarget.style.color = `var(--color-textSecondary)`)}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}
            >
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {!collapsed && <span>Collapse</span>}
          </button>

          {!collapsed && (
            <div
              style={{
                marginTop: 8,
                padding: '10px 14px',
                borderRadius: 10,
                background: `var(--color-surface)`,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, var(--color-primary), #1A3260)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 13,
                  flexShrink: 0,
                }}
              >
                MS
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: `var(--color-text)`,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Maria Santos
                </div>
                <div style={{ fontSize: 11, color: `var(--color-textSecondary)` }}>BSIT · USL-T</div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
