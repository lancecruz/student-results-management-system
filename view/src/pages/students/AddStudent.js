import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { validateEmail } from '../../utils/commonFunctions';
import { useDispatch } from 'react-redux';
import { addStudent } from '../../features/students/studentsSlice';

const breadcrumbData = [
    {
        name: 'Dashboard',
        link: '/'
    },
    {
        name: 'Students',
        link: '/students'
    },
    {
        name: 'Add Student',
        link: '/students/add'
    }
];

const AddStudent = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [studentCode, setStudentCode] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     validateEmail(email);
    // }, [email]);

    useEffect(() => {
        generateStudentCode();
    }, []);

    const generateStudentCode = () => {

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addStudent());
    };

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Add Student</h1>
                <Breadcrumbs data={breadcrumbData} />
            </div>
            <div className='page-content-form'>
                <div className='page-content-header'>
                    <h2>Student Details</h2>
                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='form-input'>
                        <label htmlFor='firstName'>First Name:</label>
                        <input id='firstName' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className='form-input'>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input id='lastName' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='form-input'>
                        <label htmlFor='email'>E-Mail:</label>
                        <input id='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {/* <div className='form-input'>
                        <label htmlFor='studentCode'>Student Code:</label>
                        <input id='studentCode' type="text" readOnly value={studentCode} className='readonly' />
                    </div> */}
                    <div className='form-input'>
                        <label htmlFor='password'>Password:</label>
                        <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='form-input-submit'>
                        <input type='submit' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;