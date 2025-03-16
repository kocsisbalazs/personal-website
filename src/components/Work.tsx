import { motion } from "framer-motion";
import { TextScramble } from "./TextScramble";
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';


const projects = [
  {
    title: "BeeSafe",
    description: "Buzz through barcodes and find food thats right for you",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    link: "#",
  },
  {
    title: "Audio Book Builder",
    description: "Machine learning algorithms that provide actionable business insights.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    link: "#",
  },
  {
    title: "Online epub, PDF reader",
    description: "Scalable online shopping solution with integrated payment processing.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    link: "#",
  },
  {
    title: "Substack RAG",
    description: "Cross-platform mobile applications with seamless user experiences.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6",
    link: "#",
  },
  {
    title: "GIS Analytics",
    description: "Robust cloud solutions with automated scaling and deployment.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    link: "#",
  },
  {
    title: "Hungarian Youth Association",
    description: "Secure and transparent blockchain applications for various industries.",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55",
    link: "#",
  },
  {
    title: "OpenBook",
    description: "Connecting student with startups in the youngest city of Denmark",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    link: "#",
  },
  {
    title: "Pioneer Aarhus",
    description: "Thinking beyond the classroom. Building beyond expectations",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    link: "#",
  },
  {
    title: "Markly",
    description: "SwiftUI based Markdown Editor",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    link: "#",
  },
];

// Fallback content in case fetch fails
const fallbackContent = `I have been working on a series of investments, incubations, and operating companies focused on the technology future.`;

export const Work = () => {
  const [content, setContent] = useState(fallbackContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Make sure the URL is correct - it should be relative to your base URL
        const response = await fetch('/work.md');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching markdown:', error);
        // Keep using fallback content
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <section className="py-20 relative" id="work">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-32 backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl"
        >
          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/90 prose-li:text-white/90 prose-strong:text-white">
            {isLoading ? (
              <p>Loading content...</p>
            ) : (
              <ReactMarkdown>{content}</ReactMarkdown>
            )}
          </div>
        </motion.div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl">
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
