import styled from "styled-components"
import { mobile } from "../responsive"
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: url("https://cdn.mwallpapers.com/photos/celebrities/colors/teal-wallpaper-hd-high-quality-android-iphone-hd-wallpaper-background-downloadhd-wallpapers-desktop-background-android-iphone-1080p-4k-skubh.jpg") center;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
    border-radius: 25px;
    ${mobile({width:"75%"})}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    align-items: center;
    justify-content: center;
    ${mobile({alignItems:"center",justifyContent:"center"})}
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
    border-radius: 25px;
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px ;
`
const Button = styled.button`
    margin-left: 35%;
    width: 30%;
    border: none;
    border-radius: 25px;
    font-size: 20px;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    ${mobile({width:"50%",marginLeft:"0px"})}
`

const Register = () => {
  return (
    <Container>
        <Wrapper>
            <Title>Create Account</Title>
            <Form>
                <Input placeholder="First Name"/>
                <Input placeholder="Last Name"/>
                <Input placeholder="User Name"/>
                <Input placeholder="Email"/>
                <Input placeholder="Password"/>
                <Input placeholder="Confirm Password"/>
                <Agreement>By creating an account I agree to all the terms and conditions of <b>MyKart</b></Agreement>
                <Button>Submit</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register
