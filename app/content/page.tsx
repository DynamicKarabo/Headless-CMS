import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getDocuments, getModels } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function ContentPage() {
  const documents = await getDocuments();
  const models = await getModels();
  const modelsMap = models.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {} as Record<string, string>);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="title">Content Entries</h1>
            <p className="subtitle">Manage all your published content.</p>
          </div>
          <Link href="/content/new" className="btn btn-primary">
            + Create Entry
          </Link>
        </div>

        {documents.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h3>No entries yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Create your first content entry</p>
            <Link href="/content/new" className="btn btn-secondary">
              Create Entry
            </Link>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Model</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => {
                  const data = JSON.parse(doc.contentJson);
                  return (
                    <tr key={doc.id}>
                      <td style={{ fontWeight: 600 }}>{data.title || 'Untitled'}</td>
                      <td>
                        <span className="badge">{modelsMap[doc.modelId] || doc.modelId}</span>
                      </td>
                      <td style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{doc.slug}</td>
                      <td>
                        <span className="badge active">Published</span>
                      </td>
                      <td>{new Date(doc.updatedAt).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
