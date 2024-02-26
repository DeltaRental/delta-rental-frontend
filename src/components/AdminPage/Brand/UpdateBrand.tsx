import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { object, string } from "yup";
import { brandList, updateBrand } from "../../../store/slices/brandSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FormikInput from "../../FormikInput/FormikInput";

type Props = {
  onCloseModal: () => void;
  selectedBrand: number ;
};

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

  const handleUpdateBrand = async (values: { brandName: string }) => {
    if (props.selectedBrand !== null) {
      dispatch(updateBrand({ id: props.selectedBrand, name: values.brandName }));
    }props.onCloseModal();
  };

  const initialValues = {
    brandName: "",
  };
  const validationSchema = object({
    brandName: string().required("Marka alanı zorunludur").min(3),
  });
  return (
    <div >
      <h2 className="text-gray-400">Marka</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, {resetForm}) => {
          handleUpdateBrand(values);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <h2 className="text-white font-bold">Brand List</h2>
          <select value={selectedBrand || ""} onChange={handleSelectChange} className="rounded-lg text-black">
            <option value="" disabled>
              Select a brand
            </option>
            {brandState.brands.map((brand: any) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          {props.selectedBrand !== null && (
            <div>
             <FormikInput label="Marka" type="text" name="name" placeholder="Marka ekle"/>
              <button className="font-bold text-gray-800 bg-gray-300 text-sm border border-gray-400 rounded-md mr-2 w-[8rem] h-full" type="submit">Güncelle</button>
              <button className="font-bold text-gray-800 bg-gray-300 text-sm border border-gray-400 rounded-md w-[8rem] h-full" onClick={() => setSelectedBrand(null)}>Cancel</button>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateBrand;
