import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import { useState } from "react";
import styled from "styled-components"

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;

position : relative;
overflow: hidden;
`
const Arrow = styled.div`
width: 50px;
height: 50px;

background-color: #fff7f7;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position :absolute;
top: 0;
bottom : 0;
left: ${props => props.direction === "left" && "10px"};
right: ${props => props.direction === "right" && "10px"};

cursor : pointer;
opacity : 0.5;
margin: auto;
z-index: 2;

`

const Wrapper = styled.div`
height : 100%;
display: flex;
transform : translateX(0vw);
`;

const Slide = styled.div`
display : flex;
align-items : center;
width : 100vw;
height : 100vh;
background-color: #${props=>props.bg};
`;
const ImgContainer = styled.div`
height : 100%;
flex : 1;
`;


const Image = styled.image`
height :80%`;


const InfoContainer = styled.div`
flex : 1;
padding : 50px;
`;

const Title = styled.h1`
font-size : 70px;

`;
const Description = styled.p`
margin: 50px 0px;
font-size: 20px;
font-weight: 500;
letter-spacing: 3px;


`
const Button = styled.button`
padding: 10px;
font-size: 20px;
background-color: transparent;
cursor: pointer;
`;


const Slider = () => {

    const  [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction) => {

    }
    return (
        <Container>
            <Arrow direction="left" onClick={()=>handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper>
                <Slide bg="f5fafd">
                    <ImgContainer>
                        <img src="https://i.pinimg.com/564x/2e/41/47/2e4147c28c008ad1f1c581c1c503f7fb.jpg" />
                    </ImgContainer>
                    <InfoContainer>
                        <Title> SUMMER SALE </Title>
                        <Description> DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS</Description>
                        <Button>SHOP NOW</Button>
                    </InfoContainer>
                </Slide>
                <Slide bg="fcf1ed">
                    <ImgContainer>
                        <img src="https://i.pinimg.com/564x/2e/41/47/2e4147c28c008ad1f1c581c1c503f7fb.jpg" />
                    </ImgContainer>
                    <InfoContainer>
                        <Title> WINTER SALE </Title>
                        <Description> DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS</Description>
                        <Button>SHOP NOW</Button>
                    </InfoContainer>
                </Slide>

                <Slide bg="fbf0f4">
                    <ImgContainer>
                        <img src="https://i.pinimg.com/564x/2e/41/47/2e4147c28c008ad1f1c581c1c503f7fb.jpg" />
                    </ImgContainer>
                    <InfoContainer>
                        <Title> POPULAR SALE </Title>
                        <Description> DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS</Description>
                        <Button>SHOP NOW</Button>
                    </InfoContainer>
                </Slide>

            </Wrapper>
            <Arrow direction="right" onClick={()=>handleClick("left")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>


    )
}

export default Slider
