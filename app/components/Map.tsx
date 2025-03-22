'use client';
import { Progress } from '@chakra-ui/react';

export default function MapComponent() {
  return (
    <div className=' flex flex-col justify-between bg-custom-bg rounded-xl h-[650px] p-3 min-[980px]:w-[400px]'>
      <div className='h-50%'></div>
      <div className='h-50%'>
        <span className='flex justify-between'>
          <p>LA</p>
          <Progress size='sm' value={25} colorScheme='pink' />
          <p>25%</p>
        </span>
        <span className='flex justify-between'>
          <p>NY</p>
          <Progress size='sm' value={25} colorScheme='pink' />
          <p>25%</p>
        </span>
        <span className='flex justify-between'>
          <p>KA</p>
          <Progress size='sm' value={25} colorScheme='pink' />
          <p>25%</p>
        </span>
        <span className='flex justify-between'>
          <p>AZ</p>
          <Progress size='sm' value={25} colorScheme='pink' />
          <p>25%</p>
        </span>
      </div>
    </div>
  );
}
