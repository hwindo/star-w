import React, {Component} from 'react';
import api from '../api';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            page: 1,
            loading: false
        };
        this.loadMore = this.loadMore.bind(this);
    }

    get resource() {
        return this.props.match.params.resource ? this.props.match.params.resource : 'people';
    }

    componentDidMount() {
        this.initialLoad();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.initialLoad(nextProps.match.params.resource);
    }

    initialLoad(resource) {
        this.setState({list: [], loading: true});
        // let page = this.searchPage ? this.searchPage : this.state.page;
        let page = this.state.page;
        api.resource.list(resource ? resource : this.resource, page)
            .then(res => {
                const {results} = res.data;
                this.setState({
                    list: results,
                    loading: false
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    loadMore(resource) {
        this.setState({ loading: true });
        let page = this.state.page + 1;
        let _resource = resource ? resource : this.resource;
        console.log(_resource, page);
        api.resource.list(_resource, page)
            .then(res => {
                let currentList = this.state.list;
                const {results} = res.data;
                for (let value of results) {
                    currentList.push(value);
                }
                this.setState({
                    list: currentList,
                    loading: false,
                    page: page
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    get searchPage() {
        let search = this.props.location.search;
        return search.slice(search.length - 1, search.length);
    }

    render() {
        const items = this.state.list.map(item => <li key={item.name || item.title}>{item.name || item.title}</li>);
        return (
            <div>
                <h1>{this.resource} - {this.searchPage}</h1>
                <p>The {this.resource}</p>
                {this.state.loading ? <p><i className='fa fa-fw fa-spin fa-circle-o-notch'/> Loading...</p> : ''}
                <button onClick={this.loadMore}>Load More</button>
                <ul>
                    {items}
                </ul>
            </div>
        )
    }
}

export default List;