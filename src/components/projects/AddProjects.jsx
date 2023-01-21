import { Dialog, Transition } from "@headlessui/react";
import Bg from "../../assets/contactbg2.jpg";
import React, { Fragment, useContext, useRef, useState } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { Avatar } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";

const AddProjects = ({ Open, setOpenAddProject }) => {
  const { user } = useContext(AuthContext);
  const filePicker = useRef(null);
  const TechfilePicker = useRef(null);
  const [file, setFile] = useState();
  const [Techfile, setTechFile] = useState();
  const [newImgs, setNewImgs] = useState({
    mainFile: "",
    fileName: "",
  });
  const [newTechImg, setNewTechImg] = useState({
    mainFile: "",
    fileName: "",
  });
  const [AddText, setAddText] = useState({
    projectName: "",
    buildBy: "",
    projectDescription: "",
    projectLink: "",
  });

  const OnchangeImage = (e) => {
    const fileReader = new FileReader();
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = (readedFile) => {
      setNewImgs({
        mainFile: readedFile.target.result,
        fileName: e.target.files[0].name,
      });
    };
  };
  const onTechImg = (e) => {
    const fileReader = new FileReader();
    setTechFile(e.target.files[0]);
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = (readedFile) => {
      setNewTechImg({
        mainFile: readedFile.target.result,
        fileName: e.target.files[0].name,
      });
    };
  };

  const Addprojects = (e) => {
    const { name, value } = e.target;
    setAddText({ ...AddText, [name]: value });
  };
  const save = async () => {
    try {
      const response = await axios.post(
        "https://portfolio-server-4csu.onrender.com/api/project/updata",
        {
          id: user._id,
          text: AddText,
          Images: {
            projectImg: newImgs.fileName,
            techImg: newTechImg.fileName,
          },
        },
        { withCredentials: true }
      );
      const data = new FormData();
      data.append("file", file);
      const data2 = new FormData();
      data2.append("file", Techfile);

      const response2 = await axios.post(
        "https://portfolio-server-4csu.onrender.com/api/upload",
        data2,
        { withCredentials: true }
      );
      const response3 = await axios.post(
        "https://portfolio-server-4csu.onrender.com/api/upload",
        data2,
        { withCredentials: true }
      );
      if (
        response.status === 200 ||
        response2.status === 200 ||
        response3.status === 200
      ) {
        toast.success(response.data.success);
        setOpenAddProject(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
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
            setOpenAddProject(false);
          }}
        >
          <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
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
                      src={newImgs.mainFile ? newImgs.mainFile : Bg}
                      onClick={() => filePicker.current.click()}
                      className="mx-auto rounded-md object-contain w-full "
                    />
                    <div className="mt-7 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-gray-700 text-2xl leading-6 font-medium tracking-[1px]"
                      >
                        Add{" "}
                        <span className="underline  decoration-[#F7AB0A]/70 decoration-rounded">
                          Projects
                        </span>{" "}
                      </Dialog.Title>
                      <div className="mt-5">
                        <input
                          type="file"
                          hidden
                          ref={filePicker}
                          onChange={OnchangeImage}
                        />
                      </div>

                      <div className="mt-5">
                        <input
                          type="text"
                          placeholder="Enter projectName..."
                          className="w-full text-center focus:ring-0 border-none tracking-[1px]"
                          name="projectName"
                          id=""
                          onChange={Addprojects}
                        />
                      </div>
                      <div className="mt-5">
                        <input
                          type="text"
                          placeholder="Enter build By..."
                          className="w-full text-center focus:ring-0 border-none tracking-[1px]"
                          name="buildBy"
                          id=""
                          onChange={Addprojects}
                        />
                      </div>
                      {/* pic's use of tech */}
                      <div className="flex flex-col justify-center items-center mt-2 space-x-3">
                        <div
                          onClick={() => TechfilePicker.current.click()}
                          className="bg-[#F7AB0A]/10 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer "
                        >
                          {newTechImg.mainFile ? (
                            <>
                              <div className="flex justify-evenly items-start space-x-2 mt-2 mb-2 flex-shrink-0 flex-wrap overflow-x-auto rounded-full">
                                <Avatar src={newTechImg.mainFile} />
                              </div>
                            </>
                          ) : (
                            <CameraAltOutlinedIcon
                              className="w-6 h-6 text-red-500"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <input
                          type="file"
                          hidden
                          multiple="true"
                          ref={TechfilePicker}
                          onChange={onTechImg}
                        />
                        <h1 className="tracking-widest font-[Poppins] ">
                          Add tech use in the project
                        </h1>
                      </div>

                      <div className="mt-5">
                        <input
                          type="text"
                          placeholder="Enter project details..."
                          className="w-full text-center focus:ring-0 border-none tracking-[1px]"
                          name="projectDescription"
                          id=""
                          onChange={Addprojects}
                        />
                      </div>
                      <div className="mt-5">
                        <input
                          type="text"
                          placeholder="Enter project link..."
                          className="w-full text-center focus:ring-0 border-none tracking-[1px]"
                          name="projectLink"
                          id=""
                          onChange={Addprojects}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 space-y-3">
                    <button
                      //   disabled={!seleFile}
                      onClick={save}
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

export default AddProjects;
