'use client';
import React, { useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import { PhoneOff } from 'lucide-react';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'video' | 'voice';
  roomId: string;
}

const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  onClose,
  type,
  roomId,
}) => {
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const audioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const videoTrackRef = useRef<ICameraVideoTrack | null>(null);

  const cleanupCall = async () => {
    try {
      if (clientRef.current) {
        await clientRef.current.leave();
        clientRef.current.removeAllListeners();
        clientRef.current = null;
      }

      if (audioTrackRef.current) {
        audioTrackRef.current.stop();
        audioTrackRef.current.close();
        audioTrackRef.current = null;
      }

      if (videoTrackRef.current) {
        videoTrackRef.current.stop();
        videoTrackRef.current.close();
        videoTrackRef.current = null;
      }
    } catch (error) {
      console.error('Error cleaning up call:', error);
    }
  };

  const endCall = async () => {
    await cleanupCall();
    onClose();
  };

  useEffect(() => {
    const initCall = async () => {
      try {
        const appId = 'b91d1da3f2854c4a91dd85c020ceb0fe';
        const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
        clientRef.current = client;

        await client.join(appId, roomId, null, null);

        if (type === 'video') {
          const [audioTrack, videoTrack] =
            await AgoraRTC.createMicrophoneAndCameraTracks();
          audioTrackRef.current = audioTrack;
          videoTrackRef.current = videoTrack;

          videoTrack.play(localVideoRef.current!);
          await client.publish([audioTrack, videoTrack]);
        } else {
          const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
          audioTrackRef.current = audioTrack;

          await client.publish([audioTrack]);
        }
      } catch (error) {
        console.error('Call initialization failed:', error);
      }
    };

    if (isOpen) {
      initCall();
    }

    return () => {
      cleanupCall();
    };
  }, [isOpen, type, roomId]);

  return (
    <Modal isOpen={isOpen} onClose={endCall} size='xl' isCentered>
      <ModalOverlay />
      <ModalContent p={4} bg='gray.800' color='white'>
        {type === 'video' ? (
          <Box
            ref={localVideoRef}
            w='100%'
            h='400px'
            bg='black'
            borderRadius='md'
          />
        ) : (
          <Box textAlign='center' py={10}>
            <p>Voice call in progress...</p>
          </Box>
        )}
        <Flex justify='center' mt={4}>
          <IconButton
            aria-label='End Call'
            icon={<PhoneOff />}
            colorScheme='red'
            size='lg'
            onClick={endCall}
            borderRadius='full'
          />
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default CallModal;
