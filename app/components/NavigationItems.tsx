import { NavigationItem } from '../lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

//NavigationItem
export const NavigationItemComponent: React.FC<{
  item: NavigationItem;
  isWide: boolean;
}> = ({ item, isWide }) => {
  const [isOpen, setIsOpen] = useState(false);
  function capitalizeFirstLetter(str: string) {
    return str.replace(/^./, (match) => match.toUpperCase());
  }
  if (item.kind === 'header' && !isWide) {
    return <small className='text-sm text-gray-400 mt-4'>{item.title}</small>;
  }

  return (
    <li className='list-none'>
      {item.children ? (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full p-2 hover:bg-purple-700 transition duration-300 rounded cursor-pointer `}
        >
          <div className='flex items-center gap-3'>
            {item.icon && <span>{item.icon}</span>}
            {!isWide && (
              <span>{item.title && capitalizeFirstLetter(item.title)}</span>
            )}
          </div>
          {!isWide && (
            <span className='cursor-pointer '>
              {isOpen ? <ChevronDown /> : <ChevronRight />}
            </span>
          )}
        </div>
      ) : (
        <Link
          href={`/dashboard/${item.segment}`}
          className={`flex items-center gap-3 p-2 hover:bg-red-700 transition duration-500  rounded block`}
        >
          {item.icon && <span>{item.icon}</span>}
          {!isWide && <span>{item.title}</span>}
        </Link>
      )}

      {item.children && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='overflow-hidden'
        >
          <div className='ml-4 mt-1 space-y-1'>
            {item.children.map((child, idx) => (
              <Link
                href={`/dashboard/${item.title}/${child.segment}`}
                className={`flex items-center gap-2 p-2 rounded block transition `}
                key={idx}
              >
                {child.icon && <span>{child.icon}</span>}
                {!isWide && <span>{child.title}</span>}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </li>
  );
};
