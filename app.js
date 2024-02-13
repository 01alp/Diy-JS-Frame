mf.rout.create('#/', () => {
  mf.data.update('filter', (_) => '');
});

mf.rout.create('', () => {
  mf.data.update('filter', (_) => '');
});

mf.rout.create('#/active', () => {
  mf.data.update('filter', (_) => 'active');
});

mf.rout.create('#/completed', () => {
  mf.data.update('filter', (_) => 'completed');
});
