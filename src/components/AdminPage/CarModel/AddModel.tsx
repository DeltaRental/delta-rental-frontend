import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { object, string } from "yup";
import { Field, Form, Formik } from "formik";
import { addModel } from "../../../store/slices/modelSlice";
import { brandList } from "../../../store/slices/brandSlice";

type Props = {};

const AddModel = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any) => state.brand);

  const [modelName, setModelName] = useState("");
  const [selectBrand, setSelectBrand] = useState<number | null>(null);

  useEffect(() => {
    dispatch(brandList());
  }, [dispatch]);

  const handleAddModel = (values: { model: string }) => {
    if (values.model.trim() !== "" && selectBrand !== null) {
       dispatch(addModel({ brandId: selectBrand, name: values.model }));
      setModelName("");
      setSelectBrand(null);
    }
  };


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectBrand(parseInt(e.target.value, 10));
  };

  const initialValues = {
    model: "",
  };

  const validationSchema = object({
    model: string().required("Model alanı zorunludur").min(3),
  });

  return (
    <div className="top-0 h-full bg-gray-800 border border-gray-800 rounded-lg shadow-md shadow-blue-600 hover:shadow-lg hover:shadow-yellow-400">
      <h2 className="text-white font-bold ml-3 text-md">Marka Seç</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddModel}
        validationSchema={validationSchema}
      >
        <Form className="p-3">
          <select
            className="rounded-lg mb-2"
            value={selectBrand || ""}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Marka Seç
            </option>
            {brandState.brands.map((brand: any) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          <Field
            label="Model"
            type="text"
            placeholder="Model ekle"
            name="model"
            value={modelName}
            onChange={(e: any) => setModelName(e.target.value)}
          />
          <button
            type="submit"
            className="shadow-inner shadow-md shadow-gray-600 font-bold text-gray-800 bg-gray-300 text-sm border border-gray-400 rounded-md w-[8rem] h-full"
          >
            Model Ekle
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddModel;
