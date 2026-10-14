import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Numbers from "@/components/shared/Numbers";
import Clients from "@/components/home/Clients";
import Ask from "@/components/home/Ask";
import Work from "@/components/home/Work";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import BriefBuilder from "@/components/shared/BriefBuilder";
import StartHere from "@/components/home/StartHere";
import { homeStats } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Header active="home" cta={{ label: "Brief Us", href: "#brief" }} />
      <main>
        <Hero />
        <Clients />
        <Ask />
        <Numbers stats={homeStats} variant="home" />
        <Services />
        <Work />
        <Testimonials />
        <BriefBuilder variant="home" source="home" />
        <StartHere />
      </main>
      <Footer active="home" />
    </>
  );
}
