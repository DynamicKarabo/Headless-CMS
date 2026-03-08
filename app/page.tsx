import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="title">Overview</h1>
            <p className="subtitle">Welcome to your Edge-Optimized Headless CMS.</p>
          </div>
        </div>

        <div className="flex gap-lg" style={{ marginBottom: '2rem' }}>
          <div className="card" style={{ flex: 1 }}>
            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Models</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>0</div>
          </div>
          <div className="card" style={{ flex: 1 }}>
            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Published Content</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>0</div>
          </div>
          <div className="card" style={{ flex: 1 }}>
            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Edge Cache Hit Rate</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--success)' }}>99.9%</div>
          </div>
        </div>
      </main>
    </div>
  );
}
