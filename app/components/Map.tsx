'use client';
import { Progress } from '@chakra-ui/react';
import { AspectRatio } from '@chakra-ui/react';
export default function MapComponent() {
  return (
    <div className=' flex flex-col  bg-custom-bg rounded-xl h-[650px] p-3 min-[980px]:w-[400px]'>
      <div className='h-1/2'>
        <AspectRatio ratio={16 / 9}>
          <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng' />
        </AspectRatio>
      </div>
      <div className='h-1/2'>
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
