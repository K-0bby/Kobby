"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@repo/ui";

const RESET_MS = 2000;

/** Copies the address and confirms inline, announcing it to screen readers. */
export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    const done = () => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), RESET_MS);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(email).then(done, done);
    else done();
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className={cn(
          "cursor-pointer rounded-full border bg-transparent px-3.5 py-2 font-mono text-[11px] font-medium tracking-[0.16em] transition-colors duration-200 hover:border-[#F5F5F2] hover:text-[#F5F5F2]",
          copied ? "border-signal text-signal" : "border-[#6E6E76] text-[#6E6E76]"
        )}
      >
        {copied ? "COPIED ✓" : "COPY"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
