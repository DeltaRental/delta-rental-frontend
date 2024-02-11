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
    <div>  
      <Formik initialValues={initialValues}
        onSubmit={(values) => {
          if (values.brand.trim() !== "") {
            dispatch(addBrand({ name: values.brand }));
            values.brand = "";
          }
        }}
        validationSchema={validationSchema}
        >  
        <Form>  
          <h2>Marka</h2>  
          <FormikInput name="brand" label="marka" type="text" placeholder="marka ekle"/>
          <button type="submit">
            Marka Ekle
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddBrand;
