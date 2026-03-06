"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  // SidebarItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"; // твій shadcn sidebar
import { Home, BarChart2, Settings, SquareTerminal, Bot } from "lucide-react";

import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
interface DashboardLayoutProps {
  children: ReactNode;
}
const data = [
  {
    title: "Projects",
    href: "/profile/projects",
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: "Analytics",
    href: "/profile/analytics",
    icon: Bot,
  },
];
function AppSidebar() {
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="relative h-[calc(100vh-77px)]"
    >
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          {data.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon className="mr-2" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </Sidebar>
  );
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div /*className="flex  h-[calc(100vh-77px)] relative"*/>
      <SidebarProvider>
        <AppSidebar />

        {/* Main content */}
        <main className="flex-1 bg-white p-10 relative overflow-auto">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
