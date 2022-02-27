/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";

import HeroImage from "assets/images/hero_img.png";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { Text } from "@chakra-ui/react";

export const Hero = () => {
  return (
    <SectionWrapper>
      <HeroWrapper>
        <Img src={HeroImage.src} alt="hero" width="100%" />
        <TextContainer>
          <TextComp margin="0 0 1rem 0" fontWeight={700} fontSize="2rem">
            Own your community!
          </TextComp>
          <TextComp margin="0 0 1rem 0" fontSize="1.5rem">
            <strong>A web3 decentralised layer</strong>, where users and content
            creators can <strong>own their own social networking site.</strong>
          </TextComp>
          <TextComp margin="0 0 1rem 0" fontSize="1.5rem">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </TextComp>
          <TextComp fontSize="1.5rem">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </TextComp>
        </TextContainer>
      </HeroWrapper>
    </SectionWrapper>
  );
};

const TextComp = styled(Text)`
  max-width: 40rem;
`;

const Img = styled.img`
  max-width: 55rem;
`;

const HeroWrapper = styled.div`
  padding: 9rem 1rem;
  justify-content: center;
  display: flex;
  gap: 3rem;
`;

const TextContainer = styled.div`
  width: 45rem;
`;
