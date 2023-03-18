type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <article className='flex flex-col items-center w-48 xs:w-64 space-y-4 sm:flex-row sm:w-full sm:space-y-0 sm:space-x-6 sm:h-[272px] rounded-md bg-recipease-200'>
      {children}
    </article>
  );
};
export default Card;
