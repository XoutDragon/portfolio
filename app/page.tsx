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
    <div className="md:hidden"> 
Mobile view is under construction. View on desktop for the full experience! 
    </div>
      <DesktopView />
    </>
  );
}

const DesktopView = () => {
  const { setUnlocked, openApp, setOpenApp } = usePortfolioStore();

  return (
    <div className="hidden md:block">
      <Image
        src="/mac_tahoe_wallpaper.jpg"
        alt="Lock Screen"
        fill
        className="object-cover"
        priority
      />
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
          {openApp === "resume" && (
            <div className='w-full h-full flex items-center justify-center p-4 z-40'>
              <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" width={480} height={270} allow="autoplay" />
            </div>
          )}
        </AnimatePresence>
      </div>
      <DockWrapper />
    </div>
  );
};
