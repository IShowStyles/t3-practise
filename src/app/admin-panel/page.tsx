'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getServerAuthSession } from '~/server/auth';

const AdminPanel = async () => {
  const router = useRouter();

  const session = await getSession();

  if (!session || session.user.role === 'USER') {
    router.push('/');
    return null;
  }

  return (
    <section>
      <div className='container'>134</div>
      <div>
        <p>Lorem ipsum dolor sit amet!</p>
      </div>
    </section>
  );
};

async function getSession() {
  const data = await getServerAuthSession();
  return data;
}

export default AdminPanel;
