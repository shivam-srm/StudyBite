import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Download } from "lucide-react";

const ExamPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const hasSeenExamPopup = sessionStorage.getItem("hasSeenExamPopup");
    
    // Slight delay so it doesn't just jam instantly into their face on load
    if (!hasSeenExamPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      sessionStorage.setItem("hasSeenExamPopup", "true");
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = '/exam.jpeg';
    link.download = 'Exam_Schedule.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-xl p-0 overflow-hidden border-none bg-transparent shadow-2xl rounded-2xl block pt-8">
        
        <div className="bg-white/95 backdrop-blur-md dark:bg-zinc-900/95 overflow-hidden rounded-xl border border-white/20">
          <div className="p-4 border-b border-border/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex justify-between items-center">
            <DialogHeader className="p-0 m-0">
              <DialogTitle className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                <CalendarDays className="w-6 h-6 text-blue-500" />
                Upcoming Exam Schedule
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="relative p-2">
            <div className="overflow-hidden rounded-lg border border-border/50 shadow-inner group">
              <img 
                src="/exam.jpeg" 
                alt="Exam Schedule" 
                className="w-full h-auto object-contain max-h-[60vh] transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            
            <div className="p-4 flex gap-3 justify-end items-center mt-2">
              <Button variant="outline" onClick={() => handleOpenChange(false)} className="rounded-full">
                Close
              </Button>
              <Button onClick={downloadImage} className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg shadow-blue-500/25 transition-all w-32 flex gap-2">
                <Download className="w-4 h-4" />
                Save Copy
              </Button>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default ExamPopup;
