import React, { useEffect, useState } from 'react'
import './Classes.css'
import { useDispatch, useSelector } from 'react-redux';
import { addClass, addsClass } from '../../features/classes/classesSlice';
import { getAllTeachers } from '../../features/teachers/teachersSlice';
import { scheduleDays } from '../../data/dropdownValues';
import { useNavigate } from 'react-router';
import * as MDIcons from 'react-icons/md';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';

const breadcrumbData = [
    {
        name: 'Dashboard',
        link: '/'
    },
    {
        name: 'Classes',
        link: '/classes'
    },
    {
        name: 'Add Class',
        link: '/classes/add'
    }
];

const AddClass = () => {
    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.teachers);
    const [classCode, setClassCode] = useState('');
    const [className, setClassName] = useState('');
    const [scheduleDay, setScheduleDay] = useState('Monday');
    const [scheduleTime, setScheduleTime] = useState('8:00');
    const [scheduleList, setScheduleList] = useState([]);
    const [teacher, setTeacher] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        let classData = {
            classCode: classCode,
            className: className,
            teacherCode: teachers.teachers[teacher].teacher_code,
            scheduleList: scheduleList
        };

        dispatch(addClass(classData));
        alert("Class Added Successfully!");
        navigate('/classes');
    };
    
    const addSchedule = (event) => {
        event.preventDefault();

        if (teacher === '') {
            alert('Please select a teacher.');
            return;
        }

        setScheduleList([...scheduleList, { day: scheduleDay, time: scheduleTime, teacher: teachers.teachers[teacher] }]);
    };

    const updateTeacher = (e) => {
        setTeacher(e.target.value);
    };

    const removeClassSchedule = (index) => {
        setScheduleList(scheduleList.filter((item, itemIndex) => itemIndex !== index));
    };

    useEffect(() => {
        dispatch(getAllTeachers());
    }, []);

    return (
        <div className='classes'>
            <div className='classes-header'>
                <h1>
                    Add Class
                </h1>
                <Breadcrumbs data={breadcrumbData}/>
            </div>
            <div className='classes-form-container'>
                <form className='class-form' onSubmit={handleSubmit}>
                    <div className='class-form-input'>
                        <label htmlFor='classCode'>Class Code:</label>
                        <input id='classCode' type="text" value={classCode} onChange={(e) => setClassCode(e.target.value)} />
                    </div>
                    <div className='class-form-input'>
                        <label htmlFor='className'>Class Name:</label>
                        <input id='className' type="text" value={className} onChange={e => setClassName(e.target.value)}/>
                    </div>
                    <div className='class-form-input'>
                        <label htmlFor='teacherCode'>Teacher Code:</label>
                        <select id='teacherCode' value={teacher} onChange={updateTeacher}>
                            <option value={''}>-- Select Teacher --</option>
                            {
                                teachers.teachers.map((item, index) => (<option value={index}>{item.teacher_code + ' - ' + item.first_name + ' ' + item.last_name}</option>))
                            }
                        </select>
                    </div>
                    <div className='container flex-column'>
                        {/* Schedule Table */}
                        <br></br>
                        <h3>Class Schedule</h3>
                        <div className='class-form-select'>
                            <div className='dropdown-group flex flex-row-center'>
                                <label>Day</label>
                                <select value={scheduleDay} onChange={val => setScheduleDay(val.target.value)}>
                                    {
                                        scheduleDays.map(item => <option value={item}>{item}</option>)
                                    }
                                </select>
                            </div>
                            <div className='dropdown-group flex flex-row-center'>
                                <label>Time</label>
                                <select value={scheduleTime} onChange={val => setScheduleTime(val.target.value)}>
                                    <option value={'8:00'}>8:00</option>
                                    <option value={'9:00'}>9:00</option>
                                    <option value={'10:00'}>10:00</option>
                                    <option value={'11:00'}>11:00</option>
                                    <option value={'12:00'}>12:00</option>
                                    <option value={'13:00'}>13:00</option>
                                </select>
                            </div>
                            <div className='dropdown-group flex flex-row-center'>
                                <button onClick={addSchedule} className='button-add'>Add Schedule</button>
                            </div>
                        </div>
                        <table className='classes-table'>
                            <thead>
                                <tr>
                                    <th>Teacher</th>
                                    <th>Day</th>
                                    <th>Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    scheduleList.map((item, index) => <tr><td>{ item.teacher.first_name + ' ' + item.teacher.last_name + ' - ' + item.teacher.teacher_code }</td><td className='td-md'>{item.day}</td><td className='td-md'>{item.time}</td><td onClick={() => removeClassSchedule(index)}><MDIcons.MdDelete></MDIcons.MdDelete></td></tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='class-form-submit'>
                        <input type='submit' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddClass