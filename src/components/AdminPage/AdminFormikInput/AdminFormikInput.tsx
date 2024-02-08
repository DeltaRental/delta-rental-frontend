import { ErrorMessage, Field } from "formik";
import React from "react";

type Props = {
  label: string;
  name: string;
  type?: string;
  className: string;
};

const AdminFormikInput = (props: Props) => {
  return (
    <div>
      <label>{props.label}</label>
      <Field name={props.name} type={props.type} />
      <ErrorMessage name={props.name}>
        {(message) => <span className={props.className}>{message} </span>}
      </ErrorMessage>
    </div>
  );
};

export default AdminFormikInput;
