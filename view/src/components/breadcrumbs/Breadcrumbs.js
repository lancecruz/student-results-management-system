import React from 'react'
import './Breadcrumbs.css'
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ data }) => {
    return (
        <div>
            <ul className='breadcrumbs'>
                {
                    data.map((item, index) => (
                        index + 1 == data.length ? <li className='breadcrumbs-item'><Link className='breadcrumbs-link breadcrumbs-item-active' to={item.link}>{item.name}</Link></li>
                        :
                        <li className='breadcrumbs-item'><Link className=' breadcrumbs-link' to={item.link}>{item.name}</Link></li>
                    ))
                }
                <p>test</p>
            </ul>
        </div>
    )
}

export default Breadcrumbs