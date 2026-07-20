import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4, scale: 1.01, boxShadow: '0 24px 70px -24px rgba(16, 185, 129, 0.28)' } : undefined}
      transition={{ duration: 0.2 }}
      className={`rounded-[1.6rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.22)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
};
