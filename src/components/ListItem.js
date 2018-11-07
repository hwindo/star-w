import React, {Component} from 'react';
import BookmarkBtn from './BookmarkBtn';
import {NavLink} from "react-router-dom";
import {extractResource} from "../helper";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resource: this.resource,
            id: this.id
        }
    }

    get title() {
        return this.props.data.name ? this.props.data.name : this.props.data.title;
    }

    get resource() {
        return extractResource(this.props.data.url).resource;
    }

    get id() {
        return extractResource(this.props.data.url).id;
    }

    render() {
        return (
            <li className='list-item'>

                <div className="resource-tag">
                    <div className="title">{this.resource}</div>
                    <div className='block'></div>
                </div>
                <div className="title">
                    <NavLink
                        to={'/' + this.resource + '/' + this.id}>
                        {this.title}
                    </NavLink>
                </div>
                <BookmarkBtn resource={this.resource} id={this.state.id} url={this.props.data.url} title={this.title}/>

            </li>
        )
    }
}

export default ListItem;