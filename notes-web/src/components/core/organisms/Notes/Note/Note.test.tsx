import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Note } from './Note';

const props = {
  id: 'id',
  title: 'note title',
  content: 'note content',
  date: new Date(),
  important: false,
  handleDelete: () => jest.fn(),
};

describe('Note', () => {
  it('should render', () => {
    const component = render(<Note {...props} />);
    console.log(component);
  });
});
