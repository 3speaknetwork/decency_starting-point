import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  color: string;
}

export const ColorEdit: React.FC<Props> = ({ title, color }) => {
  console.log(color);

  return (
    <div>
      <Text textAlign="center" margin="0 0 0.5rem" fontSize="1.1rem">
        {title}
      </Text>
      <ColorBox color={color} />
    </div>
  );
};

const ColorBox = styled.div<{ color: string }>`
  margin-top: 0.5rem;
  padding: 1rem 0;
  min-width: 12rem;
  transition: all 0.2s;
  border: 1px solid black;
  border-radius: var(--chakra-radii-md);
  background-color: ${({ color }) => color || "white"};
`;
