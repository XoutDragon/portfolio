"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { Separator } from "./separator";

import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-3 rounded-2xl px-2 pb-2 md:flex",
        className,
      )}
    >
      {items.map((item) =>
        item.title == "separator" ? (
          <Separator
            key={item.title}
            orientation="vertical"
            className="h-5/6! bg-white/30"
          />
        ) : (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ),
      )}
    </motion.div>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <div
      className={cn(
        "mx-auto w-full flex h-20 items-center justify-evenly rounded-2xl px-2 md:hidden",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          {...item}
          device="mobile"
        />
      ))}
    </div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  device = "desktop",
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  device?: "desktop" | "mobile";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [48, 72, 48],
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [48, 72, 48],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const Tag = href === "#" ? "div" : "a";

  const isMobile = device === "mobile";

  return (
    <Tag
      {...(href !== "#" ? { href, target: "_blank" } : {})}
      className="cursor-pointer"
    >
      <motion.div
        ref={ref}
        style={{
          width: isMobile ? "60px" : widthIcon,
          height: isMobile ? "60px" : heightIcon,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex rounded-xl items-center justify-center"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{
            width: isMobile ? "60px" : width,
            height: isMobile ? "60px" : height,
          }}
          className="relative flex items-center justify-center overflow-visible w-full h-full"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Tag>
  );
}
