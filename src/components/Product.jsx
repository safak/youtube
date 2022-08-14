import styled from "styled-components"
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCart} from '@material-ui/icons'
const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 7px;
    min-width: 280px;
    height: 250px;
    position: relative;
`

const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: fill;
`
const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover{
        opacity: 1;
    }
`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    border-radius: 50%;
    background-color: white;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.2s ease-in-out;

    &:hover{
        background-color: white;
        transform: scale(1.5);
    }
`

const Product = ({item}) => {
  return (
    <Container>
        <Image src={item.img}/>
        <Info>
            <Icon>
                <ShoppingCart/>
            </Icon>
            <Icon>
                <SearchOutlined/>
            </Icon>
            <Icon>
                <FavoriteBorderOutlined/>
            </Icon>
        </Info>
    </Container>
  )
}

export default Product
