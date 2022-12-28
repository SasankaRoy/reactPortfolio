import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useRecoilState } from "recoil";
import { ContactState } from "../../AtomModel/Atom";
import AddContact from "./AddContact";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

export const Contact = () => {
  const { user } = useContext(AuthContext);
  const [OpenAddContact, setOpenAddContact] = useRecoilState(ContactState);
  const [message, setMessage] = useState({
    senderName: "",
    senderEmail: "",
    message: "",
  });
  const handleIntput = (e) => {
    const { name, value } = e.target;
    setMessage({
      ...message,
      [name]: value,
    });
  };
  const send = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/contact/message",
        { Messages: message },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.success);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong 😢😢");
    }
  };
  return (
    <>
      <div
        className="h-screen relative flex flex-col text-center md:text-left
    overflow-hidden justify-evenly mx-auto items-center
    md:flex-row max-w-full px-10 text-white"
      >
        <h1
          className="absolute top-16 md:top-20 uppercase text-2xl
      tracking-[10px] text-gray-500 font-extralight font-[Poppins] "
        >
          Contact
        </h1>

        <motion.div
          initial={{ y: 90, opacity: 0, scale: 0 }}
          viewport={{ once: true }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 3.5 }}
          className="absolute scale-125 top-16 right-[5rem] md:top-24 z-30 opacity-60 cursor-pointer text-gray-300 hover:text-[#F7AB0A]/80 transition-all duration-300 ease-in-out"
        >
          {user ? (
            <AddCircleOutlineOutlinedIcon
              onClick={() => setOpenAddContact(true)}
              className="absolute scale-125"
            />
          ) : (
            ""
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex-col flex space-y-3 md:space-y-9 mt-10"
        >
          <h1 className="font-[Poppins] font-semibold text-xl md:text-3xl  tracking-widest">
            Let<snap className="text-[#F7AB0A]/90">'</snap>s{" "}
            <snap className="text-[#F7AB0A]/90 underline decoration-[#F7AB0A]/70">
              talk
            </snap>{" "}
            about what you need<snap className="text-[#F7AB0A]/90">.</snap>I
            have{" "}
            <snap className="text-[#F7AB0A]/90 underline decoration-[#F7AB0A]/70">
              just
            </snap>{" "}
            what you need<snap className="text-[#F7AB0A]/90">.</snap>
          </h1>

          <div className="z-40 opacity-70">
            <div className="flex items-center justify-center space-x-1 md:space-x-5">
              <LocalPhoneOutlinedIcon className="text-[#F7AB0A] md:scale-125 scale-110" />
              <p className="text-lg md:text-2xl ">+123456789</p>
            </div>
          </div>

          <div className="z-40 opacity-70">
            <div className="flex items-center justify-center space-x-5">
              <EmailOutlinedIcon className="text-[#F7AB0A] md:scale-125 scale-110" />
              <p className="md:text-2xl text-lg">sasankaroy033@gmail.com</p>
            </div>
          </div>

          <div className="z-40 opacity-70">
            <div className="flex items-center justify-center space-x-3">
              <LocationOnOutlinedIcon className="text-[#F7AB0A] md:scale-125 scale-110" />
              <p className="md:text-2xl text-lg">
                Asansol, west Bengal India. pinCode-713304
              </p>
            </div>
          </div>

          <form className="flex flex-col space-y-2 md:space-y-5 z-50 w-[100%] md:w-[70%] mx-auto">
            <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 justify-center items-center space-x-1 w-full mx-auto">
              <input
                type="text"
                className="rounded-lg p-2 bg-[#363636]/70 placeholder:text-gray-200 font-[Poppins] w-full outline-none border-none focus:ring-1 focus:ring-[#F7AB0A]/20 tracking-widest"
                placeholder="Enter your name.."
                onChange={handleIntput}
                name="senderName"
              />
              <input
                type="email"
                className="rounded-lg p-2 bg-[#363636]/70 placeholder:text-gray-200 font-[Poppins] w-full outline-none border-none focus:ring-1 focus:ring-[#F7AB0A]/20 tracking-widest"
                placeholder="Enter your email.."
                onChange={handleIntput}
                name="senderEmail"
              />
            </div>

            <textarea
              cols="20"
              rows="5"
              className="rounded-lg bg-[#363636]/70 p-2 placeholder:text-gray-200 font-[Poppins] outline-none border-none focus:ring-1 focus:ring-[#F7AB0A]/20 tracking-widest"
              placeholder="Enter your massage..."
              onChange={handleIntput}
              name="message"
            />
            <button
              onClick={send}
              className="bg-[#F7AB0A]/70 hover:bg-[#F7AB0A]/40 transition-all duration-200 ease-in-out px-3 py-2 rounded-full text-xl font-[Poppins] capitalize tracking-widest"
            >
              submit
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute bg-[#F7AB0A]/70 opacity-30
        z-10 h-[400px] w-full skew-y-[20deg]"
        />
      </div>
      {OpenAddContact && (
        <AddContact
          Open={OpenAddContact}
          setOpenAddContact={setOpenAddContact}
        />
      )}
    </>
  );
};
