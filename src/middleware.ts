import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (token) {
        console.log({ token }, 'token');
        return true;
      } else {
        return false;
      }
    },
  },
});

export const config = { matcher: ['/admin-panel'] };
