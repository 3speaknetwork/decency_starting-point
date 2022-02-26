import React from "react";
import styled from "styled-components";

interface Props {
  margin?: string;
  onClick: () => void;
  style?: any;
}

export const PrimaryButton: React.FC<Props> = ({
  children,
  onClick,
  margin,
}) => {
  return (
    <PrimaryButtonComp margin={margin} onClick={onClick}>
      {children}
    </PrimaryButtonComp>
  );
};

const PrimaryButtonComp = styled.button<Props>`
  cursor: pointer;
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  background-color: black;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
  overflow: hidden;
  margin: ${({ margin }) => (margin ? margin : "0")};

  &:hover {
    color: #000000;
    background-color: #ffffff;
  }
`;
