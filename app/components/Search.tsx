import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';
type OnChangeProps = {
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
export default function Search({
  value,
  placeholder,
  onChange,
  onKeyDown,
}: OnChangeProps) {
  const searchColor = useColorModeValue('black', 'white');
  return (
    <div
      style={{ border: '2px solid rgb(124, 143, 172)' }}
      className='flex gap-3 items-center text-white  p-2 border border-custom-color rounded-4xl'
    >
      <input
        type='search'
        name=''
        id=''
        color={searchColor}
        placeholder={placeholder}
        className='outline-none'
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
