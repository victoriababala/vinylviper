"use client";

import { motion } from "framer-motion";

export default function RunningLine() {
  return (
    <div className="relative overflow-hidden text-white  font-semibold">
      <motion.div
        className="flex space-x-4 whitespace-nowrap text-white text-2xl"
        animate={{ x: ["0%", "-100%"] }} 
        transition={{ repeat: Infinity, duration:10, ease: "linear" }} // Continuous animation
      >
        <span>Made by @victoriababala Made by @victoriababala Made by @victoriababala</span>
        <span>Made by @victoriababala Made by @victoriababala Made by @victoriababala</span>
        <span>Made by @victoriababala Made by @victoriababala Made by @victoriababala</span>
        <span>Made by @victoriababala Made by @victoriababala Made by @victoriababala</span>
        <span>Made by @victoriababala Made by @victoriababala Made by @victoriababala</span>
      </motion.div>
    </div>
  );
}
