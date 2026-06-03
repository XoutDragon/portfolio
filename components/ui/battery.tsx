"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import { FaBatteryEmpty } from "react-icons/fa";

export const BatteryComponent = () => {
  // Make this dynamic later
  const [batteryLevel, setBatteryLevel] = useState(100);

  return (
    <>
      <IOSBattery batteryLevel={batteryLevel} className="md:hidden" />
      <MacOSBattery batteryLevel={batteryLevel} className="hidden md:flex" />
    </>
  );
};

const MacOSBattery = ({
  batteryLevel = 100,
  className,
}: {
  batteryLevel?: number;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      <span>{`${Math.round(batteryLevel)}%`}</span>
      <div className="relative flex">
        <div
          className="absolute top-2.25 left-0.75 h-1.5 bg-black transition-all duration-500"
          style={{ width: `calc(${batteryLevel}%* .725)` }}
        />
        <FaBatteryEmpty className="w-6 h-6 relative z-10" />
      </div>
    </div>
  );
};

export const IOSBattery = ({
  batteryLevel = 68,
  className,
}: {
  batteryLevel?: number;
  className?: string;
}) => {
  return (
    <svg viewBox="0 0 30 16" className={cn("w-6 ", className)}>
      <defs>
        <mask id="battery">
          <rect width={28} height={16} fill="white" />
          <text
            x="45%"
            y="57%"
            fill="black"
            className="text-xs font-mono font-bold"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {batteryLevel}
          </text>
        </mask>
      </defs>
      <rect width={28} height={16} rx={2} fill="white" mask="url(#battery)" />
      <rect width={4} height={4} fill="white" x={29} y={6} rx={1} />
    </svg>
  );
};
