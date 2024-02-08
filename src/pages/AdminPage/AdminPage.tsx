import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { object, string } from "yup";
import AdminFormikInput from "../../components/AdminPage/AdminFormikInput/AdminFormikInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";

type Props = {};

const AdminPage = (props: Props) => {
  const initialValues = {
    brand: "",
    model: "",
    color: "",
    image: "",
  };

  const validationSchema = object({
    brand: string().required("Marka alanı zorunludur").min(3),
    model: string().required("Model alanı zorunludur").min(2),
    color: string().required("Renk alanı zorunludur").min(2),
    image: string().required("Görsel alanı zorunludur")
  })

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <AdminFormikInput label="Marka Adı" name="brand" type="text" className="text-yellow-400"/>
          <AdminFormikInput label="Model Adı" name="model" type="text" className="text-yellow-400"/>
          <AdminFormikInput label="Renk" name="color" type="text" className="text-yellow-400"/>
          <AdminFormikInput label="Görsel" name="image" type="text" className="text-yellow-400"/>
          <Field as= "select">
            <option value="">Opsiyon 1</option>
            <option value="">Opsiyon 2</option>
            <option value="">Opsiyon 3</option>
          </Field>
          <button type="submit" >Kaydet</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AdminPage;
