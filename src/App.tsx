import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Diagnosis from "./pages/Diagnosis";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import FeedbackForm from "@/components/FeedbackForm";
import Analytics from "@/components/Analytics";
import PushNotifications from "@/components/PushNotifications";
import CalendarReminder from "@/components/CalendarReminder";
import ProgressTracker from "@/components/ProgressTracker";
import UserAuth from "@/components/UserAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Analytics />
        <PushNotifications />
        <CalendarReminder />
        <ProgressTracker />
        <UserAuth />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/diagnose" element={<Diagnosis />} />
          <Route path="/blog" element={<Blog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <FeedbackForm />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
