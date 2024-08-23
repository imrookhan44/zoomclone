// CategoryContext.js
import React, { createContext, useContext, useState } from 'react';

export const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState('scientific'); // Default or fetched category

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
