import React from 'react';
import propTypes from 'prop-types';

import { map } from 'fpx';
import { useSelector } from 'react-redux';

import { toClassNameString } from '../../utils/utils';
import AmountWithCurrency from './AmountWithCurrency';

import {
    TABLE_HEADER,
    CURRENCY_GBP,
    DEFAULT_FRACTION_DIGITS
} from '../../lib/constants';

const TableBody = ({ data }) => {

    const { table: { rowsLimit, currentPage } } = useSelector(state => state);
    const tableSlice = data.slice((rowsLimit * (currentPage - 1)), currentPage * rowsLimit);

    return (
        <tbody className="table-body">
            { map(tableSlice,item => {
                return (
                    <tr
                        className="table-row table-content"
                        key={`row_${item.id}`}
                    >
                        {TABLE_HEADER.map(({ name, align, classes}) =>
                            <td
                                className={toClassNameString('table-cell', classes)}
                                key={name}
                                align={align}
                            >
                                {name === 'salary' ? <AmountWithCurrency value={item[name]} currency={CURRENCY_GBP} decimals={DEFAULT_FRACTION_DIGITS} /> : item[name]}
                            </td>)}
                    </tr>
                )
            })}
        </tbody>
    );
}

TableBody.propTypes = {
    data: propTypes.arrayOf(
        propTypes.shape({
            firstName: propTypes.string,
            lastName: propTypes.string,
            dob: propTypes.string,
            income: propTypes.number
        })
    ).isRequired
}

export default TableBody;
