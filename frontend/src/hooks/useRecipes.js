import { useQuery } from '@tanstack/react-query';
import { getRecipes, getRecipesCount } from '../services/api';

export const useRecipes = (params = {}) => {
  return useQuery({
    queryKey: ['recipes', params],
    queryFn: () => getRecipes(params),
    keepPreviousData: true,
  });
};

export const useRecipesCount = (params = {}) => {
  return useQuery({
    queryKey: ['recipesCount', params],
    queryFn: () => getRecipesCount(params),
  });
};
