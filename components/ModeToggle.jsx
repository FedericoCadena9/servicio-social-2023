import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import { Button } from "@nextui-org/react"

export const ModeToggle = () => {
    function disableTransitionsTemporarily() {
        document.documentElement.classList.add('[&_*]:!transition-none')
        window.setTimeout(() => {
            document.documentElement.classList.remove('[&_*]:!transition-none')
        }, 0)
    }

    function toggleMode() {
        disableTransitionsTemporarily()

        let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        let isSystemDarkMode = darkModeMediaQuery.matches
        let isDarkMode = document.documentElement.classList.toggle('dark')

        if (isDarkMode === isSystemDarkMode) {
            delete window.localStorage.isDarkMode
        } else {
            window.localStorage.isDarkMode = isDarkMode
        }
    }

    return (
        <Button
            variant="light"
            className="flex min-w-full items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
            onClick={toggleMode}
        >
            <SunIcon className="h-5 w-5 stroke-zinc-900 dark:hidden" />
            <MoonIcon className="hidden h-5 w-5 stroke-white dark:block" />
        </Button>
    )
}
