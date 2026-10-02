'use client';

import { SessionProvider } from "next-auth/react";

// Tells next-auth's client helpers (signIn/signOut) where the auth API lives under basePath
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider basePath={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/auth`}>
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
