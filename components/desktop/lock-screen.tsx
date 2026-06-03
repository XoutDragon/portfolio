"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { IoChevronUpCircleOutline } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { DateComponent, TimeComponent } from "../time";

export const LockScreen = ({ onUnlocked }: { onUnlocked: () => void }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUnlocked(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!startTyping) return;
    const length = 8;
    let i = 0;

    const interval = setInterval(() => {
      setPassword("•".repeat(i + 1));
      i++;

      if (i >= length) {
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onUnlocked, 800);
        }, 400);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [startTyping, onUnlocked]);

  return (
    <div className="w-full">
      <motion.div
        className={cn(
          "absolute inset-0 z-20",
          unlocked && "pointer-events-none",
        )}
        animate={{
          y: unlocked ? "-100%" : "0%",
          opacity: fadeOut ? 0 : 1,
          scale: fadeOut ? 1.05 : 1,
          filter: fadeOut ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (unlocked) setStartTyping(true);
        }}
      >
        <div className="h-screen flex flex-col items-center justify-around text-white gap-y-6">
          <div className="text-white text-center flex flex-col">
            <DateComponent
              className="text-lg opacity-80 mt-1"
              weekday="long"
              month="long"
              day="numeric"
            />
            <TimeComponent
              className="text-6xl font-light tracking-tight"
              hour="numeric"
              minute="2-digit"
            />
          </div>

          <div className="flex flex-col items-center gap-y-2">
            <Avatar size="sm">
              <AvatarImage src="/xoutdragon.png" loading="eager" />
            </Avatar>
            <h3 className="text-base font-medium">Jason Wang</h3>
            <IoChevronUpCircleOutline className="text-2xl animate-bounce" />
          </div>
        </div>
        <div className="h-screen flex flex-col items-center justify-center text-white gap-y-4">
          <Avatar size="lg">
            <AvatarImage src="/xoutdragon.png" />
          </Avatar>
          <h2 className="text-lg font-medium">Jason Wang</h2>

          <input
            value={password}
            readOnly
            type="password"
            placeholder="Enter password"
            className="w-64 h-12 px-4 rounded-full bg-white/20 backdrop-blur-md text-white outline-none"
          />
        </div>
      </motion.div>
    </div>
  );
};
