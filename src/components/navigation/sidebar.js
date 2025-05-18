'use client';

import {
  HomeIcon,
  SparklesIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { icon: <HomeIcon className="h-6 w-6" />, label: 'Home' },
    { icon: <SparklesIcon className="h-6 w-6" />, label: 'Leads' },
    { icon: <ClipboardDocumentIcon className="h-6 w-6" />, label: 'Deals' },
    { icon: <ClipboardIcon className="h-6 w-6" />, label: 'Reports' },
  ];

  return (
    <aside  style={{ height: 'calc(100vh - 124px)' }} className=" bg-[#3C4A9A] w-20 flex flex-col justify-between items-center py-6 rounded-xl">
      {/* Top: Logo */}
      <div>
        <img src="/logo.svg" alt="Logo" className="h-10 w-10 object-contain" />
      </div>

      {/* Middle: Nav Icons */}
      <nav className="flex flex-col gap-6 items-center">
        {navItems.map((item, index) => (
          <SidebarIcon
            key={index}
            icon={item.icon}
            active={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </nav>

      {/* Bottom: Settings */}
      <SidebarIcon
        icon={<Cog6ToothIcon className="h-6 w-6" />}
        active={activeIndex === navItems.length}
        onClick={() => setActiveIndex(navItems.length)}
      />
    </aside>
  );
}

function SidebarIcon({ icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors duration-200 ${
        active ? 'bg-white text-[#3C4A9A]' : 'text-white hover:bg-[#2F3D7E]'
      }`}
    >
      {icon}
    </button>
  );
}
