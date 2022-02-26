import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { useEffect } from "react";
import styled from "styled-components";
import { TextBase } from "components/items/textBase";

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
  var reg = /^#([0-9a-f]{3}){1,2}$/i;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (reg.test(e.target.value.toUpperCase())) {
      setError(false);
      setColorValue(e.target.value);
      setColor({
        ...currentColors,
        [colorType]: e.target.value,
      });
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    console.log(colorValue);
  }, [colorValue]);

  return (
    <div>
      <TextBase textAlign="center" margin="0 0 0.5rem" fontSize="1.1rem">
        {title}
      </TextBase>
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
