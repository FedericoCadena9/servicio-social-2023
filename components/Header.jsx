import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import {
    MobileNavigation,
    useIsInsideMobileNavigation,
} from '../components/MobileNavigation'
import { useMobileNavigationStore } from '../components/MobileNavigation'
import SignOutButton from '../components/SignOutButton'
import { ModeToggle } from '../components/ModeToggle'
import Logo from '../components/Logo'
import { UserInfo } from '../components/UserInfo'


export const Header = forwardRef(function Header({ className }, ref) {
    let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
    let isInsideMobileNavigation = useIsInsideMobileNavigation()

    let { scrollY } = useScroll()
    let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
    let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

    return (
        <motion.div
            ref={ref}
            className={clsx(
                className,
                'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-8',
                !isInsideMobileNavigation &&
                'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
                isInsideMobileNavigation
                    ? 'bg-white dark:bg-zinc-900'
                    : 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]'
            )}
            style={{
                '--bg-opacity-light': bgOpacityLight,
                '--bg-opacity-dark': bgOpacityDark,
            }}
        >
            <div
                className={clsx(
                    'absolute inset-x-0 top-full h-px transition',
                    (isInsideMobileNavigation || !mobileNavIsOpen) &&
                    'bg-zinc-900/7.5 dark:bg-white/7.5'
                )}
            />
            {/* <Search /> */}
            <div className="flex items-center gap-5 lg:hidden">
                <MobileNavigation />
                <Link href="/" aria-label="Home">
                    <Logo />
                </Link>
            </div>
            <div className="flex justify-end w-full items-center gap-5">
                <UserInfo />
                <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
                <div className="flex gap-4">
                    {/* <MobileSearch /> */}
                    {/* <ModeToggle /> */}
                </div>
                <div className="hidden min-[416px]:contents">
                    <SignOutButton />
                </div>
            </div>
        </motion.div>
    )
})
