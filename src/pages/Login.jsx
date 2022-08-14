import styled from "styled-components"

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
    width: 25%;
    background-color: white;
    border-radius: 25px;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    align-items: center;
    justify-content: center;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
    border-radius: 25px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    border-radius: 25px;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
`

const Link = styled.a`
    flex: 1;
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`
const Login = () => {
  return (
    <Container>
        <Wrapper>
            <Title>Log in</Title>
            <Form>
                <Input placeholder="User Name"/>
                <Input placeholder="Password"/>
                <Button>Login</Button>
                <Link>Forgot Password</Link>
                <Link>Create a new account</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login
