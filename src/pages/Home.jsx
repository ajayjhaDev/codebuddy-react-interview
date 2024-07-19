import { useState } from "react";
import FormStep1 from "../components/FormStep1";
import FormStep2 from "../components/FormStep2";
import FormStep3 from "../components/FormStep3";
import Navigation from "./Navigation";

const FormContainer = () => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <div>
      <Navigation currentStep={currentStep} goToStep={goToStep} />
      <div className="mt-5 flex items-center justify-center">
        {currentStep === 1 && (
          <FormStep1 formData={formData} setFormData={setFormData} nextStep={nextStep} />
        )}
        {currentStep === 2 && (
          <FormStep2
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 3 && (
          <FormStep3 formData={formData} setFormData={setFormData} prevStep={prevStep} />
        )}
      </div>
    </div>
  );
};

export default FormContainer;
