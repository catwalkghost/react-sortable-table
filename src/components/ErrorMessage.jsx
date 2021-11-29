import React from 'react';
import { useSelector } from 'react-redux';

const ErrorMessage = () => {

    const { table: { error } } = useSelector(state => state);

    return (
        <div className='col-center-center gaps-v-1'>
            <h1 className='font-h1'>⚠️</h1>
            <span className='fg-error'>{error}</span>
        </div>
    )
}

export default ErrorMessage
