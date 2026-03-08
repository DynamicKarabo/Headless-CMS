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
    <div className="flex min-h-screen bg-black text-[#ededed]">
      <Sidebar />
      <main className="flex-1 p-10 overflow-auto relative rounded-tl-2xl border-t border-l border-[#333333] bg-[#0a0a0a] shadow-2xl mt-4 max-h-[calc(100vh-1rem)] mr-4">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Create Content Model</h1>
          <p className="text-neutral-400 text-sm">Define a new content structure</p>
        </div>

        <div className="bg-[#111111] border border-[#333333] rounded-xl p-8 max-w-2xl shadow-sm">
          <form action={handleSubmit}>
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-sm font-medium text-neutral-300" htmlFor="name">Model Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="bg-black border border-[#333333] text-white rounded-md px-4 py-2.5 outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all font-sans" 
                placeholder="e.g. Blog Post" 
                required 
              />
            </div>
            
            <div className="flex flex-col gap-2 mb-8">
              <label className="text-sm font-medium text-neutral-300" htmlFor="description">Description (Optional)</label>
              <textarea 
                id="description" 
                name="description" 
                className="bg-black border border-[#333333] text-white rounded-md px-4 py-3 outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all font-sans resize-y min-h-[100px]" 
                placeholder="Briefly describe what this model represents"
                rows={3}
              ></textarea>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-[#333333]">
              <button 
                type="submit" 
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-black bg-white rounded-md hover:bg-neutral-200 transition-colors"
              >
                Create Model
              </button>
              <button 
                type="button" 
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#ededed] bg-transparent border border-[#333333] hover:bg-[#1a1a1a] rounded-md transition-colors" 
                onClick={() => router.push('/models')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
