import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './context/auth/AuthContext';
import RecipeProvider from './context/recipe/RecipeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </AuthProvider>
);
