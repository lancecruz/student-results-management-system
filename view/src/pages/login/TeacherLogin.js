import React from 'react'
import './login.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const TeacherLogin = () => {
    const navigate = useNavigate();
    const [test, setTest] = useState();

    const handleFormSubmit = () => {
        alert("test");
        navigate('/dashboard');
    };

    return (
        <div className='login-page'>
            <h1>Teacher Login</h1>
            <div className='login-form'>
                <input className='form-input' type='text' placeholder='username'/>
                <input className='form-input' type='text' placeholder='password'/>
                <input className='form-button' type='submit' onClick={handleFormSubmit}/>
            </div>
        </div>
    )
}

export default TeacherLogin