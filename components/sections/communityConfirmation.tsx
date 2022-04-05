import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { communityCreationState, userState } from "state/user/slice";
import { PrimaryButton } from "components/items/primaryButton";
import { createCommunity } from "api";

interface Props {
  onNext: () => void;
}

export const CommunityConfirmation: React.FC<Props> = ({ onNext }) => {
  const communityInfo = useRecoilValue(communityCreationState);
  const user: any = useRecoilValue(userState);

  const handleCreateCommunity = () => {
    (async () => {
      const response = await createCommunity({
        username: user.name,
        aboutCommunity: communityInfo.about,
        communityName: communityInfo.title,
        communityHiveID: communityInfo.communityHiveID,
        fee: communityInfo.fee,
        wif: communityInfo.wif,
      });

      console.log(response);
      onNext();
    })();
  };

  return (
    <SectionWrapper>
      <Text mb={1} fontWeight={700} fontSize="1.3rem">
        Here&apos;s your community summary
      </Text>
      <Flex
        maxWidth="20rem"
        fontSize="1.2rem"
        direction="column"
        alignItems="flex-start"
      >
        <Text>
          Account creation fee: <b>{communityInfo.fee}</b>
        </Text>
        <Text>
          Community hive ID: <b>{communityInfo.communityHiveID}</b>
        </Text>
        <Text>
          Community name: <b>{communityInfo.title}</b>
        </Text>
        <Text>
          About community: <b>{communityInfo.about}</b>
        </Text>
        <Text color="red.500">
          Community password: <b>{communityInfo.wif}</b>
        </Text>
      </Flex>
      <Flex mt={4} justifyContent="center">
        <PrimaryButton onClick={handleCreateCommunity}>Confirm</PrimaryButton>
      </Flex>
    </SectionWrapper>
  );
};
