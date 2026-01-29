import { useState } from "react";
import Header from "@/components/Header";
import Timetable from "@/components/Timetable";
import MessMenu from "@/components/MessMenu";

const Index = () => {
  const [activeSection, setActiveSection] = useState<"timetable" | "menu">("timetable");

  return (
    <div className="min-h-screen bg-background">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="container mx-auto px-4 pb-12">
        {activeSection === "timetable" ? <Timetable /> : <MessMenu />}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 SRM University Student Portal</p>
          <p className="mt-1">Kattankulathur, Chennai - 603203</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
