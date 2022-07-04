// import React, {useState} from 'react'
// import styled from 'styled-components';
// import Modal from './Modal';
// import { ButtonA } from './ButtonA';


// const Container = styled.div`
//     height: 15vh;
// `;


// const Title = styled.h1`
//     font-size: 25px;
//     font-weight: 700;
// `;

// const Desc = styled.div`
//     font-size: 20px;
//     font-weight: 300;
// `;

// const Button = styled.button`
//     width: 20%;
//     border: none;
//     padding: 13px 5px;
//     margin-left: 10px;
//     border-radius: 10px;
//     background-color: orange;
//     color: black;
//     cursor: pointer;
//     transition-duration: 0.4s;
//     &:hover {
//         background-color: red;
//     }
// `;

// const Left = styled.div`
//     flex: initial;
// `;

// const Right = styled.div`
//     flex: none;
//     margin-left: 1000px;
// `;

// const CurrentLoanItem = ({item}) => {
//     const [openModal, setOpenModal] = useState(false)
//   return (
//       <Container onClick={() => setOpenModal(true)}>
//         {/* <Modal active={openModal} setActive={setOpenModal}/> */}
//             <Title>Loan name {item.tranche}</Title>
//             <Desc>Loan details and values: {item.title}</Desc>
//         <Right>
//             {/* <Button onClick={() => setOpenModal(false)}>INVEST</Button> */}
//             {/* <ButtonA/> */}
//         </Right>
//     </Container>
//   )
// }

// export default CurrentLoanItem
