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
import { showToast } from '@/lib/toastService';
import { useThemeColor } from '@/lib/themeUtil';

interface ChatInputProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  chatId: string;
}

export default function ChatInput({ scrollRef, chatId }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const uploadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { textColor } = useThemeColor();

  const handleSendMessage = async () => {
    const user = auth.currentUser;
    if (!message.trim() || !user || !chatId) return;

    try {
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
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const cleanupUploadTimeout = () => {
    if (uploadTimeoutRef.current) {
      clearTimeout(uploadTimeoutRef.current);
      uploadTimeoutRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  const handleUploadTimeout = () => {
    console.log('Upload timeout reached, cancelling upload...');
    cleanupUploadTimeout();
    setIsUploading(false);
    showToast({
      title: 'info',
      description:
        'Upload timeout. The file took too long to upload. Please try again.',
      status: 'info',
      duration: 4000,
    });
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

        let mimeType = 'audio/webm; codecs=opus';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/webm';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'audio/mp4';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
              mimeType = '';
            }
          }
        }

        const mediaRecorder = new MediaRecorder(
          stream,
          mimeType ? { mimeType } : undefined
        );

        mediaRecorderRef.current = mediaRecorder;

        const chunks: Blob[] = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        mediaRecorder.onstop = async () => {
          console.log('Processing recorded audio...');
          setIsUploading(true);

          uploadTimeoutRef.current = setTimeout(() => {
            handleUploadTimeout();
          }, 10000);

          abortControllerRef.current = new AbortController();

          try {
            // Stop all tracks to release the microphone
            stream.getTracks().forEach((track) => track.stop());

            const blob = new Blob(chunks, {
              type: mimeType || 'audio/webm',
            });

            if (blob.size === 0) {
              console.error('Recording is empty');
              cleanupUploadTimeout();
              setIsUploading(false);
              return;
            }

            if (!chatId || !auth.currentUser) {
              console.error('Missing chatId or user');
              cleanupUploadTimeout();
              setIsUploading(false);
              return;
            }

            console.log('Blob size:', blob.size, 'Type:', blob.type);

            // Generate filename with proper extension
            const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
            const fileName = `voice_${Date.now()}-${
              auth.currentUser.uid
            }.${extension}`;
            const fileRef = ref(storage, `voice_notes/${fileName}`);

            console.log('Uploading to:', fileRef.fullPath);

            // Upload with metadata
            const metadata = {
              contentType: blob.type,
              customMetadata: {
                uploadedBy: auth.currentUser.uid,
                uploadedAt: new Date().toISOString(),
              },
            };

            // NEW: Check if upload was cancelled before proceeding
            if (abortControllerRef.current?.signal.aborted) {
              throw new Error('Upload cancelled due to timeout');
            }

            const uploadResult = await uploadBytes(fileRef, blob, metadata);
            console.log('Upload successful:', uploadResult);

            // NEW: Check again if upload was cancelled
            if (abortControllerRef.current?.signal.aborted) {
              throw new Error('Upload cancelled due to timeout');
            }

            const downloadUrl = await getDownloadURL(uploadResult.ref);
            console.log('Generated voice note URL:', downloadUrl);

            // NEW: Check one more time before database operations
            if (abortControllerRef.current?.signal.aborted) {
              throw new Error('Upload cancelled due to timeout');
            }

            console.log('Adding message to database...');
            await addDoc(collection(db, 'chats', chatId, 'messages'), {
              type: 'voice',
              url: downloadUrl,
              displayName: auth.currentUser.displayName || 'Anonymous',
              photoURL: auth.currentUser.photoURL || '',
              uid: auth.currentUser.uid,
              createdAt: serverTimestamp(),
              fileName: fileName,
              fileSize: blob.size,
            });

            await updateDoc(doc(db, 'chats', chatId), {
              lastMessage: '🎤 Voice message',
              lastMessageAt: serverTimestamp(),
            });

            console.log('Voice message sent successfully!');
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });

            // NEW: Clear timeout on successful completion
            cleanupUploadTimeout();
          } catch (error) {
            console.error('Error uploading voice note:', error);

            // NEW: Check if error was due to timeout
            if (error instanceof Error && error.message.includes('timeout')) {
              console.log('Upload was cancelled due to timeout');
            } else {
              alert('Failed to upload voice message. Please try again.');
            }

            cleanupUploadTimeout(); // NEW: Cleanup timeout
          } finally {
            setIsUploading(false);
          }
        };

        mediaRecorder.onerror = (event) => {
          console.error('MediaRecorder error:', event);
          stream.getTracks().forEach((track) => track.stop());
          setIsRecording(false);
          setIsUploading(false);
          cleanupUploadTimeout(); // NEW: Cleanup timeout
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        };

        mediaRecorder.start(1000);
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
        alert('Failed to access microphone. Please check permissions.');
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

  // NEW: Function to manually cancel upload
  const handleCancelUpload = () => {
    if (isUploading) {
      console.log('Manually cancelling upload...');
      cleanupUploadTimeout();
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      cleanupUploadTimeout();
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
        color={textColor}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />

      <InputRightAddon bg='gray.60' border='none'>
        <Flex align='center' gap={2}>
          {(isRecording || isUploading) && (
            <Flex align='center' gap={1} mr={2}>
              <Box
                w='2'
                h='2'
                borderRadius='full'
                bg={isUploading ? 'blue.500' : 'red.500'}
                animation='pulse 1.5s infinite'
              />
              <Text fontSize='xs' color={isUploading ? 'blue.400' : 'red.400'}>
                {isUploading ? 'Uploading...' : formatTime(recordingTime)}
              </Text>
              {/* NEW: Cancel upload button */}
              {isUploading && (
                <IconButton
                  icon={<Square />}
                  aria-label='Cancel upload'
                  variant='ghost'
                  size='xs'
                  colorScheme='red'
                  onClick={handleCancelUpload}
                  ml={1}
                />
              )}
            </Flex>
          )}

          <IconButton
            icon={<Send />}
            aria-label='Send message'
            variant='ghost'
            size='sm'
            onClick={handleSendMessage}
            isDisabled={!message.trim() || isUploading}
          />

          <IconButton
            icon={isRecording ? <Square /> : <Mic />}
            aria-label='Voice message'
            variant='ghost'
            size='sm'
            onClick={handleToggleRecording}
            colorScheme={isRecording ? 'red' : 'gray'}
            isDisabled={isUploading}
            isLoading={isUploading}
          />
        </Flex>
      </InputRightAddon>
    </InputGroup>
  );
}
