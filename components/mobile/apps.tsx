import Image from "next/image";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";

type App = {
  name: string;
  icon: string;
  onClick?: () => void;
};

export const Apps = () => {
  const { setOpenApp } = usePortfolioStore();
  const apps = [
    { name: "Projects", icon: "/finder.png" },
    { name: "Skills", icon: "/launchpad.png" },
    { name: "Contact", icon: "/imessage.png" },
    { name: "About", icon: "/notes.png" },
    { name: "Projects", icon: "/finder.png" },
    { name: "Skills", icon: "/launchpad.png" },
    { name: "Contact", icon: "/imessage.png" },
    { name: "About", icon: "/notes.png" },
    { name: "Projects", icon: "/finder.png" },
    { name: "Skills", icon: "/launchpad.png" },
    { name: "Contact", icon: "/imessage.png" },
    { name: "About", icon: "/notes.png" },
    { name: "Projects", icon: "/finder.png" },
    { name: "Skills", icon: "/launchpad.png" },
    { name: "Contact", icon: "/imessage.png" },
    { name: "About", icon: "/notes.png" },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-full">
      <div className="grid grid-cols-4 ">
        {apps.map((app, i) => (
          <div key={i} className="flex flex-col items-center gap-1 space-x-2">
            <Image src={app.icon} alt={app.name} width={60} height={60} />
            <span
              className="text-xs text-shadow-lg"
              style={{
                WebkitTextStroke: ".02em black",
                paintOrder: "stroke fill",
              }}
            >
              {app.name}
            </span>
          </div>
        ))}
      </div>
      <div>Search</div>
    </div>
  );
};

const GroupedApps = ({ apps }: { apps: App[] }) => {};
