import { useQuery } from '@tanstack/react-query';
import { getRecommendations } from '../services/api';

export const useRecommendation = (category, ingredients, options = {}) => {
  return useQuery({
    queryKey: ['recommendations', category, ingredients],
    queryFn: () => getRecommendations(category, ingredients),
    enabled: !!category && !!ingredients && ingredients.length > 0,
    refetchOnWindowFocus: false,
    ...options,
  });
};
export default useRecommendation;
