import React from 'react';
import CategorySelect from './CategorySelect';
import IngredientInput from './IngredientInput';
import Button from '../common/Button';

const SearchForm = ({
  category,
  setCategory,
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-xl">
      <CategorySelect value={category} onChange={setCategory} />
      
      <IngredientInput
        ingredients={ingredients}
        onAddIngredient={onAddIngredient}
        onRemoveIngredient={onRemoveIngredient}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full h-14"
        icon="restaurant_menu"
      >
        Cari Resep Masakan
      </Button>
    </form>
  );
};

export default SearchForm;
