import styled from '@emotion/styled';
import React, {FC} from 'react';
// @ts-ignore
import fluid from "fluid-system";
import {
  background,
  BackgroundProps,
  flexbox,
  grid,
  GridProps,
  layout,
  LayoutProps,
  SizeProps,
  space,
  SpaceProps,
} from 'styled-system';

interface TypographyComponent
  extends SpaceProps,
  LayoutProps,
  GridProps,
  SizeProps,
    BackgroundProps {
  children?: React.ReactNode;
}

export const Div: FC<TypographyComponent> = styled.div`
  ${fluid(flexbox)}
  ${fluid(space)}
  ${fluid(layout)}
  ${fluid(background)}
  ${fluid(grid)}
`;

export const Flex: FC<TypographyComponent> = styled(Div)`
  display: flex;
`;

