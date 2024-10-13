import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import DataTable from '../../components/dataTable/DataTable';

const breadcrumbData = [
    {
        name: 'Dashboard',
        link: '/'
    },
    {
        name: 'Students',
        link: '/students'
    }
];

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {

    }, []);

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Students</h1>
                <Breadcrumbs data={breadcrumbData} />
            </div>
            <div className='page-content'>
                <DataTable data={students} />
            </div>
        </div>
    );
};

export default Students;