import { Box, Icon } from '@chakra-ui/react';
import { ShoppingCart } from 'lucide-react';

const CartWithBadge = ({ cartLength }: { cartLength: number }) => {
  return (
    <Box position='relative' w='fit-content'>
      <Icon as={ShoppingCart} boxSize={7} />
      {cartLength > 0 && (
        <Box
          position='absolute'
          top='-1'
          right='-1'
          bg='blue.500'
          color='white'
          fontSize='xs'
          px='1.5'
          rounded='full'
          fontWeight='bold'
          minW='4'
          textAlign='center'
        >
          {cartLength}
        </Box>
      )}
    </Box>
  );
};
export default CartWithBadge;
