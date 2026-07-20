import { motion } from 'framer-motion';

const variantClasses = {
  primary: 'bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:from-emerald-700 hover:to-green-600 shadow-lg shadow-emerald-900/15',
  secondary: 'bg-white/80 text-slate-700 hover:bg-white shadow-sm ring-1 ring-slate-200/80',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-900/15',
};

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-full px-5 py-2.5 font-medium transition ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
