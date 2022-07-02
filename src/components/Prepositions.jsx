import { useDispatch } from 'react-redux';
import { setModal, setModalData } from '../reducers/homeReducer';
import styled from 'styled-components';

const CardContainerMain = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 676px;
    height: 134px;
    border: 1px solid rgba(48, 50, 71, 0.1);
    border-radius: 20px;
    margin: 30px 64px;
`;

const CardInvested = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 676px;
    height: 134px;
    border: 1px solid rgba(48, 50, 71, 0.1);
    border-radius: 20px;
    margin: 30px 64px;
`;

const CardWrapper = styled.div`
    width: 612px;
    height: 70px;
    display: flex;
    justify-content: space-between;
`;

const CardContainer = styled.div``;

const CardTitle = styled.h1`
    width: 151px;
    height: 30px;
    overflow: hidden;
    padding: 0;
    margin: 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 30px;
    color: #303247;
`;

const CardDesc = styled.h1`
    padding: 0;
    margin-top: 15px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #303247;
`;

const CardButton = styled.button`
    margin-top: auto;
    width: 137px;
    height: 56px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-transform: uppercase;
    color: #303247;
    background: #F7E308;
    border: none;
    border-radius: 5px;
`;

const Prepositions = (props) => {

    const {id, isInvest, title, tranche, available, term_remaining} = props;
    const dispatch = useDispatch();

    const modalHandler = () => {

        dispatch(setModal(true));
        dispatch(setModalData({id, available, term_remaining}));

    };

  return (
      <CardContainerMain>
          {/* <CardInvested>{isInvest}</CardInvested> */}
          <CardWrapper>
            <CardContainer>
                <CardTitle>{title}</CardTitle>
                <CardDesc>{tranche}</CardDesc>
            </CardContainer>
            <CardButton onClick={() => modalHandler()}>INVEST</CardButton>
          </CardWrapper>
      </CardContainerMain>
  );
}

export default Prepositions