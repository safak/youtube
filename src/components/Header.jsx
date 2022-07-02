import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: 100px;
    justify-content: flex-start;
    background-color: white;
    width: 100%;
    border: 1px solid rgba(48, 50, 71, 0.1);
`;

const Title = styled.h1`
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    color: #303247;
    padding: 32px 64px;
`;

const Header = () => {
  return (
      <Container>
          <Title>Current Loans</Title>
      </Container>
  )
}

export default Header