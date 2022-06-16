import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styledComponents from 'styled-components'

const Container = styledComponents.div`
    height: 60px;
`
const Wrapper = styledComponents.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Left = styledComponents.div`
    flex:1;
    display: flex;
    align-items: center;
`
const Language = styledComponents.span`
    font-size:14;
    cursor: pointer;
`
const SearchContainer = styledComponents.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styledComponents.input`
    border:none;
`

const Center = styledComponents.div`
    flex:1;
    text-align: center;
`
const Logo = styledComponents.h1`
    font-weight: bold;
`
const Right = styledComponents.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const MenuItems = styledComponents.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`


const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left><Language>EN</Language>
                    <SearchContainer>
                        <Input />
                        <Search style={{color:"gray", fontSize:16}} />
                    </SearchContainer>
                </Left>
                <Center><Logo>KALAA.COM</Logo></Center>
                <Right>
                    <MenuItems>Register</MenuItems>
                    <MenuItems>Sign In</MenuItems>
                    <MenuItems>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItems>
                </Right>
            </Wrapper>

        </Container>
    )
}

export default Navbar