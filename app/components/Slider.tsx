import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from '@chakra-ui/react';
type SliderProps = {
  value: number; // The value must be a number (percentage)
  setValue: (value: number) => void; // Function to update the state
};
function DiscountSlider({ value, setValue }: SliderProps) {
  return (
    <Box w='100%'>
      <Slider
        aria-label='discount-slider'
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={setValue}
      >
        <SliderTrack>
          <SliderFilledTrack bg='blue.500' />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
      <p>Discount: {value}%</p>
    </Box>
  );
}

export default DiscountSlider;
