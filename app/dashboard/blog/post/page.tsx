'use client';
import PageTitle from '@/components/pageTitle';
import { useThemeColor } from '@/components/theme';
import { PostProps } from '@/lib/utils';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
  Heading,
  Tag,
  Wrap,
  WrapItem,
  SimpleGrid,
  Flex,
  Center,
} from '@chakra-ui/react';
import { Eye, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function PostPage() {
  const { childBgColor, textColor } = useThemeColor();
  const [posts, setPosts] = useState<PostProps[]>([]);

  const generateImageUrl = (tagOrTitle: string, id: number): string => {
    const seed = encodeURIComponent(
      tagOrTitle.toLowerCase().replace(/\s+/g, '-')
    );
    return `https://picsum.photos/seed/${seed + id}/600/400`;
  };

  useEffect(() => {
    const addImageToPosts = (posts: PostProps[]): PostProps[] => {
      return posts.map((post) => {
        const keyword = post.tags.length ? post.tags[0] : post.title;
        return {
          ...post,
          imageUrl: generateImageUrl(keyword, post.id),
        };
      });
    };
    const fetchPosts = async (): Promise<void> => {
      try {
        const request = await fetch('https://dummyjson.com/posts');
        const response = await request.json();
        const enrichedPosts = addImageToPosts(response.posts);
        setPosts(enrichedPosts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <PageTitle />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mt={3}>
        {posts.map((post) => (
          <Card
            key={post.id}
            shadow='lg'
            borderRadius='xl'
            overflow='hidden'
            bg={childBgColor}
            color={textColor}
            cursor='pointer'
            sx={{
              transition: 'transform 0.2s ease-in-out',
              _hover: { transform: 'translateY(-10px)' },
            }}
          >
            <Link
              href={{
                pathname: `/dashboard/blog/details`,
                query: { id: post.id },
              }}
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                height='200px'
                objectFit='cover'
              />

              <CardHeader>
                <Heading size='md'>{post.title}</Heading>
              </CardHeader>

              <CardBody>
                <Text noOfLines={3}>{post.body}</Text>
                <Wrap mt={3}>
                  {post.tags.map((tag) => (
                    <WrapItem key={tag}>
                      <Tag variant='subtle' colorScheme='blue'>
                        {tag}
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              </CardBody>

              <CardFooter>
                <Flex gap={9}>
                  <Center gap={1}>
                    <Eye size={16} />
                    <Text fontSize='sm'>{post.views} views</Text>
                  </Center>
                  <Center gap={1}>
                    <ThumbsUp size={16} />
                    <Text fontSize='sm'>{post.reactions.likes} likes</Text>
                  </Center>
                </Flex>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
