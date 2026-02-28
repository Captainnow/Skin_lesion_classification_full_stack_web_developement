export default function Dashboard() {
    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Welcome back, Dr. Smith.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: 'Total Scans', value: '1,234', trend: '+12%' },
                    { label: 'High Risk Cases', value: '56', trend: '-2%' },
                    { label: 'Patients', value: '892', trend: '+5%' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-1">{stat.label}</h3>
                        <div className="flex items-baseline justify-between">
                            <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                            <span className={clsx("text-xs font-medium px-2 py-0.5 rounded-full",
                                stat.trend.startsWith('+') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            )}>
                                {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-96 flex items-center justify-center text-slate-400">
                <p>Recent Activity Chart Placeholder</p>
            </div>
        </div>
    );
}

// Helper for clsx in this file since it's used inline
import clsx from 'clsx';
