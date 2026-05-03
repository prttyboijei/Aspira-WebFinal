import { useEffect, useRef } from 'react';

export default function ScoreRing({ score = 0, size = 120, strokeWidth = 10 }) {
  const circleRef = useRef(null);
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (score / 100) * circumference;

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    // Start from full offset (empty), then animate to target
    el.style.strokeDashoffset = circumference;
    const t = requestAnimationFrame(() => {
      el.style.transition = 'stroke-dashoffset 1s ease-out';
      el.style.strokeDashoffset = targetOffset;
    });
    return () => cancelAnimationFrame(t);
  }, [score, circumference, targetOffset]);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
      {/* Center label */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: size * 0.22,
            fontWeight: 800,
            color: 'var(--color-text)',
            fontFamily: "var(--font-body)",
            lineHeight: 1,
          }}
        >
          {score}
        </span>
        <span style={{ fontSize: size * 0.1, color: 'var(--color-textSecondary)', fontWeight: 500 }}>
          / 100
        </span>
      </div>
    </div>
  );
}
