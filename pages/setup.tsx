import React, { useState } from "react";
import { ProgressBar } from "../components/items/ProgressBar";
import { SectionWrapper } from "../components/wrappers/sectionWrapper";

const steps = ["Logo", "Color theme", "Community info"];

const Setup = () => {
  const [step, setStep] = useState(0);

  return (
    <SectionWrapper>
      <ProgressBar currentIndex={step} steps={steps} />
    </SectionWrapper>
  );
};

export default Setup;
