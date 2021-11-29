import React from 'react';
import propTypes from 'prop-types';

import Pagination from './Pagination';
import RowsLimit from './RowsLimit';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import SearchBar from './SearchBar';

const Table = ({ data }) => {
    return (
        <div className='table-container'>
            <div className='top-bar'>
            <SearchBar />
            <RowsLimit />
            </div>
            <table className='table'>
                <TableHeader />
                <TableBody data={data}
                />
            </table>
            <Pagination />
        </div>
    );
}

Table.propTypes = {
    data: propTypes.arrayOf(
        propTypes.shape({
            firstName: propTypes.string,
            lastName: propTypes.string,
            dob: propTypes.string,
            income: propTypes.number
        })
    ).isRequired
}

export default Table;
