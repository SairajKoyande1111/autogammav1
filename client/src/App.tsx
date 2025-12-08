import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import PPF from "@/pages/ppf";
import Services from "@/pages/services";
import Warranty from "@/pages/warranty";
import { useEffect } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 0.98,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
} as const;

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Component />
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  
  return (
    <Layout>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Switch key={location}>
          <Route path="/">
            <AnimatedRoute component={Home} />
          </Route>
          <Route path="/about">
            <AnimatedRoute component={About} />
          </Route>
          <Route path="/ppf">
            <AnimatedRoute component={PPF} />
          </Route>
          <Route path="/services">
            <AnimatedRoute component={Services} />
          </Route>
          <Route path="/warranty">
            <AnimatedRoute component={Warranty} />
          </Route>
          <Route>
            <AnimatedRoute component={NotFound} />
          </Route>
        </Switch>
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
