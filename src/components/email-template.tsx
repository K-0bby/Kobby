import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmailTemplate = ({
  name,
  email,
  message,
}: EmailTemplateProps) => {
  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#f3f4f6',
        padding: '40px 20px',
        margin: 0,
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '4px solid #e5e7eb',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Header Section */}
        <div
          style={{
            background: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
            padding: '32px',
            textAlign: 'center' as const,
            position: 'relative' as const,
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute' as const,
              top: '20px',
              left: '20px',
              width: '12px',
              height: '12px',
              backgroundColor: 'rgba(59, 130, 246, 0.3)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute' as const,
              top: '32px',
              right: '32px',
              width: '16px',
              height: '16px',
              backgroundColor: 'rgba(147, 51, 234, 0.2)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute' as const,
              bottom: '24px',
              left: '40px',
              width: '8px',
              height: '8px',
              backgroundColor: 'rgba(245, 158, 11, 0.4)',
              borderRadius: '50%',
            }}
          />

          <h1
            style={{
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '8px',
              letterSpacing: '1px',
              margin: '0 0 8px 0',
            }}
          >
            New Contact Message
          </h1>
          <p
            style={{
              color: '#e5e7eb',
              fontSize: '16px',
              margin: 0,
              opacity: 0.9,
            }}
          >
            You have received a new message from your portfolio website
          </p>
        </div>

        {/* Content Section */}
        <div style={{ padding: '32px' }}>
          {/* Contact Information Card */}
          <div
            style={{
              backgroundColor: '#f9fafb',
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
            }}
          >
            <h2
              style={{
                color: '#111827',
                fontWeight: '600',
                margin: '0 0 16px 0',
                textTransform: 'uppercase' as const,
                letterSpacing: '2px',
                fontSize: '14px',
              }}
            >
              Contact Details
            </h2>
            
            <div style={{ marginBottom: '12px' }}>
              <strong
                style={{
                  color: '#4b5563',
                  fontSize: '14px',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '1px',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Name:
              </strong>
              <span
                style={{
                  color: '#111827',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                {name}
              </span>
            </div>

            <div>
              <strong
                style={{
                  color: '#4b5563',
                  fontSize: '14px',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '1px',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Email:
              </strong>
              <a
                href={`mailto:${email}`}
                style={{
                  color: '#2563eb',
                  fontSize: '16px',
                  fontWeight: '500',
                  textDecoration: 'none',
                }}
              >
                {email}
              </a>
            </div>
          </div>

          {/* Message Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
            }}
          >
            <h2
              style={{
                color: '#111827',
                fontSize: '14px',
                fontWeight: '600',
                margin: '0 0 16px 0',
                textTransform: 'uppercase' as const,
                letterSpacing: '2px',
              }}
            >
              Message
            </h2>
            <div
              style={{
                color: '#4b5563',
                fontSize: '16px',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap' as const,
                backgroundColor: '#f9fafb',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
              }}
            >
              {message}
            </div>
          </div>

          {/* Action Button */}
          <div style={{ textAlign: 'center' as const }}>
            <a
              href={`mailto:${email}?subject=Re: Contact from Portfolio Website`}
              style={{
                display: 'inline-block',
                backgroundColor: '#111827',
                color: '#ffffff',
                padding: '16px 32px',
                borderRadius: '16px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                letterSpacing: '0.5px',
              }}
            >
              Reply to {name}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: '#f9fafb',
            padding: '24px 32px',
            borderTop: '2px solid #e5e7eb',
            textAlign: 'center' as const,
          }}
        >
          <p
            style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: '0 0 8px 0',
            }}
          >
            This message was sent from your portfolio contact form
          </p>
          <p
            style={{
              color: '#9ca3af',
              fontSize: '12px',
              margin: 0,
            }}
          >
            © 2025 Gideon Hoenyefia - Frontend Developer
          </p>
        </div>
      </div>
    </div>
  );
};

// Plain text version for better email client compatibility
export const ContactEmailTemplatePlainText = ({
  name,
  email,
  message,
}: EmailTemplateProps) => `
New Contact Message from Portfolio Website

CONTACT DETAILS:
Name: ${name}
Email: ${email}

MESSAGE:
${message}

---
This message was sent from your portfolio contact form.
© 2025 Gideon Hoenyefia - Frontend Developer
`;
