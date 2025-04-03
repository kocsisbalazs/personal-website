
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MatrixRain = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    
    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const error404 = "404";
    
    const alphabet = katakana + latin + nums + error404;
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    
    const rainDrops = Array(columns).fill(canvas.height);
    
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };
    
    const interval = setInterval(draw, 30);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, [canvas]);

  return <canvas ref={setCanvas} className="absolute inset-0 z-0" />;
};

const NotFound = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      <MatrixRain />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="neo-blur p-10 rounded-xl text-center max-w-xl mx-auto"
        >
          <motion.h1 
            className="text-8xl font-bold text-[#0F0] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            404
          </motion.h1>
          <motion.h2 
            className="text-3xl font-semibold text-[#0F0] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            There is no spoon.
          </motion.h2>
          <motion.p 
            className="text-white/90 mb-8 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            The page you're looking for has been disconnected from the Matrix.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-[#0F0] text-black hover:bg-[#00FF00] hover:text-black border-[#0F0] border-2"
            >
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft size={20} />
                <span>Return to Reality</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;