import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Palette, Database, Shield, Monitor, Smartphone, Globe } from 'lucide-react';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('General');

    const tabs = [
        { id: 'General', icon: <SettingsIcon size={16} /> },
        { id: 'Appearance', icon: <Palette size={16} /> },
        { id: 'Notifications', icon: <Bell size={16} /> },
        { id: 'Data Feeds', icon: <Database size={16} /> },
        { id: 'Security', icon: <Shield size={16} /> },
    ];

    return (
        <div className="flex-row gap-6" style={{ height: 'calc(100vh - 120px)', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Sidebar Navigation for Settings */}
            <div className="card flex-col gap-2" style={{ width: '240px', padding: '1.5rem 1rem', flexShrink: 0 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', paddingLeft: '0.75rem', fontWeight: 600 }}>Preferences</h3>
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '0.75rem', borderRadius: '8px', cursor: 'pointer',
                            backgroundColor: activeTab === tab.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                            color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                            fontWeight: activeTab === tab.id ? 600 : 400,
                            transition: 'background-color 0.2s',
                        }}
                    >
                        <span style={{ color: activeTab === tab.id ? 'var(--accent-blue)' : 'var(--text-muted)' }}>{tab.icon}</span>
                        {tab.id}
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="card flex-col gap-6" style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{activeTab} Settings</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Customize your trading environment and AI parameters.</p>
                </div>

                {activeTab === 'General' && (
                    <div className="flex-col gap-6">
                        <div className="flex-col gap-2">
                            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Base Currency</label>
                            <select style={{ padding: '0.75rem', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', maxWidth: '300px' }}>
                                <option>INR (₹) - Indian Rupee</option>
                                <option>USD ($) - US Dollar</option>
                            </select>
                        </div>
                        <div className="flex-col gap-2">
                            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Timezone</label>
                            <select style={{ padding: '0.75rem', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', maxWidth: '300px' }}>
                                <option>Asia/Kolkata (IST)</option>
                                <option>America/New_York (EST)</option>
                                <option>Europe/London (GMT)</option>
                            </select>
                        </div>
                        <div className="flex-col gap-3">
                            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Language</label>
                            <div className="flex-row gap-4" style={{ alignItems: 'center', backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                                <Globe size={20} color="var(--accent-blue)" />
                                <span style={{ fontWeight: 500, flex: 1 }}>English (US)</span>
                                <button className="btn btn-outline" style={{ fontSize: '0.75rem' }}>Change</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Appearance' && (
                    <div className="flex-col gap-6">
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>Interface Theme</h4>
                        <div className="flex-row gap-4">
                            <div className="flex-col gap-2" style={{ alignItems: 'center', cursor: 'pointer' }}>
                                <div style={{ width: 120, height: 80, borderRadius: 8, backgroundColor: '#1a1f2e', border: '2px solid var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Monitor size={24} color="var(--accent-blue)" />
                                </div>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-blue)' }}>Dark (Active)</span>
                            </div>
                            <div className="flex-col gap-2" style={{ alignItems: 'center', cursor: 'pointer', opacity: 0.5 }}>
                                <div style={{ width: 120, height: 80, borderRadius: 8, backgroundColor: '#f8fafc', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Monitor size={24} color="#64748b" />
                                </div>
                                <span style={{ fontSize: '0.85rem' }}>Light</span>
                            </div>
                        </div>

                        <div className="flex-row justify-between" style={{ alignItems: 'center', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                            <div className="flex-col gap-1">
                                <span style={{ fontWeight: 600 }}>Density</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Compact view for tables and charts</span>
                            </div>
                            <select style={{ padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white' }}>
                                <option>Comfortable</option>
                                <option>Compact</option>
                            </select>
                        </div>
                    </div>
                )}

                {activeTab === 'Data Feeds' && (
                    <div className="flex-col gap-4">
                        <div className="flex-row justify-between" style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem 1.5rem', borderRadius: '8px', alignItems: 'center' }}>
                            <div className="flex-col gap-1">
                                <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Primary NSE Data Feed</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Latency: ~12ms</span>
                            </div>
                            <span className="badge green">Connected</span>
                        </div>

                        <div className="flex-row justify-between" style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem 1.5rem', borderRadius: '8px', alignItems: 'center' }}>
                            <div className="flex-col gap-1">
                                <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>BSE Data Feed</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Fallback connection</span>
                            </div>
                            <span className="badge yellow">Connecting...</span>
                        </div>
                    </div>
                )}

                {activeTab === 'Notifications' && (
                    <div className="flex-col gap-4">
                        <div className="flex-row justify-between" style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="flex-col gap-1">
                                <span style={{ fontWeight: 600 }}>AI Trade Suggestions</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Receive toast notifications for high-confidence AI setups.</span>
                            </div>
                            <button className="btn btn-primary" style={{ padding: '0.2rem 1rem' }}>On</button>
                        </div>
                        <div className="flex-row justify-between" style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="flex-col gap-1">
                                <span style={{ fontWeight: 600 }}>Margin Alerts</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Warn when margin utilization exceeds 80%.</span>
                            </div>
                            <button className="btn btn-primary" style={{ padding: '0.2rem 1rem' }}>On</button>
                        </div>
                        <div className="flex-row justify-between" style={{ padding: '1rem 0' }}>
                            <div className="flex-col gap-1">
                                <span style={{ fontWeight: 600 }}>Email Briefing</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Daily morning market briefing sent at 8:00 AM IST.</span>
                            </div>
                            <button className="btn btn-outline" style={{ padding: '0.2rem 1rem' }}>Off</button>
                        </div>
                    </div>
                )}

                {activeTab === 'Security' && (
                    <div className="flex-col gap-4">
                        <div className="flex-row justify-between" style={{ alignItems: 'center', backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                            <div className="flex-col gap-1">
                                <span style={{ fontWeight: 600 }}>Two-Factor Authentication (2FA)</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Secure login using Authenticator App.</span>
                            </div>
                            <button className="btn btn-outline" style={{ borderColor: 'var(--status-green)', color: 'var(--status-green)' }}>Manage 2FA</button>
                        </div>

                        <div className="flex-col gap-2" style={{ marginTop: '1rem' }}>
                            <h4 style={{ margin: 0 }}>Active Sessions</h4>
                            <div className="flex-row justify-between" style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <div className="flex-row gap-3" style={{ alignItems: 'center' }}>
                                    <Monitor size={20} color="var(--text-secondary)" />
                                    <div className="flex-col gap-1">
                                        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Windows / Chrome</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--status-green)' }}>Current Session</span>
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mumbai, IN</span>
                            </div>
                            <div className="flex-row justify-between" style={{ padding: '1rem 0' }}>
                                <div className="flex-row gap-3" style={{ alignItems: 'center' }}>
                                    <Smartphone size={20} color="var(--text-secondary)" />
                                    <div className="flex-col gap-1">
                                        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>iPhone 14 Pro / Safari</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last active 2 hrs ago</span>
                                    </div>
                                </div>
                                <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', color: 'var(--status-red)' }}>Revoke</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex-row justify-end" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    <button className="btn btn-primary">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
