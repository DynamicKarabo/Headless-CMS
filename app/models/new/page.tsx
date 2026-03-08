'use client';

import Sidebar from '@/components/Sidebar';
import { createModel } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function NewModelPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    await createModel(formData);
    router.push('/models');
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="title">Create Content Model</h1>
            <p className="subtitle">Define a new content structure</p>
          </div>
        </div>

        <div className="card" style={{ maxWidth: '600px' }}>
          <form action={handleSubmit}>
            <div className="input-group">
              <label className="label" htmlFor="name">Model Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="input" 
                placeholder="e.g. Blog Post" 
                required 
              />
            </div>
            
            <div className="input-group">
              <label className="label" htmlFor="description">Description</label>
              <textarea 
                id="description" 
                name="description" 
                className="input" 
                placeholder="Optional description"
                rows={3}
              ></textarea>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary">Create Model</button>
              <button type="button" className="btn btn-secondary" onClick={() => router.push('/models')}>Cancel</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
