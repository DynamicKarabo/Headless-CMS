import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getModels } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function ModelsPage() {
  const models = await getModels();

  return (
    <div className="flex min-h-screen bg-black text-[#ededed]">
      <Sidebar />
      <main className="flex-1 p-10 overflow-auto relative rounded-tl-2xl border-t border-l border-[#333333] bg-[#0a0a0a] shadow-2xl mt-4 max-h-[calc(100vh-1rem)] mr-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Content Models</h1>
            <p className="text-neutral-400 text-sm">Define the structure of your content.</p>
          </div>
          <Link 
            href="/models/new" 
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white rounded-md hover:bg-neutral-200 transition-colors"
          >
            Create Model
          </Link>
        </div>

        {models.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-[#333333] rounded-xl bg-[#111111]/50">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-white mb-1">No models yet</h3>
            <p className="text-neutral-400 text-sm mb-6">Create your first content model to get started</p>
            <Link 
              href="/models/new" 
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#ededed] bg-[#171717] border border-[#333333] rounded-md hover:bg-[#222222] transition-colors"
            >
              Create Model
            </Link>
          </div>
        ) : (
          <div className="bg-[#111111] border border-[#333333] rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#333333] bg-[#1a1a1a]">
                  <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333333]">
                {models.map((model) => (
                  <tr key={model.id} className="hover:bg-[#1a1a1a] transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{model.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-500">{model.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{model.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{new Date(model.createdAt).toLocaleDateString()}</td>
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
