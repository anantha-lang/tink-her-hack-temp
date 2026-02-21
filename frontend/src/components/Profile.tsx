import React, { useState } from 'react';
import { User, Mail, Phone, Shield, ExternalLink, Key, Check } from 'lucide-react';

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState('user@arthadhan.demo');
    const [phone, setPhone] = useState('+91 98765 43210');
    const [apiKey, setApiKey] = useState('sk_live_.........................k9Xp');

    const handleRegenerateKey = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let newKey = 'sk_live_';
        for (let i = 0; i < 24; i++) {
            newKey += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setApiKey(newKey);
    };
    return (
        <div className="flex-col gap-6" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            {/* Header Section */}
            <div className="card flex-row gap-6" style={{ alignItems: 'center', padding: '2rem' }}>
                <div style={{
                    width: 100, height: 100, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-blue), #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2.5rem', fontWeight: 700, color: 'white',
                    boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.5)'
                }}>
                    U
                </div>
                <div className="flex-col gap-2" style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: 700 }}>ArthaDhan User</h2>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Pro Member (Demo Environment)</p>
                    <div className="flex-row gap-2" style={{ marginTop: '0.5rem' }}>
                        <span className="badge green">Account Active</span>
                        <span className="badge blue">2FA Enabled</span>
                    </div>
                </div>
                <button className={`btn ${isEditing ? 'btn-primary' : 'btn-outline'} flex-row gap-2`} onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? <Check size={16} /> : <User size={16} />}
                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                </button>
            </div>

            {/* User Details & Connected Accounts */}
            <div className="flex-row gap-6">
                <div className="card flex-col gap-4" style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: 0 }}>Personal Information</h3>
                    <div className="flex-col gap-3">
                        <div className="flex-row justify-between" style={{ alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> Email</span>
                            <span style={{ fontWeight: 500 }}>
                                {isEditing ? <input value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '0.2rem 0.5rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }} /> : email}
                            </span>
                        </div>
                        <div className="flex-row justify-between" style={{ alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> Phone</span>
                            <span style={{ fontWeight: 500 }}>
                                {isEditing ? <input value={phone} onChange={e => setPhone(e.target.value)} style={{ padding: '0.2rem 0.5rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }} /> : phone}
                            </span>
                        </div>
                        <div className="flex-row justify-between" style={{ alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={16} /> KYC Status</span>
                            <span className="text-green" style={{ fontWeight: 600 }}>Verified</span>
                        </div>
                    </div>
                </div>


            </div>

            {/* Subscription & Billing */}
            <div className="card flex-col gap-4">
                <div className="flex-row justify-between">
                    <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Subscription & Billing</h3>
                    <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}>
                        <ExternalLink size={14} /> Manage Billing
                    </button>
                </div>
                <div style={{ padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'linear-gradient(45deg, var(--bg-tertiary), rgba(139, 92, 246, 0.05))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="flex-col gap-1">
                        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#8b5cf6' }}>ArthaDhan Pro Elite</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Renews on Dec 31, 2026</span>
                    </div>
                    <div className="flex-col" style={{ alignItems: 'flex-end', gap: '0.2rem' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹14,999<span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>/yr</span></span>
                        <span className="text-green" style={{ fontSize: '0.8rem', fontWeight: 500 }}>Active Auto-Renew</span>
                    </div>
                </div>
            </div>

            {/* API Access */}
            <div className="card flex-col gap-4">
                <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Key size={18} color="var(--accent-blue)" /> Developer API Access
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Keys for programmatic access to ArthaDhan AI endpoints and custom strategy backtesting webhooks.</p>
                <div className="flex-row justify-between" style={{ alignItems: 'center', backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex-col gap-1">
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Production Primary Key</span>
                        <code style={{ color: 'var(--accent-blue)', fontSize: '0.9rem', letterSpacing: '2px' }}>{apiKey}</code>
                    </div>
                    <button className="btn btn-outline" style={{ fontSize: '0.75rem' }} onClick={handleRegenerateKey}>Regenerate</button>
                </div>
            </div>

        </div>
    );
};

export default Profile;
