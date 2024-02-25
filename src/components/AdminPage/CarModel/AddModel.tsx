import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { number, object, string } from "yup";
import { Field, Form, Formik } from "formik";
import { addModel } from "../../../store/slices/modelSlice";
import { brandList } from "../../../store/slices/brandSlice";
import FormikInput from "../../FormikInput/FormikInput";

type Props = {};

const AddModel = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedValue, setSelectedValue] = useState({});
  const brandState = useSelector((state: any) => state.brand);


  useEffect(() => {
    dispatch(brandList());
  }, [dispatch]);

  const handleAddModel = (values: any) => {
    dispatch(addModel(values));
  };


  const initialValues = {
    name: "",
    brandId: 0
  };

  const validationSchema = object({
    name: string().required("Model alanı zorunludur").min(2),
    brandId: number().required("Marka seçmek zorunlu").min(0)
  });

  return (
    <div className="shadow-2xl shadow-gray-600 rounded-lg mt-3">
      
      <Formik
        initialValues={initialValues}
        onSubmit={(values, {resetForm})=>{
            handleAddModel(values);
          setSelectedValue(values);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        <Form className="w-full grid grid-cols-1 gap-3">
        <div>
          <label className="font-bold flex">Marka</label>
          <Field name="brandId" as="select" className="mt-1 mb-1 text-gray-700 border border-gray-300 rounded-lg w-full">
            <option value="" disabled>
              Marka Seç{" "}
            </option>
            {brandState.brands.map((brand: any) => (
              <option key={brand.id} value={brand.id}>
                {`${brand.name}`}
              </option>
            ))}
          </Field>
          </div>
          <FormikInput
            name="name"
            label="Model"
            type="text"
            placeholder="Model ekle"
          />
          <button
            type="submit"
            className="bg-sidebar text-white w-[10rem] h-[2.75rem] rounded-lg font-bold mt-8 ml-6"
          >
            Model Ekle
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddModel;
