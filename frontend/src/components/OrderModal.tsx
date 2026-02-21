import React, { useState } from 'react';
import { X, CheckCircle, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface OrderModalProps {
    ticker: string;
    action: 'BUY' | 'SELL';
    onClose: () => void;
    onOrderSuccess?: (trade: any) => void;
    pos?: any;
}

const OrderModal: React.FC<OrderModalProps> = ({ ticker, action, onClose, onOrderSuccess, pos }) => {
    const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
    const [quantity, setQuantity] = useState(10);
    const [orderType, setOrderType] = useState('MARKET');
    const [executedPrice, setExecutedPrice] = useState(0);

    const handleExecute = () => {
        setStatus('PROCESSING');
        setTimeout(() => {
            setExecutedPrice(parseFloat((Math.random() * 500 + 1000).toFixed(2)));
            setStatus('SUCCESS');
        }, 1200);
    };

    const handleClose = () => {
        if (status === 'SUCCESS' && onOrderSuccess) {
            onOrderSuccess({
                id: Math.random().toString(36).substr(2, 9),
                ticker,
                action,
                qty: quantity,
                price: executedPrice,
                type: orderType,
                message: 'COMPLETED',
                timestamp: new Date().toLocaleTimeString()
            });
        }
        onClose();
    };

    const aiSuggestionText = (() => {
        if (!pos) return '';
        const sellMin = Math.max(1, Math.floor(pos.qty * 0.25));
        const sellMax = Math.max(1, Math.floor(pos.qty * 0.5));
        const buyMin = Math.max(1, Math.floor(pos.qty * 0.1));
        const buyMax = Math.max(1, Math.floor(pos.qty * 0.3));

        if (action === 'SELL') {
            return pos.pnl > 0
                ? `You are up ₹${pos.pnl.toLocaleString()} on ${ticker}. Securing profits here is a statistically sound strategy. Recommended quantity to sell to lock in maximum profit while keeping upside: ${sellMin} - ${sellMax} shares.`
                : `You are currently down ₹${Math.abs(pos.pnl).toLocaleString()} on ${ticker}. Only sell if the stock has broken key support levels. Recommended quantity to trim to manage risk: ${sellMin} - ${sellMax} shares.`;
        } else {
            return pos.pnl > 0
                ? `Averaging up? Momentum is strong since you are up ${pos.netChg}. Recommended quantity to add to safely maximize profit: ${buyMin} - ${buyMax} shares.`
                : `Averaging down on a ${pos.netChg} loss. Check that the fundamental thesis is intact before committing more capital. Recommended quantity to safely accumulate to improve average cost: ${buyMin} - ${buyMax} shares.`;
        }
    })();

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10000,
            backdropFilter: 'blur(4px)'
        }}>
            <div className="card flex-col gap-4" style={{
                width: '400px',
                border: `1px solid ${action === 'BUY' ? 'var(--status-green)' : 'var(--status-red)'}`,
                boxShadow: `0 10px 40px ${action === 'BUY' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
            }}>
                <div className="flex-row justify-between" style={{ alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    <div className="flex-row gap-2" style={{ alignItems: 'center', color: action === 'BUY' ? 'var(--status-green)' : 'var(--status-red)' }}>
                        {action === 'BUY' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                        <h3 style={{ margin: 0, color: 'white' }}>{action} {ticker}</h3>
                    </div>
                    <X size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={handleClose} />
                </div>

                {status === 'SUCCESS' ? (
                    <div className="flex-col gap-4" style={{ alignItems: 'center', padding: '2rem 0' }}>
                        <CheckCircle size={48} color="var(--status-green)" />
                        <h3 style={{ color: 'white', margin: 0 }}>Order Filled Natively</h3>
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: 0 }}>
                            Successfully executed {action} order for {quantity} shares of {ticker} at ₹{executedPrice}.
                        </p>
                        <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={handleClose}>
                            Close
                        </button>
                    </div>
                ) : (
                    <div className="flex-col gap-4">
                        <div className="flex-row gap-4">
                            <div className="flex-col gap-2" style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Quantity</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    style={{
                                        backgroundColor: 'var(--bg-tertiary)',
                                        border: '1px solid var(--border-color)',
                                        color: 'white',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <div className="flex-col gap-2" style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Order Type</label>
                                <select
                                    value={orderType}
                                    onChange={(e) => setOrderType(e.target.value)}
                                    style={{
                                        backgroundColor: 'var(--bg-tertiary)',
                                        border: '1px solid var(--border-color)',
                                        color: 'white',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="MARKET">Market</option>
                                    <option value="LIMIT">Limit</option>
                                    <option value="STOP_LOSS">Stop Loss</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <div className="flex-row justify-between mb-1">
                                <span>Estimated Margin:</span>
                                <span style={{ color: 'white' }}>₹{(Math.random() * quantity * 200).toFixed(2)}</span>
                            </div>
                            <div className="flex-row justify-between">
                                <span>Brokerage (Est):</span>
                                <span style={{ color: 'white' }}>₹20.00</span>
                            </div>
                        </div>

                        {pos && (
                            <div style={{
                                padding: '1rem',
                                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                borderLeft: '3px solid var(--accent-blue)',
                                borderRadius: '4px',
                                fontSize: '0.85rem'
                            }}>
                                <div className="flex-row gap-2" style={{ color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '0.25rem' }}>
                                    <TrendingUp size={14} /> AI Portfolio Analyst
                                </div>
                                <span style={{ color: 'var(--text-secondary)' }}>
                                    {aiSuggestionText}
                                </span>
                            </div>
                        )}

                        <button
                            className="btn"
                            style={{
                                backgroundColor: action === 'BUY' ? 'var(--status-green)' : 'var(--status-red)',
                                color: 'white',
                                border: 'none',
                                opacity: status === 'PROCESSING' ? 0.7 : 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onClick={handleExecute}
                            disabled={status === 'PROCESSING'}
                        >
                            {status === 'PROCESSING' ? (
                                <>
                                    <RefreshCw size={16} className="animate-spin" /> Transmitting...
                                </>
                            ) : `Confirm ${action}`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderModal;
