// CategoryContext.js
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface CategoryContextType {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

// Create a context with the appropriate type and a default value of undefined
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [category, setCategory] = useState('scientific'); // Default or fetched category

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
