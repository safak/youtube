import { Send } from '@material-ui/icons';
import styled from 'styled-components';

const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 70px;
    margin: 20px;
`
const Desc = styled.h3`
    margin-top: 20px;
    font-size: 24px;
    margin-bottom: 40px;
    font-weight: 300px;
`
const InputContainer = styled.div`
    height: 40px;
    width: 50%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
`
const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
    font-size: 20px;
`
const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
`

const Newsletter = () => {
  return (
    <Container>
        <Title>Look like a pro when you’re just starting out</Title>
        <Desc>Take the premium membership now</Desc>
        <InputContainer>
            <Input placeholder='Enter your email'/>
            <Button>
                <Send/>
            </Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter
