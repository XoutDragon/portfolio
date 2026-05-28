// components/dock-wrapper.tsx
"use client";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import { Dock } from "@/components/dock";
import { motion } from "motion/react";

export const DockWrapper = () => {
  const unlocked = usePortfolioStore((s) => s.unlocked);

  return (
    <motion.div
      className="fixed bottom-4 left-0 right-0 flex justify-center z-60"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: unlocked ? 1 : 0, y: unlocked ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Dock unlocked={unlocked} />
    </motion.div>
  );
};
