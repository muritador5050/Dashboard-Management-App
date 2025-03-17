'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    router.push('/dashboard');
  };
  return (
    <div className='text-black'>
      <h1>Login</h1>
      <input
        type='email'
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className='bg-sky-500 p-4 rounded-xl' onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
