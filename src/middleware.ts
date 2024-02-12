import { withAuth } from 'next-auth/middleware';
import type { NextAuthOptions } from 'next-auth';

// Define your roles
enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Helper function to check role access
const checkRoleAccess = (role: UserRole | undefined, allowedRoles: UserRole[]): boolean => {
  return allowedRoles.includes(role as UserRole);
};

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      const issuer = token?.issuer;
      if (typeof issuer !== 'string') {
        return false;
      }

      const path = new URL(issuer).pathname;
      const roleAccessMap: Record<string, UserRole[]> = {
        '/admin-panel': [UserRole.ADMIN],
        '/cabinet': [UserRole.USER],
      };

      return checkRoleAccess(token?.role as UserRole, roleAccessMap[path] || []);
    },
  },
});

export const config = {
  matcher: ['/admin-panel', '/cabinet'],
};
