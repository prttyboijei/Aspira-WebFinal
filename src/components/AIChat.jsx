import { useState } from 'react';

const PREMIUM_FEATURES = [
  { id: 'resume', label: 'Smart Resume Builder', icon: '📄', locked: true },
  { id: 'interview', label: 'AI Interview Simulation', icon: '🎤', locked: true },
  { id: 'mock', label: 'Personalized Mock Interviews', icon: '🎯', locked: true },
  { id: 'guidance', label: 'Career Mentorship', icon: '🎓', locked: true },
];

export default function AIChat({ isOpen, onClose, isPremium }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! I\'m Aspira AI, your career assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('chat');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: 'I\'m processing your request. In a production app, this would connect to an AI service.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 70,
        right: 16,
        width: 'min(100% - 32px, 400px)',
        maxHeight: '600px',
        background: `var(--color-sidebar)`,
        borderRadius: 16,
        boxShadow: `var(--shadow-xl)`,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 950,
        border: `1px solid var(--color-border)`,
        '@media (max-width: 768px)': {
          width: 'calc(100% - 32px)',
          height: 'calc(100% - 200px)',
          bottom: 100,
        },
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px',
          borderBottom: `1px solid var(--color-border)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🤖</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: `var(--color-text)` }}>Aspira AI</div>
            <div style={{ fontSize: 12, color: `var(--color-textSecondary)` }}>
              {isPremium ? 'Premium' : 'Free'}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: 18,
            cursor: 'pointer',
            color: `var(--color-text)`,
          }}
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          borderBottom: `1px solid var(--color-border)`,
          paddingX: '8px',
        }}
      >
        <button
          onClick={() => setActiveTab('chat')}
          style={{
            flex: 1,
            background: activeTab === 'chat' ? `var(--color-primary)` : 'transparent',
            color: activeTab === 'chat' ? 'white' : `var(--color-text)`,
            border: 'none',
            padding: '12px 8px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            borderRadius: '8px 8px 0 0',
            transition: 'all 0.2s',
          }}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('features')}
          style={{
            flex: 1,
            background: activeTab === 'features' ? `var(--color-primary)` : 'transparent',
            color: activeTab === 'features' ? 'white' : `var(--color-text)`,
            border: 'none',
            padding: '12px 8px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            borderRadius: '8px 8px 0 0',
            transition: 'all 0.2s',
          }}
        >
          Features
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {activeTab === 'chat' ? (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: 12,
                    background: msg.sender === 'user' ? `var(--color-primary)` : `var(--color-surface)`,
                    color: msg.sender === 'user' ? 'white' : `var(--color-text)`,
                    fontSize: 14,
                    lineHeight: 1.4,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PREMIUM_FEATURES.map((feature) => (
              <div
                key={feature.id}
                style={{
                  padding: '16px',
                  borderRadius: 12,
                  border: `1px solid var(--color-border)`,
                  background: feature.locked && !isPremium ? `var(--color-surface)` : 'transparent',
                  opacity: feature.locked && !isPremium ? 0.6 : 1,
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 20 }}>{feature.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: `var(--color-text)` }}>
                        {feature.label}
                      </div>
                    </div>
                  </div>
                  {feature.locked && !isPremium && (
                    <span style={{ fontSize: 16 }}>🔒</span>
                  )}
                </div>
              </div>
            ))}
            {!isPremium && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '16px',
                  background: `linear-gradient(135deg, #0E8A7C 0%, #0D7A6D 100%)`,
                  borderRadius: 12,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Unlock Premium</div>
                <div style={{ fontSize: 13, marginBottom: 12 }}>₱59/month for unlimited AI features</div>
                <button
                  style={{
                    background: 'white',
                    color: `var(--color-primary)`,
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 13,
                  }}
                >
                  Upgrade Now
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      {activeTab === 'chat' && (
        <div
          style={{
            padding: '12px',
            borderTop: `1px solid var(--color-border)`,
            display: 'flex',
            gap: 8,
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            style={{
              flex: 1,
              border: `1px solid var(--color-border)`,
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 14,
              background: `var(--color-background)`,
              color: `var(--color-text)`,
              outline: 'none',
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              background: `var(--color-primary)`,
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '8px 12px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
