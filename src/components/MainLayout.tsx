import React from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogOut, LayoutDashboard, Settings, Upload, Bot, Database } from "lucide-react";

import Index from "../pages/Index";
import Auth from "../pages/Auth";
import NotFound from "../pages/NotFound";
import UploadPage from "../pages/UploadPage";
import SettingsPage from "../pages/SettingsPage";
import DataTablePage from "../pages/DataTablePage";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/auth");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Automação</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/upload">
                  <Upload />
                  Upload
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/dados">
                  <Database />
                  Dados
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/settings">
                  <Settings />
                  Configurações
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut />
                Sair
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <ThemeToggle />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/dados" element={<DataTablePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;