const spinner = require('../../assets/spinner.gif');

const Spinner = () => {
  return (
    <div className='w-full xs:w-5/6 xs:mx-auto xs:px-5 sm:w-4/5 max-w-7xl'>
      <img src={spinner} alt='spinner' className='w-16 mx-auto' />
    </div>
  );
};
export default Spinner;
