import React, { useState, useEffect } from 'react';
import { Bot, X, TrendingUp, TrendingDown, Crosshair, Lightbulb, RefreshCw, Globe } from 'lucide-react';
import axios from 'axios';

interface MarketAnalysis {
    overallTrend: string;
    marketVariations: string;
    buySuggestions: string[];
    sellSuggestions: string[];
    actionableInsight: string;
    economicIndicator: string;
    interestRates: string;
    timestamp?: string;
}

interface AIAnalystProps {
    currentTab: string;
}

const AIAnalyst: React.FC<AIAnalystProps> = ({ currentTab }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        const fetchData = (isInitial: boolean) => {
            if (isInitial) setLoading(true);
            else setIsSyncing(true);

            axios.get('http://localhost:8000/api/market-analysis')
                .then(response => {
                    setAnalysis(response.data);
                    if (isInitial) setLoading(false);
                    else setTimeout(() => setIsSyncing(false), 500); // brief flash to show sync
                })
                .catch(error => {
                    console.error("Error fetching AI analysis:", error);
                    setLoading(false);
                    setIsSyncing(false);
                });
        };

        if (isOpen) {
            fetchData(!analysis);
            interval = setInterval(() => {
                fetchData(false);
            }, 8000); // Poll every 8 seconds
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isOpen]);

    const getTabContext = () => {
        switch (currentTab) {
            case 'Dashboard':
                return "You are on the main Dashboard. Here I monitor everything at a high level. Suggestion: Check the Insights for macro updates before diving into specific opportunities.";
            case 'Opportunities':
                return "You are viewing AI Opportunities. These are my highest conviction setups based on volume and pattern recognition. Suggestion: Filter by 'High Confidence' if you have low risk tolerance.";
            case 'Portfolio':
                return "You are viewing your Portfolio. Suggestion: Don't let emotions drive these virtual trades; treat this capital as real to test your edges.";
            case 'Live Monitor':
                return "We are tracking the Live Monitor. I am actively injecting endpoints underneath your charts here. Suggestion: Wait for candles to cross my suggested support/resistance endpoints before hitting the Buy/Sell buttons.";
            case 'Strategy Builder':
                return "Welcome to the Strategy Builder. Suggestion: Keep your Entry and Exit conditions symmetrical to avoid overfitting our algorithms on past data.";
            case 'Options Intelligence':
                return "This is Options Intel. Watch the VIX! Suggestion: Focus on Debit Spreads instead of naked buying when IV is dropping.";
            case 'Learning':
                return "The Learning Hub. Great traders never stop learning. Suggestion: Complete the 'Options Greeks' module to better understand our Option Intel page.";
            default:
                return "I am monitoring the platform.";
        }
    };

    return (
        <>
            {/* Floating Button */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    top: '1.5rem',
                    right: '2rem',
                    backgroundColor: 'var(--accent-blue)',
                    color: 'white',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
                    zIndex: 9999,
                    transition: 'transform 0.2s'
                }}
                className="hover-scale"
            >
                <Bot size={22} />
            </div>

            {/* AI Panel */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '5rem',
                        right: '2rem',
                        width: '400px',
                        maxHeight: 'calc(100vh - 6rem)',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '16px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        zIndex: 9998,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* Header */}
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to right, rgba(59, 130, 246, 0.1), transparent)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Bot color="var(--accent-blue)" />
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>ArthaDhan AI Analyst</h3>
                            {isSyncing && <span className="badge blue flex-row gap-1 align-center"><RefreshCw size={10} className="animate-spin" /> Live</span>}
                        </div>
                        <X size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setIsOpen(false)} />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                                Analyzing entire market structure... (Retrieving live patterns)
                            </div>
                        ) : analysis ? (
                            <>
                                {/* Contextual Tab Insights */}
                                <div style={{ padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', borderLeft: '3px solid var(--accent-blue)', marginBottom: '0.5rem' }}>
                                    <h4 style={{ color: 'var(--accent-blue)', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Bot size={16} /> Context: {currentTab}
                                    </h4>
                                    <p style={{ color: 'white', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                                        {getTabContext()}
                                    </p>
                                </div>

                                {/* Overall Market Structure */}
                                <div>
                                    <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Lightbulb size={16} /> Market Trend & Variations
                                    </h4>
                                    <p style={{ color: 'white', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                        {analysis.overallTrend} {analysis.marketVariations}
                                    </p>
                                </div>

                                {/* Economic Indicators & Interest Rates */}
                                <div>
                                    <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Globe size={16} /> Macro & Interest Rates
                                    </h4>
                                    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px', borderLeft: '2px solid var(--accent-blue)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <p style={{ color: 'white', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                                            <strong>Economic Data:</strong> {analysis.economicIndicator}
                                        </p>
                                        <p style={{ color: 'white', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                                            <strong>Interest Rates:</strong> {analysis.interestRates}
                                        </p>
                                    </div>
                                </div>

                                {/* Suggestions Box */}
                                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '3px solid var(--accent-green)' }}>
                                    <h4 style={{ color: 'var(--accent-green)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <TrendingUp size={16} /> Buy Patterns / Setups
                                    </h4>
                                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'white', fontSize: '0.9rem', gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                                        {analysis.buySuggestions.map((s, i) => (
                                            <li key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '3px solid var(--accent-red)' }}>
                                    <h4 style={{ color: 'var(--accent-red)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <TrendingDown size={16} /> Sell / Distribution Warnings
                                    </h4>
                                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'white', fontSize: '0.9rem', gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                                        {analysis.sellSuggestions.map((s, i) => (
                                            <li key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Actionable Insights */}
                                <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
                                    <div className="flex-row justify-between" style={{ alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <h4 style={{ color: 'var(--accent-orange)', fontSize: '0.9rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Crosshair size={16} /> Pro Trader Action Plan
                                        </h4>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated: {analysis.timestamp || 'Just now'}</span>
                                    </div>
                                    <p style={{ color: 'white', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                                        {analysis.actionableInsight}
                                    </p>
                                </div>

                            </>
                        ) : (
                            <div style={{ color: 'var(--accent-red)' }}>Failed to analyze market.</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAnalyst;
