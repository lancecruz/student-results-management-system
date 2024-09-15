import React from 'react'
import './Root.css'
import { Outlet } from 'react-router'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

const Root = () => {
    return (
        <div className='root'>
            <Navbar />
            <div className='content'>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default Root