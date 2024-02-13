const sript_footer = document.currentScript;

mf.insert(sript_footer, (updater, old_updater) => {
  mf.data.bind(
    'show_todos',
    old_updater((old_el) => {
      old_el[0].style.display = data.show_todos ? 'block' : 'none';
    })
  );
  return [
    mf.element.create(
      'footer',
      {
        class: 'footer',
        style: `display: ${data.show_todos ? 'block' : 'none'};`,
        id: 'footerid',
      },
      mf.element.create('script', {
        src: './companents/calc.js',
      }),
      mf.element.create(
        'ul',
        {
          class: 'filters',
          // onclick: _ => mf.data.update("filter")
        },
        mf.element.create('script', {
          src: './companents/filters.js',
        })
      ),
      mf.element.create('script', {
        src: './companents/clear.js',
      })
    ),
  ];
});
