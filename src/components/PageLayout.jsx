import React from 'react';
import { useSelector } from 'react-redux';

import Table from './Table/Table';
import PieChart from './Chart/PieChart';
import { filterData, sortData } from '../utils/utils';

const PageLayout = () => {

    const { table: { data, sortField, sort }, search: { searchValue } } = useSelector(state => state);

    const sortedData = sortData(data, sortField, sort);
    const filteredData = filterData(sortedData, searchValue);

    return (
        <div className='content-container'>
            <PieChart data={filteredData} />
            <Table data={filteredData} />
        </div>
    );
}

export default PageLayout;
