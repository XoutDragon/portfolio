"use client";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";

import { LockScreen } from "@/components/lock-screen";
import { AboutWindow } from "@/components/about";
import { LaunchpadWindow } from "@/components/skill";
import { ContactWindow } from "@/components/contact";
import { ProjectsWindow } from "@/components/project";
import { AnimatePresence } from "motion/react";

export default function Home() {
  const { setUnlocked, openApp, setOpenApp } = usePortfolioStore();

  return (
    <div className="relative h-screen overflow-hidden">
      <LockScreen onUnlocked={setUnlocked} />
      <AnimatePresence>
        {openApp === "projects" && (
          <ProjectsWindow onClose={() => setOpenApp(null)} />
        )}
        {openApp === "skills" && (
          <LaunchpadWindow onClose={() => setOpenApp(null)} />
        )}
        {openApp === "contact" && (
          <ContactWindow key="contact" onClose={() => setOpenApp(null)} />
        )}
        {openApp === "about" && (
          <AboutWindow key="about" onClose={() => setOpenApp(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
