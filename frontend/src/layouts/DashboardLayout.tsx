import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, FileText, Users, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/app/dashboard' },
    { icon: FileText, label: 'Assessments', path: '/app/assessments' },
    { icon: Users, label: 'Patients', path: '/app/patients' },
    { icon: Settings, label: 'Settings', path: '/app/settings' },
];

export default function DashboardLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-850 text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-700">
                    <Activity className="text-primary-500 mr-3" size={24} />
                    <span className="font-bold text-lg">Melascope DX</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary-600 text-white'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                )}
                            >
                                <item.icon size={18} className="mr-3" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-700">
                    <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                        <LogOut size={18} className="mr-3" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
