import { Role, UserStatus } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role: Role;
      status: UserStatus;
    };
  }

  interface User {
    role: Role;
    status: UserStatus;
  }
}

