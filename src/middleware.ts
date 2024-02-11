import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // eslint-disable-next-line
      console.log(token?.role === 'ADMIN');
      return token?.role === 'ADMIN';
    },
  },
});

export const config = { matcher: ['/admin-panel'] };
