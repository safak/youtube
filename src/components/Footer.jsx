import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../actions/app';
import { useEffect } from 'react';


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

    const dispatch = useDispatch();
    const amount = useSelector(state => state.app.amount);

    useEffect (() => {
      dispatch(fetchData());
    }, [])

  return (
    <Container>
        <Title>Total amount available for investment: $ {amount}</Title>
    </Container>
  )
}

export default Footer