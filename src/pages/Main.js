import React, {Component} from 'react';
import api from '../api';
import ListItem from '../components/ListItem';
import LoadingBar from '../components/LoadingBar';
import {isBookmarked} from '../helper';
import SearchInput from '../components/SearchInput';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            page: 1,
            loading: false,
            atBottom: false,
            filterTxt: '',
            sortVal: '',
            sortType: 'ASC',
            bookmarks: []
        };
        this.loadMore = this.loadMore.bind(this);
        this.handleAtBottom = this.handleAtBottom.bind(this);
        this.handleFilterTxtChange = this.handleFilterTxtChange.bind(this);
        this.handleSelectSortVal = this.handleSelectSortVal.bind(this);
        this.handleSortType = this.handleSortType.bind(this);
        this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    }

    get resource() {
        return this.props.match.params.resource ? this.props.match.params.resource : 'people';
    }

    componentDidMount() {
        this.initialLoad();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleAtBottom);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.showSearchInput === nextProps.showSearchInput) {
            this.setState({
                page: 1,
                filterTxt: ''
            }, () => {
                this.initialLoad(nextProps.match.params.resource);
            });
        }
    }

    initialLoad(resource) {
        document.getElementById('filter-input').focus();

        if (api.storage.check()) {
            this.setState({
                bookmarks: api.storage.load()
            });
        } else {
            console.log('no storage');
        }

        this.setState({
            list: [],
            loading: true,
            atBottom: this.atBottom,
            filterTxt: ''
        }, () => {
            // listen scroll
            window.addEventListener('scroll', this.handleAtBottom);
        });
        // let page = this.searchPage ? this.searchPage : this.state.page;

        let page = this.state.page;
        api.resource.list(resource ? resource : this.resource, page)
            .then(async (res) => {
                const {results} = await res.data;
                this.setState({
                    list: results,
                    loading: false
                })
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    loading: false
                });
            });
    }

    handleAtBottom() {
        this.setState({
            atBottom: this.atBottom
        }, () => {
            if (this.state.atBottom) {
                this.loadMore();
            }
        });
    }

    loadMore() {
        this.setState({loading: true});
        let page = this.state.page + 1;
        let currentList = this.state.list;
        api.resource.list(this.resource, page)
            .then(async (res) => {
                const {results} = await res.data;
                for (let value of results) {
                    currentList.push(value);
                }
                this.setState({
                    list: currentList,
                    loading: false,
                    page: page
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    loading: false
                });
            });
    }

    get atBottom() {
        const scrollY = window.scrollY;
        const visibleScreen = document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomOfPage = scrollY + visibleScreen >= pageHeight;
        return bottomOfPage || pageHeight < visibleScreen;
    }

    get searchPage() {
        let search = this.props.location.search;
        return search.slice(search.length - 1, search.length);
    }

    get filteredList() {
        if (this.state.filterTxt !== '' && this.state.list.length !== 0) {
            let regex = new RegExp('' + this.state.filterTxt, 'i');
            return this.state.list.filter(item => {
                if (item.title) {
                    return item.title.match(regex);
                } else {
                    return item.name.match(regex);
                }
            });
        } else {
            return this.state.list;
        }
    }

    get sortedFilteredList() {
        let type = this.state.sortType;
        if (this.state.sortVal !== '') {
            return this.filteredList.sort((a, b) => {
                if (type === 'ASC') {
                    return a[this.state.sortVal] - b[this.state.sortVal];
                } else {
                    return b[this.state.sortVal] - a[this.state.sortVal];
                }
            });
        } else {
            return this.filteredList;
        }
    }

    handleFilterTxtChange(e) {
        const val = e.target.value;
        if (!val.includes('\\')) {
            this.setState({
                filterTxt: e.target.value
            });
        } else {
            console.log('your word include restricted type:', val);
        }
    }

    handleSelectSortVal(e) {
        this.setState({
            sortVal: e.target.value
        });
    }

    handleSortType(e) {
        this.setState({
            sortType: e.target.value
        });
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
        const items = this.sortedFilteredList.map(item => <ListItem key={item.name || item.title}
                                                                    isBookmarked={isBookmarked(item.url, this.state.bookmarks)}
                                                                    handleBookmarkClick={this.handleBookmarkClick}
                                                                    data={item}/>);
        // sort
        const sampleItem = this.sortedFilteredList[0];
        let keys = [];
        for (let key in sampleItem) {
            keys.push(key);
        }
        const options = keys.map(item => {
            return <option key={item} value={item}>{item}</option>
        });

        return (
            <div id='main'>
                <header className='page-header'>
                    {this.props.showSearchInput ? <SearchInput /> : ''}
                    <h1 className='title'>{this.resource}</h1>
                    <div className='action'>
                        <input id="filter-input" className='filter-input' type='text' onChange={this.handleFilterTxtChange}
                               placeholder='filter title or name' value={this.state.filterTxt}/>
                        sort by:
                        <select name='sort-val' value={this.state.sortVal} className='select-input'
                                onChange={this.handleSelectSortVal}>
                            <option value="">select property</option>
                            {options}
                        </select>
                        <select name="sort-type" onChange={this.handleSortType} className='select-input'>
                            <option value="ASC">Ascending</option>
                            <option value="DSC">Descending</option>
                        </select>
                    </div>
                </header>

                {/*TODO: put on its own component*/}
                <ul className='list-container'>
                    {items}
                    <li className='list-item full'> </li>
                </ul>

                {this.state.loading ? <LoadingBar/> : ''}

            </div>
        )
    }
}

export default Main;
