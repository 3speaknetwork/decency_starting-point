import React from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProgressBar } from "components/items/ProgressBar";
import { ColorScheme } from "../customize/colorScheme";
import { useRecoilState } from "recoil";
import { stepState } from "state/slices";
import { CommunityConfirmation } from "../communityConfirmation";
import CommunityCount from "../customize/count";
import AuthorDetails from "../customize/authorDetails";

enum Steps {
  Details = "Author details",
  Color = "Color scheme",
  Conrifmation = "Confirmation",
  Count = "Count",
}

export const Author = () => {
  const [step, setStep] = useRecoilState(stepState);
  const steps = [Steps.Details, Steps.Color, Steps.Conrifmation, Steps.Count];
  const router = useRouter();

  const handleBack = () => {
    if (step === 0) {
      router.push("/setup");
    } else {
      setStep(step - 1);
    }
  };

  return (
    <>
      <ProgressBar onBack={handleBack} currentIndex={step} steps={steps} />
      <Box>
        {steps[step] === Steps.Details && (
          <AuthorDetails onNext={() => setStep(step + 1)} />
        )}
        {steps[step] === Steps.Color && (
          <ColorScheme onNext={() => setStep(step + 1)} />
        )}
        {steps[step] === Steps.Conrifmation && (
          <CommunityConfirmation onNext={() => setStep(step + 1)} />
        )}
        {steps[step] === Steps.Count && (
          <CommunityCount onNext={() => router.push("/summary")} />
        )}
      </Box>
    </>
  );
};
