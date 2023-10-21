export function TextBlock({ type, text }) {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">{type}</h1>
            <p className="text-sm text-slate-500">{text}</p>
        </div>
    )
}
