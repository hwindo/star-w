import React, {Component} from 'react';
import BookmarkBtn from './BookmarkBtn';

class ListItem extends Component {
    constructor(props) {
        super(props);
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
                <div className="title">{this.title}</div>
                <BookmarkBtn resource={this.props.resource} />
            </li>
        )
    }
}

export default ListItem;