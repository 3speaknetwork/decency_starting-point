/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { color, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { colorState, infoState, logoState } from "state/user/slice";
import { placeholder, shcemes } from "constants/constants";
import { ColorEdit } from "components/form/ColorInput";
import { getCommunity } from "api";

const Summary = () => {
  const [colors, setColors] = useRecoilState(colorState);
  const [communityInfo, setInfo] = useRecoilState(infoState);
  const logo = useRecoilState(logoState);
  const [hiveComm, setHiveComm] = useState({
    logo: "",
    name: "",
  });

  useEffect(() => {
    localStorage.getItem("colors") &&
      setColors(JSON.parse(localStorage.getItem("colors") as string));
    localStorage.getItem("communityInfo") &&
      setInfo(JSON.parse(localStorage.getItem("communityInfo") as string));
  }, []);

  useEffect(() => {
    if (communityInfo.hive_id) {
      (async () => {
        const response = await getCommunity(communityInfo.hive_id);
        if (response) {
          const logo = `https://images.ecency.com/u/${response.name}/avatar/lardge`;
          const { title } = response;
          setHiveComm({
            logo,
            name: title,
          });
        }
      })();
    }
  }, [communityInfo.hive_id]);

  const textToCopy = `RAZZLE_HIVE_ID=${
    communityInfo.hive_id
  }<br/>RAZZLE_THEME=${colors}<br/>RAZZLE_RAGS=${communityInfo.tags.join(",")}`;

  return (
    <SectionWrapper>
      <SummaryIntro>
        <Community>
          {hiveComm.logo ? (
            <Img src={hiveComm.logo} alt="logo" width="100%" />
          ) : (
            <Img src={placeholder} alt="placeholder" width="100%" />
          )}
          <Text fontSize="1.3rem">{hiveComm.name ?? "Example title"}</Text>
        </Community>
        <Text maxWidth="25rem" fontSize="1.5rem" fontWeight={500}>
          Welcome to your new video broadcasting website!
        </Text>
      </SummaryIntro>
      <ColorWrapper>
        <ColorEdit
          title="Primary"
          color={shcemes[colors]?.primary ?? "white"}
        />
        <ColorEdit
          title="Secondary"
          color={shcemes[colors]?.secondary ?? "white"}
        />
        <ColorEdit
          title="Accents"
          color={shcemes[colors]?.accents ?? "white"}
        />
      </ColorWrapper>
      <Text mt={6} maxW="sm" align="center">
        Go to this{" "}
        <GithubLink
          href="https://github.com/3speaknetwork/ecency-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          Github repo
        </GithubLink>
        , and read the README attached! Below is your <i>.env.local</i> file
        &#128513;
      </Text>
      <Flex mt={6} justifyContent="center">
        <Text
          backgroundColor="gray.700"
          p={2}
          borderLeftRadius="0.4rem"
          color="white"
          maxWidth="xl"
          dangerouslySetInnerHTML={{ __html: textToCopy }}
        />
        <Flex
          alignItems="center"
          p={2}
          onClick={() => {
            navigator.clipboard.writeText(textToCopy);
          }}
          cursor="pointer"
          borderRightRadius="0.4rem"
          color="white"
          backgroundColor="gray.500"
        >
          <Text>
            <FaCopy />
          </Text>
        </Flex>
      </Flex>
    </SectionWrapper>
  );
};

const GithubLink = styled.a`
  font-weight: 700;
  text-decoration: underline;
  transition: 0.2s all ease;

  &:hover {
    color: blue;
  }
`;

const ColorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 3rem;
  margin: 2rem auto 0;
`;

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
