
import { motion } from "framer-motion";
import { TextScramble } from "./TextScramble";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';
import bioContent from '../content/bio.md?raw';

const projects = [
  {
    title: "Project Management Dashboard",
    description: "A modern dashboard for agile teams with custom task views and analytics.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    link: "#",
  },
  {
    title: "AI-Powered Analytics",
    description: "Machine learning algorithms that provide actionable business insights.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    link: "#",
  },
  {
    title: "E-commerce Platform",
    description: "Scalable online shopping solution with integrated payment processing.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    link: "#",
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile applications with seamless user experiences.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6",
    link: "#",
  },
  {
    title: "Cloud Infrastructure",
    description: "Robust cloud solutions with automated scaling and deployment.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    link: "#",
  },
  {
    title: "Blockchain Solutions",
    description: "Secure and transparent blockchain applications for various industries.",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55",
    link: "#",
  },
  {
    title: "Data Visualization Platform",
    description: "Interactive dashboards that transform complex data into actionable insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    link: "#",
  },
  {
    title: "Cybersecurity Suite",
    description: "Advanced threat detection and prevention for enterprise networks.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    link: "#",
  },
  {
    title: "AR/VR Experiences",
    description: "Immersive augmented and virtual reality solutions for education and entertainment.",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    link: "#",
  },
];

export const Work = () => {
  return (
    <section className="py-20 relative" id="work">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-32 dark-blur-panel p-8"
        >
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown className="text-white/90 prose prose-invert prose-headings:text-white prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-white/80 prose-p:my-4 prose-li:text-white/90 prose-li:marker:text-white/90 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-a:transition-colors prose-code:bg-black/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-strong:text-white prose-strong:font-bold prose-em:text-white/90 prose-em:italic">
              {bioContent}
            </ReactMarkdown>
          </div>
        </motion.div>

        <div className="dark-blur-panel p-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-12 text-center"
          >
            <TextScramble text="Featured Projects" className="text-4xl font-bold" />
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-video overflow-hidden rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                  <TextScramble 
                    text={project.title} 
                    className="text-xl font-semibold text-white mb-2 text-center"
                    hover={true}
                  />
                  <div className="text-white/0 group-hover:text-white/90 transition-all duration-500 text-sm text-center">
                    {project.description}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};