import React from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { ProgressBar } from "components/items/ProgressBar";
import { LogoCustomize } from "components/sections/customize/logoCustomize";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { stepState } from "state/user/slice";
import { ColorScheme } from "components/sections/customize/colorScheme";
import { CommunityCustomize } from "components/sections/customize/communityCustomize";

enum Steps {
  Logo = "Logo",
  Color = "Color scheme",
  Community = "Community info",
}

const steps = [Steps.Logo, Steps.Color, Steps.Community];
const Setup = () => {
  const [step, setStep] = useRecoilState(stepState);
  const router = useRouter();

  const handleBack = () => {
    step === 0 ? router.push("/") : setStep(step - 1);
  };

  return (
    <SectionWrapper>
      <ProgressBar onBack={handleBack} currentIndex={step} steps={steps} />
      {steps[step] === Steps.Logo && (
        <LogoCustomize onNext={() => setStep(step + 1)} />
      )}
      {steps[step] === Steps.Color && (
        <ColorScheme onNext={() => setStep(step + 1)} />
      )}
      {steps[step] === Steps.Community && (
        <CommunityCustomize onNext={() => setStep(step + 1)} />
      )}
    </SectionWrapper>
  );
};

export default Setup;
