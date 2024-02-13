const sripts_footer = document.currentScript;

mf.insert(sripts_footer, (updater, custom_updater) => {
  mf.data.bind(
    'show_todos',
    custom_updater((old_el) => {
      old_el[0].style.display = data.show_todos ? 'block' : 'none';
    })
  );
  return [
    mf.element.create(
      'section',
      {
        class: 'main',
        style: `display: ${data.show_todos ? 'block' : 'none'};`,
        test: data.test,
        id: 'mainsection',
      },
      mf.element.create('script', {
        src: './companents/complated_btn.js',
      }),
      mf.element.create(
        'ul',
        {
          class: 'todo-list',
          id: 'todolistUl',
        },
        mf.element.create('script', {
          src: './companents/todos.js',
        })
      )
    ),
  ];
});
