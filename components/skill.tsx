"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import technologies from "@/data/technologies.json";
import Image from "next/image";

interface AppItem {
  name: string;
  icon: string;
  link: string;
}

const DRAG_THRESHOLD = 30;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const useItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(24);

  useEffect(() => {
    const update = () => {
      setItemsPerPage(window.innerWidth >= 1280 ? 48 : 24);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return itemsPerPage;
};

const AppIcon = ({ app }: { app: AppItem }) => (
  <a
    href={app.link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center text-white/80 hover:text-white transition-colors select-none"
  >
    <Image
      src={app.icon}
      alt={app.name}
      width={96}
      height={96}
      className="mb-2 rounded-2xl"
    />
    <span className="text-sm">{app.name}</span>
  </a>
);

const PageDots = ({
  pages,
  currentPage,
  onSelect,
}: {
  pages: AppItem[][];
  currentPage: number;
  onSelect: (i: number) => void;
}) => (
  <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-3">
    {pages.map((_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        className={`w-2 h-2 rounded-full transition-colors ${
          i === currentPage ? "bg-white" : "bg-white/50"
        }`}
      />
    ))}
  </div>
);

export const LaunchpadWindow = ({ onClose }: { onClose: () => void }) => {
  const data = (technologies || []) as AppItem[];
  const itemsPerPage = useItemsPerPage();

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [search, setSearch] = useState("");

  const wheelLocked = useRef(false);
  const dragStart = useRef<{ x: number } | null>(null);
  const didDrag = useRef(false);

  const filteredData = data.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase()),
  );

  const pages: AppItem[][] = [];
  for (let i = 0; i < filteredData.length; i += itemsPerPage) {
    pages.push(filteredData.slice(i, i + itemsPerPage));
  }

  const goTo = (index: number) => {
    setDirection(index > currentPage ? 1 : -1);
    setCurrentPage(index);
  };

  const goNext = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLocked.current) return;
    wheelLocked.current = true;
    setTimeout(() => (wheelLocked.current = false), 250);
    e.deltaY > 0 ? goNext() : goPrev();
  };

  const handleDragStart = (x: number) => {
    dragStart.current = { x };
    didDrag.current = false;
  };

  const handleDragEnd = (x: number) => {
    if (!dragStart.current) return;
    const diff = dragStart.current.x - x;
    dragStart.current = null;
    if (Math.abs(diff) < DRAG_THRESHOLD) return;
    didDrag.current = true;
    diff > 0 ? goNext() : goPrev();
  };

  const handleBackdropClick = () => {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 h-screen z-40 flex flex-col overflow-hidden p-10 select-none"
      onWheel={handleWheel}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseUp={(e) => handleDragEnd(e.clientX)}
      onMouseLeave={() => {
        dragStart.current = null;
      }}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
    >
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-3xl -z-10"
        onClick={handleBackdropClick}
      />

      <div className="w-full justify-center flex mb-4">
        <input
          type="text"
          placeholder="🔍︎ Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-center border w-64 rounded-lg text-white/80 bg-white/20 backdrop-blur-md focus:bg-white/30 focus:outline-none transition-colors select-none"
        />
      </div>

      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="grid lg:grid-cols-6 xl:grid-cols-8 gap-24 mx-auto"
        >
          {pages[currentPage]?.map((app, i) => (
            <AppIcon key={i} app={app} />
          ))}
        </motion.div>
      </AnimatePresence>

      <PageDots pages={pages} currentPage={currentPage} onSelect={goTo} />
    </motion.div>
  );
};
