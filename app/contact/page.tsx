import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BriefBuilder from "@/components/shared/BriefBuilder";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Build your one-line brief and tell FinAce what you need. We'll take it from there.",
};

export default function ContactPage() {
  return (
    <div className="font-barlow">
      <Header active="contact" cta={{ label: "Email Us", href: `mailto:${contact.email}` }} />
      <main>
        <BriefBuilder variant="contact" source="contact" />
      </main>
      <Footer active="contact" />
    </div>
  );
}
