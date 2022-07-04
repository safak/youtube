// import React from 'react'
// import styled from 'styled-components'
// import { loans } from '../currentLoans.json'
// import { useState, useRef, useEffect } from 'react'

// const Container = styled.div`
//   width: 500px;
//   height: 500px;
//   border-radius: 12px;
//   background-color: white;
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//   display: flex;
//   padding: 5px;
//   position: fixed;
//   z-index: 2;
//   top: 90px;
//   left: 450px;
//   flex-direction: column;
// `;

// const Title = styled.h1`
//   padding-left: 10px;
//   text-align: center;
//   margin-top: 10px;
// `;

// const Header = styled.h1`
//   padding-left: 10px;
//   text-align: center;
//   margin-top: 10px;

// `;

// const Body = styled.h1`
//   padding-left: 30px;
//   flex: 10%;
//   display: flex;
//   justify-content: start;
//   align-items: center;
//   font-size: 1.5rem;
//   text-align: center;
// `;

// const Footer = styled.div`
//   flex: 15%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ButtonClose = styled.button`
//   margin-left: 50px;
//   display: flex;
//   justify-content: flex-end;
//   border: none;
//   background-color: white;
// `;

// const Input = styled.input`
// width: 10%;
// padding: 7px 5px;
// justify-content: start;
// flex: 1;
// `;

// const Button = styled.button`
//   width: 20%;
//   border: none;
//   padding: 9px 5px;
//   border-radius: 10px;
//   background-color: orange;
//   color: black;
//   cursor: pointer;
//   transition-duration: 0.4s;
// `;

// const ModalC = ({ closeModalC }) => {

//   const [income, setIncome] = useState([]);
//   const [totalIncome, setTotalIncome] = useState(10000);
//   const price = useRef(null);

//   const RemoveMoney = e => {
//     e.preventDefault();
    
//     setIncome([...income, {
//       "price": price.current.value,
//     }]);
    
//     price.current.value = null;
//   }

//   return (
//     <Container>
//       <ButtonClose onClick={() => closeModalC(false)}>X</ButtonClose>
//       <Header>Invest in Loan "C"</Header>
//       <Title></Title>
//       <Body>
//         Available: ${loans[1].available}
//       </Body>
//       <Body>
//         Annualised return: {loans[1].annualised_return}
//       </Body>
//       <Body>
//         Term remaining: {loans[1].term_remaining}
//       </Body>
//       <Body>
//         LTV: {loans[1].ltv}
//       </Body>
//       <Header>Investment amount</Header>
//       <Footer onSubmit={RemoveMoney}>
//       <Input type="number" name="price" id="price" placeholder="Price..." ref={price}/>
//         <Button type="submit" value="Remove Money">INVEST C</Button>
//       </Footer>
//       <Title>Total amount available for investment: {totalIncome}</Title>
//       <Title>Total amount available for investment: {setIncome}</Title>
//     </Container>
//   )
// }

// export default ModalC