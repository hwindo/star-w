import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.handleKeydown = this.handleKeydown.bind(this);
    }
    componentDidMount() {
        document.getElementById('search-input').focus();
        window.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    handleKeydown(e) {
        switch (e.keyCode) {
            case 13:
                this.props.history.push('/search/' + e.target.value)
                break;
            case 27:
                // this.setState({addMode: false});
                break;
            default:
                break;
        }
    }

    render() {
        return(
            <input id='search-input' type="text" className='search-input' placeholder='Search'/>
        )
    }

}

export default withRouter(SearchInput);