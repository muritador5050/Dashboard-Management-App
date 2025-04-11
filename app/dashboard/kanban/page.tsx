'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import PageTitle from '@/components/pageTitle';
import { useThemeColor } from '@/lib/themeUtil';

interface TodoList {
  id: number;
  todo: string;
  completed: boolean;
}

export default function Kanban() {
  const [todos, setTodos] = useState<TodoList[]>([]);
  const { childBgColor } = useThemeColor();
  const headColor = useColorModeValue('black', 'white');
  // Effect
  useEffect(() => {
    async function FetchTodo() {
      try {
        const request = await fetch('https://dummyjson.com/todos');
        if (!request.ok) {
          throw new Error('Failed to fetch data');
        }
        const response: { todos: TodoList[] } = await request.json();
        setTodos(response.todos || []);
      } catch (error) {
        console.error(error || 'Something went wrong');
      }
    }

    FetchTodo();
  }, []);

  // Filter todos by completed and pending
  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <Box>
      <PageTitle />
      <Heading color={headColor} mb={4}>
        Improving Work Processes
      </Heading>
      <Stack direction={{ base: 'column', xxl: 'row' }} spacing={4}>
        {/* Completed Todos Stack */}
        <Box flex='1' bg='whiteAlpha.500' p={4} borderRadius='2xl'>
          <Heading size='md' mb={4} color={headColor} textAlign='center'>
            Completed
          </Heading>
          <Stack>
            {completedTodos.map(({ id, todo }) => (
              <Box
                key={id}
                p={4}
                borderWidth='1px'
                borderRadius='lg'
                bg={childBgColor}
              >
                <Text>{todo}</Text>
                <Tag colorScheme='green' variant='solid'>
                  Completed
                </Tag>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Pending Todos Stack */}
        <Box flex='1' bg='whiteAlpha.500' p={4} borderRadius='2xl'>
          <Heading size='md' mb={4} color={headColor} textAlign='center'>
            Pending
          </Heading>
          <Stack>
            {pendingTodos.map(({ id, todo }) => (
              <Box
                key={id}
                p={4}
                borderWidth='1px'
                borderRadius='lg'
                bg={childBgColor}
              >
                <Text>{todo}</Text>
                <Tag colorScheme='red' variant='solid'>
                  Pending
                </Tag>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
