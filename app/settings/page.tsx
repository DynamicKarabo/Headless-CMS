'use client';

import Sidebar from '@/components/Sidebar';
import { useUser } from '@clerk/nextjs';

export default function SettingsPage() {
  const { user, isLoaded } = useUser();

  const settingsItems = [
    { 
      title: 'Authentication', 
      description: 'Connected as your administrative account', 
      value: isLoaded ? user?.primaryEmailAddress?.emailAddress : 'Loading...',
      status: 'Active'
    },
    { 
      title: 'Edge API Endpoint', 
      description: 'Public URL for fetching content models', 
      value: '/api/content/[modelId]',
      status: 'Public'
    },
    { 
      title: 'Webhook Secret', 
      description: 'Used for on-demand edge cache revalidation', 
      value: 'dev-secret',
      status: 'Warning: Default'
    },
    { 
      title: 'Database Provider', 
      description: 'Current active database scheme', 
      value: 'libSQL (Local SQLite)',
      status: 'Development'
    }
  ];

  return (
    <div className="flex min-h-screen bg-black text-[#ededed]">
      <Sidebar />
      <main className="flex-1 p-10 overflow-auto relative rounded-tl-2xl border-t border-l border-[#333333] bg-[#0a0a0a] shadow-2xl mt-4 max-h-[calc(100vh-1rem)] mr-4">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-neutral-900/50 to-transparent pointer-events-none -z-10 rounded-tl-2xl" />
        
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Settings</h1>
          <p className="text-neutral-400 text-sm">Configure your global Edge CMS environment and API security.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          {settingsItems.map((item) => (
            <div key={item.title} className="bg-[#111111]/50 border border-[#333333] rounded-xl p-6 flex items-start justify-between group hover:border-neutral-700 transition-colors">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                <p className="text-neutral-500 text-sm mb-4">{item.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-black border border-[#333333] text-sm font-mono text-neutral-300">
                  {item.value}
                </div>
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border border-neutral-800 ${
                item.status.includes('Active') || item.status.includes('Public') 
                  ? 'text-emerald-500' 
                  : 'text-amber-500'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#333333] max-w-4xl flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium mb-1">Advanced Controls</h4>
            <p className="text-neutral-500 text-xs">Danger: These actions modify core global infrastructure.</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-md hover:bg-red-500/20 transition-colors">
            Reset Cache
          </button>
        </div>
      </main>
    </div>
  );
}
