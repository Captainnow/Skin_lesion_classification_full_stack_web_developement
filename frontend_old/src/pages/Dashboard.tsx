import { motion } from 'framer-motion';
import {
    Users,
    FileCheck,
    Activity,
    TrendingUp,
    ArrowRight,
    MoreHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
    { label: "Today's Assessments", value: 12, trend: "+20%", trendUp: true, icon: FileCheck, color: "bg-blue-500" },
    { label: "This Week", value: 84, trend: "+12%", trendUp: true, icon: Activity, color: "bg-indigo-500" },
    { label: "Avg. Confidence", value: "94%", trend: "+1.5%", trendUp: true, icon: TrendingUp, color: "bg-teal-500" },
    { label: "Patients Seen", value: 8, trend: "Same", trendUp: null, icon: Users, color: "bg-purple-500" },
];

const recentAssessments = [
    { id: "ASM-2024-001", patient: "PT-1024", class: "Melanoma", confidence: 98, date: "10:42 AM", status: "Critical" },
    { id: "ASM-2024-002", patient: "PT-1025", class: "Nevus", confidence: 92, date: "09:15 AM", status: "Benign" },
    { id: "ASM-2024-003", patient: "PT-1021", class: "Basal Cell Carcinoma", confidence: 88, date: "Yesterday", status: "Warning" },
    { id: "ASM-2024-004", patient: "PT-1030", class: "Seborrheic Keratosis", confidence: 95, date: "Yesterday", status: "Benign" },
    { id: "ASM-2024-005", patient: "PT-1032", class: "Squamous Cell Carcinoma", confidence: 85, date: "Yesterday", status: "Warning" },
];

const classDistribution = [
    { label: "Nevus", value: 45, color: "bg-blue-500" },
    { label: "Melanoma", value: 20, color: "bg-red-500" },
    { label: "BCC", value: 15, color: "bg-amber-500" },
    { label: "SCC", value: 10, color: "bg-orange-500" },
    { label: "Other", value: 10, color: "bg-gray-400" },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Clinical Dashboard</h1>
                <div className="text-sm text-gray-500">Last updated: Just now</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-soft"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                                <stat.icon size={20} />
                            </div>
                            {stat.trendUp !== null && (
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {stat.trend}
                                </span>
                            )}
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Assessments Table */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden"
                >
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900">Recent Assessments</h2>
                        <Link to="/app/history" className="text-sm text-primary hover:text-primary-hover font-medium">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3">ID</th>
                                    <th className="px-6 py-3">Patient</th>
                                    <th className="px-6 py-3">Class</th>
                                    <th className="px-6 py-3">Confidence</th>
                                    <th className="px-6 py-3">Time</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentAssessments.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-3 font-mono text-xs text-gray-500">{item.id}</td>
                                        <td className="px-6 py-3 font-medium text-gray-900">{item.patient}</td>
                                        <td className="px-6 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                        ${item.class === 'Melanoma' ? 'bg-red-100 text-red-700' :
                                                    item.class === 'Nevus' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {item.class}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${item.confidence > 90 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${item.confidence}%` }}></div>
                                                </div>
                                                <span className="text-xs text-gray-500">{item.confidence}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-gray-500">{item.date}</td>
                                        <td className="px-6 py-3 text-right">
                                            <button className="p-1 hover:bg-gray-200 rounded text-gray-400 group-hover:text-primary transition-colors">
                                                <ArrowRight size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Class Distribution Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl border border-gray-200 shadow-soft p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-gray-900">Class Distribution</h2>
                        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
                    </div>

                    <div className="space-y-4">
                        {classDistribution.map((item, idx) => (
                            <div key={item.label}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-700">{item.label}</span>
                                    <span className="font-medium text-gray-900">{item.value}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.value}%` }}
                                        transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                                        className={`h-full rounded-full ${item.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="text-xs text-gray-500 text-center">
                            Based on last 100 assessments
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Activity Chart (Simplified Mock) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl border border-gray-200 shadow-soft p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-gray-900">Model Activity (24h)</h2>
                </div>
                <div className="h-48 flex items-end justify-between gap-1 px-2">
                    {[35, 45, 30, 60, 75, 50, 45, 60, 80, 70, 45, 35, 20, 40, 50, 60, 70, 65, 50, 40, 30, 45, 55, 40].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.5, delay: 0.5 + (i * 0.02) }}
                            className="w-full bg-primary/10 hover:bg-primary/60 rounded-t-sm transition-colors cursor-pointer"
                        />
                    ))}
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>00:00</span>
                    <span>12:00</span>
                    <span>23:59</span>
                </div>
            </motion.div>
        </div>
    );
}
