import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';

type RecipesType = {
  id: string;
  data: {
    description: string;
    name: string;
    category: string;
    timestamp: Timestamp | null;
    image: string;
    userRef: string;
    ingredients: any;
    instructions: any;
  };
};

type ContextType = {
  recipes: RecipesType;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const RecipeContext = React.createContext<ContextType | null>(null);

const RecipeProvider = ({ children }: ProviderProps) => {
  const [recipes, setRecipes] = useState<RecipesType>({
    id: '',
    data: {
      description: '',
      name: '',
      category: '',
      timestamp: null,
      image: '',
      userRef: '',
      ingredients: [],
      instructions: [],
    },
  });

  useEffect(() => {
    const recipesRef = collection(db, 'recipes');

    const unsubscribe = onSnapshot(
      query(recipesRef, orderBy('timestamp', 'desc')),
      (snapshot) => {
        let recipes: any = [];
        snapshot.forEach((doc) => {
          recipes.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRecipes(recipes);
      },
      (error) => {
        toast.error('Could not fetch recipes');
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
