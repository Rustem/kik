module.exports = {

  init: function() {

    localStorage.setItem('users', JSON.stringify([
      {
        id: 'user_0',
        name: 'Искаков Куаныш',
        email: 'iskakov@kik.kz',
        position: 0,
      },
      {
        id: 'user_1',
        name: 'Сериков Мухтар',
        email: 'serikov@kik.kz',
        position: 1,
      },
      {
        id: 'user_20',
        name: 'Махамбетов Айдос',
        email: 'makhambetov@kik.kz',
        position: 20,
      },
      {
        id: 'user_21',
        name: 'Булатов Алмас',
        email: 'bulatov@kik.kz',
        position: 21,
      },
      {
        id: 'user_22',
        name: 'Петров Айдын',
        email: 'petrov@kik.kz',
        position: 22,
      },
    ]));

    localStorage.setItem('applications', JSON.stringify([
      {
        id: 'appl_0',
        status: 0,
      },
      {
        id: 'appl_1',
        status: 1,
      },
      {
        id: 'appl_2',
        status: 1,
      },
      
    ]));
  },

};