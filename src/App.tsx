import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='flex'>
        <Sidebar />
        <Home />
      </main>
    </Router>
  );
};
export default App;
