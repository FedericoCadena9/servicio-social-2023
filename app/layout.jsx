"use client"
import './globals.css'
import { Montserrat } from 'next/font/google'
import { NextUIProvider } from "@nextui-org/react";
import clsx from 'clsx';

const montserrat = Montserrat({
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={clsx('emerald', montserrat.className)}>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  )
}
