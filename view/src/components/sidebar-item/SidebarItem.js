import React, { useState } from 'react'
import * as FAIcons from 'react-icons/fa';
import './SidebarItem.css'
import { useNavigate } from 'react-router';

const SidebarItem = ({ name, icon, link, children }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const navigate = useNavigate();

    const test = () => {
        if (children === undefined) {
            console.log("Undefined");
        }
        if (children) {
            setIsSubMenuOpen(!isSubMenuOpen);
        } else {
            navigate(link);
        }
    }

    const onClick = (linkTo) => {
        navigate(linkTo);
    }

    return (
        <div className='sidebar-item'>
            <div className='sidebar-item-parent' onClick={test}>
                {
                    children === undefined ? (
                        <div className='sidebar-title'>
                            {icon}
                            <h3>{name}</h3>
                        </div>
                    )
                    :
                    (
                        <div className='sidebar-title'>
                            {icon}
                            <h3>{name}</h3>
                        </div>
                    )
                }
                
                {
                    children && (
                        <div className='sidebar-arrow'>
                            {
                                isSubMenuOpen ? 
                                (
                                    <FAIcons.FaAngleUp />
                                )
                                :
                                (
                                    <FAIcons.FaAngleDown />
                                )
                            }
                        </div>
                    )
                }
                
            </div>
            {
                (
                    children && (
                        <div className='sidebar-item-child'>
                            {
                                isSubMenuOpen === true ? 
                                    children.map((item, index) => 
                                        <div className='sidebar-item-child-title' onClick={() => onClick(item.link)} key={index} >
                                            <div className='sidebar-title'>
                                                {item.icon}
                                                <h3>{item.title}</h3>
                                            </div>
                                        </div>
                                    )
                                :
                                ""
                            }
                        </div>
                    )
                )
            }       
        </div>
    )
}

export default SidebarItem