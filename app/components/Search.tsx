import React from 'react';
import { SearchX } from 'lucide-react';
type OnchangeProp = {
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Search({ value, placeholder, onChange }: OnchangeProp) {
  return (
    <div className='flex gap-3 items-center text-white text-xl p-2 border border-custom-color rounded-4xl'>
      <SearchX />
      <input
        type='search'
        name=''
        id=''
        placeholder={placeholder}
        className='outline-none'
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
