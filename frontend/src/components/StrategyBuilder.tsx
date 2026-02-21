import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, Plus, Play, CheckCircle, BrainCircuit, X } from 'lucide-react';

interface StrategyResult {
    status: string;
    strategyName: string;
    totalTrades: number;
    winRate: string;
    profitFactor: number;
    maxDrawdown: string;
    annualizedReturn: string;
    redFlags: string[];
}

const StrategyBuilder: React.FC = () => {
    const [strategyName, setStrategyName] = useState('Mean Reversion RSI');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<StrategyResult | null>(null);

    const [entryConditions, setEntryConditions] = useState<string[]>(["RSI (14 Daily) Crosses Under 30", "Price is within 2% of S1 Pivot"]);
    const [exitConditions, setExitConditions] = useState<string[]>(["RSI (14 Daily) Crosses Over 70"]);

    const [isAddingEntry, setIsAddingEntry] = useState(false);
    const [newEntry, setNewEntry] = useState('');

    const [isAddingExit, setIsAddingExit] = useState(false);
    const [newExit, setNewExit] = useState('');

    const handleAddEntry = () => {
        if (newEntry.trim() !== '') {
            setEntryConditions([...entryConditions, newEntry]);
            setNewEntry('');
        }
        setIsAddingEntry(false);
    };

    const handleAddExit = () => {
        if (newExit.trim() !== '') {
            setExitConditions([...exitConditions, newExit]);
            setNewExit('');
        }
        setIsAddingExit(false);
    };

    const handleBacktest = () => {
        setLoading(true);
        // Mimics the body we configured in FastAPI StrategyConfig
        axios.post<StrategyResult>('http://localhost:8000/api/strategy/backtest', {
            name: strategyName,
            entryConditions: entryConditions,
            exitConditions: exitConditions
        })
            .then(res => {
                setResult(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <div className="flex-col gap-6">

            <div className="dashboard-grid">
                <div className="card flex-col gap-4">
                    <div className="flex-row gap-2" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        <BrainCircuit color="var(--accent-blue)" size={24} />
                        <h2 style={{ fontSize: '1.25rem' }}>Visual Strategy Builder</h2>
                    </div>

                    <div className="flex-col gap-2">
                        <label className="text-secondary" style={{ fontSize: '0.875rem' }}>Strategy Name</label>
                        <input
                            type="text"
                            value={strategyName}
                            onChange={(e) => setStrategyName(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
                        />
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Entry Conditions</h3>
                        <div className="flex-col gap-2">
                            {entryConditions.map((cond, i) => (
                                <div key={i} style={{ padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{cond}</span>
                                    <X size={16} style={{ cursor: 'pointer', color: 'var(--status-red)' }} onClick={() => setEntryConditions(entryConditions.filter((_, idx) => idx !== i))} />
                                </div>
                            ))}
                            {isAddingEntry ? (
                                <div className="flex-row gap-2" style={{ marginTop: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={newEntry}
                                        onChange={(e) => setNewEntry(e.target.value)}
                                        placeholder="e.g. MACD > Signal"
                                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddEntry(); }}
                                        autoFocus
                                    />
                                    <button className="btn btn-primary" onClick={handleAddEntry}>Add</button>
                                    <button className="btn btn-outline" onClick={() => setIsAddingEntry(false)}>Cancel</button>
                                </div>
                            ) : (
                                <button className="btn btn-outline flex-row gap-2" style={{ marginTop: '0.5rem' }} onClick={() => setIsAddingEntry(true)}>
                                    <Plus size={16} /> Add Condition
                                </button>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Exit Conditions</h3>
                        <div className="flex-col gap-2">
                            {exitConditions.map((cond, i) => (
                                <div key={i} style={{ padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{cond}</span>
                                    <X size={16} style={{ cursor: 'pointer', color: 'var(--status-red)' }} onClick={() => setExitConditions(exitConditions.filter((_, idx) => idx !== i))} />
                                </div>
                            ))}
                            {isAddingExit ? (
                                <div className="flex-row gap-2" style={{ marginTop: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={newExit}
                                        onChange={(e) => setNewExit(e.target.value)}
                                        placeholder="e.g. Stop Loss 5%"
                                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddExit(); }}
                                        autoFocus
                                    />
                                    <button className="btn btn-primary" onClick={handleAddExit}>Add</button>
                                    <button className="btn btn-outline" onClick={() => setIsAddingExit(false)}>Cancel</button>
                                </div>
                            ) : (
                                <button className="btn btn-outline flex-row gap-2" style={{ marginTop: '0.5rem' }} onClick={() => setIsAddingExit(true)}>
                                    <Plus size={16} /> Add Condition
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        className="btn btn-primary flex-row gap-2"
                        style={{ marginTop: '1rem', padding: '1rem', justifyContent: 'center' }}
                        onClick={handleBacktest}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} fill="white" />} Run Backtest Engine
                    </button>
                </div>

                {/* Results Block */}
                <div className="card flex-col gap-4">
                    <h2 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Backtest Results</h2>

                    {!result && !loading && (
                        <div className="flex-col gap-2 text-muted" style={{ padding: '4rem', alignItems: 'center', justifyContent: 'center', height: '100%', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
                            <BrainCircuit size={32} />
                            <span>Configure conditions and hit Run to analyze</span>
                        </div>
                    )}

                    {loading && (
                        <div className="flex-col gap-2 text-muted" style={{ padding: '4rem', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <Loader2 className="animate-spin" size={32} color="var(--accent-blue)" />
                            <span className="text-gradient">Simulating thousands of market conditions...</span>
                        </div>
                    )}

                    {result && !loading && (
                        <div className="flex-col gap-6" style={{ marginTop: '1rem' }}>
                            <div className="flex-row justify-between" style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid var(--status-green)' }}>
                                <span style={{ fontWeight: 600, color: 'var(--status-green)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <CheckCircle size={18} /> {result.status}
                                </span>
                                <span style={{ fontWeight: 600, color: 'white' }}>{result.strategyName}</span>
                            </div>

                            <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="flex-col gap-1">
                                    <span className="text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Win Rate</span>
                                    <strong style={{ fontSize: '1.5rem', color: 'var(--status-green)' }}>{result.winRate}</strong>
                                </div>
                                <div className="flex-col gap-1">
                                    <span className="text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Profit Factor</span>
                                    <strong style={{ fontSize: '1.5rem' }}>{result.profitFactor}x</strong>
                                </div>
                                <div className="flex-col gap-1">
                                    <span className="text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Annualized Return</span>
                                    <strong style={{ fontSize: '1.5rem' }}>{result.annualizedReturn}</strong>
                                </div>
                                <div className="flex-col gap-1">
                                    <span className="text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Max Drawdown</span>
                                    <strong style={{ fontSize: '1.5rem', color: 'var(--status-red)' }}>{result.maxDrawdown}</strong>
                                </div>
                            </div>

                            <div className="flex-col gap-2" style={{ marginTop: '1rem' }}>
                                <span className="text-secondary" style={{ fontSize: '0.875rem' }}>Total Simulated Trades: {result.totalTrades}</span>
                                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', borderLeft: '4px solid var(--status-yellow)' }}>
                                    <strong style={{ fontSize: '0.875rem', color: 'var(--status-yellow)' }}>Observations (Red Flags)</strong>
                                    <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        {result.redFlags.map((flag, i) => <li key={i}>{flag}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StrategyBuilder;
