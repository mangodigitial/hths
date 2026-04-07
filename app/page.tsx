import Navbar from "@/components/Navbar";
import { WelcomeSection, BlueBanner, AboutSection, SocialSection, MerchandiseSection, WebSection, ContactSection, ShopGallery, Footer } from "@/components/Sections";
import { homepageSections } from "@/config/siteConfig";

const sectionMap: Record<string, React.FC> = {
  welcome: WelcomeSection, bluebanner: BlueBanner, about: AboutSection,
  social: SocialSection, merchandise: MerchandiseSection,
  web: WebSection, contact: ContactSection,
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      {homepageSections.map((id) => { const C = sectionMap[id]; return C ? <C key={id} /> : null; })}
      <ShopGallery />
      <Footer />
    </>
  );
}
