import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEffect } from 'react';
import { fetchData } from '../actions/app';
import Prepositions from '../components/Prepositions';


const CurrentLoansContainer = styled.div`
    background: #FFFFFF;
    width: 1440px;
    height: 1024px;
`;

const Container = styled.div`
    width: 683px;
    height: 24px;
    padding: 13px 0 0 64px;
    display: flex;
    justify-content: space-between;
`;

const ContainerTitle = styled.h1`
    white-space: nowrap;
    width: 369px;
    height: 24px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #303247;
`;

const ContainerTitleDesc = styled.h1`
    white-space: nowrap;
    width: 369px;
    height: 24px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #303247;
    width: 96px;
    height: 24px;
`;

const CurrentLoans = () => {

    const dispatch = useDispatch();
    const loans = useSelector(state => state.app.loans);
    const amount = useSelector(state => state.app.amount);

    useEffect (() => {
        dispatch(fetchData());
    }, []);

    const renderData = loans.map(item => {
        return <Prepositions
            key={item.id}
            id={item.id}
            isInvest={item.isInvest}
            title={item.title}
            tranche={item.tranche}
            available={item.available}
            term_remaining={item.term_remaining}
        />
    })

  return (
    <CurrentLoansContainer>
        {renderData}
        <Container>
            <ContainerTitle>Total amount available for investment:</ContainerTitle>
            <ContainerTitleDesc>${amount}</ContainerTitleDesc>
        </Container>
    </CurrentLoansContainer>
  );
}

export default CurrentLoans;