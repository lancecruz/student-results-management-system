import React, { useEffect, useState } from 'react'
import './Classes.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteByID, getAllClasses } from '../../features/classes/classesSlice';
import * as MDIcons from 'react-icons/md';
import PaginationPageNumber from '../../components/pagination/PaginationPageNumber';
import { useNavigate } from 'react-router';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';

const sortOptions = [
    { value: 'code', label: 'Class Code' },
    { value: 'name', label: 'Class Name' }
];

const breadcrumbData = [
    {
        name: 'Dashboard',
        link: '/'
    },
    {
        name: 'Classes',
        link: '/classes'
    }
];

const tableItemsPerPageCount = 5;

const Classes = () => {
    const classes = useSelector((state) => state.classes.classes);
    const totalClasses = useSelector((state) => state.classes.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Table Variables
    const [sortBy, setSortBy] = useState('class_code');
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const handleChange = (e) => {
        setSortBy(e.target.value);
    }

    useEffect(() => {
        getClasses();
    }, [currentPage, itemsPerPage, sortBy]);

    useEffect(() => {
        initializeTablePages();
    }, [totalClasses, itemsPerPage]);

    const getClasses = () => {
        const listData = {
            currentPage,
            offset: itemsPerPage * (currentPage - 1),
            itemsPerPage,
            sortBy
        };

        dispatch(getAllClasses(listData))
            .then((results) => {
                // console.log(results);
                // console.log("Total Classes: " + classes);
                // console.log("Total Count: " + totalClasses);
            });
    };

    const initializeTablePages = () => {
        let tablePages = Math.ceil(totalClasses / itemsPerPage);
        let tempArr = [];

        for (let index = 1; index < tablePages + 1; index++) {
            tempArr.push(index);
        };

        setPages(tempArr);
    };

    const testClick = () => {
        console.log(currentPage);
    };

    const formatTimeToString = (time) => {
        if (time != undefined) {
            let timeString = time.toString();
            timeString = timeString.split(':');
    
            return `${timeString[0]}:${timeString[1]}`;
        } else {
            return '';
        }   
    };

    const updatePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(e.target.value);
        setCurrentPage(1);
    };

    const handleEdit = (item) => {
        navigate(`/classes/edit/${item.class_schedule_id}`);
    };

    const handleDelete = (item) => {
        if (window.confirm(`Are you sure you want to delete class ${item.class_code}?`) == true) {
            console.log(item);
            //alert("Deleting....");
            dispatch(deleteByID(item));
            getClasses();
        } else {
            
        }
    };

    return (
        <div className='classes'>
            {/* <button onClick={testClick}>Test</button> */}
            <div className='classes-header'>
                <h1>Class Schedules</h1>
                <Breadcrumbs data={breadcrumbData} />
            </div>
            <div className='classes-content'>
                <div className='flex'>
                    <div className='dropdown-small'>
                        <label htmlFor="sortBy">Sort By:</label>
                        <select name="sortBy" onChange={handleChange} value={sortBy}>
                            <option value="class_code">Class Code</option>
                            <option value="class_name">Class Name</option>
                        </select>
                    </div>
                    <div className='dropdown-small'>
                        <label htmlFor="itemPerPage">Items Per Page:</label>
                        <select name="itemPerPage" onChange={handleItemsPerPageChange} value={itemsPerPage}>
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                </div>
                <table className='classes-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Class Code</th>
                            <th>Class Name</th>
                            <th>Class Time</th>
                            <th>Class Day</th>
                            <th>Teacher</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes && classes.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.class_code}</td>
                                    <td>{item.class_name}</td>
                                    <td>{formatTimeToString(item.class_time)}</td>
                                    <td>{item.class_day}</td>
                                    <td>{item.first_name + " " + item.last_name}</td>
                                    <td className='table-actions'>
                                        <MDIcons.MdEdit onClick={() =>handleEdit(item)}></MDIcons.MdEdit>
                                        <MDIcons.MdDelete onClick={() => handleDelete(item)}></MDIcons.MdDelete>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className='pagination'>
                    {
                        pages.map((item, index) => 
                            <PaginationPageNumber onClick={updatePage} pageNumber={item} currentPage={currentPage} key={index} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Classes