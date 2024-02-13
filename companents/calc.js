const script = document.currentScript;

mf.insert(script, (updater, old_updater) => {
  mf.data.bind(
    'nb_todo',
    old_updater((/**@type {Array<HTMLElement>}*/ d) => {
      d[0].children[0].textContent = data.nb_todo;
    })
  );
  return [
    mf.element.create(
      'span',
      {
        class: 'todo-count',
        id: 'todocount',
      },
      mf.element.create('strong', {}, `${data.nb_todo}`),
      ' items left'
    ),
  ];
});
