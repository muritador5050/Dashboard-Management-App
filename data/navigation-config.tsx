import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { NavProps } from 'data/routeUtil';

export const NavigationItemComponent: React.FC<{
  item: NavProps;
  isWide: boolean;
}> = ({ item, isWide }) => {
  const [isOpen, setIsOpen] = useState(false);

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (item.kind === 'header' && !isWide) {
    return <small className='text-sm text-gray-400 mt-4'>{item.title}</small>;
  }

  return (
    <li className='list-none'>
      {item.children ? (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full p-2  hover:bg-orange-700/20 transition duration-500 rounded-tr-full rounded-br-full cursor-pointer`}
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          <div className='flex items-center gap-3'>
            {item.icon && <span>{item.icon}</span>}
            {!isWide && (
              <span>
                {item.title ? capitalizeFirstLetter(item.title) : 'Untitled'}
              </span>
            )}
          </div>
          {!isWide && (
            <span className='cursor-pointer'>
              {isOpen ? <ChevronDown /> : <ChevronRight />}
            </span>
          )}
        </div>
      ) : (
        <div className='hover:bg-green-700/20 transition duration-500 rounded-tr-full rounded-br-full'>
          <Link
            href={`/dashboard/${item.segment}`}
            className='flex items-center gap-3 p-2 block'
          >
            {item.icon && <span>{item.icon}</span>}
            {!isWide && <span>{item.title}</span>}
          </Link>
        </div>
      )}

      {item.children && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='overflow-hidden'
        >
          <div className='ml-4 mt-1 space-y-1'>
            {item.children.map((child) => (
              <div
                key={child.segment}
                className='hover:bg-red-700/20 transition duration-500 rounded-tr-full rounded-br-full'
              >
                <Link
                  href={`/dashboard/${item.title}/${child.segment}`}
                  className='flex items-center gap-2 p-2 rounded block transition'
                >
                  {child.icon && <span>{child.icon}</span>}
                  {!isWide && <span>{child.title}</span>}
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </li>
  );
};
