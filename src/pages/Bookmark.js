import React, {Component} from 'react';
import api from '../api';
import ListItem from "../components/ListItem";
import {isBookmarked} from "../helper";


class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarks: []
        };
        this.handleClearBookmark = this.handleClearBookmark.bind(this);
    }
    componentDidMount() {
        if (api.storage.check()) {
            this.setState({
                bookmarks: api.storage.load()
            });
        } else {
            console.log('no storage');
        }
    }

    handleClearBookmark(e) {
        e.preventDefault();
        api.storage.clear();
        this.setState({
            bookmarks: []
        });
    }

    render() {

        const items = this.state.bookmarks.map(item => <ListItem key={item.name || item.title}
                                                                    isBookmarked={isBookmarked(item.url, this.state.bookmarks)}
                                                                    data={item}/>);
        return (
            <div id="main">
                <header className='page-header'>
                    <h1 className='title'>Bookmark</h1>
                    <div className="action">
                        {items.length !== 0 ? <a className='clear-bookmark' href="/" onClick={this.handleClearBookmark}>clear bookmark</a> : ''}
                    </div>
                </header>
                <ul className='list-container'>
                    {items}
                    {items.length === 0 ? <li className='list-item full'>No Bookmark data found</li> : ''}
                </ul>
            </div>
        )
    }
}

export default Bookmark;