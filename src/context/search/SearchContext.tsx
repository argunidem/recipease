import React, { useState } from 'react';

type ContextType = {
  recipes: any;
  setRecipes: React.Dispatch<React.SetStateAction<any>>;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const SearchContext = React.createContext<ContextType | null>(null);

const SearchProvider = ({ children }: ProviderProps) => {
  const [recipes, setRecipes] = useState<any>(null);
  return (
    <SearchContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
