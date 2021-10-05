import styled, { css } from 'styled-components/native';

import { H_scale } from '../../utils';
const { ss } = H_scale;

const Heading1 = styled.Text`
  font-size: ${ss(26)}px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-family: futura;
  font-weight: 700;
  ${({ theme: { isDesktop } }) =>
    isDesktop &&
    css`
      font-size: 40px;
    `}
`;

const Body1 = styled.Text`
  font-size: ${ss(20)}px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-family: avenir;
  font-weight: 800;
  ${({ theme: { isDesktop } }) =>
    isDesktop &&
    css`
      font-size: 28px;
    `}
`;

const Body3 = styled.Text`
  font-size: ${ss(14)}px;
  color: ${({ theme }) => theme.text};
`;
