"use client";

import React, { Suspense } from "react";

import { SessionProvider } from "next-auth/react";

function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Suspense fallback={null}>{children}</Suspense>
        </SessionProvider>
    );
}

export default AuthProvider;
