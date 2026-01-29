import { getClassTimetable, timeSlots, getDayOrderFromDate, getCurrentPeriodIndex, PeriodData, getPeriodTypeStyle } from "@/data/timetable";
import { Clock, MapPin } from "lucide-react";

interface TodayTimetableProps {
  selectedClass?: string;
}

const TodayTimetable = ({ selectedClass = "I MCA A" }: TodayTimetableProps) => {
  const currentDay = getDayOrderFromDate();
  const currentPeriodIndex = getCurrentPeriodIndex();
  const timetable = getClassTimetable(selectedClass);
  const schedule = timetable?.[currentDay] || [];

  // Filter out breaks and free periods for display
  const upcomingPeriods = schedule
    .map((period, idx) => ({ period, slotIndex: idx, timeSlot: timeSlots[idx] }))
    .filter(({ period }) => period.type !== "break" && period.type !== "free" && period.subject !== "None");

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-gradient-to-r from-accent/10 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Today's Classes</h2>
            <p className="text-sm text-muted-foreground">{currentDay} • {selectedClass}</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {upcomingPeriods.length > 0 ? (
          upcomingPeriods.map(({ slotIndex, period, timeSlot }) => {
            const isCurrent = slotIndex === currentPeriodIndex;
            const isPast = slotIndex < currentPeriodIndex;

            return (
              <div
                key={slotIndex}
                className={`p-4 transition-colors ${
                  isCurrent
                    ? "bg-primary/5 border-l-2 border-l-primary"
                    : isPast
                    ? "opacity-50"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium ${getPeriodTypeStyle(period.type)}`}
                  >
                    {period.type === "lab" ? "L" : period.type === "online" ? "O" : period.type === "library" ? "📚" : "T"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">{period.subject}</h3>
                      {isCurrent && (
                        <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full animate-pulse-soft">
                          Now
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {timeSlot?.time}
                      </span>
                      {period.room && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {period.room}
                        </span>
                      )}
                    </div>
                    {period.code && (
                      <p className="text-xs text-muted-foreground mt-1">{period.code}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <p>No classes scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayTimetable;
