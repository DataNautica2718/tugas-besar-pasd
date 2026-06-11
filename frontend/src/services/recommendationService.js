import { getRecommendations } from './api';

export const recommendationService = {
  fetchRecommendations: async (category, ingredients) => {
    return await getRecommendations(category, ingredients);
  }
};

export default recommendationService;
