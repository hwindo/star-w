import React from 'react';
import {render, fireEvent} from 'react-testing-library';
import BookmarkBtn from './BookmarkBtn';

describe('BookmarkBtn', () => {
    const {container, getByText, debug} = render(<BookmarkBtn type='normal' />);
    it('render bookmark-normal class', () => {
        container.querySelector('div.bookmark-normal')
    });
});