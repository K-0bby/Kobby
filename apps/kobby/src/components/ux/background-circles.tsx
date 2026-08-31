import { motion } from "motion/react";

export default function BackgroundCircles() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"],
      }}
      transition={{
        duration: 2.5,
      }}
      className="relative flex justify-center items-center"
    >
      <div className="absolute border border-[#333333] rounded-full h-[100px] w-[100px] mt-52 animate-ping" />
      <div className="border border-[#333333]/10 rounded-full h-[100px] w-[100px] absolute mt-52" />
      <div className="border border-[#333333]/10 rounded-full h-[100px] w-[100px] absolute mt-52" />
      <div className="border border-[#006a94]/20 rounded-full h-[400px] w-[400px] absolute mt-52 animate-pulse" />
      <div className="absolute border border-[#333333]/10 rounded-full h-[500px] w-[500px] mt-52 " />
    </motion.div>
  );
}
