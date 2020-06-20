import React from 'react';
import { render } from '@testing-library/react';

import TodosTable from './todosTable';
import { Todo } from '@monorepo/data';

describe(' Todos', () => {
  it('should render successfully', () => {
    const data: Todo[] = [
      { id: 1, title: 'Hello World' }
    ];

    const onDelete = (id: number) => {
    };

    const { baseElement } = render(<TodosTable onDelete={onDelete} todos={data}/>);
    expect(baseElement).toBeTruthy();
  });
});
