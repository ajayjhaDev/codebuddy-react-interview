import PropTypes from "prop-types";

const Navigation = ({ currentStep, goToStep }) => {
  const activeClass = "underline font-bold";

  return (
    <div className="flex items-center justify-center bg-red-300 pb-5">
      {/* <h2 className="me-5 mt-5">Tab Navigation (Navigate to any step by click)</h2> */}
      <button
        onClick={() => goToStep(1)}
        disabled={currentStep === 1}
        className={`mt-5 ${currentStep === 1 ? activeClass : ""}`}
      >
        Step 1
      </button>
      <button
        onClick={() => goToStep(2)}
        disabled={currentStep === 2}
        className={`ms-4 mt-5 ${currentStep === 2 ? activeClass : ""}`}
      >
        Step 2
      </button>
      <button
        onClick={() => goToStep(3)}
        disabled={currentStep === 3}
        className={`ms-4 mt-5 ${currentStep === 3 ? activeClass : ""}`}
      >
        Step 3
      </button>
    </div>
  );
};

Navigation.propTypes = {
  currentStep: PropTypes.number.isRequired,
  goToStep: PropTypes.func.isRequired,
};

export default Navigation;
