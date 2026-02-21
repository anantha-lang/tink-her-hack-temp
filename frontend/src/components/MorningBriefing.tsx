import React from 'react';
import { Sun, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

const MorningBriefing: React.FC = () => {
    return (
        <div className="card" style={{ backgroundImage: 'linear-gradient(to right, var(--bg-secondary), var(--bg-tertiary))', borderLeft: '4px solid var(--accent-blue)' }}>
            <div className="flex-row gap-4" style={{ marginBottom: '1rem' }}>
                <Sun color="var(--accent-blue)" size={24} />
                <h2 style={{ fontSize: '1.25rem', color: 'white', textTransform: 'uppercase' }}>INSIGHTS</h2>
                <span className="badge blue">New</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '80ch' }}>
                Global markets closed mixed. SGX Nifty suggests a <strong>flat-to-positive start</strong> for Indian markets. Watch out for RBI policy meeting minutes at 2 PM IST which might increase volatility in banking names.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div className="flex-row gap-2" style={{ marginBottom: '0.5rem' }}>
                        <TrendingUp size={16} color="var(--status-green)" />
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Sector Watch: IT</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Nasdaq rallied 1.2% overnight. Top 3 IT names in Nifty are showing bullish divergence.
                    </p>
                </div>

                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div className="flex-row gap-2" style={{ marginBottom: '0.5rem' }}>
                        <AlertTriangle size={16} color="var(--status-yellow)" />
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Portfolio Alert</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <strong>RELIANCE</strong> has its Annual General Meeting today. Expect elevated IV. Consider trimming your 12% position.
                    </p>
                </div>

                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div className="flex-row gap-2" style={{ marginBottom: '0.5rem' }}>
                        <CheckCircle2 size={16} color="var(--accent-blue)" />
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>AI Action Item</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Your custom screener "Breakout Momentum" triggered 2 new setups in Midcap Auto.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MorningBriefing;
