import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { UploadProvider } from "@/contexts/UploadContext";
import MainLayout from "@/components/MainLayout";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <UploadProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename="/cadastrosmd-automation-web">
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/*" element={<MainLayout />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </UploadProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
