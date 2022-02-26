import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

import HeroImage from "assets/images/hero_img.png";
import { TextBase } from "components/items/textBase";
import { SectionWrapper } from "components/wrappers/sectionWrapper";

export const Hero = () => {
  return (
    <SectionWrapper>
      <HeroWrapper>
        <Image src={HeroImage} alt="hero" width={800} height={500} />
        <TextContainer>
          <Text margin="0 0 1rem 0" fontWeight={700} fontSize="2rem">
            Own your community!
          </Text>
          <Text margin="0 0 1rem 0" fontSize="1.5rem">
            <strong>A web3 decentralised layer</strong>, where users and content
            creators can <strong>own their own social networking site.</strong>
          </Text>
          <Text margin="0 0 1rem 0" fontSize="1.5rem">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <Text fontSize="1.5rem">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Text>
        </TextContainer>
      </HeroWrapper>
    </SectionWrapper>
  );
};

const Text = styled(TextBase)`
  max-width: 40rem;
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
