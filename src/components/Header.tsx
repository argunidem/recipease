const Header = () => {
  return (
    <header>
      <section className='w-full mx-auto pl-3 pr-5 xs:pl-8 xs:pr-10 xl:w-5/6 max-w-8xl flex justify-between items-center'>
        <h1>Recipease</h1>
        <div className='flex items-center space-x-3'>
          <button className='mt-1 sm:btn sm:btn-ghost'>Sign In</button>
        </div>
      </section>
    </header>
  );
};
export default Header;
