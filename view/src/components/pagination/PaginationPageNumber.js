import React from 'react'

const PaginationPageNumber = ({ onClick, pageNumber, currentPage }) => {
    const handleClick = () => {
        onClick(pageNumber);
    };

    return (
        <div className={ pageNumber == currentPage ? 'pagination-page-number active-page' : 'pagination-page-number' } onClick={handleClick}>
            <p>{pageNumber}</p>
        </div>
    )
}

export default PaginationPageNumber;