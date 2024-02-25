import React from "react";

type Props = {
    onCloseModal: ()=> void,
    children: any
}
const Modal = (props: Props) => {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="mb-5 mt-8 relative w-full lg:w-[40rem] md:w-[32.5rem] h-full md:h-[45rem] md:h-[24rem] bg-white rounded-lg shadow-lg ">
        <div className="">
          <button
            className=" text-gray-400 hover:text-gray-800 focus:outline-none"
            onClick={props.onCloseModal}
          >
            <svg
              className="mt-2 w-6 h-6 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
