import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import BoidsBackground from "@/components/BoidsBackground";
const Index = () => {
  return <div className="relative w-full min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <BoidsBackground />
      </div>
      <div className="relative z-10">
        <Header />
        <main>
          <section className="min-h-screen py-20">
            <Hero />
          </section>
          <section className="min-h-screen py-20">
            <Work />
          </section>
          <section id="contact" className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="backdrop-blur-xl rounded-2xl p-8 border border-gray-700 shadow-2xl bg-white/5">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Get in Touch</h2>
                <ContactForm />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>;
};
export default Index;