"use client"
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Montserrat } from 'next/font/google'
import clsx from 'clsx';

const montserrat = Montserrat({
    subsets: ['latin'],
})

export default function RootLayout({ children }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
                <div className={clsx('emerald', montserrat.className)}>
                    {children}
                </div>
            </NextThemesProvider>
        </NextUIProvider>
    )
}
