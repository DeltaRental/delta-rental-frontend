import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { addBrand } from "../../../store/slices/brandSlice";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { object, string } from "yup";
import FormikInput from "../../FormikInput/FormikInput";

type Props = {};

const AddBrand = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    brand: ''
  }
  const validationSchema = object({
    brand: string().required("Marka alanı zorunludur").min(3)
  })
  return (
    <div className="bg-gray-800 border border-gray-800 rounded-lg top-0 h-[10rem] shadow-md shadow-blue-600 hover:shadow-lg hover:shadow-yellow-400">  
      <Formik initialValues={initialValues}
        onSubmit={(values) => {
          if (values.brand.trim() !== "") {
            dispatch(addBrand({ name: values.brand }));
            values.brand = "";
          }
        }}
        validationSchema={validationSchema}
        >  
        <Form className="p-3">  
          <FormikInput name="brand" label="Marka" type="text" placeholder="Marka ekle"/>
          <button type="submit" className="shadow-inner shadow-md shadow-gray-600 font-bold text-gray-800 bg-gray-300 text-sm border border-gray-400 rounded-xl w-[8rem] h-full">
            Marka Ekle
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddBrand;
