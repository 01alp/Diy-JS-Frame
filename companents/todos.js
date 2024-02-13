// todos.js

const scripts_todos = document.currentScript;
const generateUniqueId = () => `id-${Date.now()}-${Math.floor(Math.random() * 100)}`;

mf.insert(scripts_todos, (updater) => {
  mf.data.bind('todos', updater);
  mf.data.bind('filter', updater);
  const todos = mf.data.get('todos');
  return Object.entries(todos)
    .filter(
      (value) =>
        (data.filter !== 'active' && data.filter !== 'completed') || // all if all
        (data.filter === 'active' && !value[1].do) || // unchecked if active
        (data.filter === 'completed' && value[1].do) // checked if completed
    )
    .map((value) => {
      return mf.element.create(
        'li',
        { class: value[1].do ? 'completed' : '', id: value[0] },
        mf.element.create(
          'div',
          { class: 'view', id: generateUniqueId() },
          // ckeckbox to valid todo as done
          mf.element.create(
            'input',
            Object.assign(
              {
                class: 'toggle',
                type: 'checkbox',
                id: generateUniqueId(),
                onclick: (e) => {
                  /**@type {HTMLElement} */
                  const li = e.target.parentElement.parentElement;
                  const done = e.target.checked;
                  li.classList.toggle('completed', e.target.checked);
                  data.todos[li.id].do = done;

                  mf.data.update('filter', (filter) => filter);
                  mf.data.update('nb_todo', (nb) => nb + (done ? -1 : 1));
                  mf.data.update('one_completed', (_) => updateOneCompleted());
                  mf.data.update('all_completed', (_) => updateAllCompleted());
                  SaveTodo(); //update todos in localstorage
                },
              },
              value[1].do ? { checked: {} } : {}
            )
          ),
          // test with the todo value
          mf.element.create(
            'label',
            {
              id: generateUniqueId(),
              ondblclick: (e) => {
                if (data.edit_newtodo) {
                  return;
                } // cancel if is editing a new todo
                /**@type {HTMLElement}*/
                const el = e.target;
                const li = el.parentElement.parentElement;

                const validHandler = (e_valid) => {
                  const val = tempEl.value.trim();
                  if ((e_valid.key === 'Enter' || e_valid.target !== tempEl) && val) {
                    mf.data.update('todos', (todos) => {
                      todos[li.id] = { name: val, do: todos[li.id].do };
                      return todos;
                    }); //update todos in js
                    window.removeEventListener('click', validHandler);
                    tempEl.remove();
                    li.classList.toggle('editing', false);
                    SaveTodo(); //update todos in localstorage
                  }
                };

                const tempEl = mf.element.create('input', {
                  class: 'edit',
                  onkeyup: validHandler,
                });
                window.addEventListener('click', validHandler);

                li.classList.toggle('editing', true);
                li.append(tempEl);
                tempEl.focus();
                tempEl.value = el.innerText;
              },
            },
            value[1].name
          ),
          // boutton remove
          mf.element.create('button', {
            class: 'destroy',
            onclick: (e) => {
              const el = e.target.parentElement.parentElement;
              if (Object.keys(data.todos).length === 1) {
                mf.data.update('show_todos', (_) => false);
              }
              if (!data.todos[el.id].do) {
                mf.data.update('nb_todo', (nb) => nb - 1);
              }
              el.remove();
              delete data.todos[el.id];
              SaveTodo(); //update todos in localstorage
              mf.data.update('one_completed', (_) => updateOneCompleted());
              mf.data.update('all_completed', (_) => updateAllCompleted());
            },
          })
        )
      );
    });
});
