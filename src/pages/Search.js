import React, {Component} from 'react';
import SearchInput from "../components/SearchInput";
import ListItem from "../components/ListItem";
import {isBookmarked} from "../helper";
import api from '../api';
import LoadingBar from "../components/LoadingBar";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: false,
        };
        this.initialLoad = this.initialLoad.bind(this);
        this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    }

    componentDidMount() {
        this.initialLoad(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.initialLoad(nextProps);
    }

    initialLoad(props) {
        if (api.storage.check()) {
            this.setState({
                bookmarks: api.storage.load()
            });
        } else {
            console.log('no storage');
        }

        this.setState({
            loading: true,
            bookmarks: []
        });
        api.resource.search(props.match.params.text)
            .then(res => {
                this.setState({
                    loading: false,
                    list: res.data.results
                });
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
            })
    }

    handleBookmarkClick(item) {
        let newArr = this.state.bookmarks;
        let urls = newArr.map(_item => _item.url);
        let index = urls.indexOf(item.url);

        if (index < 0) {
            newArr.push(item);
        } else {
            newArr.splice(index, 1);
        }

        this.setState({
            bookmarks: newArr
        }, () => {
            api.storage.save(this.state.bookmarks)
        });
    }

    render() {
        const items = this.state.list.map(item => <ListItem key={item.name || item.title}
                                                                    isBookmarked={isBookmarked(item.url, this.state.bookmarks)}
                                                                    handleBookmarkClick={this.handleBookmarkClick}
                                                                    data={item}/>);
        return (
            <div id="main">
                <header className='page-header'>
                    {this.props.showSearchInput ? <SearchInput /> : ''}
                </header>

                <ul className='list-container'>
                    {items}
                    <li className='list-item full'> </li>
                </ul>

                {this.state.loading ? <LoadingBar/> : ''}
            </div>
        )
    }
}

export default Search;