import React, {Component} from 'react';
import api from '../api';
import LoadingBar from '../components/LoadingBar';
import BookmarkBtn from "../components/BookmarkBtn";
import DetailItem from "../components/DetailItem";


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            loading: false
        };
        this.handleMount = this.handleMount.bind(this);
    }

    get resource() {
        return this.props.match.params.resource;
    }

    get id() {
        return this.props.match.params.id;
    }

    get title() {
        return this.state.item.hasOwnProperty('name') ? this.state.item.name : this.state.item.title;
    }

    componentDidMount() {
        this.handleMount(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.handleMount(nextProps);
    }

    handleMount(props) {
        let resource = props.match.params.resource;
        let id = props.match.params.id;
        this.setState({
            loading: true
        });
        api.resource.get(resource, id)
            .then(res => {
                console.log('res.data', res.data);
                this.setState({
                    item: res.data,
                    loading: false
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    loading: false
                })
            });
    }

    render() {
        let list = [];
        for (let k in this.state.item) {
            list.push(<DetailItem key={k} name={k} val={this.state.item[k]}/>)
        }
        let description = '';
        switch (this.resource) {
            case 'films':
                description = this.state.item.opening_crawl;
                break;
            case 'starships':
            case 'vehicles':
                description = this.state.item.manufacturer;
                break;
            case 'species':
                description = this.state.item.classification;
                break;
            case 'planets':
                description = this.state.item.climate;
                break;
            case 'people':
                description = this.state.item.hair_color + ' ' + this.state.item.gender;
                break;
            default:
                description = '';
        }
        if (this.state.loading) {
            return (<LoadingBar/>);
        } else {
            return (
                <div id="main">
                    <header className='page-header'>
                        <h1 className='title'>{this.title}</h1>
                        <p className='subtitle'>{this.resource}</p>
                        <p className='description'>{description}</p>
                        <div className="action">
                            <BookmarkBtn type='normal' id={this.id} resource={this.resource} url={this.state.item.url}
                                         title={this.title}/>
                        </div>
                    </header>
                    <div className="detail-content">
                        <table>
                            <thead>
                            <tr>
                                <th>Key</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }

}

export default Detail;