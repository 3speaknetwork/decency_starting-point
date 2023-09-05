/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";

import HeroImage from "assets/images/hero_img.png";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { Box, Button, Text } from "@chakra-ui/react";
import { PrimaryButton } from "components/items/primaryButton";
import Link from "next/link";

export const Hero = () => {
  return (
    <SectionWrapper>
      <HeroWrapper>
        <Box maxWidth="38rem" width="100%">
          <Img src={HeroImage.src} alt="hero" width="100%" />
        </Box>
        <TextContainer>
          <Text
            maxW="40rem"
            margin="0 0 1rem 0"
            fontWeight={700}
            fontSize="2rem"
          >
            Create a &quot;Break Away Community&quot;!
          </Text>
          <Text maxW="40rem" margin="0 0 1rem 0" fontSize="1.5rem">
            <b>A tokenised content community</b> connected to a Web3
            decentralised back end infrastructure on the <b>SPK Network</b> that
            gives full self reliance to the community.
          </Text>
          <Text maxW="40rem" margin="0 0 1rem 0" fontSize="1.5rem">
            Here, you can easily and quickly create your own fully functioning
            content platform for your community.
          </Text>
        </TextContainer>
      </HeroWrapper>
      <Link passHref={true} href="/setup/community">
        <PrimaryButton>Setup community</PrimaryButton>
      </Link>
    </SectionWrapper>
  );
};

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
  max-width: 50rem;
`;
