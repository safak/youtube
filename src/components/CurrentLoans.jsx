import React from 'react'
import styled from 'styled-components'
import { loans } from '../currentLoans.json'
import ModalA from '../components/ModalA'
import ModalB from '../components/ModalB'
import ModalC from '../components/ModalC'
import { useState } from 'react'

const Container = styled.div`
    margin-top: 60px;
    width: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    margin-left: 300px;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
`;

const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
`;

const InfoContainer = styled.div`
    display: flex;
    flex: 1;
    padding: 50px;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 25px;
    font-weight: 700;
    padding: 10px;
`;

const Button = styled.button`
    width: 20%;
    border: none;
    padding: 13px 5px;
    margin-left: 50px;
    margin-bottom: 60px;
    border-radius: 10px;
    background-color: orange;
    color: black;
    cursor: pointer;
`;

const CurrentLoans = () => {

const [openModalA, setOpenModalA] = useState(false);
const [openModalB, setOpenModalB] = useState(false);
const [openModalC, setOpenModalC] = useState(false);

  return (
    <Container>
        <Wrapper>
            <ImgContainer>
                {loans.map(item => {
                    return(
                        <Title>
                            Loan name {item.tranche}<br/>
                            Loan details: {item.title}
                        </Title>
                )
                })}
            </ImgContainer>
            <InfoContainer>
                <Button onClick={() => {
                    setOpenModalA(true);
                    }}>INVEST A</Button>
                {openModalA && <ModalA closeModalA ={setOpenModalA}/>}
                <Button onClick={() => {
                    setOpenModalB(true);
                    }}>INVEST B</Button>
                {openModalB && <ModalB closeModalB ={setOpenModalB}/>}
                <Button onClick={() => {
                    setOpenModalC(true);
                    }}>INVEST C</Button>
                {openModalC && <ModalC closeModalC ={setOpenModalC}/>}

            </InfoContainer>
        </Wrapper>
    </Container>
  )
}

export default CurrentLoans

//<Title>{loans[1].id * loans[2].id}</Title>
{/* <CurrentLoanItem item = {item} key = {item.id}/> */}