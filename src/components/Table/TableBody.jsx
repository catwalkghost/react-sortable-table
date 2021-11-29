import React from 'react';
import propTypes from 'prop-types';

import { map } from 'fpx';
import { useSelector } from 'react-redux';

import AmountWithCurrency from './AmountWithCurrency';

import { generateRandomId } from '../../utils/utils';

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
                        key={`row_${generateRandomId()}`}
                    >
                        {TABLE_HEADER.map(({ name }) =>
                            <td
                                className="table-cell"
                                key={name}
                            >
                                {name === 'income' ? <AmountWithCurrency value={item[name]} currency={CURRENCY_GBP} decimals={DEFAULT_FRACTION_DIGITS} /> : item[name]}
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
