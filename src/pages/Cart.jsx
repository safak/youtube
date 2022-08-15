import { Add, Remove } from "@material-ui/icons"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { mobile } from "../responsive"

const Container = styled.div`
    
`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding:"10px"})}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type === "filled" && "none"};
    background-color: ${props=>props.type === "filled" ? "black" : "transpatent"};
    color: ${props=>props.type === "filled" && "white"};
`
const TopTexts = styled.div`
    ${mobile({display:"none"})}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection:"column"})}
`
const Info = styled.div`
    flex: 3;
    
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection:"column"})}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`

const Image = styled.img`
    width: 200px;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.span``

const ProductType = styled.span``

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 3px;
    ${mobile({margin:"5px 15px"})}
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({marginBottom:"20px"})}
`
const Hr = styled.hr`
    margin: 15px 0px;
    background-color: teal;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: 1px solid teal;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "finaltotal" && "500"};
    font-size: ${props=>props.type === "finaltotal" && "24px"};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`

const Cart = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <Title>Your Kart</Title>
            <Top>
                <TopButton>Continue Shopping</TopButton>
                <TopTexts>
                    <TopText>Your Kart (2)</TopText>
                    <TopText>Your WishList (0)</TopText>
                </TopTexts>
                <TopButton type="filled">Checkout Now</TopButton>
            </Top>
            <Bottom>
                <Info>
                    <Product>
                        <ProductDetail>
                            <Image src="https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/92b42d29-5cd4-48d1-8256-c856a7169bf1/zoom-metcon-turbo-2-mens-training-shoes-qzmdn3.png"/>
                            <Details>
                                <ProductName><b>Product : </b> Nike Zoom Metcon Turbo 2</ProductName>
                                <ProductType><b>Category : </b> Shoes</ProductType>
                                <ProductColor color="lightgray"/>
                                <ProductSize><b>Size : </b> UK 9</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add/>
                                <ProductAmount>2</ProductAmount>
                                <Remove/>
                            </ProductAmountContainer>
                            <ProductPrice> Rs. 6,000</ProductPrice>
                        </PriceDetail>
                    </Product>
                    <Hr/>
                    <Product>
                        <ProductDetail>
                            <Image src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/wcjosdhxrgz0mcqzllde/sportswear-club-fleece-mens-graphic-pullover-hoodie-R9w74B.png"/>
                            <Details>
                                <ProductName><b>Product : </b> Mens Graphic PullOver Hoodie</ProductName>
                                <ProductType><b>Category : </b> Mens Clothing</ProductType>
                                <ProductColor color="black"/>
                                <ProductSize><b>Size : </b> M</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add/>
                                <ProductAmount>2</ProductAmount>
                                <Remove/>
                            </ProductAmountContainer>
                            <ProductPrice> Rs. 2,000</ProductPrice>
                        </PriceDetail>
                    </Product>
                </Info>
                <Summary>
                    <SummaryTitle>Order Summary</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>SubTotal</SummaryItemText>
                        <SummaryItemPrice>Rs. 8000</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Charges</SummaryItemText>
                        <SummaryItemPrice>Rs. 300</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Discount</SummaryItemText>
                        <SummaryItemPrice>- Rs. 200</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="finaltotal">
                        <SummaryItemText>Total Amount</SummaryItemText>
                        <SummaryItemPrice>Rs. 8100</SummaryItemPrice>
                    </SummaryItem>
                    <Button>Check Out</Button>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart
