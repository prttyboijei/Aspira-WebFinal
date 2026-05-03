import { useState } from 'react';
import { currentStudent } from '../data/mockData';

export default function Profile() {
  const s = currentStudent;
  const [resume, setResume] = useState(null);
  const [profileViews] = useState(127);
  const [skills, setSkills] = useState(['React', 'Laravel', 'MySQL', 'Leadership', 'Communication']);
  const [workExperience] = useState([
    { company: 'Tech Corp', position: 'Frontend Developer', duration: 'Jan 2024 - Present', type: 'Internship' },
    { company: 'StartupXYZ', position: 'UI/UX Designer', duration: 'Jun 2023 - Dec 2023', type: 'Freelance' },
  ]);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) setResume(file.name);
  };

  const handleDownloadProfile = () => {
    alert('Downloading profile as PDF...');
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div style={{ padding: '24px', maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div className="fade-up" style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(24px, 5vw, 32px)',
            color: 'var(--color-text)',
            margin: 0,
            marginBottom: 8,
          }}
        >
          My Professional Profile
        </h1>
        <p style={{ color: 'var(--color-textSecondary)', fontSize: 15, margin: 0 }}>
          Manage your professional information and share with companies
        </p>
      </div>

      {/* Profile Header Card */}
      <div
        className="fade-up fade-up-1"
        style={{
          background: `linear-gradient(135deg, var(--color-primary), var(--color-primaryHover))`,
          borderRadius: 16,
          padding: '32px',
          color: 'white',
          marginBottom: 32,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 24,
          alignItems: 'center',
        }}
      >
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px 0' }}>{s.name}</h2>
          <p style={{ fontSize: 16, opacity: 0.95, margin: 0, marginBottom: 16 }}>
            OJT Student • Aspira Verified ✓
          </p>
          <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
            <div>
              <div style={{ opacity: 0.8, marginBottom: 4 }}>Profile Views</div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{profileViews}</div>
            </div>
            <div>
              <div style={{ opacity: 0.8, marginBottom: 4 }}>Verification Score</div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{s.verificationScore}/100</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={handleDownloadProfile}
            style={{
              background: 'white',
              color: 'var(--color-primary)',
              border: 'none',
              borderRadius: 10,
              padding: '12px 20px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: 14,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.9)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
          >
            ↓ Download Profile
          </button>
          <button
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 10,
              padding: '12px 20px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: 14,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
          >
            Share Profile
          </button>
        </div>
      </div>

      {/* Resume Section */}
      <div
        className="fade-up fade-up-2"
        style={{
          background: 'var(--color-sidebar)',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 24,
          border: `1px solid var(--color-border)`,
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 16px 0' }}>
          □ Resume
        </h3>

        {resume ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              background: 'var(--color-surface)',
              borderRadius: 12,
              border: `1px solid var(--color-primary)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 24 }}>📄</span>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-text)' }}>{resume}</div>
                <div style={{ fontSize: 12, color: 'var(--color-textSecondary)' }}>Ready for download</div>
              </div>
            </div>
            <button
              onClick={() => setResume(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-textSecondary)',
                cursor: 'pointer',
                fontSize: 18,
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <label
              htmlFor="resume-upload"
              style={{
                display: 'block',
                border: `2px dashed var(--color-primary)`,
                borderRadius: 12,
                padding: '32px',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'var(--color-surface)',
                transition: 'all 0.2s',
                color: 'var(--color-text)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-background)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-surface)')}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>↑</div>
              <p style={{ margin: '0 0 4px 0', fontWeight: 600 }}>Upload your resume</p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--color-textSecondary)' }}>
                PDF, DOC, or DOCX (max 5MB)
              </p>
            </label>
            <input
              type="file"
              onChange={handleResumeUpload}
              style={{ display: 'none' }}
              accept=".pdf,.doc,.docx"
              id="resume-upload"
            />
          </>
        )}
      </div>

      {/* Skills Section */}
      <div
        className="fade-up fade-up-3"
        style={{
          background: 'var(--color-sidebar)',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 24,
          border: `1px solid var(--color-border)`,
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 16px 0' }}>
          ★ Skills & Competencies
        </h3>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          {skills.map((skill, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 16px',
                background: 'var(--color-surface)',
                border: `1px solid var(--color-border)`,
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--color-text)',
              }}
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-textSecondary)',
                  cursor: 'pointer',
                  fontSize: 16,
                  padding: 0,
                  marginLeft: 4,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          style={{
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 14,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.9)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
        >
          + Add Skill
        </button>
      </div>

      {/* Work Experience Section */}
      <div
        className="fade-up fade-up-4"
        style={{
          background: 'var(--color-sidebar)',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 24,
          border: `1px solid var(--color-border)`,
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 16px 0' }}>
          ◆ Work Experience
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
          {workExperience.map((exp, i) => (
            <div
              key={i}
              style={{
                padding: '16px',
                background: 'var(--color-surface)',
                border: `1px solid var(--color-border)`,
                borderRadius: 12,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                gap: 12,
              }}
            >
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 4px 0' }}>
                  {exp.position}
                </h4>
                <p style={{ fontSize: 13, color: 'var(--color-textSecondary)', margin: '0 0 6px 0' }}>
                  {exp.company}
                </p>
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--color-textSecondary)' }}>
                  <span>{exp.duration}</span>
                  <span>•</span>
                  <span
                    style={{
                      background: 'var(--color-primary)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {exp.type}
                  </span>
                </div>
              </div>
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-textSecondary)',
                  cursor: 'pointer',
                  fontSize: 18,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          style={{
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 14,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.9)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
        >
          + Add Experience
        </button>
      </div>

      {/* Profile Stats */}
      <div
        className="fade-up fade-up-5"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {[
          { label: 'Profile Completeness', value: '85%', icon: '◆' },
          { label: 'Applications Sent', value: '12', icon: '★' },
          { label: 'Profile Shares', value: '23', icon: '⊙' },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: 'var(--color-sidebar)',
              borderRadius: 12,
              padding: '20px',
              border: `1px solid var(--color-border)`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 13, color: 'var(--color-textSecondary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
