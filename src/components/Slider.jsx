import { ArrowBackRounded, ArrowForwardRounded, ArrowLeftOutlined, ArrowRightOutlined, DoubleArrow, KeyboardArrowLeftRounded} from "@material-ui/icons"
import { useState } from "react"
import styled from "styled-components"
import {sliderItems} from "../data"

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
    z-index: 2;
`
const Wrapper = styled.div`
    height:100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props=>props.slideIndex * -100}vw);
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
    margin-top: -120px;
    font-size: 60px;
`
const Desc = styled.p`
    margin: 50px 0px;
    font-size: 30px;
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
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {

        if(direction==="left"){
            setSlideIndex(slideIndex > 0? slideIndex- 1 : 2)
        } else{
            setSlideIndex(slideIndex < 2 ? slideIndex +1 :0)
        }
    };
  return (
    <Container>
        <Arrow direction="left" onClick={()=> handleClick("left")}>
           <ArrowBackRounded/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map((item=>
                <Slides bg={item.bg} key={item.id}>
                    <ImageContainer>
                        <Image src={item.img}/>
                    </ImageContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc>{item.desc}</Desc>
                        <Button>SHOP NOW</Button>
                    </InfoContainer>
                </Slides>
            ))}
        </Wrapper>
        <Arrow direction="right" onClick={()=> handleClick("right")}>
            <ArrowForwardRounded/>
        </Arrow>
    </Container>
  )
}

export default Slider
