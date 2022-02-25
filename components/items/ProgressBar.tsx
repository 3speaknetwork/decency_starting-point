import React from "react";
import styled from "styled-components";
import { HiChevronLeft, HiCheck } from "react-icons/hi";
import { SectionWrapper } from "../wrappers/sectionWrapper";
import { TextBase } from "./textBase";

interface Props {
  steps: string[];
  currentIndex: number;
  onBack: () => void;
}

export const ProgressBar: React.FC<Props> = ({
  steps,
  currentIndex,
  onBack,
}) => {
  return (
    <SectionWrapper>
      <BackButton onClick={onBack}>
        <HiChevronLeft />
        <TextBase>Back</TextBase>
      </BackButton>
      <StepsContainer currentIndex={currentIndex}>
        {steps.map((step, i) => (
          <Step
            key={`${step}_setup_progress`}
            currentIndex={currentIndex}
            stepIndex={i}
          >
            {i < currentIndex && (
              <Check>
                <HiCheck color="#fff" width={10} />
              </Check>
            )}
            <StepTitle>{step}</StepTitle>
          </Step>
        ))}
        <Line />
      </StepsContainer>
    </SectionWrapper>
  );
};

const StepTitle = styled.div`
  margin-top: 3.2rem;
  white-space: nowrap;
  text-align: center;
  color: black;
`;

const Line = styled.div`
  position: absolute;
  z-index: -1;
  top: 0.6rem;
  min-width: 100%;
  border-top: 4px solid black;
  padding: 0.1rem;
`;

const Check = styled.div`
  position: absolute;
  width: 1rem;
  height: 1rem;
`;

const Step = styled.div<{ currentIndex: number; stepIndex: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 1.5rem;
  background-color: white;
  height: 1.5rem;
  border-radius: 50%;
  border 3px solid black;
  ${({ currentIndex, stepIndex }) =>
    stepIndex <= currentIndex && `background-color: black;`}
`;

const StepsContainer = styled.div<{ currentIndex: number }>`
  margin: 1rem 0 7rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10rem;
`;

const BackButton = styled.div`
  margin: 7rem 0 0;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
`;