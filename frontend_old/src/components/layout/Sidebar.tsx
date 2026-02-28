import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    PlusCircle,
    Users,
    History,
    Settings,
    Activity
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/app/dashboard' },
    { icon: PlusCircle, label: 'New Assessment', href: '/app/new-assessment' },
    { icon: Users, label: 'Patients', href: '/app/patients' },
    { icon: History, label: 'History', href: '/app/history' },
    { icon: Settings, label: 'Settings', href: '/app/settings' },
];

export function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-30 hidden md:flex">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                    <Activity size={20} />
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">Melascope DX</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary-50 text-primary border-l-4 border-primary shadow-sm"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon
                                    size={20}
                                    className={cn(
                                        "transition-colors",
                                        isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
                                    )}
                                />
                                {item.label}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100/50">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-indigo-600 px-2 py-0.5 bg-indigo-100 rounded-full">Pro Model</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                        Using Vision Transformer (ViT-B/16) v2.4
                    </p>
                    <div className="text-[10px] text-gray-400 font-mono">
                        Build: 2024.05.12
                    </div>
                </div>
            </div>
        </aside>
    );
}
