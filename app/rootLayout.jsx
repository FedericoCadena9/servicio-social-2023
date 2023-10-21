"use client"
import { NextUIProvider } from "@nextui-org/react";
import { Montserrat } from 'next/font/google'
import clsx from 'clsx';

const montserrat = Montserrat({
    subsets: ['latin'],
})
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({ children }) {
    return (
        <NextUIProvider>
            <div className={clsx('emerald', montserrat.className)}>
                {children}
            </div>
        </NextUIProvider>
    )
}
