'use client';

import { Flex } from '@chakra-ui/react';

export function UnicodeStarRating({ rating }: { rating: number }) {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return (
    <Flex color='yellow.600'>
      {filledStars}
      {emptyStars}
    </Flex>
  );
}
