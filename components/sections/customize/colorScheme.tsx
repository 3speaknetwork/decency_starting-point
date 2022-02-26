import React from "react";
import { ColorEdit } from "components/form/ColorEdit";
import { PrimaryButton } from "components/items/primaryButton";
import { TextBase } from "components/items/textBase";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { useRecoilState } from "recoil";
import { colorState } from "state/user/slice";
import styled from "@emotion/styled";

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
      <TextBase fontSize="1.5rem" textAlign="center">
        Choose some of your favourite colors for the site:
      </TextBase>
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
  gap: 3rem;
  margin-top: 3rem;
`;
