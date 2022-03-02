import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { color, Select, Text } from "@chakra-ui/react";
import { PrimaryButton } from "components/items/primaryButton";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { ColorEdit } from "components/form/ColorInput";
import { colorState } from "state/user/slice";
import { shcemes } from "constants/constants";

export enum ColorType {
  Primary = "primary",
  Secondary = "secondary",
  Accents = "accents",
}

interface Props {
  onNext: () => void;
}

export const ColorScheme: React.FC<Props> = ({ onNext }) => {
  const [colors, setColors] = useRecoilState(colorState);

  return (
    <SectionWrapper>
      <Text fontSize="1.5rem" textAlign="center">
        Choose the color scheme for your site:
      </Text>
      <Select
        onChange={(e) => setColors(e.target.value as "sky_blue")}
        mt={5}
        maxW="md"
      >
        <option value="sky_blue">Sky blue</option>
        <option value="dusk_yello">Dusk yellow</option>
        <option value="burning_red">Burning red</option>
      </Select>
      <EditWrapper>
        <ColorEdit title="Primary" color={shcemes[colors].primary ?? "white"} />
        <ColorEdit
          title="Secondary"
          color={shcemes[colors].secondary ?? "white"}
        />
        <ColorEdit title="Accents" color={shcemes[colors].accents ?? "white"} />
      </EditWrapper>
      {colors && (
        <PrimaryButton margin="1.5rem 0 0" onClick={onNext}>
          Continue
        </PrimaryButton>
      )}
    </SectionWrapper>
  );
};

const EditWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-top: 1.5rem;
`;
