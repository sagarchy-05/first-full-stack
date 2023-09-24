'use client';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('nothing');
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout Successfull');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div>
      <h1>Profile</h1>
      <br />
      <h2>
        {data === 'nothing' ? (
          'No Data'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button onClick={getUserDetails}>Get Details</button>
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
