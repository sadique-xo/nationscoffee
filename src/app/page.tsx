import Navbar from "@/components/shared/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import MenuSection from "@/components/sections/menu";
import Gallery from "@/components/sections/gallery";
import Testimonials from "@/components/sections/testimonials";
import Location from "@/components/sections/location";
import Footer from "@/components/sections/footer";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import ScrollToTop from "@/components/shared/scroll-to-top";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <Testimonials />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
