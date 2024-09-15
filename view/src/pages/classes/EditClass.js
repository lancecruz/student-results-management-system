import React, { useEffect, useState } from 'react'
import './Classes.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import * as MDIcons from 'react-icons/md';
import { editClassScheduleByID, getClassByClassScheduleID } from '../../features/classes/classesSlice';
import { getAllTeachers } from '../../features/teachers/teachersSlice';
import { formatTimeToString } from '../../utils/commonFunctions';
import { scheduleDays } from '../../data/dropdownValues';
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
        name: 'Edit Class',
        link: '/classes/edit'
    }
];

const EditClass = () => {
    const dispatch = useDispatch();
    const classes = useSelector((state) => state.classes.classes);
    const classSchedule = useSelector(state => state.classes.classSchedule);
    const { id } = useParams();
    const [chosenClass, setChosenClass] = useState({});
    const teachers = useSelector((state) => state.teachers);
    const [classCode, setClassCode] = useState('');
    const [className, setClassName] = useState('');
    const [scheduleDay, setScheduleDay] = useState('Monday');
    const [scheduleTime, setScheduleTime] = useState('8:00');
    const [scheduleList, setScheduleList] = useState([]);
    const [teacher, setTeacher] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Initialize');
        console.log(id);

        dispatch(getAllTeachers());
        dispatch(getClassByClassScheduleID(id));

        // if (classes.length > 0) {
        //     console.log('Has CLasses');
        //     setChosenClass(classes.filter((item) => item.id == id));
        // } else {
        //     // Initialize Classes
        //     console.log('Has no CLasses');
        //     dispatch(getClassByClassScheduleID(id));
        //     initializeFields();
        // }
    }, []);

    useEffect(() => {
        initializeFields();
    }, [classSchedule]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const classScheduleData = {
            class_schedule_id: id,
            teacher_code: teacher,
            class_day: scheduleDay,
            class_time: scheduleTime
        };

        dispatch(editClassScheduleByID(classScheduleData));
        alert("Class updated successfully!");
        navigate('/classes');
    };

    const updateTeacher = (e) => {
        setTeacher(e.target.value);
    };

    const initializeFields = () => {
        setChosenClass(classSchedule);
        setTeacher(classSchedule.teacher_code);

        let classTime = formatTimeToString(classSchedule.class_time);
        setScheduleTime(classTime);
        setScheduleDay(classSchedule.class_day);
    };

    const test = () => {
        console.log(classSchedule);
    };

    return (
        <div className='classes'>
            {/* <button onClick={test}>Test</button> */}
            <div className='classes-header'>
                <h1>
                    Update Schedule
                </h1>
                <Breadcrumbs data={breadcrumbData} />
            </div>
            <div className='classes-form-container'>
                <form className='class-form' onSubmit={handleSubmit}>
                    <div className='class-form-input'>
                        <label htmlFor='classCode'>Class Code:</label>
                        <input className='readonly' id='classCode' type="text" value={chosenClass.class_code} readOnly/>
                    </div>
                    <div className='class-form-input'>
                        <label htmlFor='className'>Class Name:</label>
                        <input className='readonly' id='className' type="text" value={chosenClass.class_name} onChange={e => setClassName(e.target.value)} readOnly/>
                    </div>
                    <div className='class-form-input'>
                        <label htmlFor='teacherCode'>Teacher Code:</label>
                        <select id='teacherCode' value={teacher} onChange={updateTeacher}>
                            <option value={''}>-- Select Teacher --</option>
                            {
                                teachers.teachers.map((item, index) => (<option value={item.teacher_code}>{item.teacher_code + ' - ' + item.first_name + ' ' + item.last_name}</option>))
                            }
                        </select>
                    </div>
                    <div className='class-form-input'>
                        <label htmlFor='classTime'>Time:</label>
                        <select id='classTime' value={scheduleTime} onChange={val => setScheduleTime(val.target.value)}>
                            <option value={'8:00'}>8:00</option>
                            <option value={'9:00'}>9:00</option>
                            <option value={'10:00'}>10:00</option>
                            <option value={'11:00'}>11:00</option>
                            <option value={'12:00'}>12:00</option>
                            <option value={'13:00'}>13:00</option>
                        </select>
                    </div>
                    <div className='class-form-input'>
                        <label htmlFor='classDay'>Day:</label>
                        <select value={scheduleDay} onChange={val => setScheduleDay(val.target.value)}>
                            {
                                scheduleDays.map(item => <option value={item}>{item}</option>)
                            }
                        </select>
                    </div>
                    <div className='class-form-submit'>
                        <input type='submit' value={'Update Schedule'} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditClass