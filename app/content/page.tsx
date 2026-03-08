import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getDocuments, getModels } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function ContentPage() {
  const documents = await getDocuments();
  const models = await getModels();
  const modelsMap = models.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {} as Record<string, string>);

  return (
    <div className="flex min-h-screen bg-black text-[#ededed]">
      <Sidebar />
      <main className="flex-1 p-10 overflow-auto relative rounded-tl-2xl border-t border-l border-[#333333] bg-[#0a0a0a] shadow-2xl mt-4 max-h-[calc(100vh-1rem)] mr-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Content Entries</h1>
            <p className="text-neutral-400 text-sm">Manage all your published content.</p>
          </div>
          <Link 
            href="/content/new" 
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white rounded-md hover:bg-neutral-200 transition-colors"
          >
            Create Entry
          </Link>
        </div>

        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-[#333333] rounded-xl bg-[#111111]/50">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-white mb-1">No entries yet</h3>
            <p className="text-neutral-400 text-sm mb-6">Create your first content entry</p>
            <Link 
              href="/content/new" 
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#ededed] bg-[#171717] border border-[#333333] rounded-md hover:bg-[#222222] transition-colors"
            >
              Create Entry
            </Link>
          </div>
        ) : (
          <div className="bg-[#111111] border border-[#333333] rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#333333] bg-[#1a1a1a]">
                  <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">Model</th>
                  <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333333]">
                {documents.map((doc) => {
                  const data = JSON.parse(doc.contentJson);
                  return (
                    <tr key={doc.id} className="hover:bg-[#1a1a1a] transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{data.title || 'Untitled'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#222222] text-neutral-300 border border-[#333333]">
                          {modelsMap[doc.modelId] || doc.modelId}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-500">{doc.slug}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {doc.status === 'published' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-400/10 text-amber-500 border border-amber-400/20">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{new Date(doc.updatedAt).toLocaleDateString()}</td>
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
