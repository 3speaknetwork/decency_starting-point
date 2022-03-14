/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { useRecoilState } from "recoil";
import { colorState, infoState, logoState } from "state/user/slice";
import { placeholder, shcemes } from "constants/constants";
import styled from "styled-components";
import { getCommunity } from "api";
import { ColorEdit } from "components/form/ColorInput";

const Summary = () => {
  const [logo, setLogo] = useRecoilState(logoState);
  const [colors, setColors] = useRecoilState(colorState);
  const [communityInfo, setInfo] = useRecoilState(infoState);
  const [hiveComm, setHiveComm] = useState({
    logo: "",
    name: "",
  });

  useEffect(() => {
    localStorage.getItem("logo") &&
      setLogo(JSON.parse(localStorage.getItem("logo") as string));
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
    </SectionWrapper>
  );
};

const Wrapper = styled.div`
  width: 15rem;
  text-align: center;
`;

const Color = styled.div<{ color: string }>`
  margin-top: 0.5rem;
  padding: 1rem 0;
  border: 1px solid black;
  border-radius: var(--chakra-radii-md);
  background-color: ${({ color }) => color || "white"};
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
