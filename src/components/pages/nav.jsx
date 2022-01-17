import React from 'react'
import { Link } from 'react-router-dom';
import "./nav.css"


const Nav = () => {
    return (
        <div>
            <nav className='nav-bar'>
                <h1 className='logo'>logo</h1>
                <ul className='list'>
                    <Link to="/about">About</Link>
                    <Link to="/shop">Shop</Link>
                    
                </ul>
            </nav>
        </div>
    )
}

export default Nav;
