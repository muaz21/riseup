import { LucideIcon } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { motion } from 'motion/react';
import { useState } from 'react';

interface CategoryCardProps {
  icon: LucideIcon;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  onClick: () => void;
}

export function CategoryCard({
  icon: Icon,
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  onClick,
}: CategoryCardProps) {
  const { t, dir } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className={`group relative p-8 rounded-2xl border-2 hover:shadow-2xl w-full overflow-hidden transition-all duration-300 ${
        dir === 'rtl' ? 'text-right' : 'text-left'
      } border-neutral-200 hover:border-primary/30`}
      style={{
        backgroundColor: '#FAFBFC',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)';
      }}
    >
      {/* Gradient Overlay on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-50/50 to-accent/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Decorative Blob */}
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/10 rounded-full blur-2xl"
        animate={{ scale: isHovered ? 1.5 : 1, rotate: isHovered ? 90 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Animated particles */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                left: '50%',
                top: '50%',
              }}
            />
          ))}
        </>
      )}

      <div
        className={`relative flex items-start gap-5 ${
          dir === 'rtl' ? 'flex-row-reverse' : ''
        }`}
      >
        <motion.div
          className="p-4 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl shadow-lg shadow-primary/30"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 6 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
        </motion.div>

        <div className="flex-1">
          <motion.h3
            className={`mb-2 text-xl transition-colors ${
              isHovered ? 'text-primary' : 'text-neutral-900'
            }`}
            transition={{ duration: 0.3 }}
          >
            {t(titleAr, titleEn)}
          </motion.h3>
          <p className="leading-relaxed transition-colors text-neutral-600">
            {t(descriptionAr, descriptionEn)}
          </p>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: dir === 'rtl' ? 'right' : 'left' }}
      />

      {/* Corner shine effect */}
      <motion.div
        className={`absolute top-0 w-20 h-20 bg-white/40 blur-xl ${
          dir === 'rtl' ? 'left-0' : 'right-0'
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
