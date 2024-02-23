import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { deleteModel, modelList } from "../../../store/slices/modelSlice";

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

  const handleBrandSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = parseInt(e.target.value, 10);
    setSelectedBrand(brandId);
  };

  const filteredModels = selectedBrand
    ? modelState.models.filter((model: any) => model.brandId === selectedBrand)
    : modelState.models;

  const handDeleteModel = async () => {
    if (selectedModel !== null) {
      await dispatch(deleteModel({ id: selectedModel }));
      setSelectedModel(null);
      dispatch(modelList());
    }
  };

  return (
    <div>
      <div>
        <label>Marka Seçiniz</label>
        <select value={selectedBrand || ""} onChange={handleBrandSelectChange}>
          <option value="" disabled>
            Marka seç
          </option>
          {brandState.brands.map((brand: any) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Model Seçiniz</label>
        <select value={selectedModel || ""} onChange={handleModelSelectchange}>
          <option value="" disabled>
            Model seç
          </option>
          {filteredModels.map((model: any) => (
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
