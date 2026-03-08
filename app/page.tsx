import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-black text-[#ededed]">
      <Sidebar />
      <main className="flex-1 p-10 overflow-auto relative rounded-tl-2xl border-t border-l border-[#333333] bg-[#0a0a0a] shadow-2xl mt-4 max-h-[calc(100vh-1rem)] mr-4">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-neutral-900/50 to-transparent pointer-events-none -z-10 rounded-tl-2xl" />
        
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Overview</h1>
          <p className="text-neutral-400 text-sm">Welcome to your Edge-Optimized Headless CMS.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111111] border border-[#333333] rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-400 mb-4">Total Models</h3>
            <div className="text-4xl font-semibold text-white tracking-tight">0</div>
          </div>
          <div className="bg-[#111111] border border-[#333333] rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-400 mb-4">Published Content</h3>
            <div className="text-4xl font-semibold text-white tracking-tight">0</div>
          </div>
          <div className="bg-[#111111] border border-[#333333] rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
               <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <h3 className="text-sm font-medium text-neutral-400 mb-4">Edge Cache Hit Rate</h3>
            <div className="text-4xl font-semibold text-emerald-500 tracking-tight">99.9%</div>
          </div>
        </div>
      </main>
    </div>
  );
}
