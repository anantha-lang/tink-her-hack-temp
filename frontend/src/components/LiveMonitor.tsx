import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Search, Filter, TrendingUp } from 'lucide-react';
import TechnicalChart from './TechnicalChart';
import ChartAIAgent from './ChartAIAgent';
import OrderModal from './OrderModal';

interface ScreenerResult {
    id: number;
    ticker: string;
    price: string;
    change: string;
    pe: number;
    rsi: number;
    volume: string;
    pattern: string;
}

interface ScreenerData {
    name: string;
    lastRefreshed: string;
    results: ScreenerResult[];
}

const LiveMonitor: React.FC = () => {
    const [data, setData] = useState<ScreenerData | null>(null);
    const [chartData, setChartData] = useState<any[]>([]);
    const [selectedTicker, setSelectedTicker] = useState('HDFCBANK');
    const [loading, setLoading] = useState(true);
    const [orderAction, setOrderAction] = useState<'BUY' | 'SELL' | null>(null);

    useEffect(() => {
        // Fetch Screener Data
        axios.get<ScreenerData>('/api/screener')
            .then(res => {
                setData(res.data);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        // Fetch Chart Data for selected ticker
        setLoading(true);
        axios.get(`/api/chart-data/${selectedTicker}`)
            .then(res => {
                setChartData(res.data);
                setLoading(false);
            })
            .catch(console.error);
    }, [selectedTicker]);

    return (
        <div className="flex-col gap-6">

            {/* Top Controls */}
            <div className="flex-row justify-between" style={{ alignItems: 'center' }}>
                <div className="flex-row gap-4" style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1, maxWidth: '600px' }}>
                    <Search size={18} color="var(--text-muted)" />
                    <input
                        type="text"
                        placeholder='e.g. "Show me mid-cap stocks in pharma with PE < 20"'
                        style={{ backgroundColor: 'transparent', border: 'none', color: 'white', flex: 1, outline: 'none', fontSize: '0.875rem' }}
                    />
                </div>
                <button className="btn btn-outline flex-row gap-2">
                    <Filter size={16} /> Pre-built Screeners
                </button>
            </div>

            <div className="dashboard-grid">

                {/* Left: Live Technical Chart */}
                <div className="card flex-col gap-4">
                    <div className="flex-row justify-between" style={{ alignItems: 'center' }}>
                        <div className="flex-row gap-2" style={{ alignItems: 'center' }}>
                            <h3 className="flex-row gap-2" style={{ margin: 0 }}>
                                <TrendingUp size={18} color="var(--accent-blue)" />
                                {selectedTicker} Live Chart
                            </h3>
                            <span className="badge blue">Live</span>
                        </div>
                        <div className="flex-row gap-4">
                            <button className="btn btn-outline" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'var(--status-red)', color: 'var(--status-red)' }} onClick={() => setOrderAction('SELL')}>SELL</button>
                            <button className="btn btn-primary" style={{ backgroundColor: 'var(--status-green)', borderColor: 'var(--status-green)', color: 'white' }} onClick={() => setOrderAction('BUY')}>BUY</button>
                        </div>
                    </div>

                    <div style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: '#000' }}>
                        {loading ? (
                            <div className="flex-row gap-2 text-muted" style={{ padding: '4rem', justifyContent: 'center', height: '300px' }}>
                                <Loader2 className="animate-spin" size={20} /> Loading {selectedTicker} data...
                            </div>
                        ) : (
                            <>
                                <TechnicalChart data={chartData} type="candlestick" />
                                <ChartAIAgent ticker={selectedTicker} chartData={chartData} />
                            </>
                        )}
                    </div>
                </div>

                {/* Right: Screener Results */}
                <div className="card flex-col gap-4">
                    <div className="flex-row justify-between">
                        <h3>{data?.name || 'Screener'}</h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated: {data?.lastRefreshed}</span>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Click on a ticker to load live chart.</p>

                    <div className="flex-col gap-3">
                        {data?.results.map((res) => (
                            <div
                                key={res.id}
                                className="card flex-col gap-2"
                                style={{
                                    padding: '1rem',
                                    cursor: 'pointer',
                                    borderColor: selectedTicker === res.ticker ? 'var(--accent-blue)' : 'var(--border-color)',
                                    backgroundColor: selectedTicker === res.ticker ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-primary)'
                                }}
                                onClick={() => setSelectedTicker(res.ticker)}
                            >
                                <div className="flex-row justify-between">
                                    <span style={{ fontWeight: 600, color: 'white' }}>{res.ticker}
                                        {selectedTicker === res.ticker && <span style={{ marginLeft: '0.5rem', color: 'var(--accent-blue)', fontSize: '0.75rem' }}>• ACTIVE</span>}
                                    </span>
                                    <div className="flex-row gap-2">
                                        <span>{res.price}</span>
                                        <span className="text-green">{res.change}</span>
                                    </div>
                                </div>

                                <div className="flex-row gap-4 text-muted" style={{ fontSize: '0.75rem' }}>
                                    <span>PE: {res.pe}</span>
                                    <span>RSI: {res.rsi}</span>
                                    <span>Vol: {res.volume}</span>
                                </div>

                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    Pattern: <strong style={{ color: 'var(--text-primary)' }}>{res.pattern}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {orderAction && (
                <OrderModal
                    ticker={selectedTicker}
                    action={orderAction}
                    onClose={() => setOrderAction(null)}
                    onOrderSuccess={(trade) => {
                        axios.post('/api/trade', trade)
                            .catch(console.error);
                    }}
                />
            )}
        </div>
    );
};

export default LiveMonitor;
