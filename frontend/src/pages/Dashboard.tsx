import React, { useState } from 'react';
import MorningBriefing from '../components/MorningBriefing';
import OpportunityScanner from '../components/OpportunityScanner';
import PortfolioHealth from '../components/PortfolioHealth';
import PaperTrading from '../components/PaperTrading';
import LiveMonitor from '../components/LiveMonitor';
import StrategyBuilder from '../components/StrategyBuilder';
import OptionsIntelligence from '../components/OptionsIntelligence';
import LearningDashboard from '../components/LearningDashboard';
import AIAnalyst from '../components/AIAnalyst';
import Profile from '../components/Profile';
import SettingsView from '../components/Settings';
import { Activity, BarChart2, BookOpen, Clock, Compass, LayoutDashboard, Settings, User, BrainCircuit, Zap } from 'lucide-react';

import { motion } from 'framer-motion';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('Dashboard');
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="app-container fade-in"
        >
            {/* Sidebar */}
            <aside className="sidebar">
                <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--accent-blue), #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Activity color="white" size={18} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', color: 'white', letterSpacing: '0.05em' }}>ArthaDhan</h2>
                </div>

                <div style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, paddingLeft: '1rem', marginBottom: '0.5rem' }}>Menu</p>

                    <div className="nav-item" style={navStyle(activeTab === 'Dashboard')} onClick={() => setActiveTab('Dashboard')}>
                        <LayoutDashboard size={18} />
                        <span style={{ fontWeight: 500 }}>Dashboard</span>
                    </div>
                    <div className="nav-item" style={navStyle(activeTab === 'Scanner')} onClick={() => setActiveTab('Scanner')}>
                        <Compass size={18} />
                        <span style={{ fontWeight: 500 }}>Scanner</span>
                    </div>
                    <div className="nav-item" style={navStyle(activeTab === 'Portfolio')} onClick={() => setActiveTab('Portfolio')}>
                        <BarChart2 size={18} />
                        <span style={{ fontWeight: 500 }}>Portfolio</span>
                    </div>
                    <div className="nav-item" style={navStyle(activeTab === 'Live Monitor')} onClick={() => setActiveTab('Live Monitor')}>
                        <Clock size={18} />
                        <span style={{ fontWeight: 500 }}>Live Monitor</span>
                    </div>
                    <div className="nav-item" style={navStyle(activeTab === 'Strategy Builder')} onClick={() => setActiveTab('Strategy Builder')}>
                        <BrainCircuit size={18} />
                        <span style={{ fontWeight: 500 }}>Strategy Builder</span>
                    </div>
                    <div className="nav-item" style={navStyle(activeTab === 'Options Intelligence')} onClick={() => setActiveTab('Options Intelligence')}>
                        <Zap size={18} />
                        <span style={{ fontWeight: 500 }}>Options Intel</span>
                    </div>
                    <div className="nav-item" style={navStyle(activeTab === 'Learning')} onClick={() => setActiveTab('Learning')}>
                        <BookOpen size={18} />
                        <span style={{ fontWeight: 500 }}>Learning</span>
                    </div>
                </div>

                <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--border-color)' }}>
                    <div className="nav-item" style={navStyle(activeTab === 'Profile')} onClick={() => setActiveTab('Profile')}>
                        <User size={18} />
                        <span style={{ fontWeight: 500 }}>Profile</span>
                    </div>
                    <div className="nav-item" style={navStyle(activeTab === 'Settings')} onClick={() => setActiveTab('Settings')}>
                        <Settings size={18} />
                        <span style={{ fontWeight: 500 }}>Settings</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="header flex-row justify-between">
                    <div className="flex-col gap-1">
                        <div className="flex-row gap-2 align-center" style={{ alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0, textTransform: 'uppercase' }}>HELLO USER!</h3>
                            <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--status-red)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', border: '1px solid var(--status-red)', letterSpacing: '0.05em' }}>
                                DEMO ENVIRONMENT
                            </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Market opens in 1h 12m (Simulated Data)</p>
                    </div>
                    <div className="flex-row gap-4" style={{ paddingRight: '4rem', alignItems: 'center' }}>
                        <div className="flex-row gap-2" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 9999 }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>NIFTY 50 (SIM):</span>
                            <span className="text-green" style={{ fontWeight: 600, fontSize: '0.875rem' }}>22,450.15 (+0.6%)</span>
                        </div>
                    </div>
                </header>

                <div className="page-container flex-col gap-6">

                    {activeTab === 'Dashboard' && (
                        <>
                            {/* Top section: Morning Briefing */}
                            <MorningBriefing />

                            {/* Grid Layout for Opportunities and Risk */}
                            <div className="dashboard-grid">
                                {/* Opportunities */}
                                <div className="flex-col gap-4">
                                    <div className="flex-row justify-between">
                                        <h2>AI Opportunity Scanner</h2>
                                        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }} onClick={() => setActiveTab('Scanner')}>
                                            <Activity size={16} /> View All
                                        </button>
                                    </div>
                                    <OpportunityScanner isDashboard />
                                </div>

                                {/* Risk / Portfolio */}
                                <div className="flex-col gap-4">
                                    <h2>Risk Analytics</h2>
                                    <PortfolioHealth />
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'Portfolio' && (
                        <>
                            <div className="flex-row gap-2" style={{ marginBottom: '0.5rem' }}>
                                <h2 style={{ fontSize: '2rem' }}>Portfolio</h2>
                                <span className="badge green" style={{ alignSelf: 'center' }}>VIRTUAL CAPITAL Mode</span>
                            </div>
                            <PaperTrading />
                        </>
                    )}

                    {activeTab === 'Live Monitor' && (
                        <>
                            <div className="flex-row gap-2" style={{ marginBottom: '0.5rem' }}>
                                <h2 style={{ fontSize: '2rem' }}>Live Stock Monitoring & Screener</h2>
                                <span className="badge blue" style={{ alignSelf: 'center' }}>NSE Feed</span>
                            </div>
                            <LiveMonitor />
                        </>
                    )}

                    {activeTab === 'Scanner' && (
                        <>
                            <div className="flex-row gap-2" style={{ marginBottom: '0.5rem' }}>
                                <h2 style={{ fontSize: '2rem' }}>All Opportunities</h2>
                            </div>
                            <OpportunityScanner />
                        </>
                    )}

                    {activeTab === 'Options Intelligence' && (
                        <>
                            <div className="flex-row gap-2" style={{ marginBottom: '0.5rem' }}>
                                <h2 style={{ fontSize: '2rem' }}>Options Intelligence</h2>
                                <span className="badge blue" style={{ alignSelf: 'center' }}>NSE F&O</span>
                            </div>
                            <OptionsIntelligence />
                        </>
                    )}

                    {activeTab === 'Strategy Builder' && (
                        <>
                            <div className="flex-row gap-2" style={{ marginBottom: '0.5rem' }}>
                                <h2 style={{ fontSize: '2rem' }}>Strategy Builder</h2>
                                <span className="badge green" style={{ alignSelf: 'center' }}>AI Backtesting Core</span>
                            </div>
                            <StrategyBuilder />
                        </>
                    )}

                    {activeTab === 'Learning' && (
                        <>
                            <div className="flex-row gap-2" style={{ marginBottom: '0.5rem' }}>
                                <h2 style={{ fontSize: '2rem' }}>Learning Hub</h2>
                                <span className="badge blue" style={{ alignSelf: 'center' }}>Educational Resources</span>
                            </div>
                            <LearningDashboard />
                        </>
                    )}

                    {activeTab === 'Profile' && (
                        <>
                            <div className="flex-row gap-2" style={{ marginBottom: '0.5rem' }}>
                                <h2 style={{ fontSize: '2rem' }}>My Profile</h2>
                                <span className="badge green" style={{ alignSelf: 'center' }}>Account details</span>
                            </div>
                            <Profile />
                        </>
                    )}

                    {activeTab === 'Settings' && (
                        <>
                            <div className="flex-row gap-2" style={{ marginBottom: '0.5rem' }}>
                                <h2 style={{ fontSize: '2rem' }}>Platform Settings</h2>
                                <span className="badge blue" style={{ alignSelf: 'center' }}>Configuration</span>
                            </div>
                            <SettingsView />
                        </>
                    )}

                </div>
            </main>

            {/* Global AI Floating Widget */}
            <AIAnalyst currentTab={activeTab} />
        </motion.div>
    );
}

const navStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    color: isActive ? 'white' : 'var(--text-secondary)',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s',
});

export default Dashboard;
