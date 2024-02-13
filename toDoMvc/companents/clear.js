const sripts_clear = document.currentScript;

mf.insert(sripts_clear, (updater) => {
  mf.data.bind('one_completed', updater);
  return [
    mf.element.create(
      'button',
      {
        class: 'clear-completed',
        style: `display: ${data.one_completed ? 'block' : 'none'};`,
        id: 'clearcomplated',
        onclick: () => {
          for (const id in data.todos) {
            if (data.todos[id].do) {
              delete data.todos[id];
            }
          }
          if (Object.keys(data.todos).length === 0) {
            mf.data.update('show_todos', (_) => false);
          }
          mf.data.update('todos', (todos) => todos);
          mf.data.update('one_completed', (_) => false);
          SaveTodo();
        },
      },
      'Clear completed'
    ),
  ];
});
