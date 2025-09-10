import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  IconButton,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import { Smile, Mic, Square, Send } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { auth, db, storage } from '@/config/firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ChatInputProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  chatId: string;
}

export default function ChatInput({ scrollRef, chatId }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSendMessage = async () => {
    const user = auth.currentUser;
    if (!message.trim() || !user || !chatId) return;

    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      type: 'text',
      text: message,
      displayName: user.displayName || 'Anonymous',
      photoURL: user.photoURL || '',
      uid: user.uid,
      createdAt: serverTimestamp(),
    });

    await updateDoc(doc(db, 'chats', chatId), {
      lastMessage: message,
      lastMessageAt: serverTimestamp(),
    });

    setMessage('');
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Format seconds into mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleToggleRecording = async () => {
    if (!isRecording) {
      try {
        // Check if getUserMedia is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          alert('Your browser does not support audio recording');
          return;
        }

        console.log('Requesting microphone access...');
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
          },
        });

        console.log('Microphone access granted');

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm; codecs=opus',
        });

        mediaRecorderRef.current = mediaRecorder;

        const chunks: Blob[] = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        mediaRecorder.onstop = async () => {
          try {
            console.log('Processing recorded audio...');

            // Stop all tracks to release the microphone
            stream.getTracks().forEach((track) => track.stop());

            const blob = new Blob(chunks, { type: 'audio/webm; codecs=opus' });

            if (blob.size === 0) {
              console.error('Recording is empty');
              return;
            }

            if (!chatId || !auth.currentUser) {
              console.error('Missing chatId or user');
              return;
            }

            console.log('Uploading voice note...');
            const fileRef = ref(
              storage,
              `voice_notes/${Date.now()}-${auth.currentUser.uid}.webm`
            );

            await uploadBytes(fileRef, blob);
            const url = await getDownloadURL(fileRef);
            console.log('Generated voice note URL:', url);

            console.log('Adding message to database...');
            await addDoc(collection(db, 'chats', chatId, 'messages'), {
              type: 'voice',
              audioUrl: url,
              displayName: auth.currentUser.displayName || 'Anonymous',
              photoURL: auth.currentUser.photoURL || '',
              uid: auth.currentUser.uid,
              createdAt: serverTimestamp(),
            });

            await updateDoc(doc(db, 'chats', chatId), {
              lastMessage: '🎤 Voice message',
              lastMessageAt: serverTimestamp(),
            });

            console.log('Voice message sent successfully!');
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
          } catch (uploadError) {
            console.error('Error uploading voice message:', uploadError);
            alert('Failed to send voice message. Please try again.');
          }
        };

        mediaRecorder.onerror = (event) => {
          console.error('MediaRecorder error:', event);
          stream.getTracks().forEach((track) => track.stop());
          setIsRecording(false);
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingTime(0);

        // Start timer
        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);

        console.log('Recording started');
      } catch (error) {
        console.error('Error accessing microphone:', error);

        setIsRecording(false);
      }
    } else {
      console.log('Stopping recording...');
      mediaRecorderRef.current?.stop();
      setIsRecording(false);

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <InputGroup size='md' mt={3}>
      <InputLeftAddon border='none' cursor='pointer'>
        <Smile size={18} />
      </InputLeftAddon>

      <Input
        placeholder='Type a message...'
        border='none'
        borderRadius='xl'
        color='white'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <InputRightAddon bg='gray.60' border='none'>
        <Flex align='center' gap={2}>
          {isRecording && (
            <Flex align='center' gap={1} mr={2}>
              <Box
                w='2'
                h='2'
                borderRadius='full'
                bg='red.500'
                animation='pulse 1.5s infinite'
              />
              <Text fontSize='xs' color='red.400'>
                {formatTime(recordingTime)}
              </Text>
            </Flex>
          )}

          <IconButton
            icon={<Send />}
            aria-label='Send message'
            variant='ghost'
            size='sm'
            onClick={handleSendMessage}
          />

          <IconButton
            icon={isRecording ? <Square /> : <Mic />}
            aria-label='Voice message'
            variant='ghost'
            size='sm'
            onClick={handleToggleRecording}
            colorScheme={isRecording ? 'red' : 'gray'}
          />
        </Flex>
      </InputRightAddon>
    </InputGroup>
  );
}
