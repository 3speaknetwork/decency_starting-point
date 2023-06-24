import React from "react";
import { Text } from "@chakra-ui/react";
import { STEPS } from "constants/constants";
import { HowToCard } from "components/items/howToCard";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import styled from "styled-components";

export const HowTo = () => {
  return (
    <Wrap>
      <SectionWrapper>
        <Text
          id="how-to"
          margin="10rem auto 0"
          fontSize="2rem"
          fontWeight={700}
        >
          How does it work
        </Text>
        <StepsContainer>
          {STEPS.map((step, i) => (
            <HowToCard key={`${step.title}_${i}`} {...step} index={i + 1} />
          ))}
        </StepsContainer>
      </SectionWrapper>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 1000px;
  margin: auto;
`;

const StepsContainer = styled.div`
  margin: 1.5rem 0 10rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;
