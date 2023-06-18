import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import { styled } from "styled-components"

const container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
`;

const Arrow = styled.div`
    width: 50px;
    height: 50vh;
    backgroung-color: #fff7f7;
    border-radius: 50%;
    display: flex;align-items:center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom:0;
    left: ${props=> props.direction === "left" && "10px"};
    right: ${props=> props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
`;


const wrapper = styled.div`
    height:100%;
`

const slide = styled.div` 
    display: flex;
    align-items; center;    
`;
const ImgContainer = styled.div`
    flex:1;
`;

const Image = styled.img`

`;

const InfoContainer = styled.div`
    flex:1;
`;

const Slider = () => {
  return (
    <Container>
      <Arrow direction="left">
        <ArrowLeftOutlined/>
      </Arrow>
      <wrapper>
        <ImgContainer>
        <Image src="https://i.ibb.co/XsdmR2c/1.png"/> 
        </ImageContainer>
        <InfoContainer></InfoContainer>

      </wrapper>
      <Arrow direction="right">
        <ArrowRightOutlined/>
      </Arrow>
    </Container>
  )
}

export default Slider