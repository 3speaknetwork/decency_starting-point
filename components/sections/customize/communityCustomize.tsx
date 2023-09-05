/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { CommunityInput } from "components/form/CommunityInput";
import { PrimaryButton } from "components/items/primaryButton";
import { userState, communityInfoState } from "state/slices";
import { getCommunity } from "api";
import { Errors } from "helpers/errors";

interface Props {
  onNext: () => void;
}

export const CommunityCustomize: React.FC<Props> = ({ onNext }) => {
  const [info, setInfo] = useRecoilState(communityInfoState);
  const [showCommunity, setShowCommunity] = useState<{
    title: string;
    logo: string;
    about: string;
  } | null>(null);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (info.hive_id) {
      (async () => {
        const response = await getCommunity(info.hive_id);
        if (response && user && response.team[1][0] === user.name) {
          const logo = `https://images.ecency.com/u/${response.name}/avatar/lardge`;
          const { title, about } = response;
          setShowCommunity({
            title,
            about,
            logo,
          });
        }
      })();
    }
  }, [info.hive_id]);

  return (
    <SectionWrapper>
      <Formik
        initialValues={{
          hive_id: info.hive_id ?? "",
          tags: info.tags.join(" ") ?? "",
        }}
        validate={async ({ hive_id, tags }) => {
          const errors: any = {};

          if (hive_id === "") {
            errors.hive_id = Errors.REQ;
          } else if (tags === "") {
            errors.tags = Errors.REQ;
          } else {
            const response: any = await getCommunity(hive_id);
            if (response && response.team[1][0] !== user.name) {
              setShowCommunity(null);
              errors.hive_id = `The owner of this community is ${response.team[1][0]}`;
            }
          }

          return errors;
        }}
        onSubmit={({ hive_id, tags }) => {
          setInfo({
            hive_id: hive_id,
            tags: tags.split(" "),
          });

          localStorage.setItem(
            "communityInfo",
            JSON.stringify({
              hive_id,
              tags: tags.split(" "),
            })
          );
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <>
            <CustomizeWrapper gap="2rem" mb="0.5rem">
              <CommunityInput
                title="Community hive ID"
                error={errors.hive_id ?? ""}
                isInvalid={!!errors.hive_id}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hive_id}
                name="hive_id"
                placeHolder="hive-112019"
              />
              <CommunityInput
                title="Tags"
                error={errors.tags ?? ""}
                isInvalid={!!errors.tags}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tags}
                name="tags"
                placeHolder="tag1 tag2 tag3"
              />
            </CustomizeWrapper>
            <PrimaryButton onClick={handleSubmit}>Continue</PrimaryButton>
          </>
        )}
      </Formik>
      {showCommunity && (
        <Box>
          <Flex
            justifyContent="space-between"
            gap={5}
            alignItems="center"
            mt={9}
            border="2px solid black"
            p={3}
            borderRadius="1rem"
          >
            <Flex direction="column" alignItems="center">
              <LogoWrapper mb={4}>
                <img
                  src={showCommunity.logo}
                  alt="community logo"
                  width="100%"
                />
              </LogoWrapper>
              <Text fontWeight={600}>{showCommunity.title}</Text>
            </Flex>
            <Flex maxW="15rem">
              <Text fontSize="1.2rem">{showCommunity.about}</Text>
            </Flex>
          </Flex>
          <Flex mt={5} alignItems="center" direction="column">
            <Text
              maxW="20rem"
              fontWeight={500}
              fontSize="1.1rem"
              align="center"
              mb={3}
            >
              Is this the community you want to make a page about?
            </Text>
            <PrimaryButton onClick={onNext}>Yes</PrimaryButton>
          </Flex>
        </Box>
      )}
    </SectionWrapper>
  );
};

const LogoWrapper = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border 2px solid black;

  

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

`;

const CustomizeWrapper = styled(Flex)`
  flex-wrap: wrap;
`;
