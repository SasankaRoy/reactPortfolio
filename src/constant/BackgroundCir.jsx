import React from "react";
import { motion } from "framer-motion";

export const BackgroundCir = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        scale: [1,2,1,1.6 ],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1],
        borderRadius: ["20%", "20%", "50%",  "20%"],
      }}
      transition={{ duration: 2.5 }}
      className="relative flex justify-center items-center mt-28"
    >
      <div className="absolute  h-[100px] w-[100px] border-[#333333] border rounded-full animate-ping " />
      <div className="absolute  h-[200px] w-[200px] border-[#333333] border rounded-full opacity-20" />
      <div className="absolute  h-[300px] w-[300px] border-[#333333] border rounded-full opacity-20" />
      <div className="absolute  h-[400px] w-[400px] border-[#F7AB0A] border rounded-full opacity-40 animate-pulse" />
    </motion.div>
  );
};
