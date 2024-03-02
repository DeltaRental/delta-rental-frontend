import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchCars } from "../../store/slices/carListSlice";
import { fetchBranches } from "../../store/slices/branchSlice";
import { GetAllBranchResponse } from "../../models/branches/response/getAllBranchResponse";
import "./Branch.css";

type Props = {};
const Branch = (props: Props) => {
  const branchesState = useSelector((state: any) => state.branch);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  console.log(branchesState);

  return (
    <>
      <div
        className="container mx-auto my-10"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        data-aos-delay="800"
      >
        <h1 className="text-left text-4xl text-black font-bold">ŞUBELER</h1>
      </div>
      <div className="container mx-auto w-full flex h-screen space-x-4 ">
        {branchesState.branches.map((branch: GetAllBranchResponse) => (
          <div
            key={branch.id}
            className="relative grid h-[27rem] w-full max-w-[38rem]  overflow-hidden rounded-3xl bg-white bg-clip-border text-center text-gray-700 hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] "
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
            data-aos-delay="800"
          >
            <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('http://res.cloudinary.com/dxav6uhnu/image/upload/v1709396732/fu8q3ucx4vjg3yrze5ir.jpg')] bg-cover bg-top bg-no-repeat bg-clip-border text-gray-700 shadow-none z-0">
              <div className="absolute flex justify-end  inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-delta-green-1000/80 via-black/50"></div>
            </div>
            <div className="flex flex-col justify-between">
              <div
                className="flex justify-start p-3 font-bold text-2xl z-40 text-white"
                data-aos="fade-right"
                data-aos-easing="linear"
                data-aos-duration="1000"
                data-aos-delay="1000"
              >
                {branch.city} {branch.name}
              </div>
              <div
                className="z-40 py-4 flex justify-center items-center text-white"
                data-aos="fade-right"
                data-aos-easing="linear"
                data-aos-duration="1000"
                data-aos-delay="1000"
              >
                <div>
                  <p className="">{branch.gsm}</p>
                  <p className="">{branch.email}</p>
                  <p className="">Hafta içi: 08.00 - 19.00</p>
                  <p className="">Hafta sonu: 10.00 - 18.00</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Branch;
