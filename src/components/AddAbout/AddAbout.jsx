import { Dialog, Transition } from "@headlessui/react";

import React, { Fragment, useContext, useRef, useState } from "react";
import Bg from "../../assets/contactbg2.jpg";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";

export const AddAbout = ({ Open, setOpenAddAbout }) => {
  const { user } = useContext(AuthContext);
  const filePicker = useRef(null);
  const [newImgs, setNewImgs] = useState();
  const [ImgName, setImgName] = useState();
  const [file, setFile] = useState();
  const [dec, setDec] = useState();
  const OnchangeImage = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setImgName(e.target.files[0].name);
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = (readedFile) => {
      setNewImgs(readedFile.target.result);
    };
  };
  const addDec = (e) => {
    setDec(e.target.value);
  };
  const changeDetails = async () => {
    try {
      const newDetails = await axios.post(
        "https://portfolio-server-4csu.onrender.com/api/about/update",
        {
          id: user._id,
          aboutPic: ImgName,
          smallDescription: dec,
        },
        {
          withCredentials: true,
        }
      );
      const data = new FormData();
      data.append("file", file);
      const response = await axios.post(
        "https://portfolio-server-4csu.onrender.com/api/upload",
        data,
        { withCredentials: true }
      );
      if (newDetails.status === 200 || response.status === 200) {
        toast.success(newDetails.data.success);
        setOpenAddAbout(false);
        window.location.reload();
        return;
      }
    } catch (error) {
      toast.error("something went wrong 😢😢");
    }
  };

  return (
    <>
      <Transition.Root show={Open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-50 opacity-100  inset-0 overflow-y-auto"
          onClose={() => {
            setOpenAddAbout(false);
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
                    <img
                      src={newImgs ? newImgs : Bg}
                      className="mx-auto cursor-pointer object-contain w-full rounded-md"
                      onClick={() => filePicker.current.click()}
                      alt="aboutImg"
                    />
                    <div className="mt-7 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-gray-700 text-2xl leading-6 font-medium tracking-[1px]"
                      >
                        Change{" "}
                        <span className="underline  decoration-[#F7AB0A]/70 decoration-rounded">
                          About
                        </span>{" "}
                        pic.
                      </Dialog.Title>

                      <div className="mt-5">
                        <input
                          type="file"
                          ref={filePicker}
                          onChange={OnchangeImage}
                          hidden
                        />
                      </div>

                      <div className="mt-5">
                        <textarea
                          type="text"
                          placeholder="small description..."
                          className="w-full text-center focus:ring-0 border-none tracking-[1px]"
                          name="dec"
                          onChange={addDec}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 space-y-3">
                    <button
                      //disabled={!newImgs}
                      onClick={() => changeDetails()}
                      className="w-full inline-flex justify-center border
                      border-transparent rounded-md shadow-sm px-4 py-2 
                      bg-[#F7AB0A]/80 text-lg text-black font-[Poppins] font-medium
                      hover:bg-[#F7AB0A]/90 tracking-[1px] focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-[#F7AB0A]/80 sm:text-sm
                      disabled:bg-gray-400 disabled:cursor-not-allowed
                      hover:disabled:bg-gray-300"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
