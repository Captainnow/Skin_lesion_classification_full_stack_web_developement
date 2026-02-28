import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MelaBot } from '../common/MelaBot';

export function AppLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
                <TopBar />
                <main className="flex-1 pt-24 px-4 md:px-8 pb-8 animate-fade-in relative">
                    <Outlet />
                </main>
            </div>
            <MelaBot />
        </div>
    );
}
