import React from "react";
import styled from "styled-components";
import { SectionWrapper } from "../wrappers/sectionWrapper";
import { TextBase } from "./textBase";

interface Props {
  steps: string[];
  currentIndex: number;
}

export const ProgressBar: React.FC<Props> = ({ steps, currentIndex }) => {
  return (
    <SectionWrapper>
      <StepsContainer>
        {steps.map((step, i) => (
          <Step
            key={`${step}_setup_progress`}
            currentIndex={currentIndex}
            stepIndex={i}
          >
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
`;

const Line = styled.div`
  position: absolute;
  z-index: -1;
  top: 0.6rem;
  min-width: 100%;
  border-top: 4px solid black;
  padding: 0.1rem;
`;

const Step = styled.div<{ currentIndex: number; stepIndex: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  background-color: white;
  height: 1.5rem;
  border-radius: 50%;
  border 3px solid black;
  ${({ currentIndex, stepIndex }) =>
    stepIndex < currentIndex &&
    `
    background-color: black;
    color: white;
    &::after {
      content: '✓';
    }`}
  ${({ currentIndex, stepIndex }) =>
    stepIndex === currentIndex && `background-color: black;`}

`;

const StepsContainer = styled.div`
  position: relative;
  margin: 7rem auto 0;
  display: flex;
  align-items: center;
  gap: 10rem;
`;
