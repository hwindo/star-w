import React from "react";
import {resources} from "../api";
import {NavLink} from "react-router-dom";
import logo from "../logo.svg";

export default (props) => {
    const list = resources.map(item => <li key={item} className='aside-item'><NavLink to={'/' + item} onClick={props.handleAsideMenuClick}>{item}</NavLink></li>)
    return (
        <aside id='aside-menu'>
            <ul className='aside-list'>
                <li key={'logo'} className='aside-item'>
                    <NavLink to="/" className="logo">
                        <img src={logo} className="app-logo -nav" alt="start-w logo"/>
                    </NavLink>
                </li>
                {list}
                <li key={'bookmark'} className='aside-item'>
                    <NavLink to={'/bookmark'} onClick={props.handleAsideMenuClick}>
                        <i className='fa fa-fw fa-bookmark'></i>
                        bookmark
                    </NavLink>
                </li>
                <li key={'close'} className='aside-item'>
                    <a href="/" onClick={props.handleCancelClick}>
                        <i className='fa fa-fw fa-close'></i>
                        Cancel
                    </a>
                </li>
            </ul>
        </aside>
    )
}