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
  const[selectedValue, setSelectedValue] = useState({});

  const initialValues = {
    name: ''
  }
  const validationSchema = object({
    name: string().required("Marka alanı zorunludur").min(3)
  })

  const handleAddBrand = (values: any)=>{
    dispatch(addBrand(values));
    
  }
  return (
    <div className="shadow-2xl shadow-gray-600 rounded-lg mt-3 bg-delta-green-600">  
      <Formik initialValues={initialValues}
        onSubmit={(values, {resetForm}) => {
          handleAddBrand(values);
          setSelectedValue(values);
          resetForm();
        }}
        validationSchema={validationSchema}
        >  
        <Form className="w-full grid grid-cols-1 gap-4">  
          <FormikInput 
          name="name" 
          label="Marka" 
          type="text" 
          placeholder="Marka ekle"/>
          <button 
          type="submit" 
          className="bg-delta-green-1000 text-delta-green-400 w-[10rem] h-[2.75rem] rounded-lg font-bold mt-8 ml-6">
            Marka Ekle
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddBrand;
