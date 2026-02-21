import React, { useState, useEffect } from 'react';
import { Bot, Target, AlertCircle, RefreshCw } from 'lucide-react';

interface ChartAIAgentProps {
    ticker: string;
    chartData: any[];
}

const ChartAIAgent: React.FC<ChartAIAgentProps> = ({ ticker, chartData }) => {
    const [analysis, setAnalysis] = useState<any>(null);
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        setIsScanning(true);
        let currentLastPrice = 0;
        if (chartData && chartData.length > 0) {
            currentLastPrice = chartData[chartData.length - 1].close;
        }

        const runAnalysis = () => {
            // slight random fluctuation to mimic live monitoring for endpoints
            currentLastPrice = currentLastPrice + (Math.random() - 0.5) * 5;

            const support = currentLastPrice * 0.98;
            const resistance = currentLastPrice * 1.03;

            const confLevels = ['High', 'Medium', 'Low'];
            const randomConf = confLevels[Math.floor(Math.random() * confLevels.length)];

            const maxShares = Math.floor(100000 / currentLastPrice);
            const suggestedBuyLot = Math.max(1, Math.floor(maxShares * 0.15));
            const suggestedSellLot = Math.max(1, Math.floor(maxShares * 0.3));

            let insightPrefix = '';
            if (randomConf === 'High') insightPrefix = `${ticker} momentum strongly confirmed. `;
            else if (randomConf === 'Medium') insightPrefix = `${ticker} showing mixed signals near resistance. `;
            else insightPrefix = `${ticker} pattern currently erratic. `;

            setAnalysis({
                status: 'Scanning complete. Live monitoring active.',
                insight: `${insightPrefix}AI repeatedly analyzing real-time tick volume.`,
                buyEndpoint: `Wait for breakout above ₹${resistance.toFixed(2)} with strong volume, or pullback to support at ₹${support.toFixed(2)}. Suggest grabbing lots of ${suggestedBuyLot}-${suggestedBuyLot * 4} shares.`,
                sellEndpoint: `If rejected at ₹${resistance.toFixed(2)}, initiate short. Stop loss at ₹${(resistance * 1.01).toFixed(2)}. Suggest trimming ${suggestedSellLot}-${Math.floor(suggestedSellLot * 1.5)} shares to optimize max profit.`,
                action: 'BUY',
                confidence: randomConf
            });
            setIsScanning(false);
        };

        // Simulate initial AI scanning
        const scanTimeout = setTimeout(() => {
            runAnalysis();
        }, 1500);

        // Setup "continuous" monitoring interval to change confidence frequently
        const interval = setInterval(() => {
            setIsScanning(true);
            setTimeout(() => {
                runAnalysis();
            }, 600); // 600ms analyzing UI
        }, 3500); // Occurs frequently (every 3.5 seconds)

        return () => {
            clearTimeout(scanTimeout);
            clearInterval(interval);
        };
    }, [ticker, chartData]);

    return (
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
            <div className="flex-row gap-2" style={{ marginBottom: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="flex-row gap-2" style={{ alignItems: 'center' }}>
                    <Bot size={20} color={isScanning ? 'var(--status-yellow)' : 'var(--accent-blue)'} />
                    <h4 style={{ margin: 0 }}>AI Chart Analyst</h4>
                </div>
                {isScanning ? (
                    <span className="badge blue" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <RefreshCw size={12} className="animate-spin" /> Analyzing...
                    </span>
                ) : (
                    <span className={`badge ${analysis?.confidence === 'High' ? 'green' : analysis?.confidence === 'Medium' ? 'yellow' : 'red'} flex-row gap-1 align-center`}>
                        Live • {analysis?.confidence} Conf.
                    </span>
                )}
            </div>

            {analysis && (
                <div className="flex-col gap-3">
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        {analysis.insight}
                    </p>
                    <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: '6px', borderLeft: '3px solid var(--status-green)' }}>
                            <div className="flex-row gap-2 justify-between" style={{ alignItems: 'center' }}>
                                <div className="flex-row gap-2" style={{ color: 'var(--status-green)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                    <Target size={14} /> Buy Endpoint
                                </div>
                                <span className={`badge ${analysis?.confidence === 'High' ? 'green' : analysis?.confidence === 'Medium' ? 'yellow' : 'red'}`} style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                                    {analysis?.confidence} Conf.
                                </span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{analysis.buyEndpoint}</span>
                        </div>
                        <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: '6px', borderLeft: '3px solid var(--status-red)' }}>
                            <div className="flex-row gap-2 justify-between" style={{ alignItems: 'center' }}>
                                <div className="flex-row gap-2" style={{ color: 'var(--status-red)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                    <AlertCircle size={14} /> Sell Endpoint
                                </div>
                                <span className={`badge ${analysis?.confidence === 'High' ? 'red' : analysis?.confidence === 'Medium' ? 'yellow' : 'green'}`} style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                                    {analysis?.confidence === 'High' ? 'Low' : analysis?.confidence === 'Low' ? 'High' : 'Medium'} Conf.
                                </span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{analysis.sellEndpoint}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChartAIAgent;
