"use client";

import { useEffect, useState } from "react";

const TICK_MS = 15_000;

const format = () =>
  new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Accra",
  });

/**
 * Live Accra time with a blinking colon, so a visitor anywhere can see what
 * time it is where Gideon is. Renders a placeholder on the server (whose
 * clock isn't the visitor's moment) and fills in after mount.
 */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(format());
    const first = requestAnimationFrame(update);
    const id = setInterval(update, TICK_MS);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  const [h, m] = (time ?? "--:--").split(":");

  return (
    <span className="inline-flex items-center gap-2">
      <span>ACCRA, GH</span>
      <span aria-hidden="true" className="text-signal">
        →
      </span>
      <time aria-label={time ? `Local time in Accra: ${time}` : "Local time in Accra"} className="tabular-nums text-[#D6D6DA]">
        {h}
        <span className="motion-safe:animate-colon-blink">:</span>
        {m}
      </time>
    </span>
  );
}
