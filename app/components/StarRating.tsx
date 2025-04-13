'use client';

import { Text } from '@chakra-ui/react';

export function UnicodeStarRating({ rating }: { rating: number }) {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return (
    <Text display='flex' color='yellow.600'>
      {filledStars}
      {emptyStars}
    </Text>
  );
}
