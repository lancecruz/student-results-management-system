import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import bg from '../../images/login_bg.jpg';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {

    };
    
    const handleStudentLoginClick = () => {
        navigate('/login/student');
    };

    const handleTeacherLoginClick = () => {
        navigate('/login/teacher');
    };

    return (
        <div className='login-page'>
            <div className='login-page-container left'>
            </div>
            <div className='login-page-container right'>
                <div className='content-wrapper'>
                    <h1>Student Results Management System</h1>
                    <button className='login-button' onClick={handleStudentLoginClick}>Student Login</button>
                    <button className='login-button' onClick={handleTeacherLoginClick}>Teacher Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;