import React from "react";
import { STEPS } from "constants/how-to";
import { HowToCard } from "components/items/howToCard";
import { TextBase } from "components/items/textBase";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import styled from "@emotion/styled";

export const HowTo = () => {
  return (
    <SectionWrapper>
      <TextBase
        id="how-to"
        margin="10rem auto 0"
        fontSize="2rem"
        fontWeight={700}
      >
        How does it work
      </TextBase>
      <StepsContainer>
        {STEPS.map((step, i) => (
          <HowToCard key={`${step.title}_${i}`} {...step} index={i + 1} />
        ))}
      </StepsContainer>
    </SectionWrapper>
  );
};

const StepsContainer = styled.div`
  margin: 1.5rem 0 3rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
`;
