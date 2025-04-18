
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPost from "./pages/BlogPost";
import ComplexitySettings from "./pages/ComplexitySettings";
import { ThemeProvider } from "./components/ThemeProvider";
import { FontSizeProvider } from "./hooks/useFontSize";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <FontSizeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/post/:slug" element={<BlogPost />} />
              <Route path="/complexity-settings" element={<ComplexitySettings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FontSizeProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
