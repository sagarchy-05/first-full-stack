'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function SignupPage() {
  const router = useRouter();
  const [user, setuser] = React.useState({
    email: '',
    password: '',
    username: '',
  });
  const [buttonDiabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup Success', response.data);
      router.push('/login');
    } catch (error: any) {
      console.log('Signup Failed!', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <h1>{loading ? 'Processing' : 'SignUp'}</h1>
      <br />
      <label htmlFor='username'>Username : </label>
      <input
        id='username'
        value={user.username}
        onChange={(e) => setuser({ ...user, username: e.target.value })}
        type='text'
        placeholder='username'
      />
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
      <button onClick={onSignup}>
        {buttonDiabled ? 'No Signup' : 'Signup'}
      </button>
      <br />
      <Link href='/login'>Login</Link>
    </>
  );
}
