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

const getErrorTitle = {
  NO_SERVER: "The server you inputed couldn't be connected to",
  WRONG_PAYLOAD: "Something went wrong with sending out your given data",
  NO_ROOT_ACCESS: "You don't have access to the given server",
  NO_CLI: "Couldn't run the community create CLI",
  NO_CERTIFICATION:
    "The UI is setup, but it will run using the http protocol, because we couldn't setup the certification",
};

const Summary = () => {
  const [communityInfo, setInfo] = useRecoilState(communityInfoState);
  const [serverInfo, setServerInfo] = useRecoilState(serverInfoState);
  const [error, setError] = useState("");
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
        .catch((e) => setError(e.response.data.error));
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
      {error && (
        <ErrorContainer>
          {getErrorTitle[error as keyof typeof getErrorTitle]}, please try again
          or contact us on discord:{" "}
          <a>Click here to join the SPK discord server</a>
        </ErrorContainer>
      )}
    </SectionWrapper>
  );
};

const ErrorContainer = styled.div`
  text-align: center;
  border: 2px solid red;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  color: red;
  font-size: 16px;
  font-weight: 500;
  max-width: 50%;

  a {
    color: blue;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

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