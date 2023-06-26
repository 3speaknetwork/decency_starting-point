import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Router from "next/router";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { IoMdCreate, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { colorState, infoState, logoState, userState } from "state/slices";
import { Proccess } from "components/sections/Questions/CommunityProccess";
import { SectionWrapper } from "components/wrappers/sectionWrapper";

const Setup = () => {
  const [asked, setAsked] = useState(false);
  const [create, setCreate] = useState(false);
  const user = useRecoilValue(userState);
  const [_logo, setLogo] = useRecoilState(logoState);
  const [_colors, setColors] = useRecoilState(colorState);
  const [_info, setInfo] = useRecoilState(infoState);

  useEffect(() => {
    if (!user) {
      Router.push("/");
    }

    localStorage.getItem("logo") &&
      setLogo(JSON.parse(localStorage.getItem("logo") as string));
    localStorage.getItem("colors") &&
      setColors(JSON.parse(localStorage.getItem("colors") as string));
    localStorage.getItem("communityInfo") &&
      setInfo(JSON.parse(localStorage.getItem("communityInfo") as string));
  }, []);

  return (
    <SectionWrapper>
      {asked ? (
        <Proccess onExit={() => setAsked(false)} create={create} />
      ) : (
        <Flex alignItems="center" justifyContent="center" gap={9} minH="2xl">
          <OptionCard
            onClick={() => {
              setCreate(true);
              setAsked(true);
            }}
            maxW="20rem"
            height="12rem"
            border="2px solid black"
            borderRadius="1rem"
            p={9}
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <IoMdCreate size="2.5rem" />
            <Text mt={3} align="center" fontWeight={700} fontSize="1.25rem">
              Create a HIVE community
            </Text>
          </OptionCard>
          <OptionCard
            onClick={() => {
              setCreate(false);
              setAsked(true);
            }}
            maxW="20rem"
            height="12rem"
            border="2px solid black"
            borderRadius="1rem"
            p={9}
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <IoMdCheckmarkCircleOutline size="2.5rem" />
            <Text align="center" mt={3} fontWeight={700} fontSize="1.25rem">
              Already have a HIVE community
            </Text>
          </OptionCard>
        </Flex>
      )}
    </SectionWrapper>
  );
};

const OptionCard = styled(Flex)`
  cursor: pointer;
`;

export default Setup;
