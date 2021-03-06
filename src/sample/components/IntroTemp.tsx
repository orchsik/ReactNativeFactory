import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';

const ContentWrapper = styled.View`
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 24px;
  justify-content: flex-start;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 18px;
  line-height: 27px;
  color: ${({ theme }) => theme.text};
`;

type Props = {
  result: string;
};

function IntroTemp({ result }: Props): React.ReactElement {
  return (
    <ContentWrapper>
      <ScrollView>
        <StyledText>{result}</StyledText>
        <View style={{ height: 400 }} />
      </ScrollView>
    </ContentWrapper>
  );
}

export default IntroTemp;
