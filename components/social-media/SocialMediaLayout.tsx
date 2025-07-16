'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MainFeed } from './MainFeed';
import { RightSidebar } from './RightSidebar';

export function SocialMediaLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Layout */}
      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-64 xl:w-80 sticky top-16 h-[calc(100vh-4rem)]">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0 border-x border-border">
          <MainFeed />
        </div>
        
        {/* Right Sidebar */}
        <div className="hidden xl:block w-80 sticky top-16 h-[calc(100vh-4rem)]">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
