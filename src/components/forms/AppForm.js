import React from "react";
import { Formik } from "formik";

export default function AppForm(props) {
  const { initialValues, onSubmit, validationSchema, children } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => <>{children}</>}
    </Formik>
  );
}
