import { Hero } from '../../components/sections/Hero';
import { StatsBar } from '../../components/sections/StatsBar';
import { ServicesPreview } from '../../components/sections/ServicesPreview';
import { Testimonials } from '../../components/sections/Testimonials';
import { CTA } from '../../components/sections/CTA';

export const Home = () => (
  <div className="flex flex-col min-h-screen pt-16 lg:pt-0">
    <main className="flex-grow">
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <Testimonials />
      <CTA />
    </main>
  </div>
);