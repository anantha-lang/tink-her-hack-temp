import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bot, TrendingUp, TrendingDown, Loader2, ArrowRight } from 'lucide-react';

const DashboardAIAgent: React.FC = () => {
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/market-analysis')
            .then(res => {
                setAnalysis(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("AI Agent Error:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="card flex-row justify-center gap-2 text-muted" style={{ padding: '2rem' }}>
                <Loader2 className="animate-spin" /> AI Monitoring Platform...
            </div>
        );
    }

    if (!analysis) return null;

    return (
        <div className="card flex-col gap-4" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.05))',
            border: '1px solid var(--accent-blue)',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15)'
        }}>
            <div className="flex-row justify-between" style={{ alignItems: 'center' }}>
                <div className="flex-row gap-2" style={{ alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'var(--accent-blue)', borderRadius: '50%', padding: '0.4rem', display: 'flex' }}>
                        <Bot color="white" size={20} />
                    </div>
                    <h3 style={{ margin: 0, color: 'white' }}>Live Trading AI Agent</h3>
                </div>
                <span className="badge blue" style={{ animation: 'pulse 2s infinite' }}>● Active Monitoring</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                <strong style={{ color: 'white' }}>Current Strategy:</strong> {analysis.actionableInsight}
            </p>

            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '3px solid var(--status-green)' }}>
                    <div className="flex-row gap-2" style={{ marginBottom: '0.75rem', color: 'var(--status-green)', fontWeight: 600, alignItems: 'center' }}>
                        <TrendingUp size={18} /> Recommended Buy Actions
                    </div>
                    <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'white', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {analysis.buySuggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                    <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', backgroundColor: 'var(--status-green)', borderColor: 'var(--status-green)' }} onClick={() => alert('Sending bulk BUY recommendations to Paper Trading Engine...')}>
                        Execute Buy Orders <ArrowRight size={16} />
                    </button>
                </div>

                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '3px solid var(--status-red)' }}>
                    <div className="flex-row gap-2" style={{ marginBottom: '0.75rem', color: 'var(--status-red)', fontWeight: 600, alignItems: 'center' }}>
                        <TrendingDown size={18} /> Recommended Sell Actions
                    </div>
                    <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'white', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {analysis.sellSuggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                    <button className="btn btn-outline" style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--status-red)', borderColor: 'var(--status-red)' }} onClick={() => alert('Sending bulk SELL recommendations to Paper Trading Engine...')}>
                        Execute Sell Orders <ArrowRight size={16} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default DashboardAIAgent;
