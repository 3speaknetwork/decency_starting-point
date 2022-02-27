import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Text } from "@chakra-ui/react";
import { PrimaryButton } from "components/items/primaryButton";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { ColorEdit } from "components/form/ColorEdit";
import { colorState } from "state/user/slice";

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
        Choose some of your favourite colors for the site:
      </Text>
      <EditWrapper>
        <ColorEdit
          currentColors={colors}
          title="Primary"
          colorType={ColorType.Primary}
          setColor={setColors}
        />
        <ColorEdit
          currentColors={colors}
          title="Secondary"
          colorType={ColorType.Secondary}
          setColor={setColors}
        />
        <ColorEdit
          currentColors={colors}
          title="Accents"
          colorType={ColorType.Accents}
          setColor={setColors}
        />
      </EditWrapper>
      {colors.primary && colors.secondary && colors.accents && (
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
  margin-top: 3rem;
`;
