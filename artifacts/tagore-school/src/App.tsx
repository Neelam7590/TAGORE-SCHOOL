import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import PrincipalMessage from "@/pages/PrincipalMessage";
import Academics from "@/pages/Academics";
import Facilities from "@/pages/Facilities";
import Gallery from "@/pages/Gallery";
import Admissions from "@/pages/Admissions";
import Contact from "@/pages/Contact";
import Kindergarten from "@/pages/Kindergarten";
import StaffLogin from "@/pages/StaffLogin";
import ParentLogin from "@/pages/ParentLogin";
import SchoolTimings from "@/pages/SchoolTimings";
import SchoolUniform from "@/pages/SchoolUniform";
import RulesRegulations from "@/pages/RulesRegulations";
import AttendancePolicy from "@/pages/AttendancePolicy";
import StudentGuidelines from "@/pages/StudentGuidelines";
import BoardResults from "@/pages/BoardResults";
import SchoolResults from "@/pages/SchoolResults";
import InterSchoolCompetitions from "@/pages/InterSchoolCompetitions";
import SportsAchievements from "@/pages/SportsAchievements";
import StudentSuccessStories from "@/pages/StudentSuccessStories";
import AcademicCalendar from "@/pages/AcademicCalendar";
import ActivitySchedule from "@/pages/ActivitySchedule";
import ClubSchedule from "@/pages/ClubSchedule";
import SchoolHolidays from "@/pages/SchoolHolidays";
import ExaminationSchedule from "@/pages/ExaminationSchedule";
import CampusLife from "@/pages/CampusLife";
import AchievementsGallery from "@/pages/AchievementsGallery";
import EventsActivities from "@/pages/EventsActivities";
import SportsGallery from "@/pages/SportsGallery";
import CulturalPrograms from "@/pages/CulturalPrograms";
import AnnualFunctions from "@/pages/AnnualFunctions";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { ScrollToTop } from "@/components/ScrollToTop";

const queryClient = new QueryClient();

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/principal-message" component={PrincipalMessage} />
        <Route path="/academics" component={Academics} />
        <Route path="/facilities" component={Facilities} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/admissions" component={Admissions} />
        <Route path="/contact" component={Contact} />
        <Route path="/kindergarten" component={Kindergarten} />
        {/* Login */}
        <Route path="/staff-login" component={StaffLogin} />
        <Route path="/parent-login" component={ParentLogin} />
        {/* Student Corner */}
        <Route path="/school-timings" component={SchoolTimings} />
        <Route path="/school-uniform" component={SchoolUniform} />
        <Route path="/rules-regulations" component={RulesRegulations} />
        <Route path="/attendance-policy" component={AttendancePolicy} />
        <Route path="/student-guidelines" component={StudentGuidelines} />
        {/* Achievements */}
        <Route path="/board-results" component={BoardResults} />
        <Route path="/school-results" component={SchoolResults} />
        <Route path="/inter-school-competitions" component={InterSchoolCompetitions} />
        <Route path="/sports-achievements" component={SportsAchievements} />
        <Route path="/student-success-stories" component={StudentSuccessStories} />
        {/* School Calendar */}
        <Route path="/academic-calendar" component={AcademicCalendar} />
        <Route path="/activity-schedule" component={ActivitySchedule} />
        <Route path="/club-schedule" component={ClubSchedule} />
        <Route path="/school-holidays" component={SchoolHolidays} />
        <Route path="/examination-schedule" component={ExaminationSchedule} />
        {/* Gallery Sub-pages */}
        <Route path="/campus-life" component={CampusLife} />
        <Route path="/achievements-gallery" component={AchievementsGallery} />
        <Route path="/events-activities" component={EventsActivities} />
        <Route path="/sports-gallery" component={SportsGallery} />
        <Route path="/cultural-programs" component={CulturalPrograms} />
        <Route path="/annual-functions" component={AnnualFunctions} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <BackToTop />
            <WhatsAppFloat />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
