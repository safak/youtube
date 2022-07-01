import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    height: 60px;
    border-bottom: 1px solid grey;
`;

const Title = styled.h1`
    font-size: 25px;
    font-weight: 700;
    padding: 12px 25px;
`;

const Header = () => {
  return (
      <Container>
          <Title>Current Loans</Title>
      </Container>
  )
}

export default Header