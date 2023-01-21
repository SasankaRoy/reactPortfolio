import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "../../constant/ProjectCard";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useRecoilState } from "recoil";
import { ProjectState } from "../../AtomModel/Atom";
import AddProjects from "./AddProjects";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
export const Projects = () => {
  const { user } = useContext(AuthContext);
  const [AllProjects, setAllProjects] = useState([]);
  const [OpenAddProject, setOpenAddProject] = useRecoilState(ProjectState);
  const fetchData = async () => {
    const response = await axios.get(
      "https://portfolio-server-4csu.onrender.com/api/project"
    );
    setAllProjects(response?.data?.findProject);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="h-screen relative flex flex-col text-left
      overflow-hidden justify-evenly mx-auto items-center
      md:flex-row max-w-full px-10"
      >
        <h1 className="absolute top-16 md:top-20 uppercase text-2xl tracking-[10px] text-gray-500 font-extralight z-50 font-[Poppins] ">
          project
        </h1>

        <motion.div
          initial={{ y: 90, opacity: 0, scale: 0 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 3.5 }}
          viewport={{ once: true }}
          className="absolute scale-125  top-16 right-[5rem] md:top-24 z-50 opacity-60 cursor-pointer text-gray-300 hover:text-[#F7AB0A]/80 transition-all duration-300 ease-in-out"
        >
          {user ? (
            <AddCircleOutlineOutlinedIcon
              onClick={() => setOpenAddProject(true)}
              className="absolute scale-125 z-50"
            />
          ) : (
            ""
          )}
        </motion.div>

        <div className="projects__div overflow-x-scroll scroll-smooth snap-x snap-mandatory flex space-x-5 mt-24 md:mt-32 py-5 z-50 w-[95%] ">
          {/* projectCards */}
          {AllProjects.map((cur, id) => (
            <ProjectCard key={id} data={cur} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute bg-[#F7AB0A]/70 opacity-30
        z-0 h-[400px] w-full skew-y-[20deg]"
        />
      </motion.div>
      {OpenAddProject && (
        <AddProjects
          Open={OpenAddProject}
          setOpenAddProject={setOpenAddProject}
        />
      )}
    </>
  );
};
