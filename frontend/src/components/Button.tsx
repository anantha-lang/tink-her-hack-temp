import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    glow = false,
    className = '',
    style,
    ...props
}) => {
    const baseStyle: React.CSSProperties = {
        padding: '1rem 3.5rem',
        fontSize: '1.125rem',
        fontWeight: 600,
        borderRadius: '9999px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        outline: 'none',
        border: 'none',
    };

    const variants = {
        primary: {
            background: 'linear-gradient(135deg, var(--accent-blue), #2563eb)',
            color: 'white',
            ...(glow ? { boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.4)' } : {})
        },
        outline: {
            background: 'transparent',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--text-primary)',
        }
    };

    return (
        <button
            style={{ ...baseStyle, ...variants[variant], ...style }}
            className={`btn-${variant} ${className}`}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                if (variant === 'primary' && glow) {
                    e.currentTarget.style.boxShadow = '0 15px 25px -3px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.5)';
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                if (variant === 'primary' && glow) {
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4)';
                }
            }}
            {...props}
        >
            {children}
        </button>
    );
};
