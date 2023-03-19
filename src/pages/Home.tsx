import { Link } from 'react-router-dom';
import Section from '../components/shared/Section';

const Home = () => {
  return (
    <Section>
      <header className='text-recipease-100 text-xl'>Latest Recipes</header>

      <div className='container'>
        <article className='card bg-recipease-200 py-6 pr-4'>
          <p className='card-title text-white'>Tomato Soup</p>
          <p className='text-white'>
            This tomato soup recipe is a classic and comforting dish that's
            perfect for warming up on a chilly day. Made with canned whole
            peeled tomatoes, onion, garlic, and vegetable broth, this soup is
            simple yet flavorful. The canned tomatoes provide a deep and rich
            flavor while the vegetable broth adds a savory note to the dish. The
            onion and garlic add a layer of complexity and depth to the soup.
            The soup is simmered for about 30 minutes until the flavors have
            melded together, and then blended until smooth. The result is a
            silky and creamy soup that's perfect for dipping crusty bread...
          </p>
          <button className='btn bg-slate-800 w-max text-white'>
            View Recipe
          </button>
        </article>
        <article className='card bg-recipease-200 py-6 pr-4'>
          <p className='card-title text-white'>Tomato Soup</p>
          <p className='text-white'>
            This tomato soup recipe is a classic and comforting dish that's
            perfect for warming up on a chilly day. Made with canned whole
            peeled tomatoes, onion, garlic, and vegetable broth, this soup is
            simple yet flavorful. The canned tomatoes provide a deep and rich
            flavor while the vegetable broth adds a savory note to the dish. The
            onion and garlic add a layer of complexity and depth to the soup.
            The soup is simmered for about 30 minutes until the flavors have
            melded together, and then blended until smooth. The result is a
            silky and creamy soup that's perfect for dipping crusty bread...
          </p>
          <button className='btn bg-slate-800 w-max text-white'>
            View Recipe
          </button>
        </article>
      </div>
    </Section>
  );
};

export default Home;
