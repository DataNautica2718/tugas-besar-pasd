// Simple in-memory search criteria store for caching search inputs across page switches
let searchState = {
  category: 'ayam',
  ingredients: ['bawang putih', 'bawang merah']
};

export const getSearchState = () => searchState;

export const setSearchState = (newState) => {
  searchState = { ...searchState, ...newState };
};
