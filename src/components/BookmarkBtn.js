import React, {Component} from 'react';

class BookmarkBtn extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="bookmark-btn">
                <a href='/'>
                    <i className='fa fa-fw fa-bookmark fa-2x'></i>
                </a>
            </div>
        )
    }
}

export default BookmarkBtn;