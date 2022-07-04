import styled from 'styled-components';
import { useState } from 'react';
import closeImg from './close.svg';
import { setAvailableAmount, setInvest, setModal } from '../reducers/homeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { convertingSeconds } from '../converting/convertingSeconds';
import './Modal.css'

const Container = styled.div``;

const ModalActiveContainer = styled.div`
    transform: scale(1);
`;

const ModalCntainer = styled.div`
    position: absolute;
    width: 1440px;
    height: 1024px;
    left: 0px;
    top: 0px;
    background: rgba(26, 26, 26, 0.8);
    transform: scale(0);
`;

const ModalContentContainer = styled.div`
    width: 627px;
    height: 499px;
    background: #FFFFFF;
    border-radius: 5px;
    position: absolute;
    left: 407px;
    top: 263px;
`;

const CloseButton = styled.button`
    border: none;
    background-color: transparent;
    position: absolute;
    width: 32px;
    height: 32px;
    left: 563px;
    top: 32px;
    padding: 0;
`;

const ModalContentBlockContainer = styled.div`
    position: absolute;
    width: 499px;
    height: 371px;
    left: 64px;
    top: 64px;
`;

const TitleModal = styled.h1`
    font-style: normal;
    font-weight: 600;
    font-size: 35px;
    line-height: 42px;
    color: #303247;
    margin: 0;
    padding: 0;
`;

const TitleModalClosed = styled.h1`
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin-top: 30px;
    padding: 0;
    color: #303247;
`;

const TitleModalAmount = styled.h1`
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin: 32px 0 0 0;
    padding: 0;
    color: #303247;
`;

const TitleModalEnds = styled.h1`
    overflow: hidden;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin-top: 10px;
    padding: 0;
    color: #303247;
`;

const TitleModalInvestment = styled.h1`
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    margin-top: 65px;
    padding: 0;
    color: #303247;
`;

const InputModalBlock = styled.div`
display: flex;
justify-content: space-between;
`;

const Input = styled.input`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 16px 32px;
    gap: 10px;
    width: 264px;
    height: 24px;
    background: #FFFFFF;
    border: 1px solid rgba(48, 50, 71, 0.1);
    border-radius: 5px;
    margin: 0;
    text-align: right;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #303247;
`;

const Button = styled.button`
    padding: 16px 32px;
    width: 137px;
    height: 56px;
    border: none;
    background: #F7E308;
    border-radius: 5px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-transform: uppercase;
    color: #303247;
`;

const Modal = () => {

    const dispatch = useDispatch();
    const isModalActive = useSelector(state => state.app.isModalActive);
    const modalData = useSelector(state => state.app.modalData);
    const { available, term_remaining } = modalData;
    
    const [ modalValue, setModalValue ] = useState('');
    
    const investHandler = () => {

        dispatch(setAvailableAmount(Number(modalValue)));
        setModalValue('');

    };

    const closeHandler = () => {

        dispatch(setModal(false));
        dispatch(setInvest(modalData));
        
    };

	return (

        <Container>
            <div className={isModalActive ? "modal active" : "modal"}>
            <ModalContentContainer>
                <CloseButton onClick={() => closeHandler()}><img src={closeImg} alt="close"/></CloseButton>
                <ModalContentBlockContainer>
                <TitleModal>Invest in Loan</TitleModal>
                <TitleModalClosed>Loan title you have clicked</TitleModalClosed>
                <TitleModalAmount>Amount available: ${available}</TitleModalAmount>
                <TitleModalEnds>Loan ends in: {convertingSeconds(term_remaining)}</TitleModalEnds>
                <TitleModalInvestment>Investment amount</TitleModalInvestment>
                <InputModalBlock>
                    <Input type="number" value={modalValue} onChange={(e) => setModalValue(e.target.value)}/>
                    <Button onClick={() => investHandler()}>INVEST</Button>
                </InputModalBlock>
                </ModalContentBlockContainer>
            </ModalContentContainer>
            </div>
        </Container>

    );
    }

export default Modal