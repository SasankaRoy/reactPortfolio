import React, { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import Bg from "../../assets/contactbg2.jpg";
import { signInState } from "../../AtomModel/Atom";
import { useRecoilState } from "recoil";
import SignIn from "../sign/SignIn";
import { Avatar } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

export const Login = ({ Open, setOpen }) => {
  const { isFetching, user, error, dispatch } = useContext(AuthContext);

  const [OpenSignIn, setOpenSignIn] = useRecoilState(signInState);
  const [loginDel, setLoginDel] = useState({
    email: "",
    password: "",
  });
  const loggin = (e) => {
    const { name, value } = e.target;
    setLoginDel({ ...loginDel, [name]: value });
  };
  const onLoggin = async () => {
    dispatch({ type: "LOGIN_START" });
    const sendLogin = await axios.post("auth/login", loginDel);

    if (sendLogin.status === 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: sendLogin.data.user });
      toast.success(`welcome back ${sendLogin.data.user.name}`);
      setOpen(false);
    }
  };

  return (
    <>
      <Transition.Root show={Open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-50 opacity-100  inset-0 overflow-y-auto"
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed bg-opacity-75 inset-0 bg-gray-500 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8503;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-0"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100  translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-0"
            >
              <div
                className="inline-block  bg-white rounded-lg px-4 pt-5 pb-4
                text-left overflow-hidden shadow-lg transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
              >
                <div>
                  <div>
                    <Avatar
                      // src={Bg}
                      className="mx-auto rounded-full scale-150"
                    />
                    <div className="mt-4 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-gray-700 text-2xl leading-6 font-medium tracking-[1px]"
                      >
                        Log In{" "}
                        <span className="text-base font-[Poppins] underline decoration-[#F7AB0A]">
                          only for admin
                        </span>
                      </Dialog.Title>

                      {/* <div>
                        <input
                          type="text"
                          placeholder="User Name..."
                          className="w-full text-center focus:ring-0 border-none"
                          name="name"
                          id=""
                        />
                      </div> */}

                      <div>
                        <input
                          type="text"
                          placeholder="Enter email..."
                          className="w-full text-center focus:ring-0 border-none"
                          name="email"
                          onChange={loggin}
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          placeholder="Enter password..."
                          className="w-full text-center focus:ring-0 border-none"
                          name="password"
                          onChange={loggin}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 space-y-3">
                    <button
                      disabled={
                        loginDel.email === "" || loginDel.password === ""
                      }
                      onClick={onLoggin}
                      className="w-full inline-flex justify-center border
                     border-transparent rounded-md shadow-sm px-4 py-2 
                     bg-[#F7AB0A]/80 text-lg text-black font-[Poppins] font-medium
                     hover:bg-[#F7AB0A]/90 tracking-[1px] focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-[#F7AB0A]/80 sm:text-sm
                       disabled:bg-gray-400 disabled:cursor-not-allowed
                        hover:disabled:bg-gray-300"
                    >
                      Log In
                    </button>
                    <h1 className="text-center text-lg font-normal font-[Poppins] uppercase tracking-[2px]">
                      or
                    </h1>
                    <button
                      className="w-full inline-flex justify-center border
                     border-transparent rounded-md shadow-sm px-4 py-2 
                     bg-[#F7AB0A]/80 text-lg text-black font-[Poppins] font-medium
                     hover:bg-[#F7AB0A]/90 tracking-[1px] focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-[#F7AB0A]/80 sm:text-sm
                       disabled:bg-gray-400 disabled:cursor-not-allowed
                        hover:disabled:bg-gray-300"
                      onClick={() => {
                        setOpenSignIn(true);
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {OpenSignIn && (
        <SignIn
          OpenSignIn={OpenSignIn}
          setOpenSignIn={setOpenSignIn}
          setOpen={setOpen}
        />
      )}
    </>
  );
};
