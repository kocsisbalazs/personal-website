import React, { useEffect, useRef } from "react";

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const BoidsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize boids
    const boids: Boid[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));

    // Boid behavior parameters
    const visualRange = 50;
    const centeringFactor = 0.005;
    const avoidFactor = 0.05;
    const matchingFactor = 0.05;
    const maxSpeed = 2;
    const minSpeed = 1;

    const keepWithinBounds = (boid: Boid) => {
      const margin = 100;
      const turnFactor = 0.2;

      if (boid.x < margin) boid.vx += turnFactor;
      if (boid.x > canvas.width - margin) boid.vx -= turnFactor;
      if (boid.y < margin) boid.vy += turnFactor;
      if (boid.y > canvas.height - margin) boid.vy -= turnFactor;
    };

    const limitSpeed = (boid: Boid) => {
      const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
      if (speed > maxSpeed) {
        boid.vx = (boid.vx / speed) * maxSpeed;
        boid.vy = (boid.vy / speed) * maxSpeed;
      }
      if (speed < minSpeed) {
        boid.vx = (boid.vx / speed) * minSpeed;
        boid.vy = (boid.vy / speed) * minSpeed;
      }
    };

    const flyTowardsCenter = (boid: Boid, neighbors: Boid[]) => {
      if (neighbors.length === 0) return;

      let centerX = 0;
      let centerY = 0;

      neighbors.forEach((neighbor) => {
        centerX += neighbor.x;
        centerY += neighbor.y;
      });

      centerX /= neighbors.length;
      centerY /= neighbors.length;

      boid.vx += (centerX - boid.x) * centeringFactor;
      boid.vy += (centerY - boid.y) * centeringFactor;
    };

    const avoidOthers = (boid: Boid, neighbors: Boid[]) => {
      let moveX = 0;
      let moveY = 0;

      neighbors.forEach((neighbor) => {
        const dx = boid.x - neighbor.x;
        const dy = boid.y - neighbor.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
          moveX += dx;
          moveY += dy;
        }
      });

      boid.vx += moveX * avoidFactor;
      boid.vy += moveY * avoidFactor;
    };

    const matchVelocity = (boid: Boid, neighbors: Boid[]) => {
      if (neighbors.length === 0) return;

      let avgVX = 0;
      let avgVY = 0;

      neighbors.forEach((neighbor) => {
        avgVX += neighbor.vx;
        avgVY += neighbor.vy;
      });

      avgVX /= neighbors.length;
      avgVY /= neighbors.length;

      boid.vx += (avgVX - boid.vx) * matchingFactor;
      boid.vy += (avgVY - boid.vy) * matchingFactor;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";

      boids.forEach((boid) => {
        const neighbors = boids.filter((other) => {
          if (other === boid) return false;
          const dx = boid.x - other.x;
          const dy = boid.y - other.y;
          return Math.sqrt(dx * dx + dy * dy) < visualRange;
        });

        flyTowardsCenter(boid, neighbors);
        avoidOthers(boid, neighbors);
        matchVelocity(boid, neighbors);
        limitSpeed(boid);
        keepWithinBounds(boid);

        boid.x += boid.vx;
        boid.y += boid.vy;

        ctx.beginPath();
        ctx.arc(boid.x, boid.y, 2, 0, 2 * Math.PI);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-charcoal to-black"
    />
  );
};

export default BoidsBackground;