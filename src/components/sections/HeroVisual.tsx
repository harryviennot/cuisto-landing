"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Globe,
    Microphone,
    Camera,
    TiktokLogo,
    InstagramLogo,
    Play,
    Clock,
    Fire,
} from "@phosphor-icons/react";

// Types
interface Recipe {
    title: string;
    subtitle: string;
    image: string;
    time: number;
    calories: number;
}

interface SourceType {
    id: string;
    name: string;
    icon: any;
    colors: [string, string];
}

interface ShowcaseItem {
    source: SourceType;
    recipe: Recipe;
}

// Data
const SOURCES: Record<string, SourceType> = {
    tiktok: { id: "tiktok", name: "TikTok", icon: TiktokLogo, colors: ["#000000", "#000000"] },
    reels: { id: "reels", name: "Reels", icon: InstagramLogo, colors: ["#a855f7", "#ec4899"] },
    shorts: { id: "shorts", name: "Shorts", icon: Play, colors: ["#ef4444", "#b91c1c"] },
    articles: { id: "articles", name: "Articles", icon: Globe, colors: ["#3b82f6", "#6366f1"] },
    blogs: { id: "blogs", name: "Blogs", icon: Globe, colors: ["#8b5cf6", "#6d28d9"] },
    websites: { id: "websites", name: "Websites", icon: Globe, colors: ["#06b6d4", "#0891b2"] },
    cookbooks: {
        id: "cookbooks",
        name: "Cookbooks",
        icon: Camera,
        colors: ["#f59e0b", "#d97706"],
    },
    screenshots: {
        id: "screenshots",
        name: "Screenshot",
        icon: Camera,
        colors: ["#f97316", "#ea580c"],
    },
    photos: { id: "photos", name: "Photos", icon: Camera, colors: ["#eab308", "#ca8a04"] },
    dictation: {
        id: "dictation",
        name: "Dictation",
        icon: Microphone,
        colors: ["#10b981", "#14b8a6"],
    },
};

const SHOWCASE_DATA: ShowcaseItem[][] = [
    [
        {
            source: SOURCES.tiktok,
            recipe: {
                title: "Spicy Vodka Pasta",
                subtitle: "Gigi Hadid Style",
                image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=600",
                time: 25,
                calories: 520,
            },
        },
        {
            source: SOURCES.reels,
            recipe: {
                title: "Green Goddess Salad",
                subtitle: "Baked by Melissa",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
                time: 10,
                calories: 280,
            },
        },
        {
            source: SOURCES.shorts,
            recipe: {
                title: "Crispy Potatoes",
                subtitle: "ASMR Cooking",
                image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&q=80&w=600",
                time: 35,
                calories: 340,
            },
        },
    ],
    [
        {
            source: SOURCES.articles,
            recipe: {
                title: "Roast Chicken",
                subtitle: "with Sourdough Croutons",
                image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=600",
                time: 75,
                calories: 450,
            },
        },
        {
            source: SOURCES.blogs,
            recipe: {
                title: "Best Brownies",
                subtitle: "Fudgy & Chewy",
                image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
                time: 45,
                calories: 380,
            },
        },
        {
            source: SOURCES.websites,
            recipe: {
                title: "Avocado Toast",
                subtitle: "Cafe Style",
                image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=600",
                time: 10,
                calories: 320,
            },
        },
    ],
    [
        {
            source: SOURCES.cookbooks,
            recipe: {
                title: "Mom's Lasagna",
                subtitle: "Handwritten Recipe",
                image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=600",
                time: 90,
                calories: 620,
            },
        },
        {
            source: SOURCES.screenshots,
            recipe: {
                title: "Smoothie Bowl",
                subtitle: "Instagram Story",
                image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=600",
                time: 5,
                calories: 240,
            },
        },
        {
            source: SOURCES.photos,
            recipe: {
                title: "Caesar Salad",
                subtitle: "Restaurant Menu",
                image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=600",
                time: 15,
                calories: 350,
            },
        },
    ],
    [
        {
            source: SOURCES.dictation,
            recipe: {
                title: "Apple Pie",
                subtitle: "Grandma's Secret",
                image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&q=80&w=600",
                time: 60,
                calories: 410,
            },
        },
    ],
];

export default function HeroVisual() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [variantIndices, setVariantIndices] = useState([0, 0, 0, 0]);

    const currentItems = SHOWCASE_DATA.map((categoryItems, categoryIdx) => {
        const variantIdx = variantIndices[categoryIdx] % categoryItems.length;
        return categoryItems[variantIdx];
    });

    useEffect(() => {
        const itemCount = SHOWCASE_DATA.length;
        const interval = setInterval(() => {
            setActiveIndex((prev) => {
                const next = (prev + 1) % itemCount;
                setVariantIndices((indices) => {
                    const newIndices = [...indices];
                    newIndices[next] = indices[next] + 1;
                    return newIndices;
                });
                return next;
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-[320px] h-[420px] mx-auto flex items-center justify-center">
            {/* Satellite Sources */}
            {currentItems.map((item, idx) => (
                <SatelliteSource
                    key={`${item.source.id}-${idx}`}
                    item={item}
                    isActive={idx === activeIndex}
                    index={idx}
                />
            ))}

            {/* Central Deck */}
            <CentralDeck activeIndex={activeIndex} currentItems={currentItems} />
        </div>
    );
}

function SatelliteSource({ item, isActive, index }: { item: ShowcaseItem; isActive: boolean; index: number }) {
    const Icon = item.source.icon;

    const positions = [
        { top: 10, left: -10 },
        { top: 48, right: -16 },
        { bottom: 90, right: -12 },
        { bottom: 25, left: -10 },
    ];

    const pos = positions[index];

    return (
        <motion.div
            className="absolute z-30"
            style={pos as any}
            animate={{
                scale: isActive ? 1.1 : 0.9,
                opacity: isActive ? 1 : 0.6,
            }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 150,
            }}
        >
            <div
                className={`flex items-center p-2.5 rounded-2xl shadow-lg border transition-colors duration-500 ${isActive ? "bg-white border-stone-200" : "bg-white/60 border-white/40"
                    }`}
            >
                <div
                    className="h-6 w-6 rounded-md flex items-center justify-center"
                    style={{
                        background: `linear-gradient(135deg, ${item.source.colors[0]}, ${item.source.colors[1]})`,
                    }}
                >
                    <Icon size={16} color="white" weight="fill" />
                </div>

                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                        width: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="overflow-hidden"
                >
                    <span className="pl-2 text-[10px] font-bold uppercase tracking-wider text-stone-600 whitespace-nowrap block">
                        {item.source.name}
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
}

function CentralDeck({ activeIndex, currentItems }: { activeIndex: number; currentItems: ShowcaseItem[] }) {
    return (
        <div className="relative z-20 w-[248px] aspect-[3/4]">
            <div className="absolute inset-0 bg-white rounded-2xl flex flex-col shadow-2xl overflow-hidden">
                {/* Image Area */}
                <div className="relative h-[80%] bg-stone-100 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        {currentItems.map((item, idx) => (
                            idx === activeIndex && (
                                <motion.div
                                    key={`${item.source.id}-image`}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <img
                                        src={item.recipe.image}
                                        alt={item.recipe.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 pb-2 flex flex-col justify-end h-full pointer-events-none">
                        <div className="flex gap-2 mb-2">
                            <span className="px-2 py-1 rounded-md bg-white/20 border border-white/10 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                                Imported
                            </span>
                        </div>

                        <div className="h-12 relative">
                            <AnimatePresence mode="popLayout">
                                {currentItems.map((item, idx) => (
                                    idx === activeIndex && (
                                        <motion.div
                                            key={`${item.source.id}-text`}
                                            className="absolute inset-0"
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -16 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <h3 className="text-2xl font-serif text-white leading-none mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                                                {item.recipe.title}
                                            </h3>
                                            <p className="text-white/70 text-xs font-medium">
                                                {item.recipe.subtitle}
                                            </p>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex-1 bg-white px-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Clock size={16} className="text-stone-400" weight="duotone" />
                        <div className="h-5 w-[54px] relative overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                {currentItems.map((item, idx) => (
                                    idx === activeIndex && (
                                        <motion.div
                                            key={`${item.source.id}-time`}
                                            className="absolute inset-0 flex items-center"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <span className="text-sm font-medium text-stone-500 whitespace-nowrap">
                                                {item.recipe.time} min
                                            </span>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <Fire size={16} className="text-stone-400" weight="duotone" />
                        <div className="h-5 w-[60px] relative overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                {currentItems.map((item, idx) => (
                                    idx === activeIndex && (
                                        <motion.div
                                            key={`${item.source.id}-cal`}
                                            className="absolute inset-0 flex items-center"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <span className="text-sm font-medium text-stone-500 whitespace-nowrap">
                                                {item.recipe.calories} kcal
                                            </span>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
