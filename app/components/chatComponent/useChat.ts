'use client';
import { useEffect, useRef, useState } from 'react';
import { auth, db, storage } from '@/config/firebase';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Message {
  id: string;
  text: string;
  name: string;
  avatar: string;
  createdAt: Timestamp;
  uid: string;
}

export const useChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createdAt'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Message)
      );
      setMessages(msgs);
      setTimeout(
        () => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }),
        100
      );
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    const user = auth.currentUser;
    if (!message.trim() || !user) return;

    await addDoc(collection(db, 'chats'), {
      text: message,
      name: user.displayName || 'Anonymous',
      avatar: user.photoURL || '',
      createdAt: serverTimestamp(),
      uid: user.uid,
    });
    setMessage('');
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const refPath = `voice_notes/${Date.now()}-${
          auth.currentUser?.uid
        }.webm`;
        const audioRef = ref(storage, refPath);
        await uploadBytes(audioRef, blob);
        const url = await getDownloadURL(audioRef);

        await addDoc(collection(db, 'chats'), {
          type: 'voice',
          audioUrl: url,
          name: auth.currentUser?.displayName || 'Anonymous',
          avatar: auth.currentUser?.photoURL || '',
          uid: auth.currentUser?.uid,
          createdAt: serverTimestamp(),
        });
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  return {
    message,
    setMessage,
    messages,
    scrollRef,
    sendMessage,
    isRecording,
    toggleRecording,
  };
};
