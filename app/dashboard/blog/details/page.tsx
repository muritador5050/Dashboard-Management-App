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
import { ArrowLeft, Eye, ThumbsUp } from 'lucide-react';
import PageTitle from '@/components/pageTitle';
import Link from 'next/link';

//Details
export default function Details() {
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const generateImageUrl = (tagOrTitle: string, id: number): string => {
    const seed = encodeURIComponent(
      tagOrTitle.toLowerCase().replace(/\s+/g, '-')
    );
    return `https://picsum.photos/seed/${seed + id}/600/400`;
  };
  //Effect
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchPost(): Promise<void> {
      setLoading(true);
      setError(null);
      try {
        const request = await fetch(`https://dummyjson.com/posts/${id}`);
        if (!request.ok) {
          throw new Error('Failed to fetch post data');
        }
        const response: PostProps = await request.json();
        const keyword = response.tags.length
          ? response.tags[0]
          : response.title;
        const enrichedPost: PostProps & { imageUrl: string } = {
          ...response,
          imageUrl: generateImageUrl(keyword, response.id),
        };
        setPost(enrichedPost);
      } catch (err) {
        setError(err + ' An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
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
    <>
      <PageTitle />
      <Link href='/dashboard/blog/post'>
        <ArrowLeft />
      </Link>
      <Card
        key={post.id}
        shadow='lg'
        borderRadius='xl'
        overflow='hidden'
        bg='rgb(17,28,45)'
        color='rgb(124, 143, 172)'
        cursor='pointer'
      >
        <Image
          src={post.imageUrl}
          alt={post.title}
          height='500px'
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
    </>
  );
}
