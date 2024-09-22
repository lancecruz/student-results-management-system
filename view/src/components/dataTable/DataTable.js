import React, { useEffect, useState } from 'react';
import PaginationPageNumber from '../../components/pagination/PaginationPageNumber';
import './DataTable.css';

const testData = [
    'ID',
    'Name',
    'Age'
];

const DataTable = ({ data, headers, onSortChange, sortValues, sortByValue, pages, onPageUpdate, page, itemsPerPage, onItemsPerPageChange }) => {
    const [dataArray, setDataArray] = useState([]);

    const initializeData = () => {
        setDataArray([]);
        let tempArr = [];

        data.map(item => {
            let rowArray = [];

            for (const property in item) {
                rowArray.push(item[property]);    
            };

            tempArr.push(rowArray);
        });

        setDataArray(tempArr);
    };

    useEffect(() => {
        initializeData();
    }, [data, sortByValue]);

    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        onPageUpdate(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        onItemsPerPageChange(e.target.value);
    };

    const testButton = () => {
        //initializeData();
        console.log(data);
    };  

    return (
        <div>
            {/* <button onClick={testButton}>test</button> */}
            <div className='flex'>
                <div className='dropdown-small'>
                    <label htmlFor="sortBy">Sort By:</label>
                    <select name="sortBy" onChange={handleSortChange} value={sortByValue}>
                        {
                            sortValues.map((item, index) => <option key={index} value={item.value}>{item.name}</option>)
                        }
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
            <table className='data-table'>
                <thead>
                    <tr>
                        {
                            headers.map((item, index) => <th key={index}>{item}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        dataArray.map((rowData, index) => (
                            <tr key={index}>
                                {
                                    rowData.map((item, index2) => <td key={index2}>{item}</td>)
                                }   
                            </tr>))
                    }
                </tbody>
            </table>
            <div className='pagination'>
                {
                    pages.map(item => 
                    <PaginationPageNumber onClick={handlePageChange} pageNumber={item} currentPage={page} />
                    )
                }
            </div>
        </div>
    )
}

export default DataTable;