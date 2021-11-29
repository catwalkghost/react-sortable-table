import React from 'react';
import { map } from 'fpx';
import {useDispatch, useSelector} from 'react-redux';

import {fetchPageNumbers, handleChangePage} from '../../utils/utils';
import {LEFT_ARROW, RIGHT_ARROW} from '../../lib/constants';

const Pagination = () => {

    const dispatch = useDispatch();

    const { table: { rowsLimit, currentPage, data } } = useSelector(state => state);

    const pageNumbers = fetchPageNumbers(data.length, rowsLimit, currentPage);

    return (
        <div className="row-center-center gaps-h-0x5">
            {map(pageNumbers, pageNumber =>
                <button
                    className="page-number-button"
                    key={`page_${pageNumber}`}
                    onClick={() => handleChangePage(dispatch, pageNumber)}
                    disabled={currentPage === pageNumber}
                >
                    {
                     pageNumber === 'LEFT' ? LEFT_ARROW :
                     pageNumber === 'RIGHT' ? RIGHT_ARROW :
                     pageNumber
                    }
                </button>)
            }
        </div>
    );
}

export default Pagination;
