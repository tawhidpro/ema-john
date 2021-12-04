import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <img to="/" src={logo} alt="" />
            
            <nav>
                
                <Link to="/shop">Shop</Link>
                <Link to="/review">order review</Link>
                <Link to="/inventory">Manage inventory</Link>
                <Link to="/shipment">Shipment</Link>
                <Link to="/login">Login/signIn</Link>
                <Link to="/book">Bookings</Link>
            </nav>
        </div>
    );
};

export default Header;