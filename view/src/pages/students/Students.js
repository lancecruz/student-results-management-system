import React, { useEffect } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';

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
    

    useEffect(() => {

    }, []);

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Students</h1>
                <Breadcrumbs data={breadcrumbData} />
            </div>
            <div className='page-content'>

            </div>
        </div>
    );
};

export default Students;