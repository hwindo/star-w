import React from 'react';

function LoadingBar() {
    return (
        <div className='loading-bar'>
            <div className='title'><i className='fa fa-fw fa-spin fa-circle-o-notch'/>Loading...</div>
        </div>
    )
}

export default LoadingBar;