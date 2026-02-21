import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, AlertTriangle } from 'lucide-react';

interface IOptionStructure {
    name: string;
    reason: string;
    riskReward: string;
}

interface IOptionsIntelligence {
    marketRegime: string;
    niftyVix: number;
    pcr: number;
    suggestedStructures: IOptionStructure[];
    greeksWarning: string;
}

const OptionsIntelligence: React.FC = () => {
    const [data, setData] = useState<IOptionsIntelligence | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get<IOptionsIntelligence>('/api/options-intelligence')
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    if (loading || !data) {
        return (
            <div className="flex-row gap-2 text-muted" style={{ padding: '2rem', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={20} /> Loading Options Intelligence...
            </div>
        );
    }

    return (
        <div className="dashboard-grid">
            <div className="flex-col gap-4">
                <div className="card flex-col gap-4">
                    <h3>Market Volatility Environment</h3>
                    <div className="flex-row justify-between">
                        <div className="flex-col gap-1">
                            <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Market Regime</span>
                            <span className="text-red" style={{ fontSize: '1.25rem', fontWeight: 600 }}>{data.marketRegime}</span>
                        </div>
                        <div className="flex-col gap-1">
                            <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>India VIX</span>
                            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{data.niftyVix}</span>
                        </div>
                        <div className="flex-col gap-1">
                            <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Put Call Ratio (PCR)</span>
                            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{data.pcr}</span>
                        </div>
                    </div>
                </div>

                <div className="card flex-col gap-2" style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid var(--status-red)' }}>
                    <div className="flex-row gap-2">
                        <AlertTriangle color="var(--status-red)" size={18} />
                        <span style={{ fontWeight: 600, color: 'white' }}>Greeks Warning</span>
                    </div>
                    <p style={{ fontSize: '0.875rem' }}>{data.greeksWarning}</p>
                </div>
            </div>

            <div className="card flex-col gap-4">
                <h3>AI Suggested Structures</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Based on current high IV environments, outright buying calls or puts is mathematically disadvantaged due to high premium decay. Consider these structures:</p>
                <div className="flex-col gap-3">
                    {data.suggestedStructures.map((struct, i) => (
                        <div key={i} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-primary)' }}>
                            <div className="flex-row justify-between" style={{ marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{struct.name}</span>
                                <span className="badge blue">R:R {struct.riskReward}</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{struct.reason}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OptionsIntelligence;
