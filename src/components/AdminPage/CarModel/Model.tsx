import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { deleteModel, modelList } from "../../../store/slices/modelslice";
import AddModel from "./AddModel";
import UpdateModel from "./UpdateModel";
import { brandList } from "../../../store/slices/brandSlice";
import { GetAllModelResponse } from "../../../models/carModels/response/getAllModelResponse";
import Brand from "../Brand/Brand";
type Props = {};

const Model = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any) => state.brand);
  const modelState = useSelector((state: any) => state.model);

  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  useEffect(() => {
    dispatch(modelList());
  }, []);

  const handleModelSelectchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = parseInt(e.target.value, 10);
    setSelectedModel(modelId);
  };

  const handDeleteModel = async () => {
    if (selectedModel !== null) {
      await dispatch(deleteModel({ id: selectedModel }));
      setSelectedModel(null);
      dispatch(modelList());
    }
  };
  return (
    <div>
      <h2>Markalar</h2>

      <h2>Modeller</h2>
      <div>
        <label>Model Seçiniz</label>
        <select value={selectedModel || ""} onChange={handleModelSelectchange}>
          <option value="" disabled>
            Model seç
          </option>
          {modelState.models.map((model: GetAllModelResponse) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handDeleteModel} disabled={selectedModel === null}>
        Sil
      </button>
    </div>
  );
};

export default Model;
