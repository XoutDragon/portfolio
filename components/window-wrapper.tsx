"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  MotionValue,
  useDragControls,
  useMotionValue,
} from "motion/react";
import { FaX } from "react-icons/fa6";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

interface WindowWrapperProps {
  onClose: () => void;
  className?: string;
  sidebarTitleContent?: React.ReactNode;
  sidebarContent?: React.ReactNode;
  mainTitleContent?: React.ReactNode;
  mainContent: React.ReactNode;
}

export const WindowWrapper = ({
  onClose,
  className,
  sidebarTitleContent,
  sidebarContent,
  mainTitleContent,
  mainContent,
}: WindowWrapperProps) => {
  const dragControls = useDragControls();
  const [fullscreen, setFullscreen] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      drag={!fullscreen}
      dragMomentum={false}
      dragElastic={0}
      dragListener={false}
      dragControls={dragControls}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        fullscreen
          ? {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              width: "100vw",
              height: "calc(100vh - 80px)",
              top: "46%",
              left: "50%",
              borderRadius: 0,
            }
          : {
              opacity: 1,
              scale: 1,
              width: "50vh",
              height: "calc(50vh)",
              borderRadius: 12,
            }
      }
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        "fixed overflow-hidden shadow-2xl shadow-black/40 z-50",
        fullscreen ? "border-0 shadow-none" : "rounded-xl border",
        className,
      )}
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        x,
        y,
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <ResizablePanelGroup orientation="horizontal" className="h-full">
        {(sidebarTitleContent || sidebarContent) && (
          <ResizablePanel
            defaultSize="25%"
            className="flex flex-col h-full"
            minSize={80}
          >
            <div
              onPointerDown={(e) => !fullscreen && dragControls.start(e)}
              className={cn(
                "h-10 shrink-0 flex items-center gap-2 p-3",
                fullscreen
                  ? "cursor-default"
                  : "cursor-grab active:cursor-grabbing",
              )}
            >
              <WindowControls
                onClose={onClose}
                fullscreen={fullscreen}
                setFullscreen={setFullscreen}
                x={x}
                y={y}
              />
              {sidebarTitleContent && (
                <div className="flex-1 min-w-0">{sidebarTitleContent}</div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
          </ResizablePanel>
        )}

        {(sidebarTitleContent || sidebarContent) && (
          <ResizableHandle className="transition-colors" />
        )}

        <ResizablePanel className="flex flex-col">
          <div
            onPointerDown={(e) => !fullscreen && dragControls.start(e)}
            className={cn(
              "h-10 shrink-0 flex items-stretch",
              fullscreen
                ? "cursor-default"
                : "cursor-grab active:cursor-grabbing",
            )}
          >
            {!(sidebarTitleContent || sidebarContent) && (
              <div className="p-3">
                <WindowControls
                  onClose={onClose}
                  fullscreen={fullscreen}
                  setFullscreen={setFullscreen}
                  x={x}
                  y={y}
                />
              </div>
            )}
            {mainTitleContent && (
              <div className="h-full w-full">{mainTitleContent}</div>
            )}
          </div>

          <div
            className={cn(
              "flex-1 overflow-auto",
              fullscreen && "overflow-y-auto",
            )}
          >
            {mainContent}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </motion.div>
  );
};

const WindowControls = ({
  onClose,
  fullscreen,
  setFullscreen,
  x,
  y,
}: {
  onClose: () => void;
  fullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) => {
  const handleFullscreen = () => {
    if (!fullscreen) {
      x.set(0);
      y.set(0);
    }
    setFullscreen((v) => !v);
  };

  return (
    <div className="flex items-center gap-2 select-none shrink-0 max-h-10">
      <button
        onClick={onClose}
        className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] border border-black/20 transition-colors shrink-0 group"
      >
        <FaX className="w-2 h-2 text-white/80 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-200" />
      </button>
      <div className="w-3 h-3 rounded-full bg-[#febc2e]/40 border border-black/20 shrink-0 cursor-not-allowed" />
      <button
        onClick={handleFullscreen}
        className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#34c759] border border-black/20 transition-colors shrink-0"
      />
    </div>
  );
};
