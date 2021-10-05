import styled from 'styled-components/native';

import { H_scale } from '../../..';
const { hs, ss, vs } = H_scale;

export const BtnText = styled.Text`
  font-size: ${ss(20)}px;
  color: ${({ theme }) => theme.textContrast};
  font-weight: bold;
`;

export const StyledButton = styled.View`
  background-color: ${({ theme }) => theme.primary};
  align-self: center;
  border-radius: ${ss(9)}px;
  border-width: 1px;
  width: ${hs(370)}px;
  height: ${vs(52)}px;
  border-color: ${({ theme }) => theme.background};

  align-items: center;
  justify-content: center;
`;
