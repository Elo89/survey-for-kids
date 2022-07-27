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
  layout,
  LayoutProps,
} from 'styled-system';

interface TypographyComponentDto
  extends SpaceProps,
    ColorProps,
    LayoutProps,
    TypographyProps {
  children?: React.ReactNode;
  as?: string;
}

export const Text: FC<any> = styled.p`
  ${fluid(space)}
  ${fluid(typography)}
  ${fluid(color)}
  ${fluid(layout)}
`;

export const Header1: FC<TypographyComponentDto> = styled(Text)`
  font-size: 40px;
  line-height: 44px;
`;
Header1.defaultProps = { as: 'h1' };

export const Title: FC<TypographyComponentDto> = styled(Text)`
  font-size: 22px;
  line-height: 22px;
  margin-top: 8px;
`;
Title.defaultProps = { as: 'h2' };

export const Text1: FC<TypographyComponentDto> = styled(Text)`
  font-size: 16px;
  line-height: 18px;
`;

Text1.defaultProps = { as: 'p' };