import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MessPage from "@/pages/MessPage";
import TimetablePage from "@/pages/TimetablePage";
import AcademicCalendarPage from "@/pages/AcademicCalendarPage";
import NotFound from "./pages/NotFound";
import ExamPopup from "@/components/ExamPopup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/timetable" replace />} />
              <Route path="/mess" element={<MessPage />} />
              <Route path="/timetable" element={<TimetablePage />} />
              <Route path="/calendar" element={<AcademicCalendarPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      <ExamPopup />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
