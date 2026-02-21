from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
from pydantic import BaseModel
import random
from datetime import datetime, timedelta
import yfinance as yf
import pandas as pd

app = FastAPI(
    title="ArthaDhan API",
    description="Backend for the AI Trading Platform powering the Indian Securities Market insights.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Opportunity(BaseModel):
    id: int
    ticker: str
    name: str
    sector: str
    score: int
    confidence: str
    pattern: str
    price: str
    change: str
    risk: str

@app.get("/api/health")
def read_health():
    return {"health": "ok"}


@app.get("/api/opportunities", response_model=List[Opportunity])
def get_opportunities():
    return [
        {
            "id": 1,
            "ticker": "TITAN",
            "name": "Titan Company",
            "sector": "Consumer Discretionary",
            "score": 84,
            "confidence": "High",
            "pattern": "Volume Breakout",
            "price": "₹3,465",
            "change": "+2.1%",
            "risk": "Medium"
        },
        {
            "id": 2,
            "ticker": "INFY",
            "name": "Infosys",
            "sector": "IT",
            "score": 72,
            "confidence": "Medium",
            "pattern": "Double Bottom",
            "price": "₹1,515",
            "change": "+1.2%",
            "risk": "Low"
        },
        {
            "id": 3,
            "ticker": "HDFCBANK",
            "name": "HDFC Bank",
            "sector": "Financials",
            "score": 68,
            "confidence": "Medium",
            "pattern": "Mean Reversion",
            "price": "₹1,540",
            "change": "-0.4%",
            "risk": "Medium"
        },
        {
            "id": 4,
            "ticker": "RELIANCE",
            "name": "Reliance Industries",
            "sector": "Energy",
            "score": 88,
            "confidence": "High",
            "pattern": "Ascending Triangle",
            "price": "₹2,950",
            "change": "+1.5%",
            "risk": "Low"
        },
        {
            "id": 5,
            "ticker": "TCS",
            "name": "Tata Consultancy Services",
            "sector": "IT",
            "score": 75,
            "confidence": "High",
            "pattern": "Support Bounce",
            "price": "₹3,980",
            "change": "+0.8%",
            "risk": "Low"
        },
        {
            "id": 6,
            "ticker": "ITC",
            "name": "ITC Limited",
            "sector": "Consumer Staples",
            "score": 65,
            "confidence": "Medium",
            "pattern": "Consolidation",
            "price": "₹420",
            "change": "-0.2%",
            "risk": "Low"
        },
        {
            "id": 7,
            "ticker": "SBIN",
            "name": "State Bank of India",
            "sector": "Financials",
            "score": 82,
            "confidence": "High",
            "pattern": "Bull Flag",
            "price": "₹750",
            "change": "+2.4%",
            "risk": "High"
        },
        {
            "id": 8,
            "ticker": "LT",
            "name": "Larsen & Toubro",
            "sector": "Industrials",
            "score": 79,
            "confidence": "High",
            "pattern": "Breakout Retest",
            "price": "₹3,400",
            "change": "+1.1%",
            "risk": "Medium"
        }
    ]

@app.get("/api/portfolio-health")
def get_portfolio_health():
    return {
        "overallScore": 7.1,
        "riskLevel": "MODERATE-HIGH",
        "totalValue": "₹18,45,000",
        "positions": 8,
        "sectors": [
            {"name": "Energy", "percentage": 34, "status": "warning"},
            {"name": "Banking", "percentage": 28, "status": "warning"},
            {"name": "IT", "percentage": 18, "status": "ok"},
            {"name": "Pharma", "percentage": 12, "status": "ok"},
            {"name": "Other", "percentage": 8, "status": "ok"}
        ]
    }

PAPER_TRADING_STATE = {
    "virtualCapital": "₹1,00,000",
    "currentBalance": "₹1,04,500",
    "totalPnL": "+₹4,500",
    "winRate": "64%",
    "profitFactor": 1.8,
    "activePositions": [
        {
            "id": "PT-101", 
            "instrument": "RELIANCE", 
            "qty": 50, 
            "avgCost": 2420.50, 
            "ltp": 2468.00, 
            "curVal": 123400.00, 
            "pnl": 2375.00, 
            "netChg": "+1.96%"
        },
        {
            "id": "PT-102", 
            "instrument": "TATAMOTORS", 
            "qty": 200, 
            "avgCost": 1050.00, 
            "ltp": 1020.00, 
            "curVal": 204000.00, 
            "pnl": -6000.00, 
            "netChg": "-2.85%"
        },
        {
            "id": "PT-103", 
            "instrument": "HDFCBANK", 
            "qty": 150, 
            "avgCost": 1520.00, 
            "ltp": 1540.00, 
            "curVal": 231000.00, 
            "pnl": 3000.00, 
            "netChg": "+1.31%"
        },
        {
            "id": "PT-104", 
            "instrument": "INFY", 
            "qty": 100, 
            "avgCost": 1600.00, 
            "ltp": 1515.00, 
            "curVal": 151500.00, 
            "pnl": -8500.00, 
            "netChg": "-5.31%"
        }
    ],
    "tradeHistory": []
}

class TradeRequest(BaseModel):
    ticker: str
    action: str
    qty: int
    price: float
    type: str

@app.post("/api/trade")
def execute_trade(trade: TradeRequest):
    # Add to trade history
    trade_id = f"TRD-{random.randint(1000, 9999)}"
    timestamp = datetime.now().strftime("%I:%M:%S %p")
    PAPER_TRADING_STATE["tradeHistory"].insert(0, {
        "id": trade_id,
        "ticker": trade.ticker,
        "action": trade.action,
        "qty": trade.qty,
        "price": trade.price,
        "type": trade.type,
        "message": "COMPLETED",
        "timestamp": timestamp,
        "created_at": datetime.now().isoformat()
    })
    
    # Update active positions based on buy/sell
    existing_pos = next((p for p in PAPER_TRADING_STATE["activePositions"] if p["instrument"] == trade.ticker), None)
    
    if existing_pos:
        if trade.action == "BUY":
            new_qty = existing_pos["qty"] + trade.qty
            existing_pos["avgCost"] = ((existing_pos["avgCost"] * existing_pos["qty"]) + (trade.price * trade.qty)) / new_qty
            existing_pos["qty"] = new_qty
        elif trade.action == "SELL":
            new_qty = existing_pos["qty"] - trade.qty
            if new_qty <= 0:
                PAPER_TRADING_STATE["activePositions"] = [p for p in PAPER_TRADING_STATE["activePositions"] if p["instrument"] != trade.ticker]
            else:
                existing_pos["qty"] = new_qty
    else:
        if trade.action == "BUY":
            new_pos = {
                "id": f"PT-{random.randint(100, 999)}",
                "instrument": trade.ticker,
                "qty": trade.qty,
                "avgCost": trade.price,
                "ltp": trade.price,
                "curVal": trade.price * trade.qty,
                "pnl": 0.00,
                "netChg": "+0.00%"
            }
            PAPER_TRADING_STATE["activePositions"].append(new_pos)

    # Vary rates and calculate new Portfolio Values
    total_pnl = 0
    for pos in PAPER_TRADING_STATE["activePositions"]:
        # Randomly fluctuate the Last Traded Price (LTP) by -1.5% to +1.5%
        change_pct = random.uniform(-0.015, 0.015)
        pos["ltp"] = round(pos["ltp"] * (1 + change_pct), 2)
        pos["curVal"] = round(pos["ltp"] * pos["qty"], 2)
        pos["pnl"] = round(pos["curVal"] - (pos["avgCost"] * pos["qty"]), 2)
        
        net_pct = (pos["pnl"] / (pos["avgCost"] * pos["qty"])) * 100 if pos["avgCost"] > 0 else 0
        pos["netChg"] = f"{'+' if pos['pnl'] >= 0 else ''}{round(net_pct, 2)}%"
        total_pnl += pos["pnl"]

    # Keep capital same
    capital = 100000
    PAPER_TRADING_STATE["virtualCapital"] = f"₹{capital:,}"
    
    # Update current balance and total PnL
    PAPER_TRADING_STATE["totalPnL"] = f"{'+' if total_pnl >= 0 else '-'}₹{abs(round(total_pnl, 2)):,}"
    PAPER_TRADING_STATE["currentBalance"] = f"₹{capital + total_pnl:,.2f}"

    # Randomly vary the Win Rate and Profit Factor to simulate dynamic stats
    current_win_rate = float(str(PAPER_TRADING_STATE.get("winRate", "64%")).replace("%", ""))
    new_win_rate = round(current_win_rate + random.uniform(-1.5, 1.5), 1)
    new_win_rate = max(10.0, min(90.0, new_win_rate))
    PAPER_TRADING_STATE["winRate"] = f"{new_win_rate}%"

    current_pf = float(PAPER_TRADING_STATE.get("profitFactor", 1.8))
    new_pf = round(current_pf + random.uniform(-0.1, 0.1), 2)
    new_pf = max(0.5, min(5.0, new_pf))
    PAPER_TRADING_STATE["profitFactor"] = new_pf
            
    return {"status": "SUCCESS", "trade": PAPER_TRADING_STATE["tradeHistory"][0]}

@app.get("/api/paper-trading")
def get_paper_trading():
    now = datetime.now()
    cutoff_time = now - timedelta(hours=72)
    
    # Filter trades to only keep those within the last 72 hours
    valid_trades = []
    for trade in PAPER_TRADING_STATE["tradeHistory"]:
        if "created_at" in trade:
            try:
                trade_time = datetime.fromisoformat(trade["created_at"])
                if trade_time >= cutoff_time:
                    valid_trades.append(trade)
            except ValueError:
                valid_trades.append(trade) # Fallback if parsing fails
        else:
             # For legacy simulated trades that might not have created_at
             valid_trades.append(trade)
             
    PAPER_TRADING_STATE["tradeHistory"] = valid_trades
    return PAPER_TRADING_STATE


@app.get("/api/screener")
def get_screener_results():
    return {
        "name": "Banking Outperformers (Above 50-DMA)",
        "lastRefreshed": "11:23 AM",
        "results": [
            {"id": 1, "ticker": "HDFCBANK", "price": "₹1,692", "change": "+1.8%", "pe": 18.5, "rsi": 52, "volume": "1.6x avg", "pattern": "Bull flag consolidation"},
            {"id": 2, "ticker": "ICICIBANK", "price": "₹1,245", "change": "+2.1%", "pe": 19.2, "rsi": 58, "volume": "2.1x avg ⚡", "pattern": "Breakout attempt in progress"},
            {"id": 3, "ticker": "AXISBANK", "price": "₹1,089", "change": "+0.9%", "pe": 17.8, "rsi": 49, "volume": "1.4x avg", "pattern": "Range consolidation"},
            {"id": 4, "ticker": "KOTAKBANK", "price": "₹1,750", "change": "+0.5%", "pe": 22.1, "rsi": 55, "volume": "1.1x avg", "pattern": "Support bounce"},
            {"id": 5, "ticker": "SBIN", "price": "₹750", "change": "+2.4%", "pe": 10.5, "rsi": 65, "volume": "3.2x avg ⚡", "pattern": "Heavy volume breakout"},
            {"id": 6, "ticker": "RELIANCE", "price": "₹2,950", "change": "+1.5%", "pe": 28.4, "rsi": 60, "volume": "1.8x avg", "pattern": "Trend continuation"},
            {"id": 7, "ticker": "TCS", "price": "₹3,980", "change": "+0.8%", "pe": 32.1, "rsi": 56, "volume": "1.2x avg", "pattern": "Earnings momentum"}
        ]
    }

@app.get("/api/chart-data/{ticker}")
def get_chart_data(ticker: str):
    try:
        # For Indian stocks, yfinance usually requires .NS or .BO
        yf_ticker = f"{ticker}.NS" if not ticker.endswith(".NS") and not ticker.endswith(".BO") else ticker
        
        # Download last 3 months of data, daily interval
        stock = yf.Ticker(yf_ticker)
        df = stock.history(period="3mo", interval="1d")
        
        if not df.empty:
            data = []
            for date, row in df.iterrows():
                data.append({
                    "time": date.strftime("%Y-%m-%d"),
                    "open": round(float(row['Open']), 2),
                    "high": round(float(row['High']), 2),
                    "low": round(float(row['Low']), 2),
                    "close": round(float(row['Close']), 2),
                    "value": round(float(row['Close']), 2)
                })
            return data
    except Exception as e:
        print(f"yfinance error: {e}")
        pass

    # Fallback fake candlestick data if yfinance fails or returns empty
    base_price = 1500 if ticker != 'TITAN' else 3400
    data = []
    current_time = datetime.now() - timedelta(days=60)
    current_price = base_price
    for i in range(60):
        open_price = current_price
        close_price = current_price + random.uniform(-20, 25)
        high = max(open_price, close_price) + random.uniform(0, 15)
        low = min(open_price, close_price) - random.uniform(0, 15)
        
        data.append({
            "time": current_time.strftime("%Y-%m-%d"),
            "open": round(open_price, 2),
            "high": round(high, 2),
            "low": round(low, 2),
            "close": round(close_price, 2),
            "value": round(close_price, 2)
        })
        current_price = close_price
        current_time += timedelta(days=1)
        
    return data

@app.get("/api/deep-dive/{ticker}")
def get_deep_dive(ticker: str):
    return {
        "ticker": ticker,
        "name": f"{ticker} Limited",
        "technical": {
            "rsi": random.uniform(40, 75),
            "macd": "Bullish Crossover",
            "support": round(random.uniform(1000, 2000), 2),
            "resistance": round(random.uniform(2000, 3000), 2)
        },
        "fundamental": {
            "pe": round(random.uniform(15, 35), 1),
            "roe": f"{round(random.uniform(10, 25), 1)}%",
            "fii_dii": "Net Buying",
            "margins": "Expanding"
        },
        "sentiment": "Mildly Bullish based on 7-day news aggregate.",
        "risk": "Medium (Earnings next week)",
        "catalysts": ["Q4 Earnings on Friday", "New Product Launch"]
    }

@app.get("/api/options-intelligence")
def get_options_intelligence():
    return {
        "marketRegime": "High IV Environment",
        "niftyVix": 18.5,
        "pcr": 1.2,
        "suggestedStructures": [
            {
                "name": "Debit Spread",
                "reason": "Given your bullish view and low IV environment within specific sectors, a debit spread limits capital at risk.",
                "riskReward": "1:2"
            },
            {
                "name": "Iron Condor",
                "reason": "Expected sideways movement post-earnings for large caps.",
                "riskReward": "1:1.5"
            }
        ],
        "greeksWarning": "Delta exposure is high across your tech holdings. Theta decay is accelerating for weekly expiries."
    }

class StrategyConfig(BaseModel):
    name: str
    entryConditions: List[str]
    exitConditions: List[str]

@app.post("/api/strategy/backtest")
def backtest_strategy(strategy: StrategyConfig):
    return {
        "status": "BACKTEST COMPLETE ✓",
        "strategyName": strategy.name,
        "totalTrades": 1247,
        "winRate": "64.0%",
        "profitFactor": 1.89,
        "maxDrawdown": "-18.2%",
        "annualizedReturn": "24.6%",
        "redFlags": ["Lower win rate on low liquidity options", "Underperforms in high VIX periods"]
    }

@app.get("/api/market-analysis")
def get_market_analysis():
    trends = [
        "Mildly Bullish, experiencing short-term consolidation before next leg up.",
        "Neutral, market is searching for direction amidst mixed global cues.",
        "Slightly Bearish, profit booking observed at higher levels.",
        "Bullish momentum building up in large-cap indices."
    ]
    variations = [
        "High intraday volatility expected in mid-caps; Bank Nifty showing resistance at 48000.",
        "IT sector dragging the index down, while auto stocks show resilience.",
        "Pharma index breaking out of a multi-week consolidation zone.",
        "PSU banks seeing intense volume action today."
    ]
    buys = [
        ["Wait for pullbacks to 20-DMA on IT sector stocks (e.g., INFY).", "Energy sector breakout trades if momentum sustains."],
        ["Look for value buying in beaten down FMCG counters.", "Auto component stocks showing relative strength."],
        ["Accumulate long-duration bonds as rate cut expectations rise.", "Small-cap IT companies showing strong order book visibility."]
    ]
    sells = [
        ["Trim weak Consumer Discretionary names below 50-DMA.", "Write OTM calls on sideways moving Pharma stocks to collect premium."],
        ["Avoid highly leveraged capital goods companies.", "Take profits on recent momentum winners in real estate."],
        ["Hedge long portfolios by buying Nifty puts.", "Exit long positions if Nifty breaks below 21500 support."]
    ]
    insights = [
        "Maintain a delta-neutral stance for the next 48 hours until RBI policy clears. Keep 20% cash buffer. Overall, structurally buy on dips.",
        "Market breadth is improving. Look for rotational plays. Keep stop losses tight.",
        "VIX is cooling off, suggesting reduced fear. Ideal environment for writing strangles.",
        "Focus on bottom-up stock picking; index might remain range-bound this week."
    ]
    economic_indicators = [
        "India CPI Inflation came in at 5.1%, RBI likely to hold rates steady.",
        "GDP growth beat estimates at 8.4% YoY. Infrastructure push continues.",
        "Industrial Production (IIP) shows strong rebound in capital goods.",
        "Trade deficit narrows due to lower energy import bill."
    ]
    interest_rates = [
        "Repo rate maintained at 6.5%. Yield curve steepening slightly.",
        "10-Year G-Sec yield at 7.05%. Liquidity deficit widening in the banking system.",
        "US Fed hints at 'higher for longer' rates; Indian markets pricing in delayed cuts.",
        "Short-term borrowing costs spike due to corporate advance tax outflows."
    ]
    
    return {
        "overallTrend": random.choice(trends),
        "marketVariations": random.choice(variations),
        "buySuggestions": random.choice(buys),
        "sellSuggestions": random.choice(sells),
        "actionableInsight": random.choice(insights),
        "economicIndicator": random.choice(economic_indicators),
        "interestRates": random.choice(interest_rates),
        "timestamp": datetime.now().strftime("%I:%M:%S %p")
    }
