import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { deleteModel, modelList } from "../../../store/slices/modelSlice";
import { GetAllModelResponse } from "../../../models/carModels/response/getAllModelResponse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Modal/Modal";
import UpdateModel from "./UpdateModel";

type Props = {};

const Model = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const modelState = useSelector((state: any) => state.model);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(modelList());
  }, [dispatch]);

  const handleUpdateModel = (modelId: number)=>{
    setSelectedModel(modelId)
    setModalOpen(true)
  }

  const handleDeleteModel = async (modelId: number) => {
    try {
      await dispatch(deleteModel({ id: modelId }));
      dispatch(modelList());
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="shadow-xl shadow-delta-green-600 mt-6 ">
      <table className="w-full text-sm text-center dark:text-gray-400">
        <thead className=" text-sm uppercase bg-delta-green-1000 text-delta-green-400">
          <tr>
            <th scope="col" className="px-2 py-1">Marka</th>
            <th scope="col" className="px-2 py-1">Model</th>
            <th scope="col" className="px-2 py-1">Düzenle</th>
            <th scope="col" className="px-2 py-1">Sil</th>
          </tr>
        </thead>
        <tbody>
          {console.log(modelState.models)}
          {modelState.models.map((model: GetAllModelResponse)=>(
          <tr key={model.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-2 py-1">
                {model.brandName}</td>
              <td className="px-2 py-1">{model.name}</td>
              <td className="px-2">
              <button className="px-2 rounded-md bg-delta-green-1000 text-delta-green-400" 
              onClick={() => handleUpdateModel(model.id)}>
              <FontAwesomeIcon icon={faPen} />
              </button>
              
            </td>
            <td className="px-2">
              <button className="px-2 rounded-md bg-red-700 text-delta-green-400" 
              onClick={() => handleDeleteModel(model.id)}>
              <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
            ))}
        </tbody>
      </table>
      {modalOpen && selectedModel !== null && (
        <Modal onCloseModal={()=> {setModalOpen(false)}}>
          <UpdateModel selectedModel={selectedModel} closeModal={()=> {setModalOpen(false)}}/>
        </Modal>
      )}
    </div>
  );
};

export default Model;
