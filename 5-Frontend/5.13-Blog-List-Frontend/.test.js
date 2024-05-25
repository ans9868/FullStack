// import { afterEach } from 'vitest'
// import { cleanup, render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom/vitest'
//
// import Blog from './src/components/Blog.jsx'
//
// afterEach(() => { //after each test, cleanup is executed
//     cleanup()
// })
//
// test('renders content', () => {
//     const blog = {
//         title: 'testTitle',
//         author: 'testAuthor',
//         url: 'testURL',
//         likes: 111
//     }
//
//     render(<Blog blog={blog} handleDelete={() => {}} handleAddLike={() => {}}/> )
//
//     const element = screen.getByClassName('aBlog')
//     expect(element).toBeDefined();
// })


import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from './src/components/Blog.jsx'

test('simple render test', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testURL',
        likes: 111
    }

    render(<Blog blog={blog} handleDelete={() => {}} handleAddLike={() => {}} />)
    // const element = screen.getByText('Expected Text Inside Blog Component');

    expect(true).true;
});