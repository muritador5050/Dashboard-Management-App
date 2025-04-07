export function UnicodeStarRating({ rating }: { rating: number }) {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return (
    <span>
      {filledStars}
      {emptyStars}
    </span>
  );
}
