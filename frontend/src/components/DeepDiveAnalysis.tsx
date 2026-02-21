import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, ArrowLeft, BarChart2, Activity, ShieldAlert, Cpu } from 'lucide-react';
import TechnicalChart from './TechnicalChart';
import ChartAIAgent from './ChartAIAgent';
import OrderModal from './OrderModal';

interface DeepDiveProps {
    ticker: string;
    onBack: () => void;
}

interface DeepDiveData {
    ticker: string;
    name: string;
    technical: { rsi: number; macd: string; support: number; resistance: number; };
    fundamental: { pe: number; roe: string; fii_dii: string; margins: string; };
    sentiment: string;
    risk: string;
    catalysts: string[];
}

const DeepDiveAnalysis: React.FC<DeepDiveProps> = ({ ticker, onBack }) => {
    const [data, setData] = useState<DeepDiveData | null>(null);
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [orderAction, setOrderAction] = useState<'BUY' | 'SELL' | null>(null);

    useEffect(() => {
        Promise.all([
            axios.get<DeepDiveData>(`http://localhost:8000/api/deep-dive/${ticker}`),
            axios.get(`http://localhost:8000/api/chart-data/${ticker}`)
        ]).then(([deepDiveRes, chartRes]) => {
            setData(deepDiveRes.data);
            setChartData(chartRes.data);
            setLoading(false);
        }).catch(console.error);
    }, [ticker]);

    if (loading || !data) {
        return (
            <div className="flex-row gap-2 text-muted" style={{ padding: '4rem', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={24} /> Analyzing multiple data dimensions for {ticker}...
            </div>
        );
    }

    return (
        <div className="flex-col gap-6">
            <div className="flex-row justify-between" style={{ alignItems: 'center' }}>
                <div className="flex-row gap-4" style={{ alignItems: 'center' }}>
                    <button className="btn btn-outline flex-row gap-2" onClick={onBack}>
                        <ArrowLeft size={16} /> Back
                    </button>
                    <h2 style={{ margin: 0 }}>{data.name} ({data.ticker}) Deep Dive</h2>
                </div>
                <div className="flex-row gap-4">
                    <button className="btn btn-outline" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'var(--status-red)', color: 'var(--status-red)', width: '100px' }} onClick={() => setOrderAction('SELL')}>SELL</button>
                    <button className="btn btn-primary" style={{ backgroundColor: 'var(--status-green)', borderColor: 'var(--status-green)', color: 'white', width: '100px' }} onClick={() => setOrderAction('BUY')}>BUY</button>
                </div>
            </div>

            <div className="card flex-col gap-4">
                <h3>Technical Chart (3 Months)</h3>
                {chartData.length > 0 ? (
                    <>
                        <TechnicalChart data={chartData} type="candlestick" />
                        <ChartAIAgent ticker={ticker} chartData={chartData} />
                    </>
                ) : <p>No historical data could be gathered for {ticker}.</p>}
            </div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <div className="card flex-col gap-4">
                    <div className="flex-row gap-2" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        <Activity color="var(--accent-blue)" size={20} />
                        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Technical</h3>
                    </div>
                    <div className="flex-col gap-2">
                        <div className="flex-row justify-between text-secondary">
                            <span>RSI (14)</span> <strong className={data.technical.rsi > 70 ? 'text-red' : data.technical.rsi < 30 ? 'text-green' : 'text-primary'}>{data.technical.rsi.toFixed(2)}</strong>
                        </div>
                        <div className="flex-row justify-between text-secondary">
                            <span>MACD</span> <strong>{data.technical.macd}</strong>
                        </div>
                        <div className="flex-row justify-between text-secondary">
                            <span>Support</span> <strong>₹{data.technical.support}</strong>
                        </div>
                        <div className="flex-row justify-between text-secondary">
                            <span>Resistance</span> <strong>₹{data.technical.resistance}</strong>
                        </div>
                    </div>
                </div>

                <div className="card flex-col gap-4">
                    <div className="flex-row gap-2" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        <BarChart2 color="var(--status-green)" size={20} />
                        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Fundamental</h3>
                    </div>
                    <div className="flex-col gap-2">
                        <div className="flex-row justify-between text-secondary">
                            <span>P/E Ratio</span> <strong>{data.fundamental.pe}x</strong>
                        </div>
                        <div className="flex-row justify-between text-secondary">
                            <span>ROE</span> <strong>{data.fundamental.roe}</strong>
                        </div>
                        <div className="flex-row justify-between text-secondary">
                            <span>FII/DII Position</span> <strong>{data.fundamental.fii_dii}</strong>
                        </div>
                        <div className="flex-row justify-between text-secondary">
                            <span>Operating Margins</span> <strong>{data.fundamental.margins}</strong>
                        </div>
                    </div>
                </div>

                <div className="card flex-col gap-4">
                    <div className="flex-row gap-2" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        <Cpu color="var(--status-yellow)" size={20} />
                        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Sentiment & Catalyst</h3>
                    </div>
                    <div className="flex-col gap-2">
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{data.sentiment}</p>
                        <strong style={{ fontSize: '0.875rem' }}>Upcoming Catalysts:</strong>
                        <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            {data.catalysts.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card flex-col gap-2" style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid var(--status-red)' }}>
                <div className="flex-row gap-2">
                    <ShieldAlert color="var(--status-red)" size={18} />
                    <span style={{ fontWeight: 600, color: 'white' }}>Risk Profile</span>
                </div>
                <p style={{ fontSize: '0.875rem' }}>{data.risk}</p>
            </div>

            {orderAction && (
                <OrderModal
                    ticker={ticker}
                    action={orderAction}
                    onClose={() => setOrderAction(null)}
                />
            )}
        </div>
    );
};

export default DeepDiveAnalysis;
