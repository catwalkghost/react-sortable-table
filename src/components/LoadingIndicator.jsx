import React from 'react';
import propTypes from 'prop-types';

import { LOADING_TEXT } from '../lib/constants';

const LoadingIndicator = () => {
    return (
        <div className='col-center-center gaps-v-2'>
            <div className='pulsating' />
            <span className='fg-primary'>{ LOADING_TEXT }</span> :
        </div>
    )
}

LoadingIndicator.propTypes = {
    loadingText: propTypes.string.isRequired,
}

export default LoadingIndicator
