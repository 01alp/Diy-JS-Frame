const sripts_complated_btn = document.currentScript;

mf.insert(sripts_complated_btn, (updater) => {
  mf.data.bind('all_completed', updater);
  return [
    mf.element.create(
      'input',
      Object.assign(
        {
          id: 'toggle-all',
          class: 'toggle-all',
          type: 'checkbox',
          onclick: (e) => {
            for (const todoId in data.todos) {
              data.todos[todoId].do = e.target.checked;
              mf.data.update('nb_todo', (_) => (e.target.checked ? 0 : Object.keys(data.todos).length));
              mf.data.update('one_completed', (_) => e.target.checked);
            }
            mf.data.update('todos', (t) => t);
            SaveTodo();
          },
        },
        data.all_completed ? { checked: '' } : {}
      )
    ),
    mf.element.create(
      'label',
      {
        for: 'toggle-all',
      },
      'Mark all as complete'
    ),
  ];
});
