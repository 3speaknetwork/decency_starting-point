import React from "react";
import styled from "styled-components";
import { TextBase } from "components/items/textBase";

interface Props {
  title: string;
  desc: string;
  index: number;
}

export const HowToCard: React.FC<Props> = ({ title, desc, index }) => {
  return (
    <CardWrapper>
      <TextBase fontWeight={700} fontSize="2rem">
        {index}
      </TextBase>
      <TextBase margin="0 0 0.5rem 0" fontWeight={700} fontSize="1.8rem">
        {title}
      </TextBase>
      <TextBase>{desc}</TextBase>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 2rem;
  border-radius: 1.2rem;
  max-width: 24rem;
  text-align: center;
`;
