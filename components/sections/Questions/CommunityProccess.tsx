import React from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProgressBar } from "components/items/ProgressBar";
import { CommunityCustomize } from "../customize/communityCustomize";
import { CommunityCreate } from "../customize/communityCreate";
import { useRecoilState } from "recoil";
import { stepState } from "state/slices";
import { CommunityConfirmation } from "../communityConfirmation";
import ServerInfo from "../customize/serverInfo";

enum Steps {
  Community = "Community info",
  Conrifmation = "Confirmation",
  ServerInfo = "Server info",
}

interface Props {
  create: boolean;
  onExit: () => void;
}

export const Proccess: React.FC<Props> = ({ create, onExit }) => {
  const [step, setStep] = useRecoilState(stepState);
  const steps = create
    ? [Steps.Community, Steps.Conrifmation, Steps.ServerInfo]
    : [Steps.Community, Steps.ServerInfo];
  const router = useRouter();

  const handleBack = () => {
    if (step === 0) {
      setStep(0);
      onExit();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <>
      <ProgressBar onBack={handleBack} currentIndex={step} steps={steps} />
      <Box>
        {steps[step] === Steps.Community && !create && (
          <CommunityCustomize onNext={() => setStep(step + 1)} />
        )}
        {steps[step] === Steps.Community && create && (
          <CommunityCreate onNext={() => setStep(step + 1)} />
        )}
        {steps[step] === Steps.Conrifmation && (
          <CommunityConfirmation onNext={() => setStep(step + 1)} />
        )}
        {steps[step] === Steps.ServerInfo && (
          <ServerInfo onNext={() => router.push("/summary")} />
        )}
      </Box>
    </>
  );
};
