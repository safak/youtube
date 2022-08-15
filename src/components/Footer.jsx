import { Facebook, Instagram, LinkedIn, Mail, Phone, Room, Twitter } from "@material-ui/icons"
import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection:"column"})}
`
const Left = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1``

const Desc = styled.p`
    margin: 20px 0px;
`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props=>props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Center = styled.div`
    flex:1;
    padding: 20px;
    ${mobile({display:"none"})}
`
const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`

const Right = styled.div`
    flex:1;
    padding: 20px;
    ${mobile({backgroundColor:"#fff8f8"})}
`
const ContactItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    height: 70px;
    object-fit: contain;
    align-items: center;
    justify-content: center;
    display: flex;
    ${mobile({marginLeft:"-5px"})}
`

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>MyKart</Logo>
            <Desc>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et praesentium mollitia vitae sunt consequatur hic vero labore at totam quos a reiciendis cupiditate, eaque veniam natus. Tenetur nulla a eum!</Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram/>
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter/>
                </SocialIcon>
                <SocialIcon color="E60023">
                    <LinkedIn/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Mens Fashion</ListItem>
                <ListItem>Womens Fashion</ListItem>
                <ListItem>Accesories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wish List</ListItem>
                <ListItem>Terms and Conditions</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact Us</Title>
            <ContactItem>
                <Room style={{marginRight:"10px"}}/> 007, R-City Mall, L.B.S. Road, Ghatkopar (West), Mumbai-400086
            </ContactItem>
            <ContactItem>
                <Phone style={{marginRight:"10px"}}/>    +91 123 456 789
            </ContactItem>
            <ContactItem>
                <Mail style={{marginRight:"10px"}}/> akshat2404@gmail.com
            </ContactItem>
            <Payment src="https://help.zazzle.com/hc/article_attachments/360010513393/Logos-01.png"/>
        </Right>
    </Container>
  )
}

export default Footer
