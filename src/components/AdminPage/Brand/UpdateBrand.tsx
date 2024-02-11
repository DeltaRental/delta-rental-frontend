import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { object, string } from "yup";
import { brandList, updateBrand } from "../../../store/slices/brandSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";

type Props = {};

const UpdateBrand = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const brandState = useSelector((state: any) => state.brand);

  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);

  useEffect(() => {
    dispatch(brandList());
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(typeof e.target.value);

    setSelectedBrand(parseInt(e.target.value, 10));
  };

  const handleUpdateBrand = (values: { brandName: string }) => {
    if (values.brandName.trim() !== "" && selectedBrand !== null) {
      dispatch(updateBrand({ id: selectedBrand, name: values.brandName }));
      values.brandName = "";
      dispatch(brandList());
    }
  };

  const initialValues = {
    brandName: "",
  };
  const validationSchema = object({
    brandName: string().required("Marka alanı zorunludur").min(3),
  });
  return (
    <div>
      <h2>Marka</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleUpdateBrand(values);
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <h2>Brand List</h2>
          <select value={selectedBrand || ""} onChange={handleSelectChange}>
            <option value="" disabled>
              Select a brand
            </option>
            {brandState.brands.map((brand: any) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          {selectedBrand !== null && (
            <div>
              <Field type="text" name="brandName" />
              <ErrorMessage name="brandName">
                {(message) => (
                  <span className="text-yellow-400">{message} </span>
                )}
              </ErrorMessage>
              <button type="submit">Marka Güncelle</button>
              <button onClick={() => setSelectedBrand(null)}>Cancel</button>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateBrand;
