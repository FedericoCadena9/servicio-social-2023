import { AcademicCapIcon } from "@heroicons/react/24/solid"
const Logo = () => {
    return (
        <div className="flex items-center gap-2 w-auto">
            <AcademicCapIcon className="w-7 h-7 text-emerald-500" />
            <h1 className="font-semibold text-zinc-900 hidden lg:inline-block dark:text-white">Servicio Social</h1>
        </div>
    )
}

export default Logo