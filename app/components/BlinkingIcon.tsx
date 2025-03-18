import { motion } from 'framer-motion';
import { MessageSquareWarning } from 'lucide-react';
const BlinkingIcon = () => {
  return (
    <div className='relative'>
      <MessageSquareWarning size={32} />
      <motion.div
        className='flex justify-center items-center absolute  -top-1 -right-1 w-5 h-5 rounded-full bg-transparent border-2 border-amber-400'
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.span
        className='absolute top-0 right-0 h-2 w-2 bg-amber-400 rounded-full'
        animate={{ opacity: 1 }}
      />
    </div>
  );
};

export default BlinkingIcon;
