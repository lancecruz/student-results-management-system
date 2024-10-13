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
            <div className='login-page-container left'>
            </div>
            <div className='login-page-container right'>
                <div className='content-wrapper'>
                    <h1>Student Results Management System</h1>
                    <div className='login-form-container'>
                        <h2>Teacher Login</h2>
                        <input className='form-input' type='text' placeholder='Teacher Code'/>
                        <input className='form-input' type='text' placeholder='Password'/>
                        <input className='form-button' type='submit' onClick={handleFormSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin