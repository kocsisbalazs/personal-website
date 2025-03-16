import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: hidden ? -100 : 0,
          opacity: hidden ? 0 : 1
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "px-6 py-4 bg-[#1E1E1E]/60 backdrop-blur-xl border-b border-white/5 shadow-lg"
            : "px-6 py-6 bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.a
            href="#"
            className="text-2xl font-semibold text-white/90 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio
          </motion.a>
          <div className="flex gap-8">
            {["Work", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/80 relative group"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span className="relative">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </span>
              </motion.a>
            ))}
            <motion.a
              href="https://kocsisbalazs.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 relative group"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span className="relative">
                Blog
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </motion.a>
          </div>
        </nav>
      </motion.header>
    </AnimatePresence>
  );
};