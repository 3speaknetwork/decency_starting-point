import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProgressBar } from "components/items/ProgressBar";
import { ColorScheme } from "./customize/colorScheme";
import { CommunityCustomize } from "./customize/communityCustomize";
import { LogoCustomize } from "./customize/logoCustomize";
import { CommunityCreate } from "./customize/communityCreate";
import { useRecoilState } from "recoil";
import { stepState } from "state/user/slice";

enum Steps {
  Logo = "Logo",
  Color = "Color scheme",
  Community = "Community info",
  Conrifmation = "Confirmation",
}

interface Props {
  create: boolean;
  handleBack: () => void;
}

export const Proccess: React.FC<Props> = ({ create, handleBack }) => {
  const [step, setStep] = useRecoilState(stepState);
  const steps = create
    ? [Steps.Community, Steps.Conrifmation, Steps.Logo, Steps.Color]
    : [Steps.Logo, Steps.Color, Steps.Community];
  const router = useRouter();

  return (
    <>
      <ProgressBar onBack={handleBack} currentIndex={step} steps={steps} />
      {create ? (
        <Box>
          {steps[step] === Steps.Community && (
            <CommunityCreate onNext={() => router.push("/summary")} />
          )}
        </Box>
      ) : (
        <Box>
          {steps[step] === Steps.Logo && (
            <LogoCustomize onNext={() => setStep(step + 1)} />
          )}
          {steps[step] === Steps.Color && (
            <ColorScheme onNext={() => setStep(step + 1)} />
          )}
          {steps[step] === Steps.Community && (
            <CommunityCustomize onNext={() => router.push("/summary")} />
          )}
        </Box>
      )}
    </>
  );
};
