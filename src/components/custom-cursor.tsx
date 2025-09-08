// components/CustomCursor.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

type CursorState = "default" | "hover" | "click" | "text";
type CursorType = "developer" | "creative" | "figma";

interface CustomCursorProps {
  type?: CursorType;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ type = "figma" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [elementType, setElementType] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const springX = useSpring(x, { stiffness: 400, damping: 28 });
  const springY = useSpring(y, { stiffness: 400, damping: 28 });

  // Trail effect for developer cursor
  const trailX = useMotionValue(0);
  const trailY = useMotionValue(0);
  const trailSpringX = useSpring(trailX, { stiffness: 150, damping: 25 });
  const trailSpringY = useSpring(trailY, { stiffness: 150, damping: 25 });

  const updateCursor = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX - 8);
      y.set(e.clientY - 8);
      // Trail follows with delay
      setTimeout(() => {
        trailX.set(e.clientX - 8);
        trailY.set(e.clientY - 8);
      }, 50);
      setIsVisible(true);
    },
    [x, y, trailX, trailY]
  );

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  // Reset cursor state when page becomes visible again
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      setCursorState("default");
      setElementType("");
      setIsVisible(true);
      // Re-hide default cursor
      document.body.style.cursor = "none";
    } else {
      setIsVisible(false);
    }
  }, []);

  // Reset cursor on page focus
  const handlePageFocus = useCallback(() => {
    setCursorState("default");
    setElementType("");
    document.body.style.cursor = "none";
  }, []);

  useEffect(() => {
    // Event handlers
    const enter = (e: Event) => {
      setCursorState("hover");
      const target = e.target as HTMLElement;

      const customTooltip = target.getAttribute("data-tooltip");

      if (customTooltip) {
        setElementType(customTooltip);
      } else if (target.tagName === "A") setElementType("link");
      else if (target.tagName === "BUTTON") setElementType("button");
      else if (target.classList.contains("cursor-text")) setElementType("text");
      else if (
        target.classList.contains("cursor-image") ||
        target.tagName === "IMG"
      )
        setElementType("image");
      else if (target.closest('button, a, [role="button"], [tabindex]'))
        setElementType("interactive");
      else setElementType("");
    };

    const leave = () => {
      setCursorState("default");
      setElementType("");
    };

    const handleClick = () => setCursorState("click");
    const handleRelease = () => setCursorState("hover");

    const textEnter = () => {
      setCursorState("text");
      setElementType("text");
    };

    const handleBlur = () => setIsVisible(false);

    // Attach listeners to elements
    const attachListeners = () => {
      const hoverElements = document.querySelectorAll(
        'button, a, [role="button"], .cursor-hover, .cursor-text, .cursor-image, [tabindex]:not([tabindex="-1"])'
      );
      const textElements = document.querySelectorAll(
        'input, textarea, [contenteditable="true"]'
      );

      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        el.addEventListener("mousedown", handleClick);
        el.addEventListener("mouseup", handleRelease);
      });

      textElements.forEach((el) => {
        el.addEventListener("mouseenter", textEnter);
        el.addEventListener("mouseleave", leave);
      });
    };

    // Remove listeners from elements
    const removeListeners = () => {
      const hoverElements = document.querySelectorAll(
        'button, a, [role="button"], .cursor-hover, .cursor-text, .cursor-image, [tabindex]:not([tabindex="-1"])'
      );
      const textElements = document.querySelectorAll(
        'input, textarea, [contenteditable="true"]'
      );

      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.removeEventListener("mousedown", handleClick);
        el.removeEventListener("mouseup", handleRelease);
      });

      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", textEnter);
        el.removeEventListener("mouseleave", leave);
      });
    };

    // Add global event listeners
    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handlePageFocus);
    window.addEventListener("blur", handleBlur);

    // Initial attachment
    attachListeners();

    // MutationObserver for dynamic elements
    const observer = new MutationObserver(() => {
      removeListeners();
      attachListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'role', 'tabindex', 'data-tooltip']
    });

    // Hide default cursor
    document.body.style.cursor = "none";
    document.body.style.setProperty("--cursor-display", "none");

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handlePageFocus);
      window.removeEventListener("blur", handleBlur);

      removeListeners();
      observer.disconnect();
      document.body.style.cursor = "auto";
    };
  }, [updateCursor, handleMouseEnter, handleMouseLeave, handleVisibilityChange, handlePageFocus]);

  if (!isVisible) return null;

  const isHovering = cursorState === "hover";
  const isClicking = cursorState === "click";
  const isText = cursorState === "text";

  return (
    <AnimatePresence>
      {/* Developer Cursor - Simple Blue Dot with Trail */}
      {type === "developer" && (
        <>
          {/* Main Blue Dot */}
          <motion.div
            key="developer-cursor"
            className="fixed top-0 left-0 pointer-events-none z-50"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.div
              animate={{
                scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
                backgroundColor: isHovering
                  ? "#3b82f6"
                  : isClicking
                  ? "#1e40af"
                  : "#1d4ed8",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-3 h-3 rounded-full bg-blue-700 shadow-lg"
            />
          </motion.div>

          {/* Trailing Dot */}
          <motion.div
            key="developer-trail"
            className="fixed top-0 left-0 pointer-events-none z-40"
            style={{ x: trailSpringX, y: trailSpringY }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-500/60"
              animate={{ scale: isHovering ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </motion.div>
        </>
      )}

      {/* Creative Cursor - Figma Style Arrow */}
      {type === "creative" && (
        <motion.div
          key="creative-cursor"
          className="fixed top-0 left-0 pointer-events-none z-50"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="relative">
            {/* Figma Cursor Shape */}
            <motion.div
              animate={{
                scale: isHovering ? 1.2 : isClicking ? 0.9 : 1,
                rotate: isHovering ? 15 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-6 h-6"
            >
              {/* Main Arrow Shape (Figma Style) */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="drop-shadow-lg"
              >
                <motion.path
                  d="M3 3L20 12L11 13L9 21L3 3Z"
                  fill={
                    isHovering ? "#3b82f6" : isClicking ? "#1e40af" : "#000000"
                  }
                  stroke="#ffffff"
                  strokeWidth="1"
                  animate={{
                    fill: isHovering
                      ? "#3b82f6"
                      : isClicking
                      ? "#1e40af"
                      : "#000000",
                  }}
                  transition={{ duration: 0.2 }}
                />
              </svg>

              {/* Selection Ring for Hover */}
              {isHovering && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -inset-2 border-2 border-blue-500 rounded-full"
                />
              )}
            </motion.div>

            {/* Element Type Tooltip */}
            {isHovering && elementType && (
              <motion.div
                key="figma-tooltip"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-full ml-2 top-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg"
              >
                {elementType === "link" && "Link"}
                {elementType === "button" && "Button"}
                {elementType === "text" && "Text"}
                {elementType === "image" && "Image"}
                {elementType === "interactive" && "Element"}
              </motion.div>
            )}

            {/* Color Dot Indicator */}
            <motion.div
              animate={{
                scale: isHovering ? 1 : 0,
                opacity: isHovering ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border border-white shadow-sm"
            />
          </div>
        </motion.div>
      )}

      {/* Enhanced Figma Cursor - Combines Both Styles */}
      {type === "figma" && (
        <>
          {/* Main Cursor */}
          <motion.div
            key="figma-cursor"
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="relative">
              {/* Text Cursor State */}
              {isText ? (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  className="w-0.5 h-6 bg-gray-300 rounded-full"
                />
              ) : (
                /* Arrow Cursor for Default/Hover/Click */
                <motion.div
                  animate={{
                    scale: isHovering ? 1.2 : isClicking ? 0.9 : 1,
                    rotate: isHovering ? 10 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-6 h-6"
                >
                  {/* Main Arrow Shape */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="drop-shadow-lg"
                  >
                    <motion.path
                      d="M3 3L20 12L11 13L9 21L3 3Z"
                      fill={
                        isHovering
                          ? "#3b82f6"
                          : isClicking
                          ? "#1e40af"
                          : "#1f2937"
                      }
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      animate={{
                        fill: isHovering
                          ? "#3b82f6"
                          : isClicking
                          ? "#1e40af"
                          : "#1f2937",
                      }}
                      transition={{ duration: 0.15 }}
                    />
                  </svg>

                  {/* Hover Ring */}
                  {/* {isHovering && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.6 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -inset-3 border-2 border-blue-400 rounded-full animate-pulse"
                    />
                  )} */}

                  {/* Click Ring */}
                  {isClicking && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -inset-3 border-2 border-blue-600 rounded-full"
                    />
                  )}
                </motion.div>
              )}

              {/* Element Type Tooltip */}
              {isHovering && elementType && !isText && (
                <motion.div
                  key="tooltip"
                  initial={{ opacity: 0, y: 10, x: -10 }}
                  animate={{ opacity: 1, y: -35, x: 5 }}
                  exit={{ opacity: 0, y: 10, x: -10 }}
                  className="absolute top-12 left-5 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-gray-700"
                >
                  <div className="relative">
                    {/* {elementType === "link" && "Link"}
                    {elementType === "button" && "Button"}
                    {elementType === "text" && "Text"}
                    {elementType === "Image" && "Image"}
                    {elementType === "interactive" && "Interactive"} */}

                    {elementType || ""}

                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
                  </div>
                </motion.div>
              )}

              {/* Status Indicator Dot */}
              {/* <motion.div
                animate={{
                  scale: isHovering ? 1 : isClicking ? 1.2 : 0,
                  opacity: isHovering || isClicking ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-lg ${
                  isClicking
                    ? "bg-red-500"
                    : isHovering
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-green-500"
                }`}
              /> */}
            </div>
          </motion.div>

          {/* Trail Effect (Developer Style) */}
          <motion.div
            key="figma-trail"
            className="fixed -top-1 -left-1 pointer-events-none z-50"
            style={{ x: trailSpringX, y: trailSpringY }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-500/90 shadow-sm"
              animate={{
                scale: isHovering ? 1.3 : isClicking ? 0.8 : 1,
                opacity: isText ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
