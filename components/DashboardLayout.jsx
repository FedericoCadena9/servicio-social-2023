"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'

import Logo from '../components/Logo'
import { Header } from '../components/Header'
import { HeroPattern } from '../components/HeroPattern'
import { Navigation } from '../components/Navigation'
import { SectionProviderStore } from '../app/store/sectionProviderStore'

export function DashboardLayout({ children, sections = [] }) {
    return (
        <SectionProviderStore sections={sections}>
            <div className="lg:ml-72 xl:ml-80">
                <motion.header
                    layoutScroll
                    className="fixed inset-y-0 left-0 z-40 contents w-72 overflow-y-auto border-r border-zinc-900/10 px-6 pt-4 pb-8 dark:border-white/10 lg:block xl:w-80"
                >
                    <div className="hidden lg:flex">
                        <Link href="/" aria-label="Home">
                            <Logo className="h-6" />
                        </Link>

                    </div>
                    <Header />
                    <Navigation className="hidden lg:mt-10 lg:block" />
                </motion.header>
                <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
                    <main className="pb-16 pt-12">
                        <HeroPattern />
                        {children}
                    </main>
                </div>
            </div>
        </SectionProviderStore>

    )
}
