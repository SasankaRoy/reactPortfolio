import React from "react";
import { motion } from "framer-motion";

export const Skill = ({ data }) => {
  return (
    <div className="relative group cursor-pointer flex items-center justify-center ">
      <motion.img
        initial={{ x: data.direction === "true" ? 50 : -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        src={`https://portfolio-server-4csu.onrender.com/image/${data?.skillImg}`}
        className="h-16 w-16 md:h-20 md:w-20
        object-cover border border-gray-400 
        rounded-full filter group-hover:grayscale transition-duration-300 ease-in-out "
        alt="skills"
      />
      <div className="absolute opacity-0 group-hover:opacity-90 z-0 group-hover:bg-white/70 h-16 w-16 md:h-20 md:w-20 rounded-full transition-all duration-200 ease-in-out">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-black font-[Poppins] font-bold text-2xl md:text-3xl">
            {data.skillPerct}%
          </h1>
        </div>
      </div>
    </div>
  );
};
