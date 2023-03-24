import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './context/auth/AuthContext';
import RecipeProvider from './context/recipe/RecipeContext';
import SearchProvider from './context/search/SearchContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <RecipeProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </RecipeProvider>
  </AuthProvider>
);
