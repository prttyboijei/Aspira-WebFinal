import { useState } from 'react';
import ExperienceCard from '../components/ExperienceCard';
import { currentStudent } from '../data/mockData';

const FILTERS = ['All', 'Verified', 'Pending', 'Flagged'];

export default function Experiences() {
  const [filter, setFilter] = useState('All');
  const experiences = currentStudent.experiences;
  const filtered = filter === 'All' ? experiences : experiences.filter((e) => e.status === filter.toLowerCase());

  return (
    <div style={{ padding: '36px 40px', maxWidth: 900, margin: '0 auto' }}>
      <div className="fade-up" style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', color: '#6B7A90', textTransform: 'uppercase', marginBottom: 6 }}>
          Work Evidence
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 32, color: '#0D1F3C' }}>
          My Experiences
        </h1>
        <p style={{ color: '#6B7A90', marginTop: 6, fontSize: 15 }}>
          Each verified task builds your Aspira score and strengthens your profile.
        </p>
      </div>

      {/* Filters */}
      <div className="fade-up fade-up-1" style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              border: `2px solid ${filter === f ? '#0E8A7C' : '#E8EBF0'}`,
              background: filter === f ? '#0E8A7C' : 'white',
              color: filter === f ? 'white' : '#6B7A90',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {f}
            <span
              style={{
                marginLeft: 6,
                background: filter === f ? 'rgba(255,255,255,0.25)' : '#E8EBF0',
                color: filter === f ? 'white' : '#6B7A90',
                borderRadius: 999,
                padding: '0 6px',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {f === 'All' ? experiences.length : experiences.filter((e) => e.status === f.toLowerCase()).length}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="fade-up fade-up-2" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: '#6B7A90' }}>
            <div style={{ fontSize: 48, marginBottom: 12, fontWeight: 700 }}>No messages</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No {filter.toLowerCase()} experiences yet.</div>
            <div style={{ fontSize: 14 }}>Log a new task to get started.</div>
          </div>
        ) : (
          filtered.map((exp) => <ExperienceCard key={exp.id} exp={exp} />)
        )}
      </div>
    </div>
  );
}
