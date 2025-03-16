
import { useEffect, useState, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  hover?: boolean;
}

export const TextScramble = ({ text, className = "", hover = false }: TextScrambleProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const scrambleText = () => {
    if (isScrambling) return;
    
    setIsScrambling(true);
    let iteration = 0;
    const chars = "!<>-_BALAZS\\KOCSIS/[]{}—=+*^?#_~";
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    if (!hover && elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              scrambleText();
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(elementRef.current);
      return () => observer.disconnect();
    }
  }, [hover]);

  return (
    <div 
      ref={elementRef}
      className={className}
      onMouseEnter={hover ? scrambleText : undefined}
    >
      {displayText}
    </div>
  );
};
