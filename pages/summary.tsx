/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { communityInfoState, serverInfoState } from "state/slices";
import { getCommunity } from "api";
import { communityCreate } from "helpers/endpoints";
import axios from "axios";

const Summary = () => {
  const [communityInfo, setInfo] = useRecoilState(communityInfoState);
  const [serverInfo, setServerInfo] = useRecoilState(serverInfoState);
  const [hiveComm, setHiveComm] = useState({
    logo: "",
    name: "",
  });

  useEffect(() => {
    localStorage.getItem("communityInfo") &&
      setInfo(JSON.parse(localStorage.getItem("communityInfo") as string));

    localStorage.getItem("serverInfo") &&
      setServerInfo(JSON.parse(localStorage.getItem("serverInfo") as string));
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

  useEffect(() => {
    if (communityInfo.hive_id && serverInfo.ip) {
      const { hive_id, tags } = communityInfo;
      const { ip, username, password, link } = serverInfo;

      axios
        .post(communityCreate(), {
          hive_id,
          tags: tags.join(","),
          server_ip: ip,
          server_username: username,
          server_password: password,
          server_links: link,
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((e) => console.error(e));
    }
  }, [communityInfo, serverInfo]);

  return (
    <SectionWrapper>
      <SummaryIntro>
        <Community>
          <Img src={hiveComm.logo} alt="logo" width="100%" />
          <Text fontSize="1.3rem">{hiveComm.name ?? "Example title"}</Text>
        </Community>
        <Text maxWidth="25rem" fontSize="1.5rem" fontWeight={500}>
          Welcome to your new video broadcasting website!
        </Text>
      </SummaryIntro>
      <Text mt={6} maxW="lg" align="center">
        Now the only thing left to do is to get your very own domain, we suggest
        using{" "}
        <Link target="_blank" href="https://godaddy.com" rel="noreferrer">
          goDaddy
        </Link>{" "}
        and point it to your servers IPv4 address. Which in this case would be:{" "}
        {serverInfo.ip}
        <br />
        <br />
        The site domain needs to correspond to the one you inputted into the
        form ({serverInfo.link})
      </Text>
    </SectionWrapper>
  );
};

const Link = styled.a`
  font-weight: 700;
  text-decoration: underline;
  transition: 0.2s all ease;

  &:hover {
    color: blue;
  }
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