'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [user, setuser] = React.useState({
    email: '',
    password: '',
  });

  const [buttonDiabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Login Success', response.data);
      toast.success('Login Success!');
      router.push('/profile');
    } catch (error: any) {
      console.log('Login Failed!', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <h1>Login</h1>
      <br />
      <label htmlFor='email'>Email : </label>
      <input
        id='email'
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        type='email'
        placeholder='email'
      />
      <br />
      <label htmlFor='password'>Password : </label>
      <input
        id='password'
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        type='password'
        placeholder='password'
      />
      <br />
      <button onClick={onLogin}>{buttonDiabled ? 'No Login' : 'Login'}</button>
      <br />
      <Link href='/signup'>Signup</Link>
    </>
  );
}
