'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { createDocument, getModels } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function NewContentPage() {
  const router = useRouter();
  const [models, setModels] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState<any | null>(null);
  
  // Load models on mount
  useEffect(() => {
    getModels().then(setModels);
  }, []);

  async function handleSubmit(formData: FormData) {
    if (!selectedModel) return;
    
    // Convert form data to object based on schema
    const data: Record<string, any> = {};
    const schema = JSON.parse(selectedModel.schemaJson);
    schema.forEach((field: any) => {
      data[field.name] = formData.get(field.name);
    });

    await createDocument(formData, selectedModel.id, data);
    router.push('/content');
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="title">Create Content Entry</h1>
            <p className="subtitle">Publish new content to your Edge API</p>
          </div>
        </div>

        <div className="card" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
          {!selectedModel ? (
            <div>
              <h3 style={{ marginBottom: '1rem' }}>Select a Content Model First</h3>
              {models.length === 0 ? (
                <p style={{ color: 'var(--danger)' }}>You need to create a content model before you can add entries.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {models.map(m => (
                    <button 
                      key={m.id} 
                      className="btn btn-secondary" 
                      style={{ justifyContent: 'flex-start' }}
                      onClick={() => setSelectedModel(m)}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <form action={handleSubmit}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge">Model: {selectedModel.name}</span>
                <button type="button" onClick={() => setSelectedModel(null)} style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Change Model</button>
              </div>

              {JSON.parse(selectedModel.schemaJson).map((field: any) => (
                <div key={field.name} className="input-group">
                  <label className="label" htmlFor={field.name}>
                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    {field.required && ' *'}
                  </label>
                  {field.type === 'rich-text' ? (
                    <textarea 
                      id={field.name} 
                      name={field.name} 
                      className="input" 
                      required={field.required}
                      rows={6}
                    ></textarea>
                  ) : (
                    <input 
                      type="text" 
                      id={field.name} 
                      name={field.name} 
                      className="input" 
                      required={field.required}
                    />
                  )}
                </div>
              ))}

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary">Publish Entry</button>
                <button type="button" className="btn btn-secondary" onClick={() => router.push('/content')}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
