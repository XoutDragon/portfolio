import Image from "next/image";
import { motion } from "motion/react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { cn, getIcon } from "@/lib/utils";
import socials from "@/data/socials.json";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";

export const Dock = () => {
  return (
    <>
      <DesktopDock className="md:flex hidden" />
      <MobileDock className="md:hidden flex" />
    </>
  );
};

export const MobileDock = ({ className }: { className?: string }) => {
  const { setOpenApp } = usePortfolioStore();

  const navApps = [
    {
      title: "Contact",
      href: "#",
      icon: (
        <div
          className="w-full h-full relative"
          onClick={() => setOpenApp("contact")}
        >
          <Image
            src="/imessage.png"
            alt="About"
            fill
            className="object-contain scale-115"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ),
    },
    {
      title: "About",
      href: "#",
      icon: (
        <div
          className="w-full h-full relative"
          onClick={() => setOpenApp("about")}
        >
          <Image
            src="/notes.png"
            alt="About"
            fill
            className="object-contain scale-115"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ),
    },
    {
      title: "E",
      href: "#",
      icon: (
        <div
          className="w-full h-full relative"
          onClick={() => setOpenApp("about")}
        >
          <Image
            src="/notes.png"
            alt="About"
            fill
            className="object-contain scale-115"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ),
    },
  ];

  const resumeApp = () => {
    const IconComponent = getIcon("GrDocument");

    return {
      title: "Resume",
      href: "#",
      icon: (
        <div
          className="w-full h-full rounded-xl flex items-center justify-center bg-white backdrop-blur-lg border-white/10 text-black"
          onClick={() => setOpenApp("resume")}
        >
          {IconComponent && <IconComponent className="w-4/5 h-4/5" />}
        </div>
      ),
    };
  };

  const items = [...navApps, resumeApp()];

  return (
    <div
      className={cn(
        "fixed bottom-4 left-0 right-0 flex justify-center z-50 px-3",
        className,
      )}
    >
      <FloatingDock
        items={items}
        mobileClassName="bg-white/20 backdrop-blur-lg border-white/10"
      />
    </div>
  );
};

export const DesktopDock = ({ className }: { className?: string }) => {
  const { unlocked, openApp, setOpenApp } = usePortfolioStore();

  const navApps = [
    {
      title: "Projects",
      href: "#",
      icon: (
        <div
          className="w-full h-full relative"
          onClick={() => setOpenApp(openApp === "projects" ? null : "projects")}
        >
          <Image
            src="/finder.png"
            alt="About"
            fill
            className="object-contain scale-115"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ),
    },
    {
      title: "Skills & Technologies",
      href: "#",
      icon: (
        <div
          className="w-full h-full relative "
          onClick={() => setOpenApp(openApp === "skills" ? null : "skills")}
        >
          <Image
            src="/launchpad.png"
            alt="About"
            fill
            className="object-contain scale-115"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ),
    },
    {
      title: "Contact",
      href: "#",
      icon: (
        <div
          className="w-full h-full relative"
          onClick={() => setOpenApp(openApp === "contact" ? null : "contact")}
        >
          <Image
            src="/imessage.png"
            alt="About"
            fill
            className="object-contain scale-115"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ),
    },
    {
      title: "About",
      href: "#",
      icon: (
        <div
          className="w-full h-full relative"
          onClick={() => setOpenApp(openApp === "about" ? null : "about")}
        >
          <Image
            src="/notes.png"
            alt="About"
            fill
            className="object-contain scale-115"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ),
    },
  ];

  const separatorItem = {
    title: "separator",
    href: "",
    icon: null,
  };

  const socialApps = socials.map((social) => {
    const IconComponent = getIcon(social.icon);

    return {
      title: social.name,
      href: social.link,
      icon: (
        <div
          className={cn(
            "w-full h-full rounded-xl flex items-center justify-center",
            social.containerClassName,
          )}
        >
          {IconComponent && (
            <IconComponent
              className={cn("w-4/5 h-4/5", social.iconClassName)}
            />
          )}
        </div>
      ),
    };
  });

  const resumeApp = () => {
    const IconComponent = getIcon("GrDocument");

    return {
      title: "Resume",
      href: "#",
      icon: (
        <div
          className="w-full h-full rounded-xl flex items-center justify-center bg-white backdrop-blur-lg border-white/10"
          onClick={() => setOpenApp(openApp === "resume" ? null : "resume")}
        >
          {IconComponent && <IconComponent className="w-4/5 h-4/5" />}
        </div>
      ),
    };
  };

  const items = [...navApps, separatorItem, ...socialApps, resumeApp()];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{
        scale: unlocked ? 1 : 0.8,
        opacity: unlocked ? 1 : 0,
        y: unlocked ? 0 : 20,
      }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
      className={cn(
        "fixed bottom-4 left-0 right-0 flex justify-center z-60",
        className,
      )}
    >
      <FloatingDock
        items={items}
        desktopClassName="bg-white/20 backdrop-blur-lg border-white/10"
      />
    </motion.div>
  );
};
