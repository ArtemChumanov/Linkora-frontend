"use client";
import { ReactNode } from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarGroup,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"; // твій shadcn sidebar
import { SquareTerminal, Bot } from "lucide-react";

import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
