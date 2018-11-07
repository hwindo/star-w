import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from "../logo.svg";
import {resources} from "../api";

const Header = (props) => {
    const list = resources.map(item => <li key={item} className='nav-item'><NavLink to={'/' + item}>{item}</NavLink></li>)
    return (
        <header id='app-header'>
            <nav>
                <div className='bar-menu'>
                    <a href="/"><i className='fa fa-fw fa-bars fa-2x' onClick={props.handleBarClick}></i></a>
                </div>
                <NavLink to="/" className="logo">
                    <img src={logo} className="app-logo -nav" alt="start-w logo"/>
                </NavLink>
                <ul className='desktop-menu'>
                    {list}
                    <li className='nav-item'>
                        <NavLink to='/bookmark'>
                            <i className='fa fa-fw fa-bookmark' />
                            bookmark
                        </NavLink>
                    </li>
                </ul>
                <div>
                    <a href="/" className='search-icon' onClick={props.handleSearchClick}>
                        search
                        <i className='fa fa-fw fa-search' />
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Header;