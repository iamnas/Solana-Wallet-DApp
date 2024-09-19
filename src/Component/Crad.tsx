
export default function Crad({ title, component }: { title: string, component:React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">{title}</h2>
            <div className="flex justify-center">
                {component}
            </div>
        </div>
    )
}
