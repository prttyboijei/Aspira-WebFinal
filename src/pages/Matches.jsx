import { useState, useEffect } from 'react';
import { internshipSlots, currentStudent } from '../data/mockData';

// ── Match scoring engine ──────────────────────────────────────────────────────
function computeMatch(student, slot) {
  const studentSkills = student.skills.map((s) => s.toLowerCase());
  const slotSkills    = slot.skills.map((s) => s.toLowerCase());

  const matched   = slotSkills.filter((s) => studentSkills.includes(s));
  const missing   = slotSkills.filter((s) => !studentSkills.includes(s));
  const skillPct  = slotSkills.length ? (matched.length / slotSkills.length) * 100 : 0;

  const courseFit = slot.courseFit.includes(student.course) ? 20 : 0;
  const scorePct  = Math.min(100, Math.round(skillPct * 0.8 + courseFit));

  return { scorePct, matched, missing };
}

const TYPE_COLOR = {
  'On-site': { bg: '#E8F5F3', text: '#0E8A7C' },
  'Remote':  { bg: '#E8ECF5', text: '#1A3260' },
  'Hybrid':  { bg: '#FEF3E8', text: '#D97B20' },
};

const SCORE_LABEL = (s) => {
  if (s >= 85) return { label: 'Excellent Match', color: '#1A9E6E', bg: '#E0F5EF' };
  if (s >= 65) return { label: 'Good Match',      color: '#0E8A7C', bg: '#E8F5F3' };
  if (s >= 45) return { label: 'Fair Match',       color: '#D97B20', bg: '#FEF3E8' };
  return             { label: 'Stretch Role',       color: '#6B7A90', bg: '#E8EBF0' };
};

export default function Matches() {
  const [sortBy,   setSortBy]   = useState('match');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [applied,  setApplied]  = useState({});
  const [saved,    setSaved]    = useState({});
  const [loading,  setLoading]  = useState(true);

  // Simulate "AI matching" loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  const slotTypes = ['All', ...new Set(internshipSlots.map((s) => s.type))];

  const enriched = internshipSlots.map((slot) => ({
    ...slot,
    ...computeMatch(currentStudent, slot),
  }));

  const filtered = enriched
    .filter((s) => typeFilter === 'All' || s.type === typeFilter)
    .sort((a, b) => {
      if (sortBy === 'match')    return b.scorePct - a.scorePct;
      if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
      if (sortBy === 'slots')    return b.slots - a.slots;
      return 0;
    });

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div className="fade-up" style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', color: '#6B7A90', textTransform: 'uppercase', marginBottom: 6 }}>
          Smart Matching
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 32, color: '#0D1F3C' }}>
          Internship Matches
        </h1>
        <p style={{ color: '#6B7A90', marginTop: 6, fontSize: 15 }}>
          Ranked by how well each slot fits your verified skills and course.
          <span style={{ marginLeft: 8, background: '#E8F5F3', color: '#0E8A7C', borderRadius: 999, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>
            {enriched.filter((s) => s.scorePct >= 65).length} good matches found
          </span>
        </p>
      </div>

      {/* Student Skills Summary */}
      <div
        className="fade-up fade-up-1"
        style={{
          background: '#0D1F3C',
          borderRadius: 14,
          padding: '20px 24px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 4 }}>
            Matching against
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>
            {currentStudent.name} · {currentStudent.course} · {currentStudent.school}
          </div>
        </div>
        <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.1)' }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 6 }}>
            Your Verified Skills
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {currentStudent.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  background: 'rgba(14,138,124,0.25)',
                  color: '#12A898',
                  borderRadius: 999,
                  padding: '3px 10px',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="fade-up fade-up-2" style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {slotTypes.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                border: `2px solid ${typeFilter === t ? '#0E8A7C' : '#E8EBF0'}`,
                background: typeFilter === t ? '#0E8A7C' : 'white',
                color: typeFilter === t ? 'white' : '#6B7A90',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#6B7A90' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              border: '2px solid #E8EBF0',
              borderRadius: 8,
              padding: '7px 12px',
              fontSize: 13,
              fontWeight: 600,
              color: '#0D1F3C',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            <option value="match">Match Score</option>
            <option value="deadline">Deadline</option>
            <option value="slots">Open Slots</option>
          </select>
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                background: 'white',
                borderRadius: 14,
                height: 120,
                animation: 'pulse 1.4s ease-in-out infinite',
                opacity: 0.6,
              }}
            />
          ))}
          <div style={{ textAlign: 'center', color: '#0E8A7C', fontSize: 14, fontWeight: 600, marginTop: 8 }}>
            ⭐ Analyzing your skills against open slots...
          </div>
        </div>
      )}

      {/* Match Cards Grid */}
      {!loading && (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>
          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map((slot, idx) => {
              const quality = SCORE_LABEL(slot.scorePct);
              const isSelected = selected?.id === slot.id;
              const isApplied = applied[slot.id];
              const isSaved   = saved[slot.id];
              const tc = TYPE_COLOR[slot.type] || { bg: '#E8EBF0', text: '#6B7A90' };
              const daysLeft = Math.ceil((new Date(slot.deadline) - new Date()) / 86400000);

              return (
                <div
                  key={slot.id}
                  className="fade-up"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <div
                    onClick={() => setSelected(isSelected ? null : slot)}
                    style={{
                      background: 'white',
                      borderRadius: 14,
                      padding: '20px 24px',
                      boxShadow: isSelected
                        ? '0 0 0 2px #0E8A7C, 0 8px 32px rgba(13,31,60,0.12)'
                        : '0 2px 12px rgba(13,31,60,0.07)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: '2px solid transparent',
                      borderColor: isSelected ? '#0E8A7C' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.boxShadow = '0 4px 24px rgba(13,31,60,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.boxShadow = '0 2px 12px rgba(13,31,60,0.07)';
                    }}
                  >
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      {/* Score Meter */}
                      <div style={{ flexShrink: 0 }}>
                        <MiniScoreRing score={slot.scorePct} color={quality.color} />
                      </div>

                      {/* Main Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                          <span
                            style={{
                              background: quality.bg,
                              color: quality.color,
                              borderRadius: 999,
                              padding: '2px 10px',
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            {quality.label}
                          </span>
                          <span
                            style={{
                              background: tc.bg,
                              color: tc.text,
                              borderRadius: 999,
                              padding: '2px 10px',
                              fontSize: 11,
                              fontWeight: 600,
                            }}
                          >
                            {slot.type}
                          </span>
                          {isApplied && (
                            <span style={{ background: '#E0F5EF', color: '#1A9E6E', borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
                              ✓ Applied
                            </span>
                          )}
                        </div>

                        <div style={{ fontWeight: 700, fontSize: 16, color: '#0D1F3C', marginBottom: 2 }}>
                          {slot.role}
                        </div>
                        <div style={{ fontSize: 13, color: '#6B7A90', marginBottom: 10 }}>
                          {slot.company} · {slot.location} · {slot.duration}
                        </div>

                        {/* Matched Skills */}
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                          {slot.matched.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                background: '#E8F5F3',
                                color: '#0E8A7C',
                                borderRadius: 6,
                                padding: '2px 8px',
                                fontSize: 11,
                                fontWeight: 600,
                                border: '1px solid #C0E8E3',
                              }}
                            >
                              ✓ {skill}
                            </span>
                          ))}
                          {slot.missing.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                background: '#F7F5F0',
                                color: '#6B7A90',
                                borderRadius: 6,
                                padding: '2px 8px',
                                fontSize: 11,
                                fontWeight: 500,
                                border: '1px dashed #D0D5DD',
                              }}
                            >
                              + {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Side */}
                      <div style={{ flexShrink: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                        <div style={{ fontSize: 12, color: daysLeft <= 5 ? '#C93A3A' : '#6B7A90', fontWeight: daysLeft <= 5 ? 700 : 400 }}>
                          {daysLeft <= 0 ? 'Deadline passed' : `${daysLeft}d left`}
                        </div>
                        <div style={{ fontSize: 12, color: '#6B7A90' }}>
                          {slot.slots} slot{slot.slots > 1 ? 's' : ''} open
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSaved((prev) => ({ ...prev, [slot.id]: !prev[slot.id] })); }}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              border: '1.5px solid #E8EBF0',
                              background: isSaved ? '#FEF3E8' : 'white',
                              cursor: 'pointer',
                              fontSize: 14,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {isSaved ? '🔖' : '🏷'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#6B7A90' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>No {typeFilter} slots found.</div>
                <div style={{ fontSize: 14, marginTop: 4 }}>Try adjusting your filter.</div>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selected && <SlotDetail slot={selected} applied={applied} setApplied={setApplied} onClose={() => setSelected(null)} />}
        </div>
      )}
    </div>
  );
}

// ── Mini Score Ring ───────────────────────────────────────────────────────────
function MiniScoreRing({ score, color }) {
  const size = 64, sw = 5;
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E8EBF0" strokeWidth={sw} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 800, color, lineHeight: 1 }}>{score}%</span>
      </div>
    </div>
  );
}

// ── Slot Detail Panel ─────────────────────────────────────────────────────────
function SlotDetail({ slot, applied, setApplied, onClose }) {
  const quality = SCORE_LABEL(slot.scorePct);
  const isApplied = applied[slot.id];
  const deadline = new Date(slot.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div
      className="slide-in"
      style={{
        background: 'white',
        borderRadius: 16,
        padding: '28px',
        boxShadow: '0 4px 32px rgba(13,31,60,0.12)',
        alignSelf: 'flex-start',
        position: 'sticky',
        top: 20,
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
      }}
    >
      {/* Close */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <span
          style={{
            background: quality.bg,
            color: quality.color,
            borderRadius: 999,
            padding: '3px 12px',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {quality.label} — {slot.scorePct}%
        </span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6B7A90', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>
          ×
        </button>
      </div>

      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 20, color: '#0D1F3C', marginBottom: 4 }}>
        {slot.role}
      </h2>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#0E8A7C', marginBottom: 4 }}>{slot.company}</div>
      <div style={{ fontSize: 13, color: '#6B7A90', marginBottom: 20 }}>
        📍 {slot.location} · 🕐 {slot.duration} · 👥 {slot.slots} open slot{slot.slots > 1 ? 's' : ''}
      </div>

      <Divider label="About the role" />
      <p style={{ fontSize: 14, color: '#6B7A90', lineHeight: 1.7, marginBottom: 20 }}>{slot.description}</p>

      <Divider label="Skills match" />
      <div style={{ marginBottom: 20 }}>
        {slot.matched.length > 0 && (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1A9E6E', marginBottom: 8 }}>✅ You have these</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              {slot.matched.map((s) => (
                <span key={s} style={{ background: '#E0F5EF', color: '#1A9E6E', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
        {slot.missing.length > 0 && (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#D97B20', marginBottom: 8 }}>📌 Gap skills to note</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {slot.missing.map((s) => (
                <span key={s} style={{ background: '#FEF3E8', color: '#D97B20', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 600, border: '1px dashed #F0C070' }}>
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <Divider label="Benefits" />
      <ul style={{ paddingLeft: 0, marginBottom: 20, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {slot.benefits.map((b) => (
          <li key={b} style={{ fontSize: 13, color: '#6B7A90', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ color: '#0E8A7C', marginTop: 1 }}>→</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Divider label="Details" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
        {[
          { label: 'Supervisor', value: slot.supervisor },
          { label: 'Industry',  value: slot.industry },
          { label: 'Deadline',  value: deadline },
          { label: 'Type',      value: slot.type },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: '#F7F5F0', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#6B7A90', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0D1F3C' }}>{value}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setApplied((prev) => ({ ...prev, [slot.id]: !prev[slot.id] }))}
        style={{
          width: '100%',
          background: isApplied ? '#1A9E6E' : '#0E8A7C',
          color: 'white',
          border: 'none',
          borderRadius: 10,
          padding: '14px',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = isApplied ? '#158A5E' : '#0D7A6D')}
        onMouseLeave={(e) => (e.currentTarget.style.background = isApplied ? '#1A9E6E' : '#0E8A7C')}
      >
        {isApplied ? '✓ Applied — Undo' : '→ Express Interest'}
      </button>
      {!isApplied && (
        <p style={{ fontSize: 12, color: '#6B7A90', textAlign: 'center', marginTop: 8, lineHeight: 1.5 }}>
          Your Aspira profile is shared automatically. No extra resume needed.
        </p>
      )}
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7A90', textTransform: 'uppercase', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 1, background: '#E8EBF0' }} />
    </div>
  );
}
