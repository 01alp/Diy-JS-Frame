const sripts_newtodo = document.currentScript;

mf.insert(sripts_newtodo, (updater) => {
  return [
    mf.element.create('input', {
      class: 'new-todo',
      id: 'todo-input',
      name: 'todoinput',
      placeholder: 'What needs to be done?',
      autofocus: '',
      onfocus: (e) => {
        const validation = (/**@type{Event}*/ ev) => {
          ev.stopPropagation();
          const val = e.target.value.trim();
          if ((ev.key === 'Enter' || ev.type === 'blur') && val) {
            if (Object.keys(data.todos).length === 0) {
              mf.data.update('show_todos', (_) => true);
            }
            mf.data.update('todos', (todos) => {
              todos[Date.now()] = { name: val, do: false };
              return todos;
            }); //update todos in js
            SaveTodo(); //update todos in localstorage
            mf.data.update('nb_todo', (nb) => nb + 1);
            mf.data.update('all_completed', (_) => updateAllCompleted());
            e.target.value = '';
            e.target.removeEventListener('blur', validation);
          }
          if (ev.type === 'blur') {
            e.target.removeEventListener('keyup', validation);
          }
        };
        e.target.addEventListener('blur', validation);
        e.target.addEventListener('keyup', validation);
      },
    }),
  ];
});
