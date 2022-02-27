import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { ProgressBar } from "components/items/ProgressBar";
import { LogoCustomize } from "components/sections/customize/logoCustomize";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { colorState, infoState, logoState, stepState } from "state/user/slice";
import { ColorScheme } from "components/sections/customize/colorScheme";
import { CommunityCustomize } from "components/sections/customize/communityCustomize";

enum Steps {
  Logo = "Logo",
  Color = "Color scheme",
  Community = "Community info",
}

const steps = [Steps.Logo, Steps.Color, Steps.Community];
const Setup = () => {
  const [_logo, setLogo] = useRecoilState(logoState);
  const [_colors, setColors] = useRecoilState(colorState);
  const [_info, setInfo] = useRecoilState(infoState);
  const [step, setStep] = useRecoilState(stepState);
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("logo") &&
      setLogo(JSON.parse(localStorage.getItem("logo") as string));
    localStorage.getItem("colors") &&
      setColors(JSON.parse(localStorage.getItem("colors") as string));
    localStorage.getItem("communityInfo") &&
      setInfo(JSON.parse(localStorage.getItem("communityInfo") as string));
  }, []);

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
        <CommunityCustomize onNext={() => router.push("/summary")} />
      )}
    </SectionWrapper>
  );
};

export default Setup;
