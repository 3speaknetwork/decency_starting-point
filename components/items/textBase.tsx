import styled from "styled-components";

interface Styles {
  display?: string;
  padding?: string;
  margin?: string;
  color?: string;
  textAlign?: string;
  fontWeight?: number;
  textDecoration?: string;
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  whiteSpace?: string;
  maxWidth?: string;
  letterSpacing?: string;
}

export const TextBase = styled.p<Styles>`
  padding: ${({ padding }) => padding || "0"};
  margin: ${({ margin }) => margin || "0"};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  color: ${({ color }) => color || "#000"};
  text-align: ${({ textAlign }) => textAlign || ""};
  text-decoration: ${({ textDecoration }) => textDecoration || ""};
  font-family: ${({ fontFamily }) => fontFamily || ""};
  font-size: ${({ fontSize }) => fontSize || ""};
  line-height: ${({ lineHeight }) => lineHeight || ""};
  white-space: ${({ whiteSpace }) => whiteSpace || ""};
  max-width: ${({ maxWidth }) => maxWidth || ""};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || ""};
`;
