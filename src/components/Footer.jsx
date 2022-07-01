import React from 'react'
import styled from 'styled-components';
import { loans } from '../currentLoans.json';

const Container = styled.div`
    height: 30px;
    border-top: 1px solid grey;
`;

const Title = styled.h1`
    font-size: 25px;
    font-weight: 700;
    padding: 12px 25px;
`;

const Footer = () => {
  return (
    <Container>
        <Title>Total amount available for investment: $ {loans[1].amount}</Title>
    </Container>
  )
}

export default Footer