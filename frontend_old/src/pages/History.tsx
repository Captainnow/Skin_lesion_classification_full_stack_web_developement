import { Search, Filter, Download, Eye } from 'lucide-react';
import { cn } from '../lib/utils'; // fix import path if needed

const historyData = [
    { id: "ASM-001", patient: "Sarah Connor", class: "Melanoma", conf: 94, date: "2023-10-24", status: "Critical" },
    { id: "ASM-002", patient: "John Doe", class: "Nevus", conf: 99, date: "2023-10-22", status: "Benign" },
    { id: "ASM-003", patient: "Emily Blunt", class: "BCC", conf: 88, date: "2023-10-20", status: "Warning" },
    { id: "ASM-004", patient: "Michael Scott", class: "Nevus", conf: 92, date: "2023-10-18", status: "Benign" },
    { id: "ASM-005", patient: "Unknown", class: "SCC", conf: 85, date: "2023-10-15", status: "Warning" },
];

export default function History() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Assessment History</h1>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID or class..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary w-full sm:w-64"
                        />
                    </div>
                    <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 bg-white">
                        <Filter size={18} />
                    </button>
                    <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 bg-white">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Assessment ID</th>
                            <th className="px-6 py-4">Patient</th>
                            <th className="px-6 py-4">Classification</th>
                            <th className="px-6 py-4">Confidence</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {historyData.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 font-mono text-xs text-gray-500">{item.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{item.patient}</td>
                                <td className="px-6 py-4">
                                    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                        item.status === 'Critical' ? "bg-red-100 text-red-700" :
                                            item.status === 'Warning' ? "bg-amber-100 text-amber-700" :
                                                "bg-blue-100 text-blue-700"
                                    )}>
                                        {item.class}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gray-400 rounded-full" style={{ width: `${item.conf}%` }} />
                                        </div>
                                        <span className="text-xs text-gray-500">{item.conf}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{item.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors">
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
