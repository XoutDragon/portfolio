// time.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Suspense } from "react";

interface TimeProps {
  className?: string;
  hour?: "numeric" | "2-digit";
  minute?: "2-digit" | "numeric";
}

interface DateProps {
  className?: string;
  weekday?: "long" | "short" | "narrow";
  month?: "long" | "short" | "narrow" | "numeric" | "2-digit";
  day?: "numeric" | "2-digit";
}

const TimeInner = ({
  className,
  hour = "2-digit",
  minute = "2-digit",
}: TimeProps) => {
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString([], { hour, minute }),
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const msUntilNextSecond = 1000 - (Date.now() % 1000);
    const timeout = setTimeout(() => {
      setTime(new Date().toLocaleTimeString([], { hour, minute }));
      intervalRef.current = setInterval(() => {
        setTime(new Date().toLocaleTimeString([], { hour, minute }));
      }, 1000);
    }, msUntilNextSecond);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hour, minute]);

  return <span className={className}>{time.split(" ")[0]}</span>;
};

const DateInner = ({
  className,
  weekday = "long",
  month = "long",
  day = "numeric",
}: DateProps) => {
  const [date, setDate] = useState<string>(() =>
    new Date().toLocaleDateString([], { weekday, month, day }),
  );

  useEffect(() => {
    const update = () =>
      setDate(new Date().toLocaleDateString([], { weekday, month, day }));
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();
    const id = setTimeout(() => {
      update();
    }, msUntilMidnight);
    return () => clearTimeout(id);
  }, [weekday, month, day]);

  return <span className={className}>{date}</span>;
};

export const TimeComponent = (props: TimeProps) => (
  <Suspense fallback={<span className={props.className}>--:--</span>}>
    <TimeInner {...props} />
  </Suspense>
);

export const DateComponent = (props: DateProps) => (
  <Suspense fallback={<span className={props.className}>&nbsp;</span>}>
    <DateInner {...props} />
  </Suspense>
);
