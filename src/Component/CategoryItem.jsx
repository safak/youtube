import React from "react";
import styled from "styled-components";
const Container = styled.div`

margin: 3px;
box-sizing: border-box;

height: 50vh;
position: relative;

`;
const Image = styled.img`
  width: 100%;
height: 100%;
object-fit: cover;
`;
const Info = styled.div`
position: absolute;
width: 100%;
height:100%;
top:0;
left: 0;
display: flex;
flex-direction: column;
align-items:center;
justify-content: center;

 
`;
const Title = styled.h1`
  color:white;
margin-bottom: 20px;

`;
const Button = styled.button`
border:none;
padding: 10px;
background-color: white;
color:gray;
opacity: 0.7;
cursor: pointer;

`;

const CategoryItem = ({ item }) => {
  return (
    <div>
      <Container>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Container>
    </div>
  );
};

export default CategoryItem;
