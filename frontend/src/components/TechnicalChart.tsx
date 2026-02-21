import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries, LineSeries, HistogramSeries, Time } from 'lightweight-charts';

interface ChartData {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    value?: number;
    volume?: number;
}

interface TechnicalChartProps {
    data: ChartData[];
    type?: 'candlestick' | 'line';
}

const TechnicalChart: React.FC<TechnicalChartProps> = ({ data, type = 'candlestick' }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#94a3b8',
            },
            grid: {
                vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
                horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
            rightPriceScale: {
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.2, // Leave space for volume
                },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        let intervalId: ReturnType<typeof setInterval>;

        if (type === 'candlestick' && data.length > 0) {
            const candlestickSeries = chart.addSeries(CandlestickSeries, {
                upColor: '#10b981',
                downColor: '#ef4444',
                borderVisible: false,
                wickUpColor: '#10b981',
                wickDownColor: '#ef4444',
            });
            candlestickSeries.setData(data as any);

            const volumeSeries = chart.addSeries(HistogramSeries, {
                color: '#26a69a',
                priceFormat: {
                    type: 'volume',
                },
                priceScaleId: '', // set as an overlay
                scaleMargins: {
                    top: 0.8,
                    bottom: 0,
                },
            });

            // Map existing data to volume
            const volumeData = data.map((d, index) => {
                const isGreen = d.close >= d.open;
                const vol = d.volume || Math.floor(Math.random() * 5000 + 1000);
                return {
                    time: d.time as Time,
                    value: vol,
                    color: isGreen ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)',
                };
            });
            volumeSeries.setData(volumeData);

            // Add simple moving average
            const smaSeries = chart.addSeries(LineSeries, {
                color: 'rgba(234, 179, 8, 0.8)',
                lineWidth: 2,
                crosshairMarkerVisible: false,
                lastValueVisible: false,
                priceLineVisible: false,
            });

            // Calculate initial SMA
            const closes = data.map(d => d.close);
            const smaData: any[] = [];
            const period = 14;
            for (let i = 0; i < closes.length; i++) {
                if (i >= period - 1) {
                    let sum = 0;
                    for (let j = 0; j < period; j++) {
                        sum += closes[i - j];
                    }
                    smaData.push({ time: data[i].time, value: sum / period });
                }
            }
            smaSeries.setData(smaData);

            // Simulate live fast ticks on the last candle
            let lastCandle = { ...data[data.length - 1] };
            let currentVol = volumeData[volumeData.length - 1].value;

            let tickCount = 0;
            intervalId = setInterval(() => {
                tickCount++;

                // Small continuous random price movement
                const volatility = lastCandle.close * 0.002;
                const change = (Math.random() - 0.5) * volatility;

                const newClose = parseFloat((lastCandle.close + change).toFixed(2));
                const newHigh = Math.max(lastCandle.high, newClose);
                const newLow = Math.min(lastCandle.low, newClose);

                // Add to volume and keep color linked to open/close
                const addedVol = Math.floor(Math.random() * 100);
                currentVol += addedVol;

                lastCandle = {
                    ...lastCandle,
                    high: newHigh,
                    low: newLow,
                    close: newClose,
                };

                candlestickSeries.update(lastCandle as any);

                const isGreen = lastCandle.close >= lastCandle.open;
                volumeSeries.update({
                    time: lastCandle.time as Time,
                    value: currentVol,
                    color: isGreen ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'
                });

                // Update SMA
                closes[closes.length - 1] = newClose;
                if (closes.length >= period) {
                    let s = 0;
                    for (let i = 0; i < period; i++) s += closes[closes.length - 1 - i];
                    smaSeries.update({ time: lastCandle.time as Time, value: parseFloat((s / period).toFixed(2)) });
                }

                // Every 25 ticks (~5 seconds), flush to a new candle
                if (tickCount > 25) {
                    tickCount = 0;
                    const nextDate = new Date(lastCandle.time);
                    nextDate.setDate(nextDate.getDate() + 1); // Mock 1 day

                    lastCandle = {
                        time: nextDate.toISOString().split('T')[0],
                        open: newClose,
                        high: newClose,
                        low: newClose,
                        close: newClose,
                    };
                    currentVol = 0;
                    closes.push(newClose);

                    // Push the new baseline correctly
                    candlestickSeries.update(lastCandle as any);
                    volumeSeries.update({
                        time: lastCandle.time as Time,
                        value: currentVol,
                        color: 'rgba(16, 185, 129, 0.5)'
                    });
                }

            }, 200); // 200ms ticks = very fast

        } else if (type === 'line' && data.length > 0) {
            const lineSeries = chart.addSeries(LineSeries, {
                color: '#3b82f6',
                lineWidth: 2,
            });
            lineSeries.setData(data.map(d => ({ time: d.time, value: d.value || d.close })) as any);
        }

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (intervalId) clearInterval(intervalId);
            chart.remove();
        };
    }, [data, type]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />;
};

export default TechnicalChart;
