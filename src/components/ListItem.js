import React, {Component} from 'react';

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
                    <div className='block'></div>
                </div>
                <div className="title">{this.title}</div>
            </li>
        )
    }
}

export default ListItem;