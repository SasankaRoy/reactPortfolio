import React, { useContext, useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Skill } from "./Skill";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useRecoilState } from "recoil";
import { SkillState } from "../../AtomModel/Atom";
import AddSkills from "./AddSkills";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

export const Skills = () => {
  const { user } = useContext(AuthContext);
  const [OpenAddSkills, setOpenAddSkills] = useRecoilState(SkillState);
  const [SkillsData, setSkillsData] = useState([]);
  const getSkills = async () => {
    try {
      const response = await axios.get("/api/skill");
      if (response.status === 200) {
        setSkillsData(response.data.findSkill);
        return;
      }
    } catch (error) {
      toast.error("something went wrong 😢😢");
    }
  };
  useEffect(() => {
    getSkills();
  }, []);

  return (
    <>
      <div
        className="h-screen flex justify-evenly
      items-center max-w-full mx-auto flex-col md:flex-row px-7
      relative overflow-hidden "
      >
        <h1
          className="absolute top-16 md:top-20 uppercase text-2xl
        tracking-[10px] text-gray-500 font-extralight font-[Poppins] "
        >
          Skills
        </h1>
        <motion.div
          initial={{ y: 90, opacity: 0, scale: 0 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 3.5 }}
          viewport={{ once: true }}
          className="absolute scale-125 top-16 right-[5rem] md:top-24 z-30 opacity-60 cursor-pointer text-gray-300 hover:text-[#F7AB0A]/80 transition-all duration-300 ease-in-out"
        >
          {user ? (
            <AddCircleOutlineOutlinedIcon
              onClick={() => setOpenAddSkills(true)}
              className="absolute scale-125"
            />
          ) : (
            ""
          )}
        </motion.div>
        <h1
          className="absolute top-28 md:top-32 uppercase text-sm md:text-lg
      tracking-[1px] text-gray-500 font-extralight font-[Poppins] p-1"
        >
          Hover over the skills to see the current state
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="grid grid-cols-3 md:grid-cols-4 mt-20 md:mt-32 gap-5 
        mx-auto items-center z-40 "
        >
          {SkillsData?.map((cur, id) => (
            <Skill key={id} data={cur} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute bg-[#F7AB0A]/70 opacity-30
        z-10 h-[400px] w-full -skew-y-[20deg]"
        />
      </div>
      {OpenAddSkills && (
        <AddSkills Open={OpenAddSkills} setOpenAddSkills={setOpenAddSkills} />
      )}
    </>
  );
};
