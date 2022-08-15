import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    flex:1;
    margin: 3px;
    height: 80vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
    ${mobile({height:"53vh"})}
`
const Info = styled.div`
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    backdrop-filter: blur(1px);
`
const Title = styled.h1`
    color: #ffffff;
    font-size: 80px;
    font-weight: bolder;
    font-weight: bolder;
    margin-top: -20px;
    ${mobile({fontSize :"60px"})}
`

const Button = styled.button`
    font-size:20px;
    font-weight: bolder;
    background-color: transparent;
    color: #ffffff;
    cursor: pointer;
    backdrop-filter: blur(50px);
`

const CategoryItem = ({item}) => {
  return (
    <Container>
        <Image src={item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
        </Info>
    </Container>
  )
}

export default CategoryItem
