import { useState } from "react";
import {
  oddSemesterDates,
  evenSemesterDates,
  holidays2025,
  holidays2026,
  metadata,
} from "@/data/academicCalendar";
import {
  Calendar,
  Download,
  GraduationCap,
  Users,
  CalendarDays,
  PartyPopper,
} from "lucide-react";

type TabType = "odd" | "even" | "holidays";

const AcademicCalendarPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("odd");

  const tabs = [
    { id: "odd" as TabType, label: "Odd Semester", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "even" as TabType, label: "Even Semester", icon: <CalendarDays className="w-4 h-4" /> },
    { id: "holidays" as TabType, label: "Holidays", icon: <PartyPopper className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--gradient-mesh)] bg-no-repeat">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
            <span className="inline-block px-4 sm:px-6 py-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl border border-primary/30 shadow-lg shadow-primary/10 animate-glow">
              <span className="text-primary font-bold">Academic Calendar</span>
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            {metadata.academicYear} • {metadata.faculty}
          </p>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-6 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <a
            href={metadata.pdfUrl}
            download
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex bg-card/50 backdrop-blur-sm p-1 rounded-full border border-border/50 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in-up" style={{ animationDelay: "250ms" }}>
          {activeTab === "odd" && <SemesterTable data={oddSemesterDates} title={`Odd Semester ${metadata.academicYear}`} />}
          {activeTab === "even" && <SemesterTable data={evenSemesterDates} title={`Even Semester ${metadata.academicYear}`} isSingleDate />}
          {activeTab === "holidays" && <HolidaysSection />}
        </div>

        {/* Note */}
        <div className="mt-6 p-3 sm:p-4 bg-card/50 backdrop-blur-sm rounded-xl text-xs sm:text-sm text-muted-foreground text-center border border-border/50 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <strong className="text-foreground">Note:</strong> Dates are subject to change. Please refer to the official
          calendar for the latest updates.
        </div>
      </div>
    </div>
  );
};

interface SemesterTableProps {
  data: typeof oddSemesterDates;
  title: string;
  isSingleDate?: boolean;
}

const SemesterTable = ({ data, title, isSingleDate }: SemesterTableProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-xl">
      <div className="p-4 border-b border-border bg-gradient-to-r from-muted/80 to-muted/50">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          {title}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-3 text-left text-sm font-semibold text-foreground">Particulars</th>
              {isSingleDate ? (
                <th className="p-3 text-center text-sm font-semibold text-foreground">Date</th>
              ) : (
                <>
                  <th className="p-3 text-center text-sm font-semibold text-foreground">
                    <span className="flex items-center justify-center gap-1.5">
                      <Users className="w-4 h-4" />
                      II & III Year UG / II PG
                    </span>
                  </th>
                  <th className="p-3 text-center text-sm font-semibold text-foreground">
                    <span className="flex items-center justify-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      I Year UG & PG
                    </span>
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <td className="p-3 text-sm font-medium">{item.particulars}</td>
                {isSingleDate ? (
                  <td className="p-3 text-center text-sm">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {item.date}
                    </span>
                  </td>
                ) : (
                  <>
                    <td className="p-3 text-center text-sm">
                      {item.seniorDate ? (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {item.seniorDate}
                        </span>
                      ) : item.date ? (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {item.date}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3 text-center text-sm">
                      {item.freshersDate ? (
                        <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full font-medium">
                          {item.freshersDate}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HolidaysSection = () => {
  return (
    <div className="space-y-6">
      {/* 2026 Holidays */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-xl">
        <div className="p-4 border-b border-border bg-gradient-to-r from-muted/80 to-muted/50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-primary" />
            Holidays 2026
          </h2>
        </div>
        <div className="p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {holidays2025.map((holiday, idx) => (
            <div
              key={idx}
              className="p-3 bg-muted/30 rounded-xl border border-border hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{holiday.name}</p>
                  <p className="text-xs text-muted-foreground">{holiday.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2027 Holidays */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-xl">
        <div className="p-4 border-b border-border bg-gradient-to-r from-muted/80 to-muted/50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-primary" />
            Holidays 2027
          </h2>
        </div>
        <div className="p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {holidays2026.map((holiday, idx) => (
            <div
              key={idx}
              className="p-3 bg-muted/30 rounded-xl border border-border hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{holiday.name}</p>
                  <p className="text-xs text-muted-foreground">{holiday.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendarPage;
