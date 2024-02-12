'use client';
import React, { useEffect, useState } from 'react';
import { api } from '~/trpc/react';

const Page = () => {
  const [users, setUsers] = useState<any[]>([]);
  const { data, isLoading, isFetched } = api.users.get.useQuery();

  useEffect(() => {
    if (isFetched) {
      setUsers(data || []);
    }
  }, [data, isFetched]);

  if (isLoading) return <div>loading</div>;

  return (
    <div className={'flex flex-col flex-wrap gap-5'}>
      {users.map((elem, idx) => (
        <div className='width-[50%]' key={idx.toString()}>
          <p>{elem.role}</p>
          <p>{elem.email}</p>
          <p>{elem.password}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
