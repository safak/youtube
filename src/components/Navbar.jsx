import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height:60px;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display:flex;
    align-items:center; 
    justify-content:space-between;
`
const Left = styled.div`
    flex:1;
    display: flex;
    align-items:center;
`
const Language = styled.span`
    font-size: 16px;
    cursor: pointer;
    font-weight:bold;
`
const SearchContainer = styled.div`
    border: none;   
    display: flex;
    align-items:center;
    justify-content:center;
    margin-left: 25px;
    margin-bottom:
    padding: 5px;
`
const Input = styled.input`
    align-items:center;
    justify-content:center;
    height:20px;
`
const Center = styled.div`
    flex:1;
    text-align:center;
`
const Logo = styled.h1`
    font-weight: bold;
`
const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
`
const MenuItem = styled.div`
    margin-left:20px;
`

const Navbar = () => {
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input/>
                    <Search style={{color:"alice-blue",fontSize:16,padding:10}}/>
                </SearchContainer>
            </Left>
            <Center><Logo>MyKart</Logo></Center>
            <Right>
                <MenuItem>Register</MenuItem>
                <MenuItem>Sign-in</MenuItem>
                <MenuItem>
                    <Badge badgeContent={4} color="secondary">
                        <ShoppingCartOutlined/>
                    </Badge>
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar
