import React from 'react';
import { SearchX } from 'lucide-react';
type OnChangeProps = {
  value?: string; // Make value optional if it's not strictly required
  placeholder?: string; // Same for placeholder
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
export default function Search({
  value,
  placeholder,
  onChange,
  onKeyDown,
}: OnChangeProps) {
  return (
    <div
      style={{ border: '2px solid rgb(124, 143, 172)' }}
      className='flex gap-3 items-center text-white  p-2 border border-custom-color rounded-4xl'
    >
      <SearchX />
      <input
        type='search'
        name=''
        id=''
        placeholder={placeholder}
        className='outline-none'
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
