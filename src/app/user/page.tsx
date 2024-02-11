import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/trpc/server';

const Page = async () => {
  const data = await api.users.get.query();

  return <>{JSON.stringify(data)}</>;
};

export default Page;
