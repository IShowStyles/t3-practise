import { useRouter } from 'next/navigation';
import React from 'react';
import { useSession } from 'next-auth/react';

const AdminPanelLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { data: session } = useSession();
  if (session!.user.role === 'USER' && session) {
    router.push('/');
  }

  return <>{children}</>;
};

export default AdminPanelLayout;
