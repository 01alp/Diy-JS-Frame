const script_filter = document.currentScript;

mf.insert(script_filter, (updater, old_updater) => {
  mf.data.bind(
    'filter',
    old_updater((old_el) => {
      old_el[0].children[0].className = data.filter === '' ? 'selected' : '';
      old_el[1].children[0].className = data.filter === 'active' ? 'selected' : '';
      old_el[2].children[0].className = data.filter === 'completed' ? 'selected' : '';
    })
  );
  return [
    mf.element.create(
      'li',
      {},
      mf.element.create(
        'a',
        {
          href: '#/',
          class: data.filter === '' ? 'selected' : '',
          id: 'datafilter',
        },
        'All'
      )
    ),
    mf.element.create(
      'li',
      {},
      mf.element.create(
        'a',
        {
          href: '#/active',
          class: data.filter === 'active' ? 'selected' : '',
          id: 'activeselected',
        },
        'Active'
      )
    ),
    mf.element.create(
      'li',
      {},
      mf.element.create(
        'a',
        {
          href: '#/completed',
          class: data.filter === 'completed' ? 'selected' : '',
          id: 'completeselected',
        },
        'Completed'
      )
    ),
  ];
});
