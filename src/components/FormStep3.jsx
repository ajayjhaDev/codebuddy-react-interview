import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const FormStep3 = ({ formData, prevStep }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      countryCode: formData.countryCode || "",
      phoneNumber: formData.phoneNumber || "",
      acceptTermsAndCondition: formData.acceptTermsAndCondition || false,
    },
    validationSchema: Yup.object({
      countryCode: Yup.string().oneOf(["+91", "+1"]).required("Required"),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Must be a 10 digit phone number")
        .required("Required"),
      acceptTermsAndCondition: Yup.boolean()
        .oneOf([true], "Must accept terms and conditions")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const { ...submitData } = { ...formData, ...values };

      try {
        const response = await fetch("https://codebuddy.review/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.message === "Success") {
          navigate("/posts");
        }
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Country Code</label>
        <select
          name="countryCode"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.countryCode}
          className="focus:shadow-outline ms-4 w-full  rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        >
          <option value="">Select Country Code</option>
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
        {formik.touched.countryCode && formik.errors.countryCode ? (
          <div className="text-xs italic text-red-500">{formik.errors.countryCode}</div>
        ) : null}
      </div>
      <div className="mt-4">
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          className="focus:shadow-outline ms-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div className="text-xs italic text-red-500">{formik.errors.phoneNumber}</div>
        ) : null}
      </div>
      <div className="mt-4">
        <label>
          <input
            type="checkbox"
            name="acceptTermsAndCondition"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.acceptTermsAndCondition}
          />
          <span className="ms-4">Accept Terms and Conditions</span>
        </label>
        {formik.touched.acceptTermsAndCondition && formik.errors.acceptTermsAndCondition ? (
          <div className="text-xs italic text-red-500">{formik.errors.acceptTermsAndCondition}</div>
        ) : null}
      </div>
      <div className="mt-4">
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
          Save
        </button>
      </div>
    </form>
  );
};

FormStep3.propTypes = {
  formData: PropTypes.any.isRequired,
  prevStep: PropTypes.any.isRequired,
};

export default FormStep3;
