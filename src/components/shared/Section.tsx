type SectionProp = {
  children: React.ReactNode;
};

const Section = ({ children }: SectionProp) => {
  return (
    <section className='p-7 overflow-x-hidden ml-[72px] w-full'>
      {children}
    </section>
  );
};
export default Section;
