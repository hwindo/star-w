import React, {Component} from 'react';
import api from '../api';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            page: 1,
            loading: false
        };
        this.loadMore = this.loadMore.bind(this);
        this.logResource = this.logResource.bind(this);
    }

    get resource() {
        return this.props.match.params.resource ? this.props.match.params.resource : 'people';
    }

    componentDidMount() {
        this.initialLoad();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ page: 1 }, () => {
            this.initialLoad(nextProps.match.params.resource);
        });

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

    loadMore() {
        this.setState({ loading: true });
        let page = this.state.page + 1;
        let currentList = this.state.list;

        console.log(this.resource, 'page:',  page);
        api.resource.list(this.resource, page)
            .then(res => {
                const {results} = res.data;
                console.log('results:', results);
                for (let value of results) {
                    currentList.push(value);
                }
                this.setState({
                    list: currentList,
                    loading: false,
                    page: page
                }, () => {
                    console.log('state list:', this.state.list);
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    get searchPage() {
        let search = this.props.location.search;
        return search.slice(search.length - 1, search.length);
    }

    logResource() {
        console.log(this.resource);
    }

    render() {
        const items = this.state.list.map(item => <li key={item.name || item.title}>{item.name || item.title}</li>);
        return (
            <div>
                <h1>{this.resource}</h1>
                <p>The {this.resource}</p>
                {this.state.loading ? <p><i className='fa fa-fw fa-spin fa-circle-o-notch'/> Loading...</p> : ''}
                <button onClick={this.loadMore}>Load More</button>
                <button onClick={this.logResource}>Log Resource</button>
                {/*TODO: put on its own component*/}
                <ul>
                    {items}
                </ul>
            </div>
        )
    }
}

export default Main;