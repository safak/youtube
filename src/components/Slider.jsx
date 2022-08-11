import { ArrowLeftOutlined, ArrowRightOutlined} from "@material-ui/icons"
import styled from "styled-components"

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display:flex;
    position:reltive;
    overflow: hidden;
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color:#e7e7e7;
    border-radius: 50%;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    top: 0;
    bottom: 0;
    left: ${props=> props.direction === "left" && "10px"};
    right: ${props=> props.direction === "right" && "10px"};
    margin: auto;
    cursor:pointer;
    opacity:0.5;
`
const Wrapper = styled.div`
    height:100%;
    display: flex;
`
const Slides = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props=> props.bg};
`
const ImageContainer = styled.div`
    height: 100%;
    flex:1;
`
const Image = styled.img`
    height: 80%;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`
const Title = styled.h1` 
    font-size: 70px;
`
const Desc = styled.p`
    margin: 30px 0px;
    font-size: 20px;
    font-weight: bolder;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    font-size:20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {
  return (
    <Container>
        <Arrow direction="left">
           <ArrowLeftOutlined/>
        </Arrow>
        <Wrapper>
            <Slides bg="f5fafd">
                <ImageContainer>
                    <Image src="https://static.nike.com/a/images/kumf9vyo5gtnhkodbvu9/white-black-red-chicago.png"/>
                </ImageContainer>
                <InfoContainer>
                    <Title>SUPER SALE</Title>
                    <Desc>Air Jordan I OG White / Black  —  Red Chicago At Flat 30% Off</Desc>
                    <Button>SHOP NOW</Button>
                </InfoContainer>
            </Slides>

            <Slides bg="fcf1ed">
                <ImageContainer>
                    <Image src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/0e1e2df5-aefe-40dd-8c36-07eb2ea3c777/air-jordan-3-retro-shoes-lnD0DV.png"/>
                </ImageContainer>
                <InfoContainer>
                    <Title>SUPER SALE</Title>
                    <Desc>Air Jordan I OG White / Black  —  Red Chicago At Flat 30% Off</Desc>
                    <Button>SHOP NOW</Button>
                </InfoContainer>
            </Slides>

            <Slides bg="fbf0f4">
                <ImageContainer>
                    <Image src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/a7c1569d-c9f1-4a11-b3be-b6d9292ced79/air-jordan-5-retro-green-bean-shoes-KNZDfn.png"/>
                </ImageContainer>
                <InfoContainer>
                    <Title>SUPER SALE</Title>
                    <Desc>Air Jordan I OG White / Black  —  Red Chicago At Flat 30% Off</Desc>
                    <Button>SHOP NOW</Button>
                </InfoContainer>
            </Slides>


        </Wrapper>
        <Arrow direction="right">
           <ArrowRightOutlined/>
        </Arrow>
    </Container>
  )
}

export default Slider
