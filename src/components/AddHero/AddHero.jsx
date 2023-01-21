import React, { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Bg from "../../assets/contactbg2.jpg";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-hot-toast";

export const AddHero = ({ Open, setOpenHero, data }) => {
  const { user } = useContext(AuthContext);
  const filePicker = useRef(null);
  const [newImgs, setNewImgs] = useState();
  const [HeaderText, setHeaderText] = useState();
  const [HeaderImg, setHeaderImg] = useState();
  const [file, setFile] = useState();
  const OnchangeImage = (e) => {
    setFile(e.target.files[0]);
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
      setHeaderImg(e.target.files[0].name);
    }
    fileReader.onload = (readedFile) => {
      setNewImgs(readedFile.target.result);
    };
  };
  const Onchangetext = (e) => {
    setHeaderText(e.target.value);
  };
  const deleteItem = async (cue) => {
    const response = await axios.post(
      "https://portfolio-server-4csu.onrender.com/api/hero/post",
      {
        id: user._id,
        heroLines: cue,
      }
    );
    console.log(response, cue);
  };
  const saveHeader = async () => {
    try {
      const response = await axios.post(
        "https://portfolio-server-4csu.onrender.com/api/hero/post",
        {
          profilePic: HeaderImg,
          heroLines: HeaderText,
          id: user._id,
        },
        { withCredentials: true }
      );
      const data = new FormData();
      data.append("file", file);
      const response2 = await axios.post(
        "https://portfolio-server-4csu.onrender.com/api/upload",
        data,
        { withCredentials: true }
      );
      if (response.status === 200 || response2.status === 200) {
        toast.success("update successful");
        setOpenHero(false);
        window.location.reload();
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
            setOpenHero(false);
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
                      onClick={() => filePicker.current.click()}
                      className="mx-auto rounded-md w-full object-contain cursor-pointer"
                    />
                    <div className="mt-7 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-gray-700 text-2xl leading-6 font-medium tracking-[1px]"
                      >
                        Add{" "}
                        <span className="underline  decoration-[#F7AB0A]/70 decoration-rounded">
                          Hero
                        </span>{" "}
                        Image{" "}
                      </Dialog.Title>

                      {data ? (
                        <>
                          <div className="flex flex-row justify-evenly items-center flex-shrink-0 flex-wrap mt-1">
                            {data.hero[0].heroLines.map((cur, id) => (
                              <div className="main__div text-center flex items-center justify-center bg-[#F7AB0A]/30 rounded-full mt-3 px-3 py-1 shadow-md space-x-1">
                                <h1
                                  key={id}
                                  className=" tracking-[1px]   text-md "
                                >
                                  {cur}{" "}
                                </h1>
                                <div
                                  className="icon"
                                  onClick={() => deleteItem(cur)}
                                >
                                  <CancelIcon className="bg-transparent text-black/50 " />
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      <div className="mt-5">
                        <input
                          type="file"
                          ref={filePicker}
                          onChange={OnchangeImage}
                          hidden
                        />
                      </div>

                      <div className="mt-5">
                        <input
                          type="text"
                          placeholder="Enter hero lines..."
                          className="w-full text-center focus:ring-0 border-none tracking-[1px]"
                          name="email"
                          onChange={Onchangetext}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 space-y-3">
                    <button
                      // disabled={!newImgs}
                      onClick={saveHeader}
                      className="w-full inline-flex justify-center border
                      border-transparent rounded-md shadow-sm px-4 py-2 
                    bg-[#F7AB0A]/80 text-xl text-black font-[Poppins] font-medium
                    hover:bg-[#F7AB0A]/90 tracking-[1px] focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-[#F7AB0A]/80 sm:text-sm
                    disabled:bg-gray-400 disabled:cursor-not-allowed
                    hover:disabled:bg-gray-300"
                    >
                      Update
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
