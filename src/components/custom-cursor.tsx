"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";

type CursorType =
  | "smooth"
  | "hoverGrow"
  | "textReveal"
  | "blob"
  | "developer"
  | "creative";

interface CursorProps {
  type?: CursorType;
}

export default function CustomCursor({ type = "developer" }: CursorProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovering, setHovering] = useState(false);
  const [elementType, setElementType] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);

  const springX = useSpring(x, { stiffness: 400, damping: 28 });
  const springY = useSpring(y, { stiffness: 400, damping: 28 });

  // Trail effect for developer cursor
  const trailX = useMotionValue(0);
  const trailY = useMotionValue(0);
  const trailSpringX = useSpring(trailX, { stiffness: 150, damping: 25 });
  const trailSpringY = useSpring(trailY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 8); // Centered for small dot
      y.set(e.clientY - 8);
      // Trail follows with delay
      trailX.set(e.clientX - 8);
      trailY.set(e.clientY - 8);
    };

    const handleMouseEnter = () => setIsVisible(false);
    const handleMouseLeave = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", handleMouseLeave);
    document.addEventListener("mouseleave", handleMouseEnter);

    // Enhanced hover detection with element types
    const enter = (e: Event) => {
      setHovering(true);
      const target = e.target as HTMLElement;
      if (target.tagName === "A") setElementType("link");
      else if (target.tagName === "BUTTON") setElementType("button");
      else if (target.classList.contains("cursor-text")) setElementType("text");
      else if (target.classList.contains("cursor-image"))
        setElementType("image");
      else setElementType("interactive");
    };

    const leave = () => {
      setHovering(false);
      setElementType("");
    };

    // Select all interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .cursor-hover, .cursor-text, .cursor-image, input, textarea, [role='button'], [tabindex]"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", handleMouseLeave);
      document.removeEventListener("mouseleave", handleMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [x, y, trailX, trailY]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {/* Developer Cursor - Simple Blue Dot */}
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
                scale: hovering ? 1.5 : 1,
                backgroundColor: hovering ? "#3b82f6" : "#1d4ed8",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-3 h-3 rounded-full bg-blue-700 shadow-lg"
            />
          </motion.div>

          {/* Trailing Dots */}
          <motion.div
            key="developer-trail-1"
            className="fixed top-0 left-0 pointer-events-none z-40"
            style={{ x: trailSpringX, y: trailSpringY }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-500/60"
              animate={{ scale: hovering ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </motion.div>

          {/* <motion.div
            key="developer-trail-2"
            className="fixed top-0 left-0 pointer-events-none z-30"
            style={{
              x: trailSpringX,
              y: trailSpringY,
            }}
          >
            <motion.div
              className="w-1 h-1 rounded-full bg-blue-400/40"
              animate={{ scale: hovering ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            />
          </motion.div> */}
        </>
      )}

      {/* Creative Cursor - Figma Style */}
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
                scale: hovering ? 1.2 : 1,
                rotate: hovering ? 15 : 0,
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
                {/* Arrow Body */}
                <path
                  d="M3 3L20 12L11 13L9 21L3 3Z"
                  fill="#000000"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                {/* Hover State Color Change */}
                <motion.path
                  d="M3 3L20 12L11 13L9 21L3 3Z"
                  fill={hovering ? "#3b82f6" : "#000000"}
                  stroke="#ffffff"
                  strokeWidth="1"
                  animate={{
                    fill: hovering ? "#3b82f6" : "#000000",
                  }}
                  transition={{ duration: 0.2 }}
                />
              </svg>

              {/* Figma-style Selection Ring */}
              {hovering && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -inset-2 border-2 border-blue-500 rounded-full"
                />
              )}
            </motion.div>

            {/* Element Type Indicator (Figma Style) */}
            {hovering && elementType && (
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

            {/* Figma-style Color Dot Indicator */}
            <motion.div
              animate={{
                scale: hovering ? 1 : 0,
                opacity: hovering ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border border-white shadow-sm"
            />
          </div>
        </motion.div>
      )}

      {/* Enhanced Smooth */}
      {type === "smooth" && (
        <motion.div
          key="smooth-cursor"
          className="fixed top-0 left-0 pointer-events-none z-50"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: hovering ? 2.5 : 1,
                borderColor: hovering ? "#3b82f6" : "#000000",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-8 h-8 rounded-full border-2 backdrop-blur-sm"
            />
            <motion.div
              animate={{
                scale: hovering ? 1 : 0,
                opacity: hovering ? 0.3 : 0,
              }}
              className="absolute inset-0 w-8 h-8 rounded-full bg-blue-500"
            />
          </div>
        </motion.div>
      )}

      {/* Enhanced Hover Grow */}
      {type === "hoverGrow" && (
        <motion.div
          key="hover-grow-cursor"
          className="fixed top-0 left-0 pointer-events-none z-50"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <motion.div
            animate={{
              scale: hovering ? 4 : 1,
              backgroundColor: hovering
                ? "rgba(59, 130, 246, 0.2)"
                : "transparent",
              borderColor: hovering ? "#3b82f6" : "#000000",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-6 h-6 rounded-full border-2 backdrop-blur-sm shadow-lg"
          />
        </motion.div>
      )}

      {/* Enhanced Text Reveal */}
      {type === "textReveal" && (
        <motion.div
          key="text-reveal-cursor"
          className="fixed top-0 left-0 pointer-events-none z-50"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <motion.div
            animate={{
              scale: hovering ? 3 : 1,
              backgroundColor: hovering ? "#000000" : "transparent",
              color: hovering ? "#ffffff" : "#000000",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-xs font-semibold backdrop-blur-sm shadow-lg"
          >
            <motion.span
              animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {elementType === "link"
                ? "Visit"
                : elementType === "button"
                ? "Click"
                : "View"}
            </motion.span>
          </motion.div>
        </motion.div>
      )}

      {/* Enhanced Blob */}
      {type === "blob" && (
        <motion.div
          key="blob-cursor"
          className="fixed top-0 left-0 pointer-events-none z-50"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <motion.div
            animate={{
              scale: hovering ? 2.5 : 1,
              borderRadius: [
                "50% 50% 50% 50%",
                "60% 40% 70% 30%",
                "40% 60% 30% 70%",
                "70% 30% 40% 60%",
                "30% 70% 60% 40%",
                "50% 50% 50% 50%",
              ],
              background: [
                "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
                "linear-gradient(45deg, #4ecdc4, #45b7d1)",
                "linear-gradient(45deg, #45b7d1, #96ceb4)",
                "linear-gradient(45deg, #96ceb4, #ffd93d)",
                "linear-gradient(45deg, #ffd93d, #ff6b6b)",
              ],
            }}
            transition={{
              borderRadius: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              },
              background: { duration: 3, ease: "easeInOut", repeat: Infinity },
              scale: { type: "spring", stiffness: 200, damping: 15 },
            }}
            className="w-16 h-16 opacity-60 backdrop-blur-md shadow-xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
