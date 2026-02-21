import React, { useState, useEffect } from 'react';
import { AlertCircle, PieChart, ShieldAlert, Activity, Loader2 } from 'lucide-react';
import axios from 'axios';

interface SectorPosition {
    name: string;
    percentage: number;
    status: 'warning' | 'ok';
}

interface PortfolioData {
    overallScore: number;
    riskLevel: string;
    totalValue: string;
    positions: number;
    sectors: SectorPosition[];
}

const PortfolioHealth: React.FC = () => {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get<PortfolioData>('/api/portfolio-health')
            .then((response) => {
                const d = response.data;
                if (d && Array.isArray(d.sectors)) {
                    setData(d);
                }
                setLoading(false);
            })
            .catch((error: any) => {
                console.error("Error fetching portfolio health:", error);
                setLoading(false);
            });
    }, []);

    if (loading || !data) {
        return (
            <div className="card flex-row gap-2 text-muted" style={{ padding: '2rem', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={20} /> Loading portfolio analytics...
            </div>
        );
    }

    return (
        <div className="card flex-col gap-4">
            <div className="flex-row gap-2" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <ShieldAlert color="var(--status-yellow)" size={24} />
                <h2 style={{ fontSize: '1.25rem' }}>Portfolio Health Check</h2>
            </div>

            <div className="flex-row justify-between" style={{ padding: '0.5rem 0' }}>
                <div className="flex-col gap-1">
                    <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall Risk Score</span>
                    <div className="flex-row gap-2">
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--status-yellow)' }}>{data.overallScore}</span>
                        <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', alignSelf: 'flex-end', paddingBottom: '0.4rem' }}>/ 10</span>
                    </div>
                    <span className="badge red" style={{ marginTop: '0.25rem', width: 'fit-content' }}>{data.riskLevel}</span>
                </div>

                <div className="flex-col gap-1" style={{ alignItems: 'flex-end' }}>
                    <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Value</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{data.totalValue}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{data.positions} Open Positions</span>
                </div>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
                <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                    <PieChart size={16} /> Sector Concentration Risk
                </h3>

                <div className="flex-col gap-4">
                    {data.sectors.map((sector, index) => (
                        <div key={index} className="flex-col gap-1">
                            <div className="flex-row justify-between" style={{ fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{sector.name}</span>
                                <div className="flex-row gap-2">
                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{sector.percentage}%</span>
                                    {sector.status === 'warning' ? (
                                        <AlertCircle size={14} color="var(--status-red)" />
                                    ) : (
                                        <Activity size={14} color="var(--status-green)" />
                                    )}
                                </div>
                            </div>
                            <div className="progress-container" style={{ height: '6px', margin: 0, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${sector.percentage}%`,
                                        backgroundColor: sector.status === 'warning' ? 'var(--status-red)' : 'var(--accent-blue)'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--status-red)', borderRadius: '4px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    <strong className="text-red">Warning:</strong> Portfolio concentration in Energy sector (34%) exceeds the recommended 20% limit. Consider rebalancing.
                </p>
            </div>

        </div>
    );
};

export default PortfolioHealth;
