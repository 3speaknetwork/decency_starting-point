/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { useRecoilState } from "recoil";
import { colorState, infoState, logoState, stepState } from "state/user/slice";
import { placeholder } from "constants/constants";
import styled from "styled-components";

const Summary = () => {
  const [logo, setLogo] = useRecoilState(logoState);
  const [colors, setColors] = useRecoilState(colorState);
  const [communityInfo, setInfo] = useRecoilState(infoState);

  useEffect(() => {
    localStorage.getItem("logo") &&
      setLogo(JSON.parse(localStorage.getItem("logo") as string));
    localStorage.getItem("colors") &&
      setColors(JSON.parse(localStorage.getItem("colors") as string));
    localStorage.getItem("communityInfo") &&
      setInfo(JSON.parse(localStorage.getItem("communityInfo") as string));
  }, []);

  return (
    <SectionWrapper>
      <SummaryIntro>
        <Community>
          {logo[0] ? (
            <Img src={logo[0]} alt="logo" width="100%" />
          ) : (
            <Img src={placeholder} alt="placeholder" width="100%" />
          )}
          <Text fontSize="1.3rem">
            {communityInfo.title ?? "Example title"}
          </Text>
        </Community>
        <Text maxWidth="25rem" fontSize="1.5rem" fontWeight={500}>
          Welcome to your new video broadcasting website!
        </Text>
      </SummaryIntro>
    </SectionWrapper>
  );
};

const Community = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SummaryIntro = styled.div`
  display: flex;
  margin-top: 3rem;
  width: 100%;
  max-width: 70rem;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const Img = styled.img`
  width: 13rem;
  margin-bottom: 0.5rem;
  border-radius: 50%;
  border: 3px solid black;
`;

export default Summary;
