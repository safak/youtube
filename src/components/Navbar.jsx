import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import {mobile} from "../responsive"
const Container = styled.div`
    height:60px;
    ${mobile({height :"50px"})}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display:flex;
    align-items:center; 
    justify-content:space-between;
    ${mobile({padding :"10px 0px"})}
`
const Left = styled.div`
    flex:1;
    display: flex;
    align-items:center;
    ${mobile({marginLeft:"-10px",flex:3})}
`
const Language = styled.span`
    font-size: 16px;
    cursor: pointer;
    font-weight:bold;
    ${mobile({display :"none"})}
`
const SearchContainer = styled.div`
    border: none;   
    display: flex;
    align-items:center;
    justify-content:center;
    margin-left: 25px;
    margin-bottom: 0px;
    padding: 5px;
`
const Input = styled.input`
    
    ${mobile({ width:"50px"})}
`
const Center = styled.div`
    flex:1;
    text-align:center;
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize :"20px",alignItems:"center",justifyContent:"center",fontWeight:"900"})}
`
const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    ${mobile({flex:4,justifyContent :"center",marginLeft:"-3px"})}
`
const MenuItem = styled.div`
    margin-left:20px;
    font-size: 14px;
    cursor: pointer;
    ${mobile({fontSize :"12px", marginLeft:"10px"})}
`

const Navbar = () => {
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder='Search'/>
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
