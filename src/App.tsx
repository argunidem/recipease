import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import About from './pages/About';
import Category from './pages/Category';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Private from './components/Private';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <Fragment>
      <Router>
        <Header />
        <main className='flex'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/:categoryId' element={<Category />} />
            <Route path='/profile' element={<Private />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </main>
      </Router>
      <ToastContainer theme='dark' autoClose={1500} />
    </Fragment>
  );
};
export default App;
