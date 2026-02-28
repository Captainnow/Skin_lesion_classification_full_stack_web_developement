import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Activity,
    Upload,
    Scan,
    FileText,
    ArrowRight,
    ShieldAlert,
    Microscope,
    Stethoscope,
    School,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function LandingPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

    // Minimum loading time to prevent flashing
    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 2000); // 2 seconds minimum load time
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isSplineLoaded && minTimeElapsed) {
            setIsLoading(false);
        }
    }, [isSplineLoaded, minTimeElapsed]);

    return (
        <div className="min-h-screen bg-white relative">
            {/* Loading Overlay - Always on top */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
                    >
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-4 animate-bounce">
                            <Activity size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Melascope DX</h2>
                        <div className="flex items-center text-gray-500 text-sm font-medium">
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Initializing 3D Environment...
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content - Only visible after loading (or keep in DOM but hidden to prevent layout shift) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                {/* Navbar */}
                <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <Activity size={20} />
                            </div>
                            <span className="font-bold text-xl text-gray-900 tracking-tight">Melascope DX</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden sm:block">About Model</a>
                            <Link
                                to="/app/dashboard"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover transition-colors"
                            >
                                Open App
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative min-h-[100vh] flex items-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        {/* Spline needs to be mounted to load and trigger onLoad */}
                        <Spline
                            scene="https://prod.spline.design/oeG4OHI3Fpgyt3Wd92kRJCSi/scene.splinecode"
                            onLoad={() => setIsSplineLoaded(true)}
                            className={isLoading ? "invisible" : "visible"}
                        />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none w-full pt-20">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">

                            {/* Hero Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                animate={!isLoading ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="pointer-events-auto"
                            >
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-900 text-sm font-semibold mb-8 shadow-sm">
                                    <span className="flex h-2 w-2 bg-primary rounded-full mr-3 animate-pulse"></span>
                                    Research Prototype v2.1
                                </div>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                    AI-Assisted <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Skin Lesion</span> <br />
                                    Classification
                                </h1>
                                <p className="text-xl text-gray-700 font-medium mb-10 leading-relaxed max-w-lg backdrop-blur-sm bg-white/10 p-4 rounded-2xl border border-white/10">
                                    An advanced Vision Transformer tool designed to support dermatology research.
                                    Classifies 31 distinct lesion types with high-precision probabilistic analysis.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                    <Link
                                        to="/app/dashboard"
                                        className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-2xl text-white bg-gray-900 hover:bg-black transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
                                    >
                                        Launch Melascope DX
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <div className="flex items-center gap-4 px-6 py-4 text-sm text-gray-800 font-semibold bg-white/20 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg">
                                        <ShieldAlert size={18} /> Not for clinical diagnosis
                                    </div>
                                </div>
                            </motion.div>

                            {/* Spacer for 3D Visual */}
                            <div className="hidden lg:block h-full min-h-[600px]">
                                {/* The 3D model occupies this space visually via absolute positioning */}
                            </div>
                        </div>
                    </div>
                </section>


                {/* How It Works */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900">How Melascope DX Works</h2>
                            <p className="mt-4 text-gray-600">Streamlined workflow for clinical research environments.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Upload, title: "1. Upload Image", desc: "Drag and drop high-resolution dermatoscopic images." },
                                { icon: Scan, title: "2. AI Analysis", desc: "Our ViT model processes the image across 31 diagnostic classes." },
                                { icon: FileText, title: "3. Review Report", desc: "Get instant probabilistic breakdown and advisory notes." }
                            ].map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                                        <step.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* For Whom */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12">Designed For Research</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl border border-gray-100 hover:border-primary/20 transition-colors">
                                <Stethoscope className="mx-auto text-gray-400 mb-4" size={32} />
                                <h3 className="font-semibold text-gray-900">Dermatology Clinics</h3>
                                <p className="text-sm text-gray-500 mt-2">Augment decision making with second-opinion AI.</p>
                            </div>
                            <div className="p-6 rounded-xl border border-gray-100 hover:border-primary/20 transition-colors">
                                <Microscope className="mx-auto text-gray-400 mb-4" size={32} />
                                <h3 className="font-semibold text-gray-900">Research Teams</h3>
                                <p className="text-sm text-gray-500 mt-2">Analyze datasets and validate model performance.</p>
                            </div>
                            <div className="p-6 rounded-xl border border-gray-100 hover:border-primary/20 transition-colors">
                                <School className="mx-auto text-gray-400 mb-4" size={32} />
                                <h3 className="font-semibold text-gray-900">Medical Education</h3>
                                <p className="text-sm text-gray-500 mt-2">Train students with diverse lesion examples.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-400 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2 text-white">
                                <Activity size={20} />
                                <span className="font-bold text-lg">Melascope DX</span>
                            </div>
                            <div className="flex gap-8 text-sm">
                                <a href="#" className="hover:text-white transition-colors">Model Card</a>
                                <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs">
                            <p className="mb-2">⚠️ CAUTION: Melascope DX is a clinical research prototype.</p>
                            <p>It is not intended for use in the diagnosis of disease or other conditions, or in the cure, mitigation, treatment, or prevention of disease.</p>
                            <p className="mt-4">&copy; {new Date().getFullYear()} Melascope Research Lab. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </motion.div>
        </div >
    );
}
