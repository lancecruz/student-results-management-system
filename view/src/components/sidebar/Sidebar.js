import React from 'react'
import './Sidebar.css'
import SidebarItem from '../sidebar-item/SidebarItem'
import * as FAIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

let icons = [
    <MdIcons.MdDashboard/>,
    <FAIcons.FaAccessibleIcon/>
];

const sidebarMenu = [
    {
        title: "Classes",
        icon: icons[0],
        children: [
            {
                title: "All Classes",
                icon: <FAIcons.FaAccusoft/>,
                link: "/classes"
            },
            {
                title: "My Classes",
                icon: <FAIcons.FaAccusoft/>,
                link: "/classes/teacher/1"
            },
            {
                title: "Add Class",
                icon: <FAIcons.FaAccusoft/>,
                link: "/classes/add"
            }
        ]
    },
    {
        title: "Students",
        icon: <FAIcons.FaAccessibleIcon/>,
        children: [
            {
                title: "All Students",
                icon: <FAIcons.FaAccusoft/>,
                link: "/students"
            },
            {
                title: "My Students",
                icon: <FAIcons.FaAccusoft/>,
                link: "/students/teacher/1"
            },
            {
                title: "Add Student",
                icon: <FAIcons.FaAccusoft/>,
                link: "/students/add"
            }
        ]
    },
    {
        title: "Teachers",
        icon: <FAIcons.FaAccessibleIcon/>,
        link: '/teachers'
    },
    {
        title: "Grades",
        icon: <FAIcons.FaAccessibleIcon/>,
        children: [
            {
                title: "Sub One",
                icon: <FAIcons.FaAccusoft/>
            },
            {
                title: "Sub Two",
                icon: <FAIcons.FaAccusoft/>
            }
        ]
    }
];

const Sidebar = () => {
    return (
        <div className='sidebar'>
            {
                sidebarMenu.map((item, index) => (
                    <SidebarItem name={item.title} icon={item.icon} link={item.link} children={item.children} key={index} />
                ))
            }
        </div>
    )
}

export default Sidebar