import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const FormStep1 = ({ formData, setFormData, nextStep }) => {
  const formik = useFormik({
    initialValues: {
      emailId: formData.emailId || "",
      password: formData.password || "",
    },
    validationSchema: Yup.object({
      emailId: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .matches(/.*[A-Z].*[A-Z].*/, "Must contain at least 2 uppercase letters")
        .matches(/.*[a-z].*[a-z].*/, "Must contain at least 2 lowercase letters")
        .matches(/.*\d.*\d.*/, "Must contain at least 2 digits")
        .matches(
          /.*[!@#$%^&*()_+{}:"<>?].*[!@#$%^&*()_+{}:"<>?].*/,
          "Must contain at least 2 special characters",
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      setFormData({ ...formData, ...values });
      nextStep();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Email ID</label>
        <input
          type="email"
          name="emailId"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.emailId}
          className="focus:shadow-outline ms-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {formik.touched.emailId && formik.errors.emailId ? (
          <div className="text-xs italic text-red-500">{formik.errors.emailId}</div>
        ) : null}
      </div>
      <div className="mt-4">
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="focus:shadow-outline ms-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-xs italic text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="mt-4">
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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

FormStep1.propTypes = {
  setFormData: PropTypes.any.isRequired,
  nextStep: PropTypes.any.isRequired,
  formData: PropTypes.any.isRequired,
};

export default FormStep1;
