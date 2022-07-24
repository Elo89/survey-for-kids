import styled from '@emotion/styled';
import React, {FC} from 'react';
// @ts-ignore
import fluid from "fluid-system";
import {
  space,
  SpaceProps,
  color,
  ColorProps,
  typography,
  TypographyProps,
} from 'styled-system';

interface TypographyComponent
  extends SpaceProps,
    ColorProps,
    TypographyProps {
  children?: React.ReactNode;
  as?: string;
}

export const Text: FC<any> = styled.p`
  font-family: OpenSans;
  ${fluid(space)}
  ${fluid(typography)}
  ${fluid(color)}
`;

export const Header1: FC<TypographyComponent> = styled(Text)`
  font-size: 40px;
  line-height: 44px;
  font-family: OpenSans-bold;
`;
Header1.defaultProps = { as: 'h1' };

export const Title: FC<TypographyComponent> = styled(Text)`
  font-size: 22px;
  line-height: 22px;
  font-family: OpenSans-bold;
  margin-top: 8px;
`;
Title.defaultProps = { as: 'h2' };

export const Text1: FC<TypographyComponent> = styled(Text)`
  font-size: 16px;
  line-height: 18px;
`;

Title.defaultProps = { as: 'p' };