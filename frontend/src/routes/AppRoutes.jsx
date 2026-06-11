import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/LandingPage';
import SearchPage from '../pages/SearchPage';
import RecommendationPage from '../pages/ResultPage';
import DetailPage from '../pages/DetailPage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/recommendations" element={<RecommendationPage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/tentang" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
