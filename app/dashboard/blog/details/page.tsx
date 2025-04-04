'use client';
import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  Card,
  Heading,
  CardBody,
  CardFooter,
  AbsoluteCenter,
  Flex,
  CardHeader,
  Wrap,
  WrapItem,
  Tag,
  Center,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { PostProps } from '@/lib/utils';
import Loading from '@/loading';
import { Eye, ThumbsUp } from 'lucide-react';

//Details
export default function Details() {
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  //Effect
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const request = await fetch(`https://dummyjson.com/posts/${id}`);
        if (!request.ok) {
          throw new Error('Failed to fetch product data');
        }
        const response: PostProps = await request.json();
        setPost(response);
      } catch (err) {
        setError(err + 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Text color='red'>{error}</Text>;
  }

  if (!post) {
    return (
      <AbsoluteCenter>
        <Text>Post not found try to select a post</Text>
      </AbsoluteCenter>
    );
  }

  return (
    <Card
      key={post.id}
      shadow='lg'
      borderRadius='xl'
      overflow='hidden'
      bg='rgb(17,28,45)'
      color='rgb(124, 143, 172)'
      cursor='pointer'
      sx={{
        transition: 'transform 0.2s ease-in-out',
        _hover: { transform: 'translateY(-10px)' },
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
    </Card>
  );
}
