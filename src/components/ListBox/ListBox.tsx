import { useState, Fragment, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchBranches, setBranches } from "../../store/slices/branchSlice";
import { fetchCars } from "../../store/slices/carListSlice";

type Props = {
  //branches:BranchModel[],
};

const ListBox = (props: Props) => {
  
  const [selected, setSelected] = useState();
  const [query, setQuery] = useState("");
  
  const branchesState = useSelector((state: any) => state.branch);
  const dispatch = useDispatch<AppDispatch>();  
  
  useEffect(() => {
    dispatch(fetchBranches());
  }, []);

  useEffect(() => {
    dispatch(setBranches(selected));
  }, [selected]);
  console.log(branchesState);
  
  const filteredBranch =
    query === ""
      ? branchesState.branches
      : branchesState.branches.filter((branch: any) =>
          branch.city
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full ">
      {branchesState.branches.length === 0 ? (
        // veriler gelene kadar yükleme animasyonu göster
        <div>Loading..</div>
      ) : (
        // veriler geldiğinde combobox elementini göster
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative">
            <div className="relative w-full pe-[12.5px] py-[9px] box-content cursor-default overflow-hidden rounded-[4px] bg-white hover:border-black border text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-lg">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(branch: any) =>
                  `${branch.city} - ${branch.name}`
                }
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Şube seçiniz"
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {filteredBranch.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredBranch.map((branch: any) => (
                    <Combobox.Option
                      key={branch.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-delta-yellow text-black" : "text-gray-900"
                        }`
                      }
                      value={branch}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {`${branch.city} - ${branch.name}`}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      )}
    </div>
  );
};

export default ListBox;
