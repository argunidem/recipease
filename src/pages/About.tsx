import Section from '../components/shared/Section';

const About = () => {
  return (
    <Section>
      <div className='container mb-20 sm:pt-24 lg:pt-32 md:w-5/6 xl:w-3/5 2xl:w-2/5'>
        <article>
          <h2 className='heading text-recipease-200'>About Recipease</h2>
          <p className='about-p'>
            Welcome to Recipease, a platform for discovering and sharing
            delicious recipes. Our goal is to provide a community-driven
            platform where food enthusiasts can connect, exchange ideas, and
            share their favorite recipes with others.
          </p>
        </article>
        <article>
          <h2 className='heading text-recipease-200'>Our Mission</h2>
          <p className='about-p'>
            At Recipease, we believe that cooking should be fun, easy, and
            accessible to everyone. That's why we've created a platform that's
            designed to inspire and empower home cooks of all skill levels.
            Whether you're a seasoned pro or just starting out, you'll find
            everything you need to create amazing meals that your friends and
            family will love.
          </p>
        </article>
        <article>
          <h2 className='heading text-recipease-200'>Contact Us</h2>
          <p className='about-p'>
            We're always here to help you with any questions or issues you may
            have. If you'd like to get in touch with us, please don't hesitate
            to reach out via email at info@recipease.com. We'd love to hear from
            you!
          </p>
        </article>
      </div>
    </Section>
  );
};
export default About;
