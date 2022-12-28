import React, { useContext, useEffect, useState } from "react";
import Bg from "../../assets/contactbg2.jpg";
import { BackgroundCir } from "../../constant/BackgroundCir";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { HeroState } from "../../AtomModel/Atom";
import { AddHero } from "../AddHero/AddHero";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
export const Hero = () => {
  // const PF = process.env.REACT_APP_IMAGE_URL;
  const { isFetching, user, error, dispatch } = useContext(AuthContext);
  const [Data, setData] = useState();
  const fetchData = async () => {
    const data = await axios.get("api/hero");
    setData(data.data);
    dispatch({ type: "LOGIN_START" });
    const sendLogin = await axios.post("auth/login");
    dispatch({ type: "LOGIN_SUCCESS", payload: sendLogin.data.user });
  };
  // console.log(Data?.hero[0]?.profilePic);
  useEffect(() => {
    fetchData();
  }, []);

  const [OpenHero, setOpenHero] = useRecoilState(HeroState);
  const [text] = useTypewriter({
    words: [
      "hey there, I am sasanka roy",
      "I am a full stack web/android developer",
      "Both Mern/Mean developer",
    ],
    loop: true,
    delaySpeed: 3000,
  });

  return (
    <>
      <div className="text-gray-300 relative h-screen flex flex-col space-x-5 items-center justify-center max-w-7xl mx-auto overflow-hidden">
        <BackgroundCir />
        <motion.div
          initial={{ y: 90, opacity: 0, scale: 0 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 3.5 }}
          viewport={{ once: true }}
          className="absolute scale-125 top-14 right-[3rem] md:top-24 z-10 opacity-30 cursor-pointer text-gray-300 hover:text-[#F7AB0A]/80 transition-all duration-300 ease-in-out"
        >
          {user ? (
            <AddCircleOutlineOutlinedIcon
              onClick={() => setOpenHero(true)}
              className="absolute scale-125"
            />
          ) : (
            ""
          )}
        </motion.div>
        <img
          // src={Bg}
          src={`http://localhost:5000/image/${Data?.hero[0]?.profilePic}`}
          alt=""
          className="h-48 w-48 rounded-full -mt-[10rem] relative -left-2 opacity-100 z-50"
        />
        <div className="relative opacity-100 z-50">
          <h2 className="text-sm text-center text-gray-600 tracking-[10px] md:tracking-[17px] uppercase mt-5">
            software developer
          </h2>
          <h1 className="text-3xl text-white md:text-4xl lg:text-6xl text-center capitalize font-[Poppins] mt-8">
            <span>{text}</span>
            <Cursor cursorColor="#F7AB0A" />
          </h1>
        </div>
        <div className="flex justify-center items-center space-x-3 md:space-x-5 lg:space-x-7 mt-6 relative sm:left-0 md:left-0 lg:left-0 -left-2">
          <a className="list-none" href="#about">
            <button className="md:text-md text-sm uppercase font-[Poppins] sm:tracking-[3px] tracking-[1.5px] md:tracking-[5px] cursor-pointer nav__btn">
              about
            </button>
          </a>
          <a className="list-none" href="#project">
            <button className="md:text-md text-sm uppercase font-[Poppins] sm:tracking-[3px] tracking-[1.5px] md:tracking-[5px] cursor-pointer nav__btn">
              project
            </button>
          </a>
          <a className="list-none" href="#skills">
            <button className="md:text-md text-sm uppercase font-[Poppins] sm:tracking-[3px] tracking-[1.5px] md:tracking-[5px] cursor-pointer nav__btn">
              skills
            </button>
          </a>
          <a className="list-none" href="#contact">
            <button className="md:text-md text-sm uppercase font-[Poppins] sm:tracking-[3px] tracking-[1.5px] md:tracking-[5px] cursor-pointer nav__btn">
              contact
            </button>
          </a>
        </div>
      </div>
      {OpenHero && (
        <AddHero Open={OpenHero} setOpenHero={setOpenHero} data={Data} />
      )}
    </>
  );
};
