import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { Note } from './Note';

const mockHandleDeleteCallback = jest.fn();
const props = {
  id: 'id',
  title: 'note title',
  content: 'note content',
  date: new Date(),
  important: false,
  handleDelete: () => mockHandleDeleteCallback,
};

const wrap = (component: any) => (
  <table>
    <tbody>{component}</tbody>
  </table>
);

describe('Note', () => {
  let noteComponent: RenderResult;
  let noteRerender: (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => void;

  beforeEach(() => {
    noteComponent = render(wrap(<Note {...props} />));
    noteRerender = noteComponent.rerender;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    expect(noteComponent).toBeDefined();
  });

  describe('important prop', () => {
    it(`should have 'false' text`, () => {
      expect(noteComponent.getByText('false')).toBeDefined();
    });

    it(`should have 'true' text`, () => {
      noteRerender(wrap(<Note {...props} important={true} />));
      expect(noteComponent.getByText('true')).toBeDefined();
    });
  });

  describe('delete note action', () => {
    it(`should call handleDelete`, () => {
      const button = noteComponent.container.querySelector('.deleteNote');
      fireEvent.click(button as Element);

      expect(mockHandleDeleteCallback).toHaveBeenCalledTimes(1);
    });
  });
});
