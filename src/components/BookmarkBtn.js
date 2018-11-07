import React, {Component} from 'react';

class BookmarkBtn extends Component {
    constructor(props) {
        super(props);
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }

    handleBtnClick(e) {
        e.preventDefault();
        let {url, resource, id, title} = this.props;
        this.props.handleBookmarkClick({
            url: url,
            resource: resource,
            id: id,
            title: title
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