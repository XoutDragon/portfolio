"use client";
import Image from "next/image";

import { usePortfolioStore } from "@/hooks/use-portfolio-store";

import { DockWrapper } from "@/components/dock-wrapper";

import { LockScreen } from "@/components/lock-screen";
import { AboutWindow } from "@/components/about";
import { LaunchpadWindow } from "@/components/skill";
import { ContactWindow } from "@/components/contact";
import { ProjectsWindow } from "@/components/project";
import { AnimatePresence } from "motion/react";

export default function Home() {
  return (
    <>
      <DesktopView />
    </>
  );
}

const DesktopView = () => {
  const { setUnlocked, openApp, setOpenApp } = usePortfolioStore();

  return (
    <>
      <Image
        src="/mac_tahoe_wallpaper.jpg"
        alt="Lock Screen"
        fill
        className="object-cover"
        priority
      />
      <div className="relative h-screen overflow-hidden hidden md:block">
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
      <DockWrapper />
    </>
  );
};
