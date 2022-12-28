import React, { useState } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
// import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useRef } from "react";
// import { Avatar } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
// /project/updata/techImg/:id

export const ProjectCard = ({ data }) => {
  const { user } = useContext(AuthContext);
  const filePicker = useRef(null);
  const [newTechImg, setNewTechImg] = useState();
  const [File, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [Details, setDetails] = useState();

  const handleChange = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = (readedFile) => {
      setNewTechImg(readedFile.target.result);
    };
  };

  const AddTechImg = async (id) => {
    try {
      const data = new FormData();
      data.append("file", File);
      const response2 = await axios.post("/api/upload", data);
      const response = await axios.post(`/api/project/updata/techImg/${id}`, {
        fileName,
      });
      if (response.status === 200 || response2.status === 200) {
        toast.success(response.data.success);
        return;
      }
    } catch (error) {
      toast.error("something went wrong 😢😢");
    }
  };
  const handelInput = (e) => {
    setDetails(e.target.value);
  };
  const AddText = async (id) => {
    try {
      const response = await axios.post(
        `/api/project/updata/projectDescription/${id}`,
        { Details }
      );
      if (response.status === 200) {
        toast.success(response.data.success);
        return;
      }
    } catch (error) {
      toast.error("something went wrong 😢😢");
    }
  };
  return (
    <article className="snap-center w-full flex flex-col items-center flex-shrink-0 space-y-5  py-5 md:py-10  opacity-50 hover:opacity-100 transition-all duration-400 ease-out rounded-lg">
      <motion.img
        initial={{ y: -100, scale: 0, opacity: 0 }}
        whileInView={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        src={`http://localhost:5000/image/${data?.projectImg}`}
        className="h-36 w-36 rounded-full object-cover"
        alt="projectImg"
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex flex-col "
      >
        <h1 className="text-white font-[Poppins] font-normal text-4xl tracking-[3px]">
          {data.projectName}
        </h1>
        <h3 className="text-gray-500 font-[Poppins] uppercase font-normal text-2xl tracking-[2px] py-5">
          {data?.buildBy}
        </h3>
        <div className="techs flex justify-start items-center space-x-2 mt-2 mb-2">
          {data?.techImg.map((cur, id) => (
            <img
              className="h-10 w-10  object-cover"
              key={id}
              src={`http://localhost:5000/image/${cur}`}
              alt="techImg"
            />
          ))}
          {user && (
            <>
              <div className="flex justify-evenly items-center space-x-3 nav__btn main__box ">
                {newTechImg ? (
                  <img
                    onClick={() => filePicker.current.click()}
                    className="h-10 w-10 object-cover rounded-full cursor-pointer"
                    src={newTechImg}
                    alt="techImg"
                  />
                ) : (
                  <span className="Icon cursor-pointer transition-all duration-400 ease-in-out ">
                    <CameraAltOutlinedIcon
                      onClick={() => filePicker.current.click()}
                    />
                  </span>
                )}

                <button
                  onClick={() => AddTechImg(data._id)}
                  className="md:text-md text-center font-semibold  capitalize font-[Poppins] sm:tracking-[3px] tracking-[1.5px] md:tracking-[5px] cursor-pointer"
                >
                  Add
                </button>
              </div>

              <input
                type="file"
                hidden
                ref={filePicker}
                onChange={handleChange}
              />
            </>
          )}
        </div>
        <ul className="list-disc text-gray-400 text-xl tracking-[1px] capitalize p-2 space-y-2">
          {data?.projectDescription.map((cur, id) => (
            <li key={id}>{cur}</li>
          ))}

          {user && (
            <div className="flex justify-evenly items-center  main__box nav__btn">
              <button
                onClick={() => AddText(data._id)}
                className="md:text-md font-semibold capitalize font-[Poppins] sm:tracking-[3px] tracking-[1.5px] md:tracking-[5px] cursor-pointer "
              >
                Add
              </button>
              <input
                type="text"
                placeholder="Add more details..."
                onChange={handelInput}
                className="Icon w-[75%] bg-[#363636]/70 placeholder:text-gray-200 font-[Poppins] rounded-full text-center  focus:ring-0 border-none tracking-[1px]"
              />
            </div>
          )}
        </ul>
      </motion.div>
    </article>
  );
};
