import { useState } from 'react';
import ScoreRing from '../components/ScoreRing';
import { currentStudent } from '../data/mockData';

export default function Dashboard({ setActivePage }) {
  const student = currentStudent;
  const verified = student.experiences.filter((e) => e.status === 'verified').length;
  const totalCredentials = student.experiences.length;

  return (
    <div style={{ background: 'var(--blue-pale)', minHeight: '100vh' }}>
      {/* Dashboard Header */}
      <div
        style={{
          background: `linear-gradient(135deg, var(--blue-deep), var(--blue-mid))`,
          padding: '52px 22px 30px',
          borderRadius: '0 0 28px 28px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <p style={{ fontSize: 14, opacity: 0.8 }}>Good morning!</p>
            <p style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 800 }}>{student.name}</p>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.16)',
              borderRadius: 12,
              padding: '10px 14px',
              color: 'white',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Alerts
          </div>
        </div>

        {/* Progress Card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 16,
            padding: '16px 18px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Profile Completion</p>
              <p style={{ fontSize: 14 }}>Your Profile is {Math.round(student.verificationScore)}% done</p>
            </div>
            <div style={{ position: 'relative' }}>
              <ScoreRing score={student.verificationScore} size={60} strokeWidth={6} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 12,
                fontWeight: 800,
                color: 'white'
              }}>
                {Math.round(student.verificationScore)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Body */}
      <div style={{ padding: '18px 20px' }}>
        {/* Stats Row */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <div
            style={{
              flex: 1,
              background: 'white',
              borderRadius: 14,
              padding: '16px',
              boxShadow: 'var(--shadow-sm)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--gray-5)', marginBottom: 8 }}>{totalCredentials}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-4)', fontWeight: 600 }}>Credentials</div>
          </div>
          <div
            style={{
              flex: 1,
              background: 'white',
              borderRadius: 14,
              padding: '16px',
              boxShadow: 'var(--shadow-sm)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--gray-5)', marginBottom: 8 }}>{verified}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-4)', fontWeight: 600 }}>Verified</div>
          </div>
        </div>

        {/* Recent Credentials */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--gray-5)' }}>
              Recent Credentials
            </h3>
            <span
              style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, cursor: 'pointer' }}
              onClick={() => setActivePage('experiences')}
            >
              See all
            </span>
          </div>

          {student.experiences.slice(0, 2).map((exp, index) => (
            <div
              key={exp.id}
              style={{
                background: 'white',
                borderRadius: 14,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                boxShadow: 'var(--shadow-sm)',
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: exp.status === 'verified' ? 'var(--green-bg)' : 'var(--blue-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 700,
                  color: exp.status === 'verified' ? 'var(--green)' : 'var(--blue-mid)',
                  flexShrink: 0,
                }}
              >
                {exp.type === 'internship' ? 'I' : exp.type === 'course' ? 'C' : 'A'}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-5)', margin: 0 }}>
                  {exp.title}
                </p>
                <p style={{ fontSize: 10, color: 'var(--gray-4)', margin: 0 }}>
                  {exp.organization} · {exp.year}
                </p>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '4px 8px',
                  borderRadius: 20,
                  background: exp.status === 'verified' ? 'var(--green-bg)' : 'var(--orange-bg)',
                  color: exp.status === 'verified' ? 'var(--green)' : 'var(--orange)',
                }}
              >
                {exp.status === 'verified' ? 'Verified' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
