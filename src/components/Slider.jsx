import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import styled from "styled-components"

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;

position : relative;
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
left: ${props=> props.direction === "left" && "10px"};
right: ${props=> props.direction === "right" && "10px"};

cursor : pointer;
opacity : 0.5;
margin: auto;

`

const Wrapper = styled.div`
height : 100%;
display: flex;
`;

const Slide = styled.div`
display : flex;
align-items : center;
width : 100vw;
height : 100vh;
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
    return (
        <Container>
            <Arrow direction="left">
                <ArrowLeftOutlined/>
            </Arrow>
            <Wrapper>
                <Slide>
                <ImgContainer>
                <Image src="https://m.media-amazon.com/images/I/61ofltt9QzL._AC_UL1200_.jpg"/>
                </ImgContainer>
                <InfoContainer>
                 <Title> SUMMER SALE </Title>
                 <Description> DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS</Description>
                 <Button>SHOP NOW</Button>
                </InfoContainer>
                </Slide>
                <Slide>
                <ImgContainer>
                <Image src="https://i.ibb.co/XsdmR2c/1.png"/>
                </ImgContainer>
                <InfoContainer>
                 <Title> SUMMER SALE </Title>
                 <Description> DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS</Description>
                 <Button>SHOP NOW</Button>
                </InfoContainer>
                </Slide>

                </Wrapper>
            <Arrow direction="right">
                <ArrowRightOutlined/>
            </Arrow>
        </Container>

        
    )
}

export default Slider
