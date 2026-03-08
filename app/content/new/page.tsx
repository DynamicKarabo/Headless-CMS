'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { createDocument, getModels } from '@/app/actions';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';

export default function NewContentPage() {
  const router = useRouter();
  const [models, setModels] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState<any | null>(null);
  
  // State block for capturing rich text content which doesn't natively submit via FormData like standard inputs
  const [richTextData, setRichTextData] = useState<Record<string, string>>({});
  
  useEffect(() => {
    getModels().then(setModels);
  }, []);

  async function handleSubmit(formData: FormData) {
    if (!selectedModel) return;
    
    const data: Record<string, any> = {};
    const schema = JSON.parse(selectedModel.schemaJson);
    schema.forEach((field: any) => {
      if (field.type === 'rich-text') {
        data[field.name] = richTextData[field.name] || '';
      } else {
        data[field.name] = formData.get(field.name);
      }
    });

    await createDocument(formData, selectedModel.id, data);
    router.push('/content');
  }

  return (
    <div className="flex min-h-screen bg-black text-[#ededed]">
      <Sidebar />
      <main className="flex-1 p-10 overflow-auto relative rounded-tl-2xl border-t border-l border-[#333333] bg-[#0a0a0a] shadow-2xl mt-4 max-h-[calc(100vh-1rem)] mr-4">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Create Content Entry</h1>
          <p className="text-neutral-400 text-sm">Publish new content to your Edge API</p>
        </div>

        <div className="bg-[#111111] border border-[#333333] rounded-xl p-8 max-w-2xl shadow-sm mb-8">
          {!selectedModel ? (
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Select a Content Model First</h3>
              {models.length === 0 ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
                  You need to create a content model before you can add entries.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {models.map(m => (
                    <button 
                      key={m.id} 
                      className="flex items-center justify-between w-full px-4 py-3 text-left bg-[#1a1a1a] border border-[#333333] rounded-md hover:bg-[#222222] hover:border-neutral-600 transition-all group"
                      onClick={() => setSelectedModel(m)}
                    >
                      <span className="font-medium text-[#ededed]">{m.name}</span>
                      <span className="text-neutral-500 group-hover:text-white transition-colors">→</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <form action={handleSubmit} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#333333]">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-400">Targeting Model:</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-[#222222] text-[#ededed] border border-[#333333]">
                    {selectedModel.name}
                  </span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setSelectedModel(null)} 
                  className="text-xs font-medium text-neutral-500 hover:text-white transition-colors underline decoration-neutral-500/30 hover:decoration-white/50 underline-offset-4"
                >
                  Change Model
                </button>
              </div>

              {JSON.parse(selectedModel.schemaJson).map((field: any) => (
                <div key={field.name} className="flex flex-col gap-2 mb-6">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-1" htmlFor={field.name}>
                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'rich-text' ? (
                    <div className="flex-1">
                      <RichTextEditor 
                        content={richTextData[field.name] || ''} 
                        onChange={(html) => setRichTextData(prev => ({...prev, [field.name]: html}))} 
                        id={field.name}
                      />
                      {/* Hidden input to ensure native form validation works if required */}
                      {field.required && (
                        <input type="hidden" name={field.name} value={richTextData[field.name] || ''} required />
                      )}
                    </div>
                  ) : (
                    <input 
                      type="text" 
                      id={field.name} 
                      name={field.name} 
                      className="bg-black border border-[#333333] text-white rounded-md px-4 py-2.5 outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all font-sans" 
                      required={field.required}
                    />
                  )}
                </div>
              ))}

              <div className="flex items-center gap-4 pt-6 border-t border-[#333333] mt-8">
                <button 
                  type="submit"
                  name="status"
                  value="published" 
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-black bg-white rounded-md hover:bg-neutral-200 transition-colors"
                >
                  Publish Entry
                </button>
                <button 
                  type="submit" 
                  name="status"
                  value="draft"
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#ededed] bg-[#1a1a1a] border border-[#333333] hover:bg-[#222222] rounded-md transition-colors"
                >
                  Save as Draft
                </button>
                <button 
                  type="button" 
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#ededed] bg-transparent border border-[#333333] hover:bg-[#1a1a1a] rounded-md transition-colors" 
                  onClick={() => router.push('/content')}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
