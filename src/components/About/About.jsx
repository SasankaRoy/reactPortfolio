import React, { useContext, useEffect, useState } from "react";
// import User from "../../assets/contactbg3.jpg";
import { motion } from "framer-motion";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { AboutState } from "../../AtomModel/Atom";
import { useRecoilState } from "recoil";
import { AddAbout } from "../AddAbout/AddAbout";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";

export const About = () => {
  const { user } = useContext(AuthContext);
  const [OpenAddAbout, setOpenAddAbout] = useRecoilState(AboutState);
  const [Data, setData] = useState();
  const getData = async () => {
    const response = await axios.get("/api/about");
    setData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="h-screen relative flex
      flex-col text-center md:text-left 
      md:flex-row max-w-full items-center 
      justify-evenly px-7"
      >
        <h1 className="absolute top-10 md:top-20 uppercase text-2xl tracking-[10px] text-gray-500 font-extralight z-50 font-[Poppins] ">
          about
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
              onClick={() => setOpenAddAbout(true)}
              className="absolute scale-125"
            />
          ) : (
            ""
          )}
        </motion.div>
        <motion.img
          // src={User}
          src={`http://localhost:5000/image/${Data?.data[0]?.aboutPic}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="h-[14.4rem] w-[14.4rem] mt-16 flex-shrink-0
        md:w-[24rem] md:h-[27rem]
        lg:ml-16 object-cover rounded-full md:rounded-md z-50"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="spacex-y-10 px-10 lg:px-20 z-50"
        >
          <h3 className="text-4xl py-5 text-white font-[Poppins] tracking-[2px]">
            Here's{" "}
            <span className="underline decoration-[#F7AB0A]/30">small</span>{" "}
            information
          </h3>
          <p className="text-white text-md md:text-lg md:tracking-[2px] font-[Poppins]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
            laudantium quibusdam repellat ex. Expedita, corrupti harum doloribus
            reiciendis nobis eos quas similique voluptate nesciunt vitae
            delectus. Dolorem deserunt cumque eaque!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute bg-[#F7AB0A]/70 opacity-30
        z-0 h-[400px] w-full -skew-y-[20deg]"
        />
      </motion.div>
      {OpenAddAbout && (
        <AddAbout Open={OpenAddAbout} setOpenAddAbout={setOpenAddAbout} />
      )}
    </>
  );
};
