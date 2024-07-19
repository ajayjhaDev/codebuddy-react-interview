import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const FormStep2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const formik = useFormik({
    initialValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      address: formData.address || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Must be alphabets and spaces only")
        .min(2)
        .max(50)
        .required("Required"),
      lastName: Yup.string().matches(/^[A-Za-z\s]*$/, "Must be alphabets and spaces only"),
      address: Yup.string().min(10).required("Required"),
    }),
    onSubmit: (values) => {
      setFormData({ ...formData, ...values });
      nextStep();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          className="focus:shadow-outline ms-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-xs italic text-red-500">{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div className="mt-4">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          className="focus:shadow-outline ms-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-xs italic text-red-500">{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div className="mt-4">
        <label>Address</label>
        <input
          type="text"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          className="focus:shadow-outline ms-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="text-xs italic text-red-500">{formik.errors.address}</div>
        ) : null}
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={prevStep}
          className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Back
        </button>
        <button
          type="submit"
          className="ms-4 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Save and Next
        </button>
      </div>
    </form>
  );
};

FormStep2.propTypes = {
  setFormData: PropTypes.any.isRequired,
  nextStep: PropTypes.any.isRequired,
  formData: PropTypes.any.isRequired,
  prevStep: PropTypes.any.isRequired,
};

export default FormStep2;
