import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTableData } from '../Store/tableSlice';

import {
    LOADING_TEXT,
    STATUS_IDLE,
    STATUS_FAILED,
    STATUS_SUCCEEDED,
    STATUS_LOADING
} from '../lib/constants';

import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import PageLayout from './PageLayout';


const Layout = () => {

    const { table: { status } } = useSelector(state => state);

    const dispatch = useDispatch();
    useEffect(() => {
        if (status === STATUS_IDLE) {
            dispatch(fetchTableData())
        }
    }, [status, dispatch]);

    const isLoading = status === STATUS_LOADING;
    const tableLoaded = status === STATUS_SUCCEEDED;
    const loadingError = status === STATUS_FAILED;

    let content;

    if (isLoading) {
        content = <LoadingIndicator loadingText={LOADING_TEXT} />;
    } else if (tableLoaded) {
        content = <PageLayout />
    } else if (loadingError) {
        content = <ErrorMessage />;
    }

    return (
        <div
            id='top'
            /*
            Careful: tricky layout. The parent stretches itself to 100vh and uses
            flexbox rules to vertically stretch the first child, which holds the
            site background. The background child overrides 100vh only when it's larger.
            As a result, the larger of the two heights is used.
            */
            className='layout-container stretch-to-viewport-v row-center-stretch'>
                <div className='inner-layout-container'>
                    {content}
                </div>
        </div>
    );
}

export default Layout;
