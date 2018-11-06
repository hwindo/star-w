import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from "../logo.svg";

const resources = ['people', 'films', 'starships', 'vehicles', 'species', 'planets'];

const Header = () => {
    const list = resources.map(item => <li className='nav-item'><NavLink to={'/' + item}>{item}</NavLink></li>)
    return (
        <header id='app-header'>
            <nav>
                <NavLink to="/" className="logo">
                    <img src={logo} className="app-logo -nav" alt="start-w logo"/>
                </NavLink>
                <ul>
                    {list}
                    <li className='nav-item'><NavLink to='/bookmarked'>bookmark</NavLink></li>
                </ul>
                <div>
                    <a>search</a>
                </div>
            </nav>
        </header>
    );
};

export default Header;