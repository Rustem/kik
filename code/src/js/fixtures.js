module.exports = {

  init: function() {

    localStorage.setItem('users', JSON.stringify([
      {
        id: 'user_0',
        firstname: 'Куаныш',
        lastname: 'Искаков',
        email: 'iskakov@kik.kz',
        position: 0,
      },
      {
        id: 'user_1',
        firstname: 'Мухтар',
        lastname: 'Сериков',
        email: 'serikov@kik.kz',
        position: 1,
      },
      {
        id: 'user_20',
        firstname: 'Айдос',
        lastname: 'Махамбетов',
        email: 'makhambetov@kik.kz',
        position: 20,
      },
      {
        id: 'user_21',
        firstname: 'Алмас',
        lastname: 'Булатов',
        email: 'bulatov@kik.kz',
        position: 21,
      },
      {
        id: 'user_22',
        firstname: 'Айдын',
        lastname: 'Петров',
        email: 'petrov@kik.kz',
        position: 22,
      },
      {
        id: 'user_3',
        firstname: 'Елена',
        lastname: 'Чурманова',
        email: 'churmanova@kik.kz',
        position: 3,
      },
    ]));


    localStorage.setItem('people', JSON.stringify([
      {
        id: 'p_0',
        lastname: 'Иванов',
        firstname: 'Сергей',
        middlename: 'Жанибекович',
        iin: '100200300400',
        address: 'г. Алматы, ул. Карасай Батыра, 52',
        birthdate: '11.12.1964',
        tel: '+7 701 882 9321',
        udv_n: '892834982',
        udv_date: '20.12.2009',
        mock_gcvp_payment: 55000, 
      },
    ]));

    // localStorage.setItem('applications', JSON.stringify([
    //   {
    //     id: 'appl_0',
    //     status: 0,
    //     author_id: 'user_0'
    //   },
    //   {
    //     id: 'appl_1',
    //     status: 1,
    //     author_id: 'user_0'
    //   },
    //   {
    //     id: 'appl_3',
    //     status: 1,
    //     author_id: 'user_0'
    //   },
    //   {
    //     id: 'appl_4',
    //     status: 2,
    //     author_id: 'user_0'
    //   },
    //   {
    //     id: 'appl_5',
    //     status: 2,
    //     author_id: 'user_0'
    //   },
    //   {
    //     id: 'appl_6',
    //     status: 2,
    //     author_id: 'user_0'
    //   },
    //   {
    //     id: 'appl_7',
    //     status: 2,
    //     author_id: 'user_0'
    //   },
      
    // ]));
  },

};