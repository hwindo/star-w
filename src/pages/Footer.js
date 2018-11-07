import React from 'react';
import {scrollTop} from "../helper";


export default () => {
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