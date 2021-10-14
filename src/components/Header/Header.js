import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../images/logo.png'
import "./Header.css"
const Header = () => {
    const logoutIcon = <FontAwesomeIcon icon={faSignOutAlt} />;
    const {user,logout} = useAuth()
    return (
        <div className='header'>
            <img className='logo' src={logo} alt="" />
            <nav>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/orderreview">Order Review</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>
               {user.email&& <span style={{color:'white'}}>Hello : {user.displayName } </span>}
                {user.email?
                <button onClick={logout} style={{cursor:'pointer'}}>{logoutIcon}</button>:
                    <NavLink to="/login">Login</NavLink>}
            </nav>
        </div>
    );
};

export default Header;