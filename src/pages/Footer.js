import React from 'react';

export default () => {
    function scrollTop(e) {
        e.preventDefault();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    return (
        <footer id='app-footer'>
            <div className="container">
                <div className='go-top'>
                    <a href='/' onClick={scrollTop}>
                        go to top
                        <i className='fa fa-fw fa-arrow-up'/>
                    </a>
                </div>
            </div>
        </footer>
    );
}