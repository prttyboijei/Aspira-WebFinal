import { useState } from 'react';
import ScoreRing from '../components/ScoreRing';
import ExperienceCard from '../components/ExperienceCard';
import { currentStudent } from '../data/mockData';

export default function Dashboard({ setActivePage, showLogModal: parentShowLogModal, setShowLogModal: parentSetShowLogModal }) {
  const [showLogModal, setShowLogModal] = useState(parentShowLogModal || false);
  const student = currentStudent;
  const verified = student.experiences.filter((e) => e.status === 'verified').length;
  const pending = student.experiences.filter((e) => e.status === 'pending').length;

  return (
    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Greeting */}
      <div className="fade-up" style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 13, color: 'var(--color-textSecondary)', fontWeight: 500, marginBottom: 4 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 'clamp(24px, 5vw, 32px)',
            color: 'var(--color-text)',
            lineHeight: 1.2,
          }}
        >
          Good {getGreeting()}, {student.name.split(' ')[0]} 👋
        </h1>
        <p style={{ color: 'var(--color-textSecondary)', marginTop: 6, fontSize: 15 }}>
          Here's your verification progress at a glance.
        </p>
      </div>

      {/* Pending Banner */}
      {pending > 0 && (
        <div
          className="fade-up fade-up-1"
          style={{
            background: 'var(--color-surface)',
            border: `1px solid var(--color-border)`,
            borderRadius: 12,
            padding: '14px 20px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18 }}>⏳</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>
              You have <span style={{ color: 'var(--color-primary)' }}>{pending} task{pending > 1 ? 's' : ''}</span> awaiting supervisor validation.
            </span>
          </div>
          <button
            style={{
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            onClick={() => setActivePage('experiences')}
          >
            View Tasks →
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div
        className="fade-up fade-up-2"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
          marginBottom: 32,
        }}
      >
        {/* Score Ring Card */}
        <div
          style={{
            background: 'var(--color-sidebar)',
            borderRadius: 16,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            boxShadow: `var(--shadow-sm)`,
            border: `1px solid var(--color-border)`,
          }}
        >
          <ScoreRing score={student.verificationScore} size={90} strokeWidth={8} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', color: 'var(--color-textSecondary)', textTransform: 'uppercase', marginBottom: 6 }}>
              Verification Score
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-primary)', marginBottom: 4 }}>
              {student.verificationScore} / 100
            </div>
            <div style={{ fontSize: 13, color: 'var(--color-textSecondary)' }}>
              Log 2 more tasks to reach <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>80</span>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        {[
          { label: 'Verified Tasks', value: verified, icon: '✅', color: '#1A9E6E', bg: '#E0F5EF' },
          { label: 'Pending Validation', value: pending, icon: '⏳', color: '#D97B20', bg: '#FEF3E8' },
          { label: 'Skills Logged', value: student.skills.length, icon: '⚡', color: 'var(--color-primary)', bg: '#E8F5F3' },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: 'var(--color-sidebar)',
              borderRadius: 16,
              padding: '24px',
              boxShadow: `var(--shadow-sm)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: `1px solid var(--color-border)`,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: stat.bg,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 16,
              }}
            >
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-textSecondary)', marginTop: 4 }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Experiences */}
      <div className="fade-up fade-up-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--color-text)' }}>
            Recent Experiences
          </h2>
          <button
            onClick={() => setActivePage('experiences')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-primary)',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            View all →
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {student.experiences.slice(0, 3).map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </div>

      {/* Log Modal */}
      {(showLogModal || parentShowLogModal) && (
        <LogModal
          onClose={() => {
            setShowLogModal(false);
            parentSetShowLogModal?.(false);
          }}
        />
      )}
    </div>
  );
}

function LogModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    dateStart: '',
    dateEnd: '',
  });
  const [aiPreview, setAiPreview] = useState('');

  const categories = ['Technical', 'Leadership', 'Communication', 'Soft Skill'];

  const generatePreview = () => {
    if (form.title && form.description.length > 20) {
      setAiPreview(
        `${form.category || 'Student'} demonstrated initiative by ${form.title.toLowerCase()}, producing a measurable output aligned with OJT objectives.`
      );
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001,
        padding: 24,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="fade-up"
        style={{
          background: 'var(--color-sidebar)',
          borderRadius: 20,
          width: '100%',
          maxWidth: 560,
          padding: '36px',
          boxShadow: 'var(--shadow-xl)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', color: 'var(--color-textSecondary)', textTransform: 'uppercase', marginBottom: 4 }}>
              Log Experience
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--color-text)' }}>
              Submit for Validation
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-textSecondary)', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>
            ×
          </button>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {[1, 2].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 4,
                background: step >= s ? 'var(--color-primary)' : 'var(--color-border)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Input label="Task Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="e.g. Built internal inventory dashboard" />
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-textSecondary)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Category
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setForm({ ...form, category: cat })}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 999,
                      border: `2px solid ${form.category === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      background: form.category === cat ? 'var(--color-surface)' : 'transparent',
                      color: form.category === cat ? 'var(--color-primary)' : 'var(--color-text)',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Input label="Date Start" type="date" value={form.dateStart} onChange={(v) => setForm({ ...form, dateStart: v })} />
              <Input label="Date End" type="date" value={form.dateEnd} onChange={(v) => setForm({ ...form, dateEnd: v })} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-textSecondary)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                What did you do? <span style={{ color: 'var(--color-textSecondary)', fontWeight: 400 }}>(be specific)</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                onBlur={generatePreview}
                rows={4}
                placeholder="Describe the output you produced..."
                style={{
                  width: '100%',
                  border: `2px solid var(--color-border)`,
                  borderRadius: 10,
                  padding: '12px 14px',
                  fontSize: 14,
                  color: 'var(--color-text)',
                  background: 'var(--color-background)',
                  resize: 'vertical',
                  transition: 'border-color 0.15s',
                  lineHeight: 1.6,
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
              />
            </div>

            {aiPreview && (
              <div
                style={{
                  border: `2px solid var(--color-primary)`,
                  borderRadius: 10,
                  padding: '14px 16px',
                  background: 'var(--color-surface)',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
                  🤖 Supervisor preview
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-text)', fontStyle: 'italic' }}>"{aiPreview}"</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', gap: 10, marginTop: 28, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                background: 'transparent',
                border: `1.5px solid var(--color-border)`,
                color: 'var(--color-text)',
                borderRadius: 10,
                padding: '12px 22px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={() => {
              if (step === 1) {
                generatePreview();
                setStep(2);
              } else {
                alert('Experience submitted for validation! ✅');
                onClose();
              }
            }}
            style={{
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primaryHover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-primary)')}
          >
            {step === 1 ? 'Next →' : 'Submit →'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-textSecondary)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          border: `2px solid var(--color-border)`,
          borderRadius: 10,
          padding: '12px 14px',
          fontSize: 14,
          color: 'var(--color-text)',
          background: 'var(--color-background)',
          transition: 'border-color 0.15s',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
      />
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}
