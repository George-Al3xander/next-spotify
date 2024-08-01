"use client";

import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { RecoilRoot } from "recoil";

import AuthProvider from "@/components/providers/auth-provider";
import TokenHandler from "@/components/providers/token-handler";

function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <Toaster />
            <RecoilRoot>
                <TokenHandler>{children}</TokenHandler>
            </RecoilRoot>
        </AuthProvider>
    );
}

export default Providers;
