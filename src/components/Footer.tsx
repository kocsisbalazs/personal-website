
import { ArrowUp } from "lucide-react";
import { SiTelegram, SiGithub, SiBluesky, SiLinkedin, SiGmail } from "react-icons/si";
import { motion } from "framer-motion";
import { TextScramble } from "./TextScramble";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-20 backdrop-blur-sm bg-gray-800/60 text-white/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Current Projects */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Current projects</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 4 }} className="text-white/80 hover:text-white transition-colors">
                <TextScramble text="Visit.Page" hover={true} />
              </motion.li>
              <motion.li whileHover={{ x: 4 }} className="text-white/80 hover:text-white transition-colors">
                <TextScramble text="BuildwithFramer" hover={true} />
              </motion.li>
              <motion.li whileHover={{ x: 4 }} className="text-white/80 hover:text-white transition-colors">
                <TextScramble text="My personal website" hover={true} />
              </motion.li>
              <motion.li whileHover={{ x: 4 }} className="text-white/80 hover:text-white transition-colors">
                <TextScramble text="Writing 1 blog / month" hover={true} />
              </motion.li>
            </ul>
          </div>

          {/* Jump to */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Jump to</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 4 }} className="text-white/80 hover:text-white transition-colors">
                <TextScramble text="Home" hover={true} />
              </motion.li>
              <motion.li whileHover={{ x: 4 }} className="text-white/80 hover:text-white transition-colors">
                <TextScramble text="Projects" hover={true} />
              </motion.li>
              <motion.li whileHover={{ x: 4 }} className="text-white/80 hover:text-white transition-colors">
                <TextScramble text="Blog" hover={true} />
              </motion.li>
            </ul>
          </div>

          {/* Reach out */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Reach out</h3>
            <ul className="space-y-2">
              <motion.li>
                <motion.a
                  href="https://t.me/balazskocsis"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  whileHover={{ x: 4 }}
                  whileTap={{ x: 0 }}
                >
                  <SiTelegram className="w-5 h-5" />
                  <TextScramble text="Telegram" hover={true} />
                </motion.a>
              </motion.li>
              <motion.li>
                <motion.a
                  href="https://github.com/kocsisbalazs"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  whileHover={{ x: 4 }}
                  whileTap={{ x: 0 }}
                >
                  <SiGithub className="w-5 h-5" />
                  <TextScramble text="GitHub" hover={true} />
                </motion.a>
              </motion.li>
              <motion.li>
                <motion.a
                  href="https://bsky.app/profile/balazskocsis.eu"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  whileHover={{ x: 4 }}
                  whileTap={{ x: 0 }}
                >
                  <SiBluesky className="w-5 h-5" />
                  <TextScramble text="Bluesky" hover={true} />
                </motion.a>
              </motion.li>
              <motion.li>
                <motion.a
                  href="https://linkedin.com/in/kocsisbalazs"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  whileHover={{ x: 4 }}
                  whileTap={{ x: 0 }}
                >
                  <SiLinkedin className="w-5 h-5" />
                  <TextScramble text="LinkedIn" hover={true} />
                </motion.a>
              </motion.li>
              <motion.li>
                <motion.a
                  href="mailto:me@balazskocsis.eu"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  whileHover={{ x: 4 }}
                  whileTap={{ x: 0 }}
                >
                  <SiGmail className="w-5 h-5" />
                  <TextScramble text="Email" hover={true} />
                </motion.a>
              </motion.li>
              <motion.li>
                <motion.button
                  onClick={scrollToTop}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  whileHover={{ x: 4 }}
                  whileTap={{ x: 0 }}
                >
                  <ArrowUp className="w-5 h-5" />
                  <TextScramble text="To top" hover={true} />
                </motion.button>
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
