import React from "react";
import react from "../../assets/react.png";
import Sass from "../../assets/sass.png";
import python from "../../assets/python.png";
import { motion } from "framer-motion";

export const Skill = ({ direction, data }) => {
  return (
    <div className="relative group cursor-pointer flex items-center justify-center">
      <motion.img
        initial={{ y: direction ? -200 : 200, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        // src={Sass}
        src={`http://localhost:5000/image/${data?.skillImg}`}
        className="h-24 w-24 md:h-32 md:w-32
        object-cover border border-gray-400 
        rounded-full filter group-hover:grayscale transition-duration-300 ease-in-out "
        alt="skills"
      />
      <div className="absolute opacity-0 group-hover:opacity-90 z-0 group-hover:bg-white/70 h-24 w-24 md:h-32 md:w-32 rounded-full transition-all duration-200 ease-in-out">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-black font-[Poppins] font-bold text-2xl md:text-3xl">
            {data.skillPerct}%
          </h1>
        </div>
      </div>
    </div>
  );
};
