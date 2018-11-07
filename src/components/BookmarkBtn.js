import React, {Component} from 'react';

class BookmarkBtn extends Component {
    constructor(props) {
        super(props);
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }
    handleBtnClick(e) {
        e.preventDefault();
        console.log(this.props.title, this.props.resource, this.props.id, this.props.url);
    }

    render() {
        if (this.props.type === 'normal') {
            return (
                <div className="bookmark-normal">
                    <a href="/" onClick={this.handleBtnClick}>
                        <i className='fa fa-fw fa-bookmark'></i>
                        Bookmark
                    </a>
                </div>
            );
        } else {
            return (
                <div className="bookmark-btn">
                    <a href='/' onClick={this.handleBtnClick}>
                        <i className='fa fa-fw fa-bookmark fa-2x'></i>
                    </a>
                </div>
            )
        }
    }
}

export default BookmarkBtn;