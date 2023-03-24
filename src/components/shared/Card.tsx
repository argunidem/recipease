type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <article className='relative flex flex-col items-center w-56 xs:w-11/12 sm:w-4/5 md:flex-row md:w-full md:h-[272px] rounded-md bg-recipease-900'>
      {children}
    </article>
  );
};
export default Card;
