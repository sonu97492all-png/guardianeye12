'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Eye,
  Info,
  LayoutGrid,
  LineChart,
  LogOut,
  MessageSquareWarning,
  Monitor,
  QrCode,
  Settings,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/dashboard/monitored-devices', icon: Monitor, label: 'Monitored Devices' },
  { href: '/dashboard/social-media', icon: MessageSquareWarning, label: 'Social Media' },
  { href: '/dashboard/device-setup', icon: QrCode, label: 'Device Setup' },
  { href: '/dashboard/reports', icon: LineChart, label: 'Reports' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { href: '/dashboard/about', icon: Info, label: 'About' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="size-9 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 shrink-0">
                <Eye className="size-5" />
            </Button>
            <h2 className="text-lg font-semibold text-sidebar-foreground font-headline">GuardianEye12</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                    <span>
                        <item.icon />
                        <span>{item.label}</span>
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/dashboard/settings" passHref>
                        <SidebarMenuButton asChild tooltip="Profile">
                        <span>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://picsum.photos/100/100" alt="User avatar" data-ai-hint="person avatar" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col items-start'>
                                <span className='font-semibold'>John Doe</span>
                                <span className='text-xs text-sidebar-foreground/70'>john.doe@example.com</span>
                            </div>
                        </span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sticky top-0 z-30 lg:h-[60px] lg:px-6">
            <SidebarTrigger className='md:hidden' />
            <div className="flex-1">
                <h1 className="text-lg font-semibold font-headline">{navItems.find(item => pathname.startsWith(item.href))?.label || 'Dashboard'}</h1>
            </div>
            <UserMenu />
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/100/100" alt="User avatar" data-ai-hint="person avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                        <Settings className='mr-2' />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                    <Link href="/">
                        <LogOut className='mr-2' />
                        Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
