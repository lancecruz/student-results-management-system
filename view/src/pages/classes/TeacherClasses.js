import React, { useEffect, useState } from 'react'
import './Classes.css'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import DataTable from '../../components/dataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getClassesByTeacherCode } from '../../features/classes/classesSlice';
import { useParams } from 'react-router';

const tempData = [
    { name: 'Lance', age: 5 },
    { name: 'Ollie', age: 2 },
    { name: 'Lyca', age: 22 }
];

const TeacherClasses = () => {
    const { code } = useParams()
    const classes = useSelector(state => state.classes.teacherClasses);
    const classesCount = useSelector(state => state.classes.teacherClassesCount);
    const dispatch = useDispatch();
    const tableHeaders = ['Class Name', 'Class Code', 'Day', 'Time'];
    const sortByData = [{ name: 'Class Name', value: 'class_name'}, { name: 'Class Code', value: 'class_code'}];

    // Table Variables
    const [sortBy, setSortBy] = useState('class_code');
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const breadcrumbData = [
        {
            name: 'Dashboard',
            link: '/'
        },
        {
            name: 'My Classes',
            link: '/classes/teacher/:id'
        }
    ];

    useEffect(() => {
        // Get classes by teacher code.
        const listData = {
            teacherCode: code,
            currentPage,
            offset: itemsPerPage * (currentPage - 1),
            itemsPerPage,
            sortBy
        };

        dispatch(getClassesByTeacherCode(listData));
    }, [currentPage, itemsPerPage, sortBy]);

    useEffect(() => {
        initializeTablePages();
    }, [classesCount, itemsPerPage]);

    const initializeTablePages = () => {
        let tablePages = Math.ceil(classesCount / itemsPerPage);
        let tempArr = [];

        for (let index = 1; index < tablePages + 1; index++) {
            tempArr.push(index);
        };

        setPages(tempArr);
    };

    const handleSortChange = (sort) => {
        setSortBy(sort);
        alert("Value changed!");
    }

    const updatePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (items) => {
        setItemsPerPage(items);
        setCurrentPage(1);
    };

    return (
        <div className='classes'>
            <div className='classes-header'>
                <h1>My Class Schedule</h1>
                <Breadcrumbs data={breadcrumbData} />
            </div>
            <div className='classes-content'>
                <DataTable data={classes} headers={tableHeaders} onSortChange={handleSortChange} sortValues={sortByData} sortByValue={sortBy} pages={pages} onPageUpdate={updatePage} page={currentPage} itemsPerPage={itemsPerPage} onItemsPerPageChange={handleItemsPerPageChange} />
            </div>
        </div>
    )
}

export default TeacherClasses