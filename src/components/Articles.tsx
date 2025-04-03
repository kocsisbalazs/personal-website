import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextScramble } from './TextScramble';
import { ArrowRight, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReactMarkdown from 'react-markdown';

// Import all markdown files
import globalPopulationDensity from '../content/articles/global-population-density.md?raw';
import climateChangeImpact from '../content/articles/climate-change-impact.md?raw';
import biodiversityHotspots from '../content/articles/biodiversity-hotspots.md?raw';
import oceanTemperatureAnomalies from '../content/articles/ocean-temperature-anomalies.md?raw';
import forestCoverChange from '../content/articles/forest-cover-change.md?raw';

// Define article metadata type
interface ArticleMetadata {
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

const parseMarkdown = (markdown: string): ArticleMetadata => {
  try {
    // Ensure we're working with a string with normalized line endings
    const normalizedMarkdown = markdown.trim().replace(/\r\n/g, '\n');
    
    // More robust frontmatter regex that handles various line endings
    const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = normalizedMarkdown.match(frontMatterRegex);
    
    if (!match || !match[1]) {
      console.error("Failed to match frontmatter in:", normalizedMarkdown.substring(0, 100) + "...");
      throw new Error('Could not parse frontmatter');
    }
    
    const frontMatter = match[1];
    const content = normalizedMarkdown.replace(frontMatterRegex, '').trim();
    
    // Parse frontmatter values with more robust regex
    const titleMatch = frontMatter.match(/title:\s*(.*?)(\n|$)/);
    const dateMatch = frontMatter.match(/date:\s*(.*?)(\n|$)/);
    const categoryMatch = frontMatter.match(/category:\s*(.*?)(\n|$)/);
    const imageMatch = frontMatter.match(/image:\s*(.*?)(\n|$)/);
    const excerptMatch = frontMatter.match(/excerpt:\s*(.*?)(\n|$)/);
    
    return {
      title: titleMatch ? titleMatch[1].trim() : 'Untitled',
      date: dateMatch ? dateMatch[1].trim() : new Date().toISOString().split('T')[0],
      category: categoryMatch ? categoryMatch[1].trim() : 'uncategorized',
      image: imageMatch ? imageMatch[1].trim() : 'https://via.placeholder.com/800x600',
      excerpt: excerptMatch ? excerptMatch[1].trim() : 'No excerpt available',
      content: content
    };
  } catch (error) {
    console.error("Error parsing markdown:", error);
    throw error;
  }
};

export const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ArticleMetadata | null>(null);
  const [categories, setCategories] = useState<string[]>(['All Articles']);
  
  useEffect(() => {
    try {
      // Parse all markdown files
      const parsedArticles = [
        parseMarkdown(globalPopulationDensity),
        parseMarkdown(climateChangeImpact),
        parseMarkdown(biodiversityHotspots),
        parseMarkdown(oceanTemperatureAnomalies),
        parseMarkdown(forestCoverChange)
      ];
      
      // Sort by date (newest first)
      parsedArticles.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      
      // Extract unique categories from articles
      const uniqueCategories = Array.from(
        new Set(parsedArticles.map(article => article.category))
      );
      
      // Set categories with "All Articles" as the first option
      setCategories(['All Articles', ...uniqueCategories]);
      setArticles(parsedArticles);
    } catch (error) {
      console.error("Error processing articles:", error);
    }
  }, []);
  
  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'All Articles'
    ? articles
    : articles.filter(article => article.category === selectedCategory);
  
  const handleArticleClick = (article: ArticleMetadata) => {
    setSelectedArticle(article);
  };
  
  return (
    <section className="py-20 relative" id="articles">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="dark-blur-panel p-8"
        >
          <h2 className="text-4xl font-bold text-white mb-3">
            <TextScramble text="Data Visualization Through R Cartography" className="text-4xl font-bold" />
          </h2>
          <p className="text-white/70 mb-8">
            Explore a collection of maps created with R, visualizing geographical data from around the world.
          </p>
          
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-white/70" />
            <span className="text-white/70">Browse by category:</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer px-3 py-1 rounded-lg ${
                  selectedCategory === category 
                    ? "bg-white text-black hover:bg-white/90" 
                    : "bg-black/20 text-white/80 hover:bg-black/40 border-white/10"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-lg backdrop-blur-sm bg-black/40 hover:bg-black/60 transition-all duration-300 border border-white/10 cursor-pointer"
                onClick={() => handleArticleClick(article)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-white/50 text-sm mb-2">
                    {format(new Date(article.date), 'yyyy-MM-dd')}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white/90">
                    {article.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center text-white/90 text-sm font-medium group-hover:text-white">
                    View details <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto article-dialog">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedArticle?.title}
            </DialogTitle>
            <div className="flex justify-between items-center mt-2 mb-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-black/20 text-white/80 border-white/10 rounded-lg">
                  {selectedArticle?.category}
                </Badge>
                <span className="text-white/50 text-sm">
                  {selectedArticle?.date && format(new Date(selectedArticle.date), 'yyyy-MM-dd')}
                </span>
              </div>
            </div>
          </DialogHeader>
          
          {selectedArticle?.image && (
            <div className="w-full h-[300px] relative rounded-lg overflow-hidden mb-6">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown className="text-white/90 prose prose-invert prose-headings:text-white prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-white/80 prose-p:my-4 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-code:bg-black/60 prose-code:p-1 prose-code:rounded prose-code:text-blue-300 prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:p-4 prose-strong:text-white prose-strong:font-bold prose-em:text-white/90 prose-em:italic">
              {selectedArticle?.content || ''}
            </ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};