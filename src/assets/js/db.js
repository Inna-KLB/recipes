'use strict'
let db = {
  name: 'Оладушки', //название блюда
  category: ['Завтрак', 'Выпечка'], // категория блюда
  time: 20.00, //время готовки
  portions: 10, // количество порций
  main_photo: { //главное фото
    url: '',
    no_photo: false
  }, 
  description: '', // описание рецепта
  ingredients: [ // ингредиенты
    {
      name: 'Мука',
      quantity: 200,
      value: 'гр'
    },
    {
      name: 'Яйцо',
      quantity: 2,
      value: 'шт'
    },
    {
      name: 'Кефир',
      quantity: 500,
      value: 'мл'
    }
  ],
  instruction: [ // пошаговый рецепт
    {
      photo: '',
      no_photo: false,
      description: 'Подогреть кефир.'
    },
    {
      photo: '',
      no_photo: false,
      description: 'Разбить яйца и перемешать'
    },
    {
      photo: '',
      no_photo: true,
      description: 'Всыпать муку и перемешать. Пожарить'
    },
  ]
}

