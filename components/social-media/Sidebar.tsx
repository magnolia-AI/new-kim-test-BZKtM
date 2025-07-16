'use client';

import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const navigationItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Search, label: 'Explore' },
  { icon: Bell, label: 'Notifications', badge: 3 },
  { icon: Mail, label: 'Messages' },
  { icon: Bookmark, label: 'Bookmarks' },
  { icon: User, label: 'Profile' },
  { icon: MoreHorizontal, label: 'More' },
];

export function Sidebar() {
  return (
    <div className="p-4 h-full flex flex-col">
      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navigationItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "secondary" : "ghost"}
            className="w-full justify-start h-12 text-lg font-normal relative"
          >
            <item.icon className="mr-4 h-6 w-6" />
            <span className="hidden xl:block">{item.label}</span>
            {item.badge && (
              <span className="absolute top-2 left-8 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center xl:hidden">
                {item.badge}
              </span>
            )}
            {item.badge && (
              <span className="hidden xl:block ml-auto h-5 w-5 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </Button>
        ))}
        
        {/* Post Button */}
        <Button className="w-full h-12 text-lg font-semibold mt-4">
          <Edit className="mr-2 h-5 w-5 xl:hidden" />
          <span className="hidden xl:block">Post</span>
        </Button>
      </nav>

      <Separator className="my-4" />

      {/* User Profile */}
      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="hidden xl:block flex-1 min-w-0">
          <p className="text-sm font-medium truncate">John Doe</p>
          <p className="text-xs text-muted-foreground truncate">@johndoe</p>
        </div>
        <MoreHorizontal className="hidden xl:block h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}
