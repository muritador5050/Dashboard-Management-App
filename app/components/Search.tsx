import React from 'react';
import { SearchX } from 'lucide-react';
export default function Search() {
  return (
    <div className='flex gap-3 items-center text-white text-xl p-2 border border-custom-color rounded-4xl'>
      <SearchX />
      <input
        type='search'
        name=''
        id=''
        placeholder='Try to searching...'
        className='outline-none'
      />
    </div>
  );
}
