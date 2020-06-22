import React from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../common/atom';

const CentreComponent = styled.div`
  margin: 0;
  text-align: center;
  height:100%
`;

const FourOFour = ({ location }) => (
  <CentreComponent>
    <Wrapper>
      <h4>Sorry, <code>{location && location.pathname}</code> does not exist </h4>
    </Wrapper>
  </CentreComponent>
);

export default FourOFour;
