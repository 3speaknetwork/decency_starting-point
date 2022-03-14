import React from "react";
import { Flex } from "@chakra-ui/react";
import { SectionWrapper } from "components/wrappers/sectionWrapper";

interface Props {
  onNext: () => void;
}

export const CommunityCreate: React.FC<Props> = ({ onNext }) => {
  return (
    <SectionWrapper>
      <Flex>Hello</Flex>
    </SectionWrapper>
  );
};
