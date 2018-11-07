import React from "react";
import {resources} from "../api";
import {NavLink} from "react-router-dom";

export default (props) => {
    const list = resources.map(item => <li key={item} className='aside-item'><NavLink to={'/' + item} onClick={props.handleAsideMenuClick}>{item}</NavLink></li>)
    return (
        <aside id='aside-menu'>
            <ul className='aside-list'>
                {list}
                <li key={'bookmark'} className='aside-item'>
                    <NavLink to={'/bookmark'} onClick={props.handleAsideMenuClick}>
                        <i className='fa fa-fw fa-bookmark'></i>
                        bookmark
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}