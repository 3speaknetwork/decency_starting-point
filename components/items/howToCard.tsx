import React from "react";
import styled from "styled-components";
import { TextBase } from "./textBase";

interface Props {
  title: string;
  desc: string;
  index: number;
}

export const HowToCard: React.FC<Props> = ({ title, desc, index }) => {
  return (
    <CardWrapper>
      <TextBase>{index}</TextBase>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 2rem;
  border-radius: 1.2rem;
`;
