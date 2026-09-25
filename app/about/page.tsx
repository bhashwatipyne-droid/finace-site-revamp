import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import Numbers from "@/components/shared/Numbers";
import Story from "@/components/about/Story";
import Team from "@/components/about/Team";
import CtaBand from "@/components/about/CtaBand";
import { aboutStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "FinAce is a team of finance experts and creative geeks making financial communication simple and effective since 2016.",
};

export default function AboutPage() {
  return (
    <div className="font-barlow">
      <Header active="about" cta={{ label: "Brief Us", href: "/contact" }} />
      <main>
        <AboutHero />
        <Numbers stats={aboutStats} variant="about" />
        <Story />
        <Team />
        <CtaBand />
      </main>
      <Footer active="about" />
    </div>
  );
}
