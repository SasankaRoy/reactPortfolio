import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const Loading = ({ isLoading, setIsLoading }) => {
  return (
    <>
      <Transition.Root show={isLoading} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-50 opacity-100 w-screen  inset-0 overflow-y-auto"
          onClose={() => {
            setIsLoading(false);
          }}
        >
          <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen w-screen  text-center sm:block sm:p-0">
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
                className="inline-block  bg-transparent rounded-lg 
                text-left overflow-hidden  transform transition-all sm:my-8
                sm:align-middle sm:max-w-6xl sm:w-full w-full "
              >
                <div>
                  <div>
                    <div className=" flex flex-col items-center justify-center space-y-2 w-full h-screen cursor-not-allowed loading__mainDiv">
                      <div className="flex justify-evenly items-center w-[15%] md:w-[7%] loading__ballsDiv">
                        <div className="h-2 w-2 bg-white rounded-full ball1 ball" />
                        <div className="h-2 w-2 bg-[#F7AB0A] rounded-full ball2 ball" />
                        <div className="h-2 w-2 bg-white rounded-full ball3 ball" />
                      </div>
                      <h1 className="tracking-widest font-[Poppins] text-lg text-[#F7AB0A]">
                        Loading...
                      </h1>
                    </div>
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
