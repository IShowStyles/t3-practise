import { withAuth } from 'next-auth/middleware';
import { getServerAuthSession } from '~/server/auth';

const session = await getServerAuthSession();

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (session && session.user) {
        const ROLE = session.user.role as string;
        if (session.user.role !== 'ADMIN' && req.nextUrl.pathname.startsWith('/admin-panel')) {
          return ROLE === 'ADMIN';
        }
        return !!token;
      }
      return false;
    },
  },
});

export const config = { matcher: ['/admin-panel:path*', '/profile'] };
