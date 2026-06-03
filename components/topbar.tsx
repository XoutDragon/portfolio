"use client";

import { useEffect, useState } from "react";

import {
  FaCircle,
  FaBatteryEmpty,
  FaBluetoothB,
  FaWifi,
  FaVolumeUp,
  FaSignal,
} from "react-icons/fa";
import { BatteryComponent } from "@/components/ui/battery";
import { IoIosSwitch } from "react-icons/io";

import { cn } from "@/lib/utils";

import { TimeComponent, DateComponent } from "./time";

const buttonClassNames = "active:bg-primary/10 px-2 rounded-xs h-full";

export const Topbar = ({
  openApp,
  unlocked,
}: {
  openApp: string | null;
  unlocked: boolean;
}) => {
  return (
    <>
      <MobileTopbar />
      <DesktopTopbar openApp={openApp} unlocked={unlocked} />
    </>
  );
};

const MobileTopbar = () => {
  return (
    <div className="relative flex justify-between items-center w-full md:hidden">
      <TimeComponent
        hour="numeric"
        minute="2-digit"
        className="text-sm opacity-80 pl-4"
      />
      <div className="flex items-center gap-x-2">
        <FaSignal className="w-3 h-3" />
        <FaWifi className="w-3 h-3" />
        <BatteryComponent />
      </div>
    </div>
  );
};

const DesktopTopbar = ({
  openApp,
  unlocked,
}: {
  openApp: string | null;
  unlocked: boolean;
}) => {
  return (
    <div
      className={cn(
        "hidden fixed top-0 left-0 right-0 h-6 bg-transparent backdrop-blur-sm md:flex duration-500 transition-all items-center text-sm z-50 justify-between select-none px-3",
        "opacity-0 -translate-y-full",
        unlocked && "opacity-100 translate-y-0",
        openApp === "skills" && "z-0",
      )}
    >
      <div className="flex items-center h-full">
        <div className={cn(buttonClassNames, "flex items-center")}>
          <FaCircle className="text-black w-3 h-3" />
        </div>
        <span className="text-gray-800 font-medium text-sm active:bg-primary/10 w-full px-2">
          {openApp === "projects" && "Projects"}
          {openApp === "contact" && "Contact"}
          {openApp === "about" && "About"}
          {openApp === "resume" && "Resume"}
          {!openApp && "Portfolio"}
        </span>
        <button className={buttonClassNames}>File</button>
        <button className={buttonClassNames}>Edit</button>
        <button className={buttonClassNames}>View</button>
        <button className={buttonClassNames}>Go</button>
        <button className={buttonClassNames}>Window</button>
        <button className={buttonClassNames}>Help</button>
      </div>
      <div className="flex items-center w-full h-full justify-end">
        <button className={buttonClassNames}>
          <FaVolumeUp className="w-4 h-4" />
        </button>
        <button className={buttonClassNames}>
          <BatteryComponent />
        </button>
        <button className={buttonClassNames}>
          <FaBluetoothB className="w-4 h-4" />
        </button>
        <button className={buttonClassNames}>
          <FaWifi className="w-4 h-4" />
        </button>
        <button className={buttonClassNames}>
          <IoIosSwitch className="w-4 h-4" />
        </button>
        <button className={buttonClassNames}>
          <DateComponent
            className="text-sm opacity-80"
            weekday="short"
            month="short"
            day="numeric"
          />
        </button>
        <button className={buttonClassNames}>
          <TimeComponent hour="numeric" minute="2-digit" />
        </button>
      </div>
    </div>
  );
};
