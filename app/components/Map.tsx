'use client';
import { Progress, AspectRatio } from '@chakra-ui/react';
import { useThemeColor } from './theme';

export default function MapComponent() {
  const { childBgColor, textColor } = useThemeColor();
  return (
    <div
      style={{ backgroundColor: childBgColor, color: textColor }}
      className='flex flex-col gap-7  rounded-xl px-3 py-5 mx-auto h-auto min-[980px]:w-[350px]'
    >
      {/* Map Section */}
      <div className=''>
        <h1 className='text-xxl'>Visit From USA</h1>
        <AspectRatio ratio={3 / 2}>
          <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng' />
        </AspectRatio>
      </div>

      {/* Progress Section */}
      <div className='flex flex-col gap-4 mt-4'>
        {[
          { name: 'LA', value: 25 },
          { name: 'NY', value: 45 },
          { name: 'KA', value: 60 },
          { name: 'AZ', value: 80 },
        ].map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-between gap-3 mt-2'
          >
            <p className='w-10 text-sm md:text-base'>{item.name}</p>
            <Progress
              size='sm'
              value={item.value}
              colorScheme='pink'
              className='flex-1'
              style={{ borderRadius: '20px' }}
            />
            <p className='text-sm md:text-base'>{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
