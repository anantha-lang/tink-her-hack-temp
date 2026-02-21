import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Loader2, Filter, Save, FileSpreadsheet,
    Bell, RefreshCw, Plus, Eye, X
} from 'lucide-react';
import DeepDiveAnalysis from './DeepDiveAnalysis';

interface Opportunity {
    id: number;
    ticker: string;
    name: string;
    sector: string;
    score: number;
    confidence: string;
    pattern: string;
    price: string;
    change: string;
    risk: string;
}

const Sparkline = ({ data, color }: { data: number[], color: string }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - ((d - min) / range) * 100}`).join(' ');

    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '60px', height: '24px', overflow: 'visible' }}>
            <polyline fill="none" stroke={color} strokeWidth="6" points={points} vectorEffect="non-scaling-stroke" />
        </svg>
    );
};

const mockSparklines = [
    [10, 12, 11, 15, 14, 18, 20],
    [20, 18, 19, 15, 12, 14, 10],
    [15, 15, 16, 15, 17, 16, 18],
    [10, 20, 10, 20, 10, 20, 10],
    [10, 15, 12, 18, 20, 25, 30],
    [30, 28, 25, 26, 22, 20, 18],
    [10, 10, 12, 15, 20, 18, 22],
    [15, 18, 20, 15, 12, 14, 16]
];

interface OpportunityScannerProps {
    isDashboard?: boolean;
}

const OpportunityScanner: React.FC<OpportunityScannerProps> = ({ isDashboard = false }) => {
    const [cards, setCards] = useState<Opportunity[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);

    const [indicatorConditions, setIndicatorConditions] = useState<string[]>([
        "Price Crosses Above 50-DMA",
        "RSI (14) > 70 (Overbought)",
        "Low Float (< 10M Shares)"
    ]);
    const [isAddingCondition, setIsAddingCondition] = useState(false);
    const [newCondition, setNewCondition] = useState("");

    const handleAddCondition = () => {
        if (newCondition.trim()) {
            setIndicatorConditions([...indicatorConditions, newCondition.trim()]);
            setNewCondition("");
            setIsAddingCondition(false);
        }
    };

    useEffect(() => {
        axios.get<Opportunity[]>('/api/opportunities')
            .then((response) => {
                setCards(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            })
            .catch((error: any) => {
                console.error("Error fetching opportunities:", error);
                setCards([]);
                setLoading(false);
            });
    }, []);

    const inputStyle = { padding: '0.625rem', borderRadius: '4px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none', width: '100%', fontSize: '0.85rem' };

    const handleExportCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "TICKER,PRICE,1D CHG,PATTERN,SECTOR,AI SCORE\n";
        cards.forEach(e => {
            csvContent += `${e.ticker},${e.price.replace("₹", "")},${e.change},${e.pattern},${e.sector},${e.score}\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "scanner_results.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="flex-row gap-2 text-muted" style={{ padding: '4rem', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={24} /> Analyzing market segments...
            </div>
        );
    }

    if (selectedTicker) {
        return <DeepDiveAnalysis ticker={selectedTicker} onBack={() => setSelectedTicker(null)} />;
    }

    if (isDashboard) {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                {cards.map((item) => (
                    <div key={item.id} className="card flex-col gap-3" style={{ cursor: 'pointer', padding: '1.25rem', transition: 'transform 0.2s, box-shadow 0.2s' }} onClick={() => setSelectedTicker(item.ticker)} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div className="flex-row justify-between" style={{ alignItems: 'flex-start' }}>
                            <div className="flex-col">
                                <span style={{ fontWeight: 600, color: 'white', fontSize: '1.1rem' }}>{item.ticker}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.name || item.sector}</span>
                            </div>
                            <span className={item.change.startsWith('+') ? 'text-green' : 'text-red'} style={{ fontWeight: 600, backgroundColor: item.change.startsWith('+') ? 'var(--status-green-glow)' : 'var(--status-red-glow)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                                {item.change}
                            </span>
                        </div>

                        <div className="flex-row justify-between" style={{ alignItems: 'center', marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{item.price}</span>
                            <span className={item.score > 80 ? 'text-green' : 'text-yellow'} style={{ fontWeight: 700, backgroundColor: 'var(--bg-tertiary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>AI Score: {item.score}</span>
                        </div>

                        <div className="flex-row justify-between" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                            <span>{item.pattern}</span>
                            <span style={{ textTransform: 'capitalize' }}>Risk: <strong style={{ color: item.risk === 'High' ? 'var(--status-red)' : item.risk === 'Medium' ? 'var(--status-yellow)' : 'var(--status-green)' }}>{item.risk}</strong></span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex-row gap-6">
            {/* Left Sidebar Filters */}
            <div className="card flex-col gap-6" style={{ width: '300px', flexShrink: 0, height: 'fit-content' }}>
                <div className="flex-row justify-between" style={{ alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Scanner Builder</h3>
                    <Filter size={18} color="var(--accent-blue)" />
                </div>

                <div className="flex-col gap-3">
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>1. Core Technicals</h4>
                    <div className="flex-col gap-2">
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Price Range</label>
                        <div className="flex-row gap-2">
                            <input type="number" placeholder="Min ₹" style={inputStyle} />
                            <input type="number" placeholder="Max ₹" style={inputStyle} />
                        </div>
                    </div>
                    <div className="flex-col gap-2">
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Volume / RVOL</label>
                        <select style={inputStyle}>
                            <option>RVOL &gt; 2.0 (High Relative Vol)</option>
                            <option>RVOL &gt; 1.5</option>
                            <option>Above Avg Daily Volume</option>
                        </select>
                    </div>
                    <div className="flex-col gap-2">
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Volatility (ATR / Beta)</label>
                        <select style={inputStyle}>
                            <option>High ATR (Top 10%)</option>
                            <option>Medium Beta (~1.0)</option>
                            <option>Low Volatility</option>
                        </select>
                    </div>
                </div>

                <div className="flex-col gap-3" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>2. Fundamentals</h4>
                    <div className="flex-col gap-2">
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Market Cap</label>
                        <select style={inputStyle}>
                            <option>Any Focus</option>
                            <option>Large (&gt; ₹20,000 Cr)</option>
                            <option>Mid (₹5k - ₹20k Cr)</option>
                            <option>Small/Micro (&lt; ₹5,000 Cr)</option>
                        </select>
                    </div>
                    <div className="flex-col gap-2">
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sector & Industry</label>
                        <select style={inputStyle}>
                            <option>All Sectors</option>
                            <option>Information Technology</option>
                            <option>Financial Services</option>
                            <option>Energy & Oil</option>
                            <option>Consumer Discretionary</option>
                        </select>
                    </div>
                    <div className="flex-col gap-2">
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Valuation & Ratios</label>
                        <select style={inputStyle}>
                            <option>Any P/E</option>
                            <option>Undervalued (P/E &lt; 15)</option>
                            <option>High Growth (P/E &gt; 30)</option>
                        </select>
                    </div>
                </div>

                <div className="flex-col gap-3" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>3. Indicator Logic</h4>

                    {indicatorConditions.map((cond, i) => (
                        <div key={i} style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.625rem', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{cond}</span>
                            <X size={14} style={{ cursor: 'pointer', color: 'var(--status-red)' }} onClick={() => setIndicatorConditions(indicatorConditions.filter((_, idx) => idx !== i))} />
                        </div>
                    ))}

                    {isAddingCondition ? (
                        <div className="flex-col gap-2" style={{ marginTop: '0.25rem' }}>
                            <input
                                type="text"
                                value={newCondition}
                                onChange={(e) => setNewCondition(e.target.value)}
                                placeholder="e.g. MACD Bullish Cross"
                                style={inputStyle}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleAddCondition(); }}
                                autoFocus
                            />
                            <div className="flex-row gap-2">
                                <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', flex: 1 }} onClick={handleAddCondition}>Add</button>
                                <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', flex: 1 }} onClick={() => setIsAddingCondition(false)}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <button className="btn btn-outline flex-row gap-2" style={{ justifyContent: 'center', padding: '0.5rem', fontSize: '0.8rem' }} onClick={() => setIsAddingCondition(true)}>
                            <Plus size={14} /> Add Condition (AND/OR)
                        </button>
                    )}
                </div>

            </div>

            {/* Main Area */}
            <div className="flex-col gap-4" style={{ flex: 1, minWidth: 0 }}>

                {/* Actions Top Bar */}
                <div className="card flex-row justify-between" style={{ padding: '1rem 1.5rem', alignItems: 'center' }}>
                    <div className="flex-col">
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Real-time Scan Results</span>
                        <span style={{ fontWeight: 600, color: 'white', fontSize: '1.25rem' }}>{cards.length} Equities Found</span>
                    </div>

                    <div className="flex-row gap-3">
                        <button className="btn btn-outline flex-row gap-2" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 600) }}>
                            <RefreshCw size={14} /> Refresh Match
                        </button>
                        <button className="btn btn-outline flex-row gap-2" onClick={() => alert('Scan criteria saved to your profile.')}>
                            <Save size={14} /> Save Scan
                        </button>
                        <button className="btn btn-outline flex-row gap-2" onClick={handleExportCSV}>
                            <FileSpreadsheet size={14} /> Export CSV
                        </button>
                        <button className="btn btn-primary flex-row gap-2" onClick={() => alert('Alert configured for these scan parameters.')}>
                            <Bell size={14} /> Set Alert
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', whiteSpace: 'nowrap' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TICKER</th>
                                <th style={{ padding: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>PRICE</th>
                                <th style={{ padding: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>1D CHG</th>
                                <th style={{ padding: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>VOLUME (RVOL)</th>
                                <th style={{ padding: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TREND (7D)</th>
                                <th style={{ padding: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>AI SCORE</th>
                                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right' }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards.map((item, idx) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div className="flex-col">
                                            <span style={{ fontWeight: 600, color: 'white', fontSize: '1rem' }}>{item.ticker}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.pattern} • {item.sector}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>{item.price}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span className={item.change.startsWith('+') ? 'text-green' : 'text-red'} style={{ fontWeight: 600, backgroundColor: item.change.startsWith('+') ? 'var(--status-green-glow)' : 'var(--status-red-glow)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                            {item.change}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                                        <div className="flex-col">
                                            <span style={{ color: 'white' }}>{(Math.random() * 5 + 1).toFixed(1)}M</span>
                                            <span style={{ color: 'var(--status-yellow)', fontSize: '0.75rem', fontWeight: 600 }}>{(Math.random() * 2 + 1).toFixed(1)}x RVOL</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', cursor: 'pointer' }} onClick={() => setSelectedTicker(item.ticker)}>
                                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Sparkline
                                                data={mockSparklines[idx % mockSparklines.length]}
                                                color={item.change.startsWith('+') ? '#10b981' : '#ef4444'}
                                            />
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div className="flex-row gap-2" style={{ alignItems: 'center' }}>
                                            <span className={item.score > 80 ? 'text-green' : 'text-yellow'} style={{ fontWeight: 700, width: '24px' }}>{item.score}</span>
                                            <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: `${item.score}%`, height: '100%', backgroundColor: item.score > 80 ? 'var(--status-green)' : 'var(--status-yellow)', borderRadius: '3px', transition: 'width 1s ease' }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                        <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }} onClick={() => setSelectedTicker(item.ticker)}>
                                            <Eye size={14} style={{ marginRight: '6px' }} /> Deep Dive
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default OpportunityScanner;
