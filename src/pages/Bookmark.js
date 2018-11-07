import React, {Component} from 'react';
import api from '../api';
import BookmarkBtn from "../components/BookmarkBtn";
import ListItem from "../components/ListItem";


class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarks: []
        }
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
    render() {

        const items = this.state.bookmarks.map(item => <ListItem key={item.name || item.title}
                                                                    data={item}/>);
        return (
            <div id="main">
                <header className='page-header'>
                    <h1 className='title'>Bookmark</h1>
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