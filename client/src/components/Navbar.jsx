import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import   Badge   from '@material-ui/core/Badge';
import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { logOut } from '../redux/userRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none"})}
`;
const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px"})}
`;

const Center = styled.div`
flex: 1;
text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px"})}
`
const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex:2, justifyContent: "center"})}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "10px", marginLeft: "10px"})}
`;

//function to use Logout reducer and return to home page


const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  const isLogged = useSelector(state=>state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch(logOut());
    navigate('/');
};

  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input />
                    <Search  style={{color: "gray", fontSize: 16}}/>
                </SearchContainer>
            </Left>
            <Center><Logo>STORE.</Logo></Center>
            <Right>
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/register">
                    <MenuItem>REGISTER</MenuItem>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/login">
                    <MenuItem>SIGN IN</MenuItem>
                </Link>
                {isLogged &&
                    <Link style={{ textDecoration: 'none', color: 'black' }} onClick={handleLogOut}>
                        <MenuItem>LOG OUT</MenuItem>
                    </Link>
                }
                <Link to="/cart">
                <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlined />
                    </Badge>
                </MenuItem>
                </Link>
            </Right>
        </Wrapper>

    </Container>
  )
}

export default Navbar