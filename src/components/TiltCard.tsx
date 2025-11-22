import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Feature } from '../types';

interface TiltCardProps {
  feature: Feature;
  index: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ feature, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking mouse position relative to card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth animation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Transform mouse position to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse position (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 50
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-full perspective-1000 group cursor-pointer"
    >
      <div 
        className="relative w-full h-full min-h-[340px] bg-white/90 backdrop-blur-xl rounded-[2rem] border border-white shadow-lg transition-all duration-500 flex flex-col items-center text-center p-8 overflow-hidden"
        style={{ 
          transform: "translateZ(0)",
          borderColor: isHovered ? feature.gradientFrom : 'rgba(255,255,255,0.8)',
          boxShadow: isHovered ? `0 20px 40px -10px ${feature.gradientFrom}30` : '0 10px 30px -10px rgba(0,0,0,0.05)'
        }} 
      >

        {/* 3D Floating Content Layer */}
        <div 
          style={{ transformStyle: "preserve-3d" }}
          className="flex flex-col items-center z-20 h-full w-full"
        >
          {/* Floating 3D Icon Container */}
          <div className="mb-8 relative perspective-500" style={{ transform: "translateZ(40px)" }}>
            {/* Glow Effect */}
            <div 
               className={`absolute inset-0 rounded-2xl blur-2xl transition-opacity duration-500 ${isHovered ? 'opacity-50' : 'opacity-20'}`}
               style={{ background: `linear-gradient(135deg, ${feature.gradientFrom}, ${feature.gradientTo})` }}
            />
            
            {/* The Icon Box */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl border-t border-white/30"
              style={{ 
                background: `linear-gradient(135deg, ${feature.gradientFrom}, ${feature.gradientTo})` 
              }}
            >
              <Icon 
                size={36} 
                className="text-white drop-shadow-md relative z-10"
                strokeWidth={2}
              />
              
              {/* Inner Shine */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-4 flex-grow" style={{ transform: "translateZ(20px)" }}>
            <h3 className={`text-2xl font-bold text-slate-800 transition-colors duration-300 ${isHovered ? 'text-transparent bg-clip-text' : ''}`}
                style={{ backgroundImage: isHovered ? `linear-gradient(135deg, ${feature.gradientFrom}, ${feature.gradientTo})` : 'none' }}>
              {feature.title}
            </h3>
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              {feature.description}
            </p>
          </div>

          {/* Bottom Interaction */}
          <motion.div 
            className="mt-6 flex items-center gap-2 text-sm font-bold"
            style={{ transform: "translateZ(30px)", color: feature.gradientFrom }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
             <span className={`transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}>
               اكتشف المزيد
             </span>
             <div className={`p-2 rounded-full bg-slate-50 transition-all duration-300 ${isHovered ? 'bg-white shadow-md scale-110' : ''}`}>
               <ArrowLeft size={16} className={`transition-transform duration-300 ${isHovered ? '-translate-x-1' : ''}`} />
             </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TiltCard;
