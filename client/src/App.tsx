import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Quote from "./pages/Quote";
import Contact from "./pages/Contact";
import Onboarding from "./pages/Onboarding";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/services"} component={Services} />
      <Route path={"/projects"} component={Projects} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/quote"} component={Quote} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/onboarding"} component={Onboarding} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
