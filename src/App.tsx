
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BikeDetailPage from "./pages/BikeDetailPage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { supabase } from "./integrations/supabase/client";

// Apply zoom fix
document.documentElement.style.fontSize = '16px';
document.documentElement.style.webkitTextSizeAdjust = '100%';
document.documentElement.style.msTextSizeAdjust = '100%';

const queryClient = new QueryClient();

// Add phone column to bikes table if it doesn't exist
const setupPhoneColumn = async () => {
  try {
    // Check if bikes table exists and has phone column
    const { data, error } = await supabase
      .from('bikes')
      .select('phone')
      .limit(1);
    
    if (error && error.message.includes('column "phone" does not exist')) {
      // Column doesn't exist, add it
      await supabase.rpc('exec_sql', {
        sql_query: 'ALTER TABLE public.bikes ADD COLUMN IF NOT EXISTS phone TEXT'
      });
      console.log('Added phone column to bikes table');
    }
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

// Run setup
setupPhoneColumn();

const App = () => {
  useEffect(() => {
    // Make sure zoom fixes are applied
    document.documentElement.style.fontSize = '16px';
    document.documentElement.style.webkitTextSizeAdjust = '100%';
    document.documentElement.style.msTextSizeAdjust = '100%';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="text-base">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/bike/:id" element={<BikeDetailPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
