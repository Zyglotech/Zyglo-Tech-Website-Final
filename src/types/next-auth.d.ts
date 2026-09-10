import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
      isApproved?: boolean;
      isActive?: boolean;
    };
  }
  interface User {
    isAdmin?: boolean;
    isApproved?: boolean;
    isActive?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    isAdmin?: boolean;
    isApproved?: boolean;
    isActive?: boolean;
  }
}
