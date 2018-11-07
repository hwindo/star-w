import React, {Component} from 'react';
import BookmarkBtn from './BookmarkBtn';
import {NavLink} from "react-router-dom";
import {extractResource} from "../helper";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resource: this.props.resource,
            id: ''
        }
    }

    get title() {
        return this.props.data.name ? this.props.data.name : this.props.data.title;
    }



    render() {
        return (
            <li className='list-item'>

                <div className="resource-tag">
                    <div className="title">{this.props.resource}</div>
                    <div className='block'> </div>
                </div>
                <div className="title">
                    <NavLink to={'/' + extractResource(this.props.data.url).resource + '/' + extractResource(this.props.data.url).id}>
                        {this.title}
                    </NavLink>
                </div>
                <BookmarkBtn resource={this.props.resource} />

            </li>
        )
    }
}

export default ListItem;