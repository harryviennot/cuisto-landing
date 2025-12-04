"use client";

import { motion } from "framer-motion";
import {
    Link,
    CheckCircle,
    Clock,
    Play,
    Pause,
    ArrowRight,
    Plus,
    MagnifyingGlass,
    X,
    CornersOut,
} from "@phosphor-icons/react";

// --- Capture Visual ---
// Mimics a "Paste Link" modal over a grid of recipes (Pinterest style)
export function CaptureVisual() {
    return (
        <div className="w-full h-full bg-surface relative overflow-hidden flex flex-col">
            {/* Background Grid (Pinterest style) */}
            <div className="grid grid-cols-2 gap-3 p-3 opacity-30 blur-[1px]">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                        <div
                            className="w-full bg-stone-200 rounded-xl"
                            style={{ height: 120 + (i % 2) * 40 }}
                        />
                        <div className="h-2 w-2/3 bg-stone-200 rounded-full" />
                        <div className="h-2 w-1/2 bg-stone-200 rounded-full" />
                    </div>
                ))}
            </div>

            {/* Modal Overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[260px] bg-surface-elevated rounded-2xl p-4 shadow-elevated border border-white/50"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-text-heading">Add Recipe</h4>
                        <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center">
                            <X size={12} className="text-stone-400" />
                        </div>
                    </div>

                    {/* Input Field */}
                    <div className="relative mb-3">
                        <div className="w-full h-10 bg-stone-50 rounded-xl border border-border flex items-center px-3 gap-2">
                            <Link size={14} className="text-stone-400" />
                            <div className="h-4 w-px bg-stone-200" />
                            <span className="text-xs text-stone-400">tiktok.com/video...</span>
                        </div>
                        {/* Paste Button Badge */}
                        <div className="absolute right-1 top-1 bottom-1 px-2 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white uppercase tracking-wide">Paste</span>
                        </div>
                    </div>

                    {/* Social Icons Row */}
                    <div className="flex justify-between px-2 pt-2 border-t border-border/50">
                        {['TikTok', 'Insta', 'Web'].map((label, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 0 ? 'bg-black text-white' : i === 1 ? 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white' : 'bg-blue-500 text-white'}`}>
                                    {i === 0 ? <span className="font-bold text-xs">T</span> : i === 1 ? <span className="font-bold text-xs">I</span> : <Link size={14} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// --- Extract Visual ---
// Mimics ExtractionProgress.tsx
export function ExtractVisual() {
    return (
        <div className="w-full h-full bg-surface flex flex-col items-center justify-center p-6 relative">
            <div className="w-full max-w-[240px] space-y-6">
                {/* Progress Section */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-sm font-semibold text-text-heading"
                        >
                            Extracting recipe...
                        </motion.span>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            42%
                        </span>
                    </div>

                    <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "42%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* Steps List */}
                <div className="space-y-3 pl-1">
                    <div className="flex items-center gap-3 text-xs text-text-body">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <CheckCircle size={12} weight="fill" />
                        </div>
                        <span className="line-through opacity-50">Identifying ingredients</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-heading font-medium">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <CornersOut size={12} />
                            </motion.div>
                        </div>
                        <span>Parsing instructions...</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-400">
                        <div className="w-5 h-5 rounded-full border border-stone-200" />
                        <span>Formatting timers</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Cook Visual ---
// Mimics CookingMode.tsx
export function CookVisual() {
    return (
        <div className="w-full h-full bg-stone-900 relative overflow-hidden flex flex-col">
            {/* Background Image with Blur */}
            <div className="absolute inset-0 opacity-40">
                <div className="w-full h-full bg-stone-800" /> {/* Placeholder for image */}
                <div className="absolute inset-0 backdrop-blur-md bg-black/30" />
            </div>

            {/* Header */}
            <div className="relative z-10 px-4 pt-6 pb-2 flex items-center justify-between">
                <div className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] font-medium text-white/80">Step 2 of 5</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <X size={12} className="text-white" />
                </div>
            </div>

            {/* Main Step Card */}
            <div className="relative z-10 flex-1 px-4 py-2 flex flex-col">
                <div className="flex-1 bg-surface-elevated rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
                    <div className="space-y-3">
                        <h3 className="text-xl font-serif text-text-heading leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                            Boil the pasta water
                        </h3>
                        <p className="text-sm text-text-body leading-relaxed">
                            Bring a large pot of salted water to a rolling boil. Add the pasta and cook until al dente.
                        </p>
                    </div>

                    {/* Timer Pill */}
                    <div className="mt-4 self-start">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                            <Clock size={14} className="text-primary" weight="fill" />
                            <span className="text-xs font-bold text-primary">10:00</span>
                            <div className="w-px h-3 bg-primary/20" />
                            <Play size={10} className="text-primary" weight="fill" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="relative z-10 px-6 pb-6 pt-2 flex items-center justify-between gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <ArrowRight size={16} className="text-white rotate-180" />
                </div>
                <div className="flex-1 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Next Step</span>
                </div>
            </div>
        </div>
    );
}
