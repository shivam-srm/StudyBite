import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TodayMess from "@/components/TodayMess";
import TodayTimetable from "@/components/TodayTimetable";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--gradient-mesh)] bg-no-repeat">
      <div className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            SRM <span className="text-primary">KTR</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Your daily mess menu & class schedule at a glance
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-4 mb-8 stagger-children">
          <Link
            to="/mess"
            className="group p-4 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🍱</span>
                <div>
                  <h3 className="font-semibold text-foreground">Mess Menu</h3>
                  <p className="text-sm text-muted-foreground">Weekly meal schedule</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link
            to="/timetable"
            className="group p-4 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📚</span>
                <div>
                  <h3 className="font-semibold text-foreground">Class Timetable</h3>
                  <p className="text-sm text-muted-foreground">View by class or staff</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

        {/* Today's Cards */}
        <div className="grid lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <TodayMess />
          <TodayTimetable />
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-muted/50 rounded-xl text-center text-sm text-muted-foreground">
          <p>
            <strong>Note:</strong> Menu subject to change based on availability. 
            Biryani served on 2nd & 4th Wednesday of every month.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
