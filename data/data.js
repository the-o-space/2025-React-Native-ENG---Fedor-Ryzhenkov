export const CATEGORIES = [
    { id: '1', title: 'Pizza', color: '#f54242' },
    { id: '2', title: 'Sushi', color: '#42f554' },
    { id: '3', title: 'Burgers', color: '#f5a142' },
    { id: '4', title: 'Desserts', color: '#c142f5' },
    { id: '5', title: 'Salads', color: '#42d4f5' },
  ];

  export const MEALS = [
    {
      id: 'm1',
      categoryIds: ['1'],
      title: 'Margherita Pizza',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg',
      ingredients: ['Tomato', 'Mozzarella', 'Basil'],
      price: 9.99,
    },
    {
      id: 'm2',
      categoryIds: ['1'],
      title: 'Pepperoni Pizza',
      imageUrl: 'https://cdn.pixabay.com/photo/2024/04/23/09/33/ai-generated-8714541_1280.jpg',
      ingredients: ['Pepperoni', 'Cheese', 'Tomato Sauce'],
      price: 11.99,
    },
    {
      id: 'm3',
      categoryIds: ['2'],
      title: 'Salmon Sushi Set',
      imageUrl: 'https://cdn.pixabay.com/photo/2023/04/27/23/55/ai-generated-7955586_1280.jpg',
      ingredients: ['Rice', 'Salmon', 'Nori', 'Wasabi'],
      price: 14.50,
    },
    {
      id: 'm4',
      categoryIds: ['3'],
      title: 'Classic Cheeseburger',
      imageUrl: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg',
      ingredients: ['Beef', 'Cheddar', 'Lettuce', 'Tomato'],
      price: 8.99,
    },
    {
      id: 'm5',
      categoryIds: ['4'],
      title: 'Chocolate Lava Cake',
      imageUrl: 'https://cdn.pixabay.com/photo/2024/04/21/18/43/ai-generated-8711271_1280.jpg',
      ingredients: ['Dark Chocolate', 'Eggs', 'Butter', 'Flour'],
      price: 6.50,
    },
    {
      id: 'm6',
      categoryIds: ['5'],
      title: 'Greek Salad',
      imageUrl: 'https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg',
      ingredients: ['Cucumber', 'Tomatoes', 'Feta', 'Olives'],
      price: 7.25,
    },
  ]; 