const STYLES = {
  verified: { bg: '#E0F5EF', text: '#1A9E6E', label: 'Verified' },
  pending: { bg: '#FEF3E8', text: '#D97B20', label: 'Pending' },
  flagged: { bg: '#FFF0F0', text: '#C93A3A', label: 'Flagged' },
  draft: { bg: 'var(--color-surface)', text: 'var(--color-textSecondary)', label: 'Draft' },
  applied: { bg: '#E8ECF5', text: '#1A3260', label: 'Applied' },
};

export default function StatusChip({ status }) {
  const s = STYLES[status] || STYLES.draft;
  return (
    <span
      style={{
        background: s.bg,
        color: s.text,
        borderRadius: 999,
        padding: '3px 10px',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.2px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {s.label}
    </span>
  );
}
