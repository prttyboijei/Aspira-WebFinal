import ScoreRing from '../components/ScoreRing';
import ExperienceCard from '../components/ExperienceCard';
import { currentStudent } from '../data/mockData';

const SKILL_CAT = (name) => {
  if (['Laravel', 'MySQL', 'React'].includes(name)) return 'Technical';
  if (name === 'Leadership') return 'Leadership';
  if (name === 'Communication') return 'Communication';
  return 'Soft Skill';
};

const SKILL_STYLE = {
  Technical:     { bg: '#E8F5F3', text: '#0E8A7C' },
  Leadership:    { bg: '#E8ECF5', text: '#1A3260' },
  Communication: { bg: '#FEF3E8', text: '#D97B20' },
  'Soft Skill':  { bg: '#F5F0E8', text: '#C9963A' },
};

export default function Profile() {
  const s = currentStudent;
  const verified = s.experiences.filter((e) => e.status === 'verified');

  const behavioralSignals = [
    { label: 'Task Completion', pct: 85, desc: 'Based on verified vs. submitted tasks' },
    { label: 'Response to Feedback', pct: 78, desc: 'Derived from supervisor notes' },
    { label: 'Consistency', pct: 70, desc: 'Based on log frequency over OJT period' },
  ];

  return (
    <div style={{ padding: '36px 40px', maxWidth: 960, margin: '0 auto' }}>
      {/* Header */}
      <div className="fade-up" style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', color: '#6B7A90', textTransform: 'uppercase', marginBottom: 6 }}>
          Public Profile
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 32, color: '#0D1F3C' }}>
          Verified Profile
        </h1>
        <p style={{ color: '#6B7A90', marginTop: 6, fontSize: 15 }}>
          This is what employers see when you share your profile link.
        </p>
      </div>

      {/* Share Banner */}
      <div
        className="fade-up fade-up-1"
        style={{
          background: 'linear-gradient(135deg, #0D1F3C, #1A3260)',
          borderRadius: 14,
          padding: '18px 24px',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>🔗</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Your public profile link</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
              aspira.ph/p/maria-santos-uslt
            </div>
          </div>
        </div>
        <button
          onClick={() => { navigator.clipboard?.writeText('aspira.ph/p/maria-santos-uslt'); alert('Link copied!'); }}
          style={{
            background: '#0E8A7C', color: 'white', border: 'none', borderRadius: 8,
            padding: '9px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >
          Copy Link
        </button>
      </div>

      {/* Profile Card */}
      <div
        className="fade-up fade-up-2"
        style={{
          background: 'white', borderRadius: 16, padding: '32px',
          boxShadow: '0 4px 24px rgba(13,31,60,0.08)', marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div
            style={{
              width: 90, height: 90, borderRadius: 20, flexShrink: 0,
              background: 'linear-gradient(135deg, #0E8A7C, #1A3260)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, fontWeight: 800, color: 'white',
            }}
          >
            MS
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 26, color: '#0D1F3C', margin: 0 }}>
                {s.name}
              </h2>
              {/* Verification Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#E8F5F3', borderRadius: 999, padding: '4px 12px' }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2L14.9 8.3 22 9.3l-5 5 1.2 7L12 18l-6.2 3.3L7 14.3l-5-5 7.1-1L12 2z" fill="#0E8A7C" />
                </svg>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0E8A7C' }}>Aspira Verified</span>
              </div>
            </div>
            <div style={{ fontSize: 14, color: '#6B7A90', marginBottom: 4 }}>
              {s.course} · {s.school} · {s.yearLevel}
            </div>
            <div style={{ fontSize: 14, color: '#6B7A90', marginBottom: 12 }}>
              OJT at <span style={{ color: '#0D1F3C', fontWeight: 600 }}>{s.ojtCompany}</span>
            </div>
            <p style={{ fontSize: 14, color: '#6B7A90', lineHeight: 1.7, margin: 0 }}>{s.bio}</p>
          </div>

          {/* Score */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <ScoreRing score={s.verificationScore} size={100} strokeWidth={8} />
            <div style={{ fontSize: 12, color: '#6B7A90', marginTop: 8, fontWeight: 500 }}>Verification Score</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Verified Skills */}
        <div
          className="fade-up fade-up-3"
          style={{ background: 'white', borderRadius: 14, padding: '24px', boxShadow: '0 2px 12px rgba(13,31,60,0.07)' }}
        >
          <SectionLabel>Verified Skills</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {s.skills.map((skill) => {
              const cat = SKILL_CAT(skill);
              const style = SKILL_STYLE[cat];
              return (
                <span
                  key={skill}
                  style={{
                    background: style.bg, color: style.text,
                    borderRadius: 8, padding: '6px 14px',
                    fontSize: 13, fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  {skill}
                  <span style={{ fontSize: 10, opacity: 0.7 }}>{cat[0]}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Behavioral Signals */}
        <div
          className="fade-up fade-up-3"
          style={{ background: 'white', borderRadius: 14, padding: '24px', boxShadow: '0 2px 12px rgba(13,31,60,0.07)' }}
        >
          <SectionLabel>Behavioral Signals</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {behavioralSignals.map((sig) => (
              <div key={sig.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0D1F3C' }}>{sig.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0E8A7C' }}>{sig.pct}%</span>
                </div>
                <div style={{ height: 6, background: '#E8EBF0', borderRadius: 999, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%', width: `${sig.pct}%`, background: '#0E8A7C',
                      borderRadius: 999, transition: 'width 1s ease-out',
                    }}
                  />
                </div>
                <div style={{ fontSize: 11, color: '#6B7A90', marginTop: 3 }}>{sig.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="fade-up fade-up-4" style={{ background: 'white', borderRadius: 14, padding: '28px', boxShadow: '0 2px 12px rgba(13,31,60,0.07)' }}>
        <SectionLabel>Experience Timeline</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {s.experiences.map((exp) => <ExperienceCard key={exp.id} exp={exp} />)}
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#6B7A90',
      textTransform: 'uppercase', marginBottom: 16,
    }}>
      {children}
    </div>
  );
}
