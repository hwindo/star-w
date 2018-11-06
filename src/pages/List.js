import React, {Component} from 'react';

class List extends Component {
    constructor(props) {
        super(props);
    }
    get resource() {
        return this.props.match.params.resource ? this.props.match.params.resource : 'people';
    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>{this.resource}</h1>
                <p>The {this.resource}</p>
            </div>
        )
    }
}

export default List;