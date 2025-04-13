import { useThemeColor } from '@/lib/themeUtil';
import {
  Box,
  Input,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

type RouteProps = {
  name: string;
  routePath: string;
};

export const SearchDropdown = () => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<RouteProps[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { childBgColor, textColor } = useThemeColor();

  const pageRoute: RouteProps[] = [
    { name: 'Shop', routePath: '/dashboard/ecommerce/shop' },
    { name: 'Shop List', routePath: '/dashboard/ecommerce/list' },
    { name: 'Blog Post', routePath: '/dashboard/blog/post' },
    { name: 'Profile', routePath: '/dashboard/profile' },
    { name: 'Email', routePath: '/dashboard/email' },
    { name: 'Calendar', routePath: '/dashboard/calendar' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setFiltered([]);
      onClose();
      return;
    }

    const results = pageRoute.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(value.toLowerCase());
      const pathMatch = item.routePath
        .toLowerCase()
        .includes(value.toLowerCase());
      return nameMatch || pathMatch;
    });

    setFiltered(results);
    if (results.length > 0) onOpen();
    else onClose();
  };

  return (
    <Box position='relative' width='300px'>
      <Input
        borderRadius='3xl'
        placeholder='Search here...'
        value={query}
        onChange={handleChange}
        onBlur={() => setTimeout(onClose, 150)}
        onFocus={() => {
          if (query.trim() !== '' && filtered.length > 0) onOpen();
        }}
      />

      {isOpen && filtered.length > 0 && (
        <Box
          position='absolute'
          top='100%'
          mt='1'
          w='100%'
          bg={childBgColor}
          color={textColor}
          boxShadow='md'
          borderRadius='md'
          zIndex='10'
        >
          <List spacing={0}>
            {filtered.map((item, idx) => (
              <ListItem
                key={idx}
                px={3}
                py={2}
                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                onClick={() => {
                  setQuery(item.name);
                  onClose();
                }}
              >
                <Text fontWeight='bold'>{item.name}</Text>
                <Link href={item.routePath}>
                  <Text _hover={{ color: 'blue.500' }}>{item.routePath}</Text>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};
