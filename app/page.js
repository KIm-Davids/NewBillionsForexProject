import Navbar from '../src/component/Navbar';
import HeroSection from '../src/component/HeroSection';
import FeatureSection from '../src/component/FeatureSection';
import WorkFlow from '../src/component/WorkFlow';
import Pricing from '../src/component/Pricing';
import Testimonials from '../src/component/Testimonials';
import Footer from '../src/component/Footer';
import Login from '../pages/login';

const Page = () => (
  <>
    <Navbar />
    <div className="max-w-7xl mx-auto pt-20 px-6">
      <HeroSection />
      <section id="feature-section">
        <FeatureSection />
      </section>
      <WorkFlow />
      {/*<Pricing />*/}
      <Login />
      <section id="testimonial-section">
        <Testimonials />
      </section>
      <Footer />
    </div>

  </>
);

export default Page;
