import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { EngineeringImpact } from "@/components/sections/EngineeringImpact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { IdentityStrip } from "@/components/sections/IdentityStrip";
import { InternshipCaseStudy } from "@/components/sections/InternshipCaseStudy";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { experience } from "@/data/experience";
import { education, profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { siteConfig } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: `${profile.role} — ${profile.specialties.join(", ")}`,
  description: siteConfig.description,
  url: siteConfig.url,
  email: `mailto:${profile.email}`,
  image: `${siteConfig.url}/opengraph-image`,
  address: { "@type": "PostalAddress", addressCountry: "TN" },
  sameAs: [profile.github, profile.linkedin],
  alumniOf: education.map((item) => ({ "@type": "CollegeOrUniversity", name: item.school })),
  knowsAbout: skillGroups.flatMap((group) => group.core),
  hasOccupation: experience.map((item) => ({
    "@type": "Occupation",
    name: item.role,
    description: `${item.company} (${item.period})`,
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <IdentityStrip />
        <About />
        <EngineeringImpact />
        <Experience />
        <InternshipCaseStudy />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
