import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react'
import styled  from 'styled-components'

const container = styled.div`
    height: 60px;
`

const wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Left = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`;


const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`;
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
border: none;

`;

const Center = styled.div`
    flex:1;
    text-align: center;
`;
const Logo = styled.h1`
    font-weight: bold;
`;
const Right = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px; 
`;

const Navbar = () => {  
  return (
    <container>
        <wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input/> 
                    <Search style={{color:"gray", fontsize:16}}/>
                </SearchContainer>
            </Left>
            <Center><Logo>BOSSDRIP.</Logo></Center>
            <Right>

                <MenuItem>REGISTER</MenuItem>
                <MenuItem>SIGN IN</MenuItem>
                <MenuItem>
                <Badge badgeContent={4} color="primary">
                    <ShoppingCartOutlined />
                    </Badge>
                </MenuItem>

            </Right>
        </wrapper>
    </container>
  );
};

export default Navbar;
