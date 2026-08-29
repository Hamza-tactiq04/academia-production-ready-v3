import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocaleProvider } from "./contexts/LocaleContext";
import { useAuth } from "./_core/hooks/useAuth";
import Landing from "./pages/Landing";
import PlayersPage from "./pages/Players";
import TeamsPage from "./pages/Teams";
import TrainingPage from "./pages/Training";
import PlayerProfilePage from "./pages/PlayerProfile";
import ActivityPage from "./pages/Activity";
import DocumentsPage from "./pages/Documents";
import NotificationsPage from "./pages/Notifications";
import AnalyticsPage from "./pages/Analytics";
import ParentInvitationsPage from "./pages/ParentInvitations";
import ParentInvitationAcceptPage from "./pages/ParentInvitationAccept";
import Home from "./pages/Home";
import OperationsPage from "./pages/Operations";
import MonthlyReportPage from "./pages/MonthlyReport";
import AuditLogPage from "./pages/AuditLog";
import CoachDashboard from "./pages/CoachDashboard";
import RegistrationManager from "./pages/RegistrationManager";
import PublicRegistration from "./pages/PublicRegistration";
import CustomFieldsPage from "./pages/CustomFields";
import UnifiedCalendarPage from "./pages/UnifiedCalendar";
import TaskBoardPage from "./pages/TaskBoard";
import PerformanceHubPage from "./pages/PerformanceHub";
import PlayerGalleryPage from "./pages/PlayerGallery";
import WorkflowRulesPage from "./pages/WorkflowRules";
import AbsenceMessagingPage from "./pages/AbsenceMessaging";
import SettingsPage from "./pages/Settings";

function Router() {
  const Protected = ({ component: Component }: { component: React.ComponentType }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="grid min-h-screen place-items-center bg-[#f5f6ef]">…</div>;
    return user ? <Component /> : <Landing />;
  };
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/players"}>{() => <Protected component={PlayersPage} />}</Route>
      <Route path={"/players/:id"}>{() => <Protected component={PlayerProfilePage} />}</Route>
      <Route path={"/teams"}>{() => <Protected component={TeamsPage} />}</Route>
      <Route path={"/training"}>{() => <Protected component={TrainingPage} />}</Route>
      <Route path={"/activity"}>{() => <Protected component={ActivityPage} />}</Route>
      <Route path={"/documents"}>{() => <Protected component={DocumentsPage} />}</Route>
      <Route path={"/notifications"}>{() => <Protected component={NotificationsPage} />}</Route>
      <Route path={"/analytics"}>{() => <Protected component={AnalyticsPage} />}</Route>
      <Route path={"/operations"}>{() => <Protected component={OperationsPage} />}</Route>
      <Route path={"/coach-dashboard"}>{() => <Protected component={CoachDashboard} />}</Route>
      <Route path={"/reports"}>{() => <Protected component={MonthlyReportPage} />}</Route>
      <Route path={"/audit"}>{() => <Protected component={AuditLogPage} />}</Route>
      <Route path={"/parent-invitations"}>{() => <Protected component={ParentInvitationsPage} />}</Route>
      <Route path={"/registrations"}>{() => <Protected component={RegistrationManager} />}</Route>
      <Route path={"/custom-fields"}>{() => <Protected component={CustomFieldsPage} />}</Route>
      <Route path={"/calendar"}>{() => <Protected component={UnifiedCalendarPage} />}</Route>
      <Route path={"/tasks"}>{() => <Protected component={TaskBoardPage} />}</Route>
      <Route path={"/performance"}>{() => <Protected component={PerformanceHubPage} />}</Route>
      <Route path={"/player-gallery"}>{() => <Protected component={PlayerGalleryPage} />}</Route>
      <Route path={"/workflow-rules"}>{() => <Protected component={WorkflowRulesPage} />}</Route>
      <Route path={"/absence-messages"}>{() => <Protected component={AbsenceMessagingPage} />}</Route>
      <Route path={"/settings"}>{() => <Protected component={SettingsPage} />}</Route>
      <Route path={"/register/:token"} component={PublicRegistration} />
      <Route path={"/parent-invitation/:token"} component={ParentInvitationAcceptPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <LocaleProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LocaleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
