"use client";
import Image from "next/image";

import { usePortfolioStore } from "@/hooks/use-portfolio-store";

import { Topbar } from "@/components/topbar";
import { LockScreen } from "@/components/desktop/lock-screen";
import { AboutWindow } from "@/components/about";
import { LaunchpadWindow } from "@/components/skill";
import { ContactWindow } from "@/components/contact";
import { ProjectsWindow } from "@/components/project";

import { AnimatePresence } from "motion/react";
import { Dock } from "@/components/dock";

export default function Home() {
  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}

const MobileView = () => {
  return (
    <div className="block md:hidden relative text-white h-svh p-3">
      <Image
        src="/mobile-wallpaper.jpg"
        alt="Lock Screen"
        fill
        className="object-cover"
        priority
      />
      <Topbar openApp={null} unlocked={true} />
      <Dock />
    </div>
  );
};

const DesktopView = () => {
  const { unlocked, setUnlocked, openApp, setOpenApp } = usePortfolioStore();

  return (
    <div className="hidden md:block relative h-screen">
      <Image
        src="/mac_tahoe_wallpaper.jpg"
        alt="Lock Screen"
        fill
        className="object-cover"
        sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        priority
      />
      <Topbar openApp={openApp} unlocked={unlocked} />
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
            <div className="w-full h-full flex items-center justify-center p-4 z-40">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                width={480}
                height={270}
                allow="autoplay"
              />
            </div>
          )}
        </AnimatePresence>
      </div>
      <Dock />
    </div>
  );
};
