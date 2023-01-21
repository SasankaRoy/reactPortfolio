import { Dialog, Transition } from "@headlessui/react";
import { Avatar } from "@mui/material";
import React, { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddContact = ({ Open, setOpenAddContact }) => {
  const { user } = useContext(AuthContext);
  const [Change, setChange] = useState({
    ContactNumber: "",
    EmailAddress: "",
    Address: "",
  });

  const changeDetails = (e) => {
    const { name, value } = e.target;
    setChange({ ...Change, [name]: value });
  };
  const onSave = async () => {
    try {
      const response = await axios.post(
        "https://portfolio-server-4csu.onrender.com/api/contact/update",
        {
          Change,
          id: user._id,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(`${response.data.success} 😊😊`);
        setOpenAddContact(false);
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
            setOpenAddContact(false);
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
                      className="mx-auto rounded-full scale-150 "
                    />
                    <div className="mt-7 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-gray-700 text-2xl leading-6 font-medium tracking-[1px]"
                      >
                        Change{" "}
                        <span className="underline  decoration-[#F7AB0A]/70 decoration-rounded">
                          Contact
                        </span>{" "}
                      </Dialog.Title>

                      {/* pic's use of tech */}

                      <div className="mt-5">
                        <input
                          type="text"
                          placeholder="Enter contact number..."
                          className="w-full text-center focus:ring-0 border-none tracking-[1px]"
                          name="ContactNumber"
                          onChange={changeDetails}
                        />
                      </div>
                      <div className="mt-5">
                        <input
                          type="text"
                          placeholder="Enter email address..."
                          className="w-full text-center focus:ring-0 border-none tracking-[1px]"
                          name="EmailAddress"
                          onChange={changeDetails}
                        />
                      </div>
                      <div className="mt-5">
                        <input
                          type="text"
                          placeholder="Enter current address..."
                          className="w-full text-center focus:ring-0 border-none tracking-[1px]"
                          name="Address"
                          onChange={changeDetails}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 space-y-3">
                    <button
                      disabled={!Change}
                      onClick={onSave}
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

export default AddContact;
