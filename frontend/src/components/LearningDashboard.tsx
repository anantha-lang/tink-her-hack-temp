import React from 'react';
import { BookOpen, PlayCircle, Award, CheckCircle2, TrendingUp, Star } from 'lucide-react';

interface Course {
    id: string;
    title: string;
    description: string;
    progress: number;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    tags: string[];
}

const COURSES: Course[] = [
    {
        id: 'c1',
        title: 'Price Action Foundations',
        description: 'Master structure, support/resistance, and candlestick psychology to read raw market data without indicators.',
        progress: 100,
        duration: '2.5 hrs',
        level: 'Beginner',
        tags: ['Technical', 'Foundations']
    },
    {
        id: 'c2',
        title: 'Options Greeks & Greeks Trading',
        description: 'Deep dive into Delta, Gamma, Theta, and Vega. Understand how premium decay affects NIFTY/BANKNIFTY options.',
        progress: 45,
        duration: '4.0 hrs',
        level: 'Intermediate',
        tags: ['F&O', 'Math']
    },
    {
        id: 'c3',
        title: 'Advanced Market Breadth',
        description: 'Learn to use Advance/Decline ratios, TRIN, and TICK to predict severe market reversals before they happen.',
        progress: 0,
        duration: '3.2 hrs',
        level: 'Advanced',
        tags: ['Market Data', 'Quant']
    }
];

const TermOfTheDay = () => (
    <div className="card" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))', borderColor: 'var(--accent-blue)' }}>
        <div className="flex-row justify-between align-center" style={{ marginBottom: '1rem' }}>
            <div className="flex-row gap-2">
                <BookOpen color="var(--accent-blue)" />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-blue)' }}>Term of the Day</h3>
            </div>
            <span className="badge blue">Derivatives</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'white' }}>Implied Volatility (IV)</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
            Implied Volatility represents the market's expectation of future price fluctuations of an underlying security. High IV means the options premiums are expensive because the market anticipates large swings.
        </p>
        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-orange)' }}>
            <strong>Trading Insight:</strong> During high IV environments (like pre-earnings), outright buying of Calls or Puts is mathematically risky due to 'IV Crush'. Selling spreads is generally preferred.
        </div>
    </div>
);

const CustomLearningPath = () => (
    <div className="card flex-col gap-4">
        <h3>AI Personalized Learning Path</h3>
        <p style={{ color: 'var(--text-muted)' }}>Based on your recent trades and NIFTY market conditions, AI suggests these modules.</p>

        <div className="flex-col gap-3">
            {COURSES.map(course => (
                <div key={course.id} style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer', transition: 'border-color 0.2s' }} className="hover-border-accent">
                    <div className="flex-row justify-between">
                        <div className="flex-row gap-2 align-center">
                            {course.progress === 100 ? <CheckCircle2 color="var(--accent-green)" /> : <PlayCircle color="var(--accent-blue)" />}
                            <h4 style={{ color: 'white', fontSize: '1.1rem' }}>{course.title}</h4>
                        </div>
                        <div className="flex-row gap-2">
                            <span className={`badge ${course.level === 'Beginner' ? 'green' : course.level === 'Intermediate' ? 'blue' : 'orange'}`}>
                                {course.level}
                            </span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{course.duration}</span>
                        </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{course.description}</p>

                    <div className="flex-row gap-4 align-center">
                        <div style={{ flex: 1, height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${course.progress}%`, backgroundColor: course.progress === 100 ? 'var(--accent-green)' : 'var(--accent-blue)' }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', width: '40px', textAlign: 'right' }}>{course.progress}%</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const LearningDashboard: React.FC = () => {
    return (
        <div className="dashboard-grid">
            <div className="flex-col gap-6" style={{ gridColumn: 'span 2' }}>

                {/* Progress Header */}
                <div className="flex-row gap-4">
                    <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Award color="var(--accent-green)" size={24} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Modules Completed</p>
                            <h2 style={{ fontSize: '1.5rem' }}>12</h2>
                        </div>
                    </div>
                    <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Star color="var(--accent-blue)" size={24} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Quiz Average</p>
                            <h2 style={{ fontSize: '1.5rem' }}>85%</h2>
                        </div>
                    </div>
                    <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TrendingUp color="var(--accent-orange)" size={24} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Current Streak</p>
                            <h2 style={{ fontSize: '1.5rem' }}>4 Days</h2>
                        </div>
                    </div>
                </div>

                <CustomLearningPath />
            </div>

            <div className="flex-col gap-6">
                <TermOfTheDay />

                <div className="card flex-col gap-4">
                    <h3>Upcoming Live Sessions</h3>
                    <div style={{ padding: '1rem', borderLeft: '2px solid var(--accent-red)', backgroundColor: 'var(--bg-primary)' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.25rem' }}>LIVE IN 2 HOURS</p>
                        <h4 style={{ color: 'white' }}>Navigating the RBI Policy Meeting</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Instructor: Neha Sharma</p>
                    </div>
                    <div style={{ padding: '1rem', borderLeft: '2px solid var(--text-muted)', backgroundColor: 'var(--bg-primary)' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>TOMORROW, 10:00 AM</p>
                        <h4 style={{ color: 'white' }}>Advanced Trendline Architecture</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Instructor: Amit Patel</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningDashboard;
