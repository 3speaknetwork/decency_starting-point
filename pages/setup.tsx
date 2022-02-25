import React from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { ProgressBar } from "../components/items/ProgressBar";
import { LogoCustomize } from "../components/sections/logoCustomize";
import { SectionWrapper } from "../components/wrappers/sectionWrapper";
import { stepSlice } from "../state/user/slice";

const steps = ["Logo", "Color theme", "Community info"];

const Setup = () => {
  const [step, setStep] = useRecoilState(stepSlice);
  const router = useRouter();

  const handleBack = () => {
    step === 0 ? router.push("/") : setStep(step - 1);
  };

  return (
    <SectionWrapper>
      <ProgressBar onBack={handleBack} currentIndex={step} steps={steps} />
      {steps[step] === "Logo" && (
        <LogoCustomize onNext={() => setStep(step + 1)} />
      )}
    </SectionWrapper>
  );
};

export default Setup;
