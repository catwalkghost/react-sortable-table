import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNat } from 'fpx';
import propTypes from 'prop-types';

import { handleRowsLimit } from '../../utils/utils';

const RowsLimit = () => {
    return (
        <div className='rows-limit'>
            <RowsLimitButton limit={10} />
            <RowsLimitButton limit={30} />
        </div>
    );
}

const RowsLimitButton = ({ limit }) => {
    const dispatch = useDispatch();
    const { table: { rowsLimit } } = useSelector(state => state);

    const label = `${limit} per Page`;

    if (isNat(limit)) {
        return (
            <button
                className='rows-limit-button'
                type='button'
                disabled={rowsLimit === limit}
                onClick={() => handleRowsLimit(dispatch,limit)}
            >
                {label}
            </button>
        );
    } return null;
}

RowsLimitButton.propTypes = {
    limit: propTypes.number.isRequired,
}

export default RowsLimit;
