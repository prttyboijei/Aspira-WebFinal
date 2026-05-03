import { useState } from 'react';

export default function Welcome({ onEnterApp }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEnter = () => {
    setIsAnimating(true);
    setTimeout(onEnterApp, 300);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primaryHover) 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        opacity: isAnimating ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Logo/Branding */}
      <div style={{ marginBottom: 60, textAlign: 'center' }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: 'white',
            marginBottom: 16,
            fontFamily: 'var(--font-display)',
          }}
        >
          Aspira
        </div>
        <p
          style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 500,
            margin: 0,
            maxWidth: 400,
          }}
        >
          Your Gateway to Premium OJT Verification & Career Growth
        </p>
      </div>

      {/* Feature Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 24,
          maxWidth: 900,
          marginBottom: 60,
          width: '100%',
        }}
      >
        {[
          { icon: '✓', title: 'Instant Verification', desc: 'Get verified experiences validated by supervisors' },
          { icon: '★', title: 'Smart Matching', desc: 'Discover internship opportunities that fit your profile' },
          { icon: '◆', title: 'AI Assistant', desc: 'Get personalized guidance and interview preparation' },
          { icon: '⊙', title: 'Premium Features', desc: 'Unlock advanced tools for career excellence' },
        ].map((feature, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: 16,
              padding: 24,
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              transition: 'transform 0.3s ease, background 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>{feature.icon}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, margin: '0 0 8px 0' }}>
              {feature.title}
            </h3>
            <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={handleEnter}
        style={{
          background: 'white',
          color: 'var(--color-primary)',
          border: 'none',
          borderRadius: 12,
          padding: '16px 48px',
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          letterSpacing: '0.5px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
        }}
      >
        Enter Dashboard →
      </button>

      {/* Footer */}
      <div style={{ marginTop: 60, textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
        <p style={{ margin: 0 }}>
          Aspira © 2024 • Building the future of OJT verification and career excellence
        </p>
      </div>
    </div>
  );
}
