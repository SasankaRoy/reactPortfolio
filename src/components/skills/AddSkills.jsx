import { Dialog, Transition } from "@headlessui/react";
import { Avatar } from "@mui/material";
import React, { Fragment, useContext, useRef, useState } from "react";
// import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";

const AddSkills = ({ Open, setOpenAddSkills }) => {
  const { user } = useContext(AuthContext);
  const filePicker = useRef(null);
  const [newskills, setNewSkills] = useState({
    mainFile: "",
    fileName: "",
  });
  const [Status, setStatus] = useState({
    status: "",
    direction: "",
  });
  const handleInput = (event) => {
    const { name, value } = event.target;
    setStatus({ ...Status, [name]: value });
  };
  const onTechImg = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = (readedFile) => {
      setNewSkills({
        mainFile: e.target.files[0],
        fileName: e.target.files[0].name,
      });
    };
  };
  const sendData = async () => {
    //"https://portfolio-server-4csu.onrender.com/api/skill/upload"
    try {
      const response = await axios.post(
        "https://portfolio-server-4csu.onrender.com/api/skill/upload",
        {
          Image: newskills.fileName,
          Status,
          id: user._id,
        },
        { withCredentials: true }
      );
      const data = new FormData();
      data.append("file", newskills.mainFile);
      await axios.post(
        "https://portfolio-server-4csu.onrender.com/api/upload",
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("success");
        setOpenAddSkills(false);
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
            setOpenAddSkills(false);
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
                      onClick={() => filePicker.current.click()}
                      src={newskills.mainFile}
                      className="mx-auto rounded-full scale-150 cursor-pointer object-cover"
                    />
                    <div className="mt-7 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-gray-700 text-2xl leading-6 font-medium tracking-[1px]"
                      >
                        Add{" "}
                        <span className="underline  decoration-[#F7AB0A]/70 decoration-rounded">
                          Skills
                        </span>{" "}
                      </Dialog.Title>

                      {/* pic's use of tech */}
                      <input
                        type="file"
                        hidden
                        onChange={onTechImg}
                        ref={filePicker}
                      />

                      <div className="mt-5">
                        <input
                          type="number"
                          placeholder="Enter current status..."
                          className="w-full text-center focus:ring-0 border-none tracking-[1px]"
                          name="status"
                          onChange={handleInput}
                          value={Status.status}
                        />
                      </div>
                      <div className="mt-5">
                        <input
                          type="text"
                          placeholder="Enter direction..."
                          className="w-full text-center focus:ring-0 border-none tracking-[1px]"
                          name="direction"
                          onChange={handleInput}
                          value={Status.direction}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 space-y-3">
                    <button
                      disabled={!Status}
                      onClick={sendData}
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

export default AddSkills;
