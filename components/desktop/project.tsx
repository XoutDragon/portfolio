"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WindowWrapper } from "./window-wrapper";
import {
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaSearch,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { FaRegFolderClosed, FaRegHardDrive } from "react-icons/fa6";
import { SiAppstore } from "react-icons/si";
import { FiArrowDownCircle } from "react-icons/fi";
import { GrDocument } from "react-icons/gr";
import { IoIosCloudOutline } from "react-icons/io";
import { cn } from "@/lib/utils";

import projects from "@/data/projects.json";

interface Project {
  name: string;
  description: string;
  github: string;
  link?: string;
}

export const ProjectsWindow = ({ onClose }: { onClose: () => void }) => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [search, setSearch] = useState("");

  return (
    <>
      <WindowWrapper
        onClose={onClose}
        className="bg-[#E0E3E2]"
        sidebarContent={<ProjectsSidebar />}
        mainTitleContent={
          <ProjectTopbar search={search} setSearch={setSearch} />
        }
        mainContent={
          <ProjectGrid
            projects={projects}
            onSelect={setSelected}
            search={search}
          />
        }
      />

      <AnimatePresence>
        {selected && (
          <ProjectDetail project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

const FolderIcon = () => (
  <svg
    viewBox="0 0 100 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-16 drop-shadow-md"
  >
    <rect x="0" y="8" width="90" height="62" rx="6" fill="#4A90D9" />
    <path d="M0 18 Q0 10 8 10 H38 Q44 10 46 16 L50 24 H0 Z" fill="#5BA3E8" />
    <rect x="0" y="24" width="90" height="56" rx="6" fill="#5BA3E8" />
    <rect
      x="0"
      y="24"
      width="90"
      height="8"
      rx="6"
      fill="#6BB5F5"
      opacity="0.5"
    />
  </svg>
);

const ProjectLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-3 py-2 rounded-lg  transition-colors  text-xs"
  >
    {icon}
    <span className="truncate">{label}</span>
  </a>
);

const ProjectsSidebar = () => (
  <div className="flex flex-col gap-1 p-2 h-full">
    <p className=" text-xs px-2 pt-1 pb-1 text-gray-600">Favorites</p>
    <button className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs w-full text-left">
      <span>
        <FaRegFolderClosed className="w-4 h-4 text-blue-500" />
      </span>
      Projects
    </button>
    <button className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs w-full text-left">
      <span>
        <SiAppstore className="w-4 h-4 text-blue-500" />
      </span>
      Applications
    </button>
    <button className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs w-full text-left">
      <span>
        <GrDocument className="w-4 h-4 text-blue-500" />
      </span>
      Documents
    </button>
    <button className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs w-full text-left">
      <span>
        <FiArrowDownCircle className="w-4 h-4 text-blue-500" />
      </span>
      Downloads
    </button>
    <button className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs w-full text-left">
      <span>
        <FaRegFolderClosed className="w-4 h-4 text-blue-500" />
      </span>
      Games
    </button>
    <p className=" text-xs px-2 pt-3 pb-1 text-gray-600">Locations</p>
    <button className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs w-full text-left">
      <span>
        <FaRegHardDrive className="w-3 h-3 text-gray-500" />
      </span>
      My PC
    </button>
    <button className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs w-full text-left">
      <span>
        <IoIosCloudOutline className="w-4 h-4 text-blue-500" />
      </span>
      Cloud
    </button>
  </div>
);

const ProjectTopbar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-full shrink-0 flex items-center gap-2 px-3 justify-between bg-white">
      <div className="flex items-center gap-4">
        <FaChevronLeft className="w-4 h-4 text-gray-600 cursor-pointer" />
        <FaChevronRight className="w-4 h-4 text-gray-400 cursor-pointer" />
        <span className="text-sm text-gray-600 font-semibold">Projects</span>
      </div>
      <div
        className={cn(
          "flex items-center rounded-md overflow-hidden px-2",
          isOpen && "bg-gray-100 border",
        )}
      >
        <motion.input
          type="text"
          placeholder="Search projects..."
          animate={{ width: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0 }}
          transition={{
            width: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
            opacity: { duration: 0.15, delay: isOpen ? 0.1 : 0 },
          }}
          className="bg-transparent border-none focus:outline-none text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setIsOpen((v) => !v)} className="p-1">
          <FaSearch className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

const ProjectGrid = ({
  projects,
  onSelect,
  search,
}: {
  projects: Project[];
  onSelect: (project: Project) => void;
  search: string;
}) => {
  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        <div className="grid grid-cols-4 gap-4">
          {filtered.map((project) => (
            <motion.button
              key={project.name}
              onDoubleClick={() => onSelect(project)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-1.5 p-2 rounded-lg 0 transition-colors group select-none cursor-default"
            >
              <FolderIcon />
              <span className=" text-xs text-center leading-tight max-w-full truncate w-full px-1 transition-colors">
                {project.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      <div className="h-6  border-t border-gray-300/65 flex items-center px-4 shrink-0">
        <span className=" text-[10px]">{projects.length} items</span>
      </div>
    </div>
  );
};

const ProjectDetail = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => (
  <WindowWrapper
    onClose={onClose}
    className="bg-white w-140! h-100!"
    mainContent={
      <div className="p-5 flex flex-col gap-4 h-full">
        <div className="flex items-center gap-3">
          <FolderIcon />
          <div>
            <p className=" font-medium text-sm">{project.name}</p>
            <p className=" text-xs">Project</p>
          </div>
        </div>

        <div className="w-full h-px " />

        <p className=" text-xs leading-relaxed">{project.description}</p>

        <div className="flex flex-col gap-2 mt-auto">
          <ProjectLink
            href={project.github}
            icon={<FaGithub className="w-4 h-4 shrink-0" />}
            label={project.github.replace("https://github.com/", "")}
          />
          {project.link && (
            <ProjectLink
              href={project.link}
              icon={<FiExternalLink className="w-4 h-4 shrink-0" />}
              label={
                project.link == "/"
                  ? "You're already here"
                  : project.link.replace("https://", "")
              }
            />
          )}
        </div>
      </div>
    }
  />
);
