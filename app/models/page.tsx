import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getModels } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function ModelsPage() {
  const models = await getModels();

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="title">Content Models</h1>
            <p className="subtitle">Define the structure of your content.</p>
          </div>
          <Link href="/models/new" className="btn btn-primary">
            + Create Model
          </Link>
        </div>

        {models.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <h3>No models yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Create your first content model to get started</p>
            <Link href="/models/new" className="btn btn-secondary">
              Create Model
            </Link>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.id}>
                    <td style={{ fontWeight: 600 }}>{model.name}</td>
                    <td style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{model.id}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{model.description}</td>
                    <td>{new Date(model.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
