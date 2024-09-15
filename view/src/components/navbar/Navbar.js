import React from 'react'
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        alert("test");
        navigate("/");
    }

    return (
        <div className='navbar'>
            <div className='navbar-main'>
                <h3>SRMS | TEACHER</h3>
            </div>
            <div className='navbar-sub'>
                <button className="btn-log-out" onClick={handleLogOut}>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar