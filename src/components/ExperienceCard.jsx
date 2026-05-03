import StatusChip from './StatusChip';

const BORDER = {
  verified: '#1A9E6E',
  pending: '#D97B20',
  flagged: '#C93A3A',
  draft: 'var(--color-border)',
};

const CAT_COLOR = {
  Technical: { bg: '#E8F5F3', text: '#0E8A7C' },
  Leadership: { bg: '#E8ECF5', text: '#1A3260' },
  Communication: { bg: '#FEF3E8', text: '#D97B20' },
  'Soft Skill': { bg: '#F5F0E8', text: '#C9963A' },
};

export default function ExperienceCard({ exp }) {
  const cat = CAT_COLOR[exp.category] || { bg: 'var(--color-surface)', text: 'var(--color-textSecondary)' };
  const fmt = (d) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div
      style={{
        background: 'var(--color-sidebar)',
        borderRadius: 12,
        borderLeft: `4px solid ${BORDER[exp.status] || 'var(--color-border)'}`,
        padding: '16px 20px',
        boxShadow: `var(--shadow-sm)`,
        transition: 'box-shadow 0.2s ease',
        border: `1px solid var(--color-border)`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `var(--shadow-lg)`)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `var(--shadow-sm)`)}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 8,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text)', flex: 1, paddingRight: 12 }}>
          {exp.title}
        </div>
        <StatusChip status={exp.status} />
      </div>

      <p
        style={{
          fontSize: 13,
          color: 'var(--color-textSecondary)',
          fontStyle: 'italic',
          marginBottom: 12,
          lineHeight: 1.55,
        }}
      >
        "{exp.aiSummary}"
      </p>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span
          style={{
            background: cat.bg,
            color: cat.text,
            borderRadius: 6,
            padding: '3px 10px',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {exp.category}
        </span>
        <span style={{ fontSize: 12, color: 'var(--color-textSecondary)' }}>
          {exp.company} · {fmt(exp.dateStart)} – {fmt(exp.dateEnd)}
        </span>
      </div>
    </div>
  );
}
