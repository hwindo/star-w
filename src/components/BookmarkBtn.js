import React, {Component} from 'react';

class BookmarkBtn extends Component {
    constructor(props) {
        super(props);
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }
    handleBtnClick(e) {
        e.preventDefault();
        console.log(this.props.title, this.props.resource, this.props.id, this.props.url);
        this.props.handleBookmarkClick({
            url: this.props.url,
            resource: this.props.resource,
            id: this.props.id,
            title: this.props.title
        });
    }

    render() {
        let className = '';
        if (this.props.isBookmarked) className += 'bookmarked';
        if (this.props.type === 'normal') {
            className += ' bookmark-normal';
            return (
                <div className={className}>
                    <a href="/" onClick={this.handleBtnClick}>
                        <i className='fa fa-fw fa-bookmark'> </i>
                        Bookmark
                    </a>
                </div>
            );
        } else {
            className += ' bookmark-btn';
            return (
                <div className={className}>
                    <a href='/' onClick={this.handleBtnClick}>
                        <i className='fa fa-fw fa-bookmark fa-2x'> </i>
                    </a>
                </div>
            )
        }
    }
}

export default BookmarkBtn;