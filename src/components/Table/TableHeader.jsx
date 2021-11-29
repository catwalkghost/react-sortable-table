import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'fpx';

import { handleSorting, toClassNameString } from '../../utils/utils';
import {TABLE_HEADER} from '../../lib/constants';

const TableHeader = () => {

    const { table: { sort, sortField } } = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <thead>
        <tr className='table-row table-header'>
            { map(TABLE_HEADER, ({ name, columnName, align, classes }) => {
                const sorting = name === sortField ? sort : null;
                return (
                    <td
                        className={toClassNameString('table-cell', classes)}
                        key={name}
                        align={align}
                    >
                        {columnName}
                        <button
                            type='button'
                            onClick={() => handleSorting(dispatch, name, sort, sortField)}
                        >
                            <span className='margin-l-0x5 font-small'>
                                {sorting === 'ASC' ? '▲' : '▼'}
                            </span>
                        </button>
                    </td>
                );
            })}
        </tr>
        </thead>
    );
}

export default TableHeader;
