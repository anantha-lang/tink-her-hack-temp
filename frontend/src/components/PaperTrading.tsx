import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderModal from './OrderModal';
import { Loader2, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Trade {
    id: string;
    instrument: string;
    qty: number;
    avgCost: number;
    ltp: number;
    curVal: number;
    pnl: number;
    netChg: string;
}

interface PaperTradingData {
    virtualCapital: string;
    currentBalance: string;
    totalPnL: string;
    winRate: string;
    profitFactor: number;
    activePositions: Trade[];
    tradeHistory: any[];
}

const PaperTrading: React.FC = () => {
    const [data, setData] = useState<PaperTradingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeOrder, setActiveOrder] = useState<{ ticker: string; action: 'BUY' | 'SELL'; pos?: Trade } | null>(null);

    const fetchPaperTradingData = () => {
        axios.get<PaperTradingData>('http://localhost:8000/api/paper-trading')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching paper trading data:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPaperTradingData();
    }, []);

    if (loading || !data) {
        return (
            <div className="flex-row gap-2 text-muted" style={{ padding: '2rem', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={20} /> Loading your virtual portfolio...
            </div>
        );
    }

    return (
        <div className="flex-col gap-6">
            {/* Overview Cards */}
            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                <div className="card flex-col gap-1">
                    <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Virtual Capital</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.virtualCapital}</span>
                </div>
                <div className="card flex-col gap-1">
                    <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Current Balance</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.currentBalance}</span>
                </div>
                <div className="card flex-col gap-1">
                    <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Total P&L</span>
                    <span className="text-green" style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.totalPnL}</span>
                </div>
                <div className="card flex-col gap-1">
                    <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Win Rate / Profit Factor</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.winRate} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>| {data.profitFactor}x</span></span>
                </div>
            </div>

            {/* P&L Chart */}
            <div className="card flex-col gap-4">
                <h3>Cumulative P&L (Simulated)</h3>
                <div style={{ height: '240px', width: '100%', marginLeft: '-20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                            { day: 'Day 1', value: 100000 },
                            { day: 'Day 4', value: 101200 },
                            { day: 'Day 8', value: 100100 },
                            { day: 'Day 12', value: 102500 },
                            { day: 'Day 16', value: 103100 },
                            { day: 'Day 20', value: 101400 },
                            { day: 'Day 24', value: 103900 },
                            { day: 'Day 30', value: 104500 },
                        ]}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--status-green)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--status-green)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                                itemStyle={{ color: 'var(--status-green)', fontWeight: 600 }}
                            />
                            <Area type="monotone" dataKey="value" stroke="var(--status-green)" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Active Positions */}
            <div className="card flex-col gap-4">
                <div className="flex-row justify-between">
                    <h3>Holdings</h3>
                    <span className="badge blue">Live Market Data</span>
                </div>

                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                            <th style={{ paddingBottom: '0.75rem', fontWeight: 500 }}>Instrument</th>
                            <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>Qty.</th>
                            <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>Avg. cost</th>
                            <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>LTP</th>
                            <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>Cur. val</th>
                            <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>P&L</th>
                            <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>Net chg.</th>
                            <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.activePositions.map((pos) => (
                            <tr key={pos.id} style={{ borderBottom: '1px solid var(--bg-tertiary)' }} className="hover-bg-fade">
                                <td style={{ padding: '0.75rem 0', fontWeight: 600, color: 'white' }}>{pos.instrument}</td>
                                <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>{pos.qty}</td>
                                <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>{pos.avgCost.toFixed(2)}</td>
                                <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>{pos.ltp.toFixed(2)}</td>
                                <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>{pos.curVal.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</td>
                                <td style={{ padding: '0.75rem 0', textAlign: 'right', fontWeight: 500 }} className={pos.pnl >= 0 ? 'text-green' : 'text-red'}>
                                    {pos.pnl > 0 ? '+' : ''}{pos.pnl.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                                </td>
                                <td style={{ padding: '0.75rem 0', textAlign: 'right' }} className={pos.netChg.startsWith('-') ? 'text-red' : 'text-green'}>
                                    {pos.netChg}
                                </td>
                                <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>
                                    <div className="flex-row gap-2" style={{ justifyContent: 'flex-end' }}>
                                        <button className="btn" style={{ padding: '0.2rem 0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--status-green)', border: '1px solid var(--status-green)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }} onClick={() => setActiveOrder({ ticker: pos.instrument, action: 'BUY', pos })}>B</button>
                                        <button className="btn" style={{ padding: '0.2rem 0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--status-red)', border: '1px solid var(--status-red)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }} onClick={() => setActiveOrder({ ticker: pos.instrument, action: 'SELL', pos })}>S</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Trade Activity */}
            <div className="card flex-col gap-4">
                <div className="flex-row justify-between">
                    <h3>Trade Activity / Order Status</h3>
                </div>

                {(!data.tradeHistory || data.tradeHistory.length === 0) ? (
                    <div className="flex-col" style={{ alignItems: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        <p>No recent trades. Use the B/S buttons above to simulate an order.</p>
                    </div>
                ) : (
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                                <th style={{ paddingBottom: '0.75rem', fontWeight: 500 }}>Time</th>
                                <th style={{ paddingBottom: '0.75rem', fontWeight: 500 }}>Instrument</th>
                                <th style={{ paddingBottom: '0.75rem', fontWeight: 500 }}>Type</th>
                                <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>Qty.</th>
                                <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>Price</th>
                                <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.tradeHistory?.map((trade) => (
                                <tr key={trade.id} style={{ borderBottom: '1px solid var(--bg-tertiary)' }} className="hover-bg-fade">
                                    <td style={{ padding: '0.75rem 0', color: 'var(--text-secondary)' }}>{trade.timestamp}</td>
                                    <td style={{ padding: '0.75rem 0', fontWeight: 600, color: 'white' }}>{trade.ticker}</td>
                                    <td style={{ padding: '0.75rem 0' }} className={trade.action === 'BUY' ? 'text-green' : 'text-red'}>{trade.action} {trade.type}</td>
                                    <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>{trade.qty}</td>
                                    <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>{trade.price.toFixed(2)}</td>
                                    <td style={{ padding: '0.75rem 0', textAlign: 'right', color: 'var(--status-green)', fontWeight: 500 }}>{trade.message} ✓</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Guidance */}
            <div className="card flex-col gap-2" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', borderLeft: '4px solid var(--accent-blue)' }}>
                <div className="flex-row gap-2">
                    <CheckCircle color="var(--accent-blue)" size={18} />
                    <span style={{ fontWeight: 600, color: 'white' }}>AI Guidance</span>
                </div>
                <p style={{ fontSize: '0.875rem' }}>Your paper trading shows a 64% win rate with a 1.8 profit factor over 6 weeks. When you consistently cross a 2.0 profit factor, you might consider starting small with live capital — perhaps 10% position sizes initially.</p>
            </div>

            {activeOrder && (
                <OrderModal
                    ticker={activeOrder.ticker}
                    action={activeOrder.action}
                    pos={activeOrder.pos}
                    onClose={() => setActiveOrder(null)}
                    onOrderSuccess={(trade) => {
                        axios.post('http://localhost:8000/api/trade', trade).then(() => {
                            fetchPaperTradingData(); // Refresh to catch new history and P&L
                        }).catch(console.error);
                    }}
                />
            )}

        </div>
    );
};

export default PaperTrading;
