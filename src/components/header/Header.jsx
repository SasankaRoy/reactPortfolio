import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useRecoilState } from "recoil";
import modelState from "../../AtomModel/Atom";
import { Login } from "../logIn/Login";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
export const Header = () => {
  const [Open, setOpen] = useRecoilState(modelState);
  const { user } = useContext(AuthContext);

  return (
    <>
      <header className="text-gray-500  p-3 sticky top-0 max-w-7xl mx-auto flex justify-between items-start z-40">
        <motion.div
          initial={{
            x: -500,
            scale: -1,
            opacity: 0,
          }}
          animate={{
            x: 0,
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="social__icons flex justify-center items-center space-x-5"
        >
          <GitHubIcon className="cursor-pointer hover:text-[#F7AB0A]/70 transition-all duration-300 ease-in-out" />
          <InstagramIcon className="cursor-pointer hover:text-[#F7AB0A]/70 transition-all duration-300 ease-in-out" />
          <LinkedInIcon className="cursor-pointer hover:text-[#F7AB0A]/70 transition-all duration-300 ease-in-out" />
          <WhatsAppIcon className="cursor-pointer hover:text-[#F7AB0A]/70 transition-all duration-300 ease-in-out" />
        </motion.div>
        <motion.div
          initial={{
            x: 500,
            scale: -1,
            opacity: 0,
          }}
          animate={{
            x: 0,
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="inTouch flex justify-center items-center space-x-5 cursor-pointer"
        >
          {user ? (
            <Tooltip title="Log out">
              <LogoutOutlinedIcon />
            </Tooltip>
          ) : (
            <Tooltip title="Log In" placement="bottom-end">
              <LoginOutlinedIcon
                onClick={() => {
                  setOpen(true);
                  console.log("Log In");
                }}
                className="hover:text-[#F7AB0A]/70 transition-all duration-300 ease-in-out"
              />
            </Tooltip>
          )}

          <EmailIcon className="hover:text-[#F7AB0A]/70 transition-all duration-300 ease-in-out" />
          <h1 className=" text-gray-300 text-xl hidden md:inline-flex ">
            get in touch
          </h1>
        </motion.div>
      </header>

      {Open && <Login Open={Open} setOpen={setOpen} />}
    </>
  );
};
