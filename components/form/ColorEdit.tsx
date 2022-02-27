import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  colorType: string;
  currentColors: { primary: string; secondary: string; accents: string };
  setColor: React.Dispatch<
    React.SetStateAction<{
      primary: string;
      secondary: string;
      accents: string;
    }>
  >;
}

export const ColorEdit: React.FC<Props> = ({
  title,
  colorType,
  setColor,
  currentColors,
}) => {
  const [colorValue, setColorValue] = useState(
    currentColors[colorType as "primary"]
  );
  const [error, setError] = useState(false);
  var reg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (reg.test(e.target.value.toUpperCase())) {
      setError(false);
      setColorValue(e.target.value);
      setColor({
        ...currentColors,
        [colorType]: e.target.value,
      });
      localStorage.setItem(
        "colors",
        JSON.stringify({
          ...currentColors,
          [colorType]: e.target.value,
        })
      );
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <Text textAlign="center" margin="0 0 0.5rem" fontSize="1.1rem">
        {title}
      </Text>
      <Input
        isInvalid={error}
        onChange={handleChange}
        placeholder="#FFFFFF"
        focusBorderColor="blackAlpha.700"
        width="100%"
      />
      <ColorBox color={colorValue} />
    </div>
  );
};

const ColorBox = styled.div<{ color: string }>`
  margin-top: 0.5rem;
  padding: 1rem 0;
  width: 100%;
  transition: all 0.2s;
  border: 1px solid black;
  border-radius: var(--chakra-radii-md);
  background-color: ${({ color }) => color || "white"};
`;
