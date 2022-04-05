import React from "react";
import styled from "styled-components";
import { Flex, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  desc: string;
  index: number;
}

export const HowToCard: React.FC<Props> = ({ title, desc, index }) => {
  return (
    <CardWrapper
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Text fontWeight={700} fontSize="2rem">
        {index}
      </Text>
      <Text margin="0 0 0.5rem 0" fontWeight={700} fontSize="1.8rem">
        {title}
      </Text>
      <Text>{desc}</Text>
    </CardWrapper>
  );
};

const CardWrapper = styled(Flex)`
  display: flex;
  width: 15rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0 0.5rem 1.5rem;
  padding: 2rem;
  border-radius: 1.2rem;
  text-align: center;
`;
