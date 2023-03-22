export const categories = [
  'Appetizers',
  'Beverages',
  'Breads',
  'Breakfast',
  'Cakes',
  'Candy',
  'Casseroles',
  'Cookies',
  'Desserts',
  'Fish and Seafood',
  'Grilling and BBQ',
  'Holiday Recipes',
  'International Cuisine',
  'Main Dishes',
  'Meat',
  'Pasta',
  'Pies',
  'Pizza',
  'Salads',
  'Sandwiches',
  'Side Dishes',
  'Slow Cooker Recipes',
  'Snacks',
  'Soups',
  'Vegetarian',
];

export const categorySlugs = categories.map((category) =>
  category
    .split(',')
    .map((item) =>
      item
        .split(' ')
        .map((letter, index) => letter.toLowerCase())
        .join('-')
    )
    .join('')
);
