import React, { useState, useEffect, useRef, useCallback } from 'react';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraCameraVideoTrack,
  IAgoraMicrophoneAudioTrack,
  IRemoteUser,
  VideoPlayer,
  ClientConfig,
} from 'agora-rtc-sdk-ng';
import { Button } from '@chakra-ui/react';

// Replace with your Agora App ID.  This should ideally come from an environment variable.
const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID || 'YOUR_AGORA_APP_ID';
const AgoraVideoCall = ({
  user1Id,
  user2Id,
  onCallEnd,
}: {
  user1Id: string;
  user2Id: string;
  onCallEnd: () => void;
}) => {
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [localVideoTrack, setLocalVideoTrack] =
    useState<IAgoraCameraVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] =
    useState<IAgoraMicrophoneAudioTrack | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<IRemoteUser[]>([]);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    // Initialize Agora client
    const initializeAgora = async () => {
      const newClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      setClient(newClient);
    };
    initializeAgora();

    return () => {
      if (client) {
        client.removeAllListeners();
      }
    };
  }, [client]);

  useEffect(() => {
    const agoraClient = client;
    if (!agoraClient) return;

    const handleUserPublished = async (
      user: IRemoteUser,
      mediaType: 'video' | 'audio'
    ) => {
      await agoraClient.subscribe(user, mediaType);
      if (mediaType === 'video') {
        setRemoteUsers((prevUsers) => {
          const userExist = prevUsers.find((u) => u.uid === user.uid);
          if (userExist) {
            return prevUsers;
          } else {
            return [...prevUsers, user];
          }
        });
      }
      if (mediaType === 'audio') {
        user.audioTrack?.play();
      }
    };

    const handleUserUnpublished = (
      user: IRemoteUser,
      mediaType: 'video' | 'audio'
    ) => {
      if (mediaType === 'video') {
        setRemoteUsers((prevUsers) =>
          prevUsers.filter((u) => u.uid !== user.uid)
        );
      }
    };

    const handleUserLeft = (user: IRemoteUser) => {
      setRemoteUsers((prevUsers) =>
        prevUsers.filter((u) => u.uid !== user.uid)
      );
    };

    agoraClient.on('user-published', handleUserPublished);
    agoraClient.on('user-unpublished', handleUserUnpublished);
    agoraClient.on('user-left', handleUserLeft);

    return () => {
      agoraClient.off('user-published', handleUserPublished);
      agoraClient.off('user-unpublished', handleUserUnpublished);
      agoraClient.off('user-left', handleUserLeft);
    };
  }, [client]);

  const startCall = useCallback(async () => {
    if (!client) return;
    setLoading(true);
    try {
      const response = await fetch('/api/agora/token', {
        // Your Next.js API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user1Id, user2Id }),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.status}`);
      }
      const { token, channelName } = await response.json();

      await client.join(appId, channelName, token || null);
      setJoined(true);

      const { videoTrack, audioTrack } =
        await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalVideoTrack(videoTrack);
      setLocalAudioTrack(audioTrack);
      await client.publish([videoTrack, audioTrack]);

      if (videoContainerRef.current) {
        videoTrack.play(videoContainerRef.current);
      }
    } catch (error) {
      console.error('Failed to join channel:', error);
      // Show error to user
      alert(`Failed to start call: ${error}`);
      setCallEnded(true);
      onCallEnd();
    } finally {
      setLoading(false);
    }
  }, [client, user1Id, user2Id, onCallEnd]);

  const endCall = useCallback(async () => {
    if (!client) return;

    try {
      if (localVideoTrack) {
        localVideoTrack.stop();
        localVideoTrack.close();
        setLocalVideoTrack(null);
      }
      if (localAudioTrack) {
        localAudioTrack.stop();
        localAudioTrack.close();
        setLocalAudioTrack(null);
      }
      await client.leave();
      setJoined(false);
      setCallEnded(true);
      setRemoteUsers([]);
      onCallEnd();
    } catch (error) {
      console.error('Failed to leave channel', error);
    }
  }, [client, localAudioTrack, localVideoTrack, onCallEnd]);

  useEffect(() => {
    if (client) {
      client.on('user-left', () => {
        setCallEnded(true);
        onCallEnd();
      });
    }
  }, [client, onCallEnd]);

  useEffect(() => {
    if (!joined && !callEnded) {
      startCall();
    }
  }, [startCall, joined, callEnded]);

  if (callEnded) {
    return <p>Call Ended</p>;
  }

  return (
    <div className='agora-video-call-container flex flex-col items-center justify-center'>
      {joined ? (
        <div className='call-in-progress flex flex-col items-center w-full'>
          <div
            className='local-video-container w-full max-w-4xl aspect-video bg-gray-700 rounded-lg overflow-hidden'
            ref={videoContainerRef}
          >
            {loading ? (
              <div className='flex items-center justify-center h-full'>
                <p className='text-white'>Loading your video...</p>
              </div>
            ) : null}
          </div>
          <div className='remote-videos-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full max-w-4xl'>
            {remoteUsers.map((user) => (
              <div
                key={user.uid}
                className='remote-video-item aspect-video bg-gray-700 rounded-lg overflow-hidden'
              >
                {user.videoTrack ? (
                  <VideoPlayer
                    track={user.videoTrack}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <p className='text-white'>User: {user.uid} (No Video)</p>
                  </div>
                )}
                <p className='absolute bottom-2 left-2 text-xs bg-black/50 text-white p-1 rounded-md'>
                  User: {user.uid}
                </p>
              </div>
            ))}
          </div>
          <Button
            onClick={endCall}
            className='mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            End Call
          </Button>
        </div>
      ) : (
        <div className='connecting-message'>
          {loading ? (
            <p className='text-white'>Connecting...</p>
          ) : (
            <p className='text-white'>Initializing Call...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AgoraVideoCall;
