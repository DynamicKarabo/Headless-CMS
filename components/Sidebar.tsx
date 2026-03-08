'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/' },
    { label: 'Content Models', href: '/models' },
    { label: 'Content Entries', href: '/content' },
    { label: 'Settings', href: '/settings' },
  ];

  const { isSignedIn, isLoaded } = useUser();

  return (
    <aside className="w-64 flex-shrink-0 min-h-screen border-r border-[#333333] bg-[#000000] p-6 flex flex-col gap-8">
      <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#ededed]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ededed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#ededed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#ededed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Edge</span><span className="text-neutral-500 font-normal">CMS</span>
      </div>
      
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-[#171717] text-[#ededed]' 
                  : 'text-[#888888] hover:text-[#ededed] hover:bg-[#111111]'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-[#333333]">
        {isLoaded && isSignedIn && (
          <div className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-[#111111] transition-colors">
             <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-8 h-8 rounded-md' } }} />
             <span className="text-neutral-400">Account</span>
          </div>
        )}
        {isLoaded && !isSignedIn && (
          <div className="flex items-center justify-center w-full">
            <SignInButton mode="modal">
               <button className="w-full px-4 py-2 text-sm font-medium text-black bg-white rounded-md hover:bg-neutral-200 transition-colors">
                 Sign In
               </button>
            </SignInButton>
          </div>
        )}
      </div>
    </aside>
  );
}
