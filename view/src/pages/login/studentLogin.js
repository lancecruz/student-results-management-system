import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doSomething, studentLogin } from '../../features/login/loginSlice';

const StudentLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector(state => state.login);
    const [studentCode, setStudentCode] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = () => {
        let loginData = {
            studentCode,
            password
        };

        dispatch(studentLogin(loginData));
    };

    const testButton = () => {
        dispatch(doSomething());
    };

    return (
        <div className='login-page'>
            <button onClick={testButton}>Button</button>
            <div className='login-page-container left'>
            </div>
            <div className='login-page-container right'>
                <div className='content-wrapper'>
                    <h1>Student Results Management System</h1>
                    <div className='login-form-container'>
                        <h2>Student Login</h2>
                        {
                            account.error == true ? (<p>Student Code or password is incorrect.</p>)
                            : ''
                        }
                        <input className='form-input' type='text' value={studentCode} placeholder='Student Code' onChange={e => setStudentCode(e.target.value)}/>
                        <input className='form-input' type='password' value={password} placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                        <input className='form-button' type='submit' onClick={handleFormSubmit}/>
                        <Link to={'/dashboard'}><p>Forgot password?</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentLogin