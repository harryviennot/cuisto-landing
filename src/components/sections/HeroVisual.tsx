"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
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
interface RecipeData {
    titleKey: string;
    subtitleKey: string;
    image: string;
    time: number;
    calories: number;
}

interface SourceType {
    id: string;
    icon: any;
    colors: [string, string];
}

interface ShowcaseItem {
    source: SourceType;
    recipe: RecipeData;
}

// Data - sources without hardcoded names (names come from translations)
const SOURCES: Record<string, SourceType> = {
    tiktok: { id: "tiktok", icon: TiktokLogo, colors: ["#000000", "#000000"] },
    reels: { id: "reels", icon: InstagramLogo, colors: ["#a855f7", "#ec4899"] },
    shorts: { id: "shorts", icon: Play, colors: ["#ef4444", "#b91c1c"] },
    articles: { id: "articles", icon: Globe, colors: ["#3b82f6", "#6366f1"] },
    blogs: { id: "blogs", icon: Globe, colors: ["#8b5cf6", "#6d28d9"] },
    websites: { id: "websites", icon: Globe, colors: ["#06b6d4", "#0891b2"] },
    cookbooks: { id: "cookbooks", icon: Camera, colors: ["#f59e0b", "#d97706"] },
    screenshots: { id: "screenshots", icon: Camera, colors: ["#f97316", "#ea580c"] },
    photos: { id: "photos", icon: Camera, colors: ["#eab308", "#ca8a04"] },
    dictation: { id: "dictation", icon: Microphone, colors: ["#10b981", "#14b8a6"] },
};

// Showcase data with translation keys instead of hardcoded text
const SHOWCASE_DATA: ShowcaseItem[][] = [
    [
        {
            source: SOURCES.tiktok,
            recipe: {
                titleKey: "spicyVodkaPasta",
                subtitleKey: "gigiHadidStyle",
                image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=600",
                time: 25,
                calories: 520,
            },
        },
        {
            source: SOURCES.reels,
            recipe: {
                titleKey: "greenGoddessSalad",
                subtitleKey: "bakedByMelissa",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
                time: 10,
                calories: 280,
            },
        },
        {
            source: SOURCES.shorts,
            recipe: {
                titleKey: "crispyPotatoes",
                subtitleKey: "asmrCooking",
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
                titleKey: "roastChicken",
                subtitleKey: "withSourdoughCroutons",
                image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=600",
                time: 75,
                calories: 450,
            },
        },
        {
            source: SOURCES.blogs,
            recipe: {
                titleKey: "bestBrownies",
                subtitleKey: "fudgyAndChewy",
                image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
                time: 45,
                calories: 380,
            },
        },
        {
            source: SOURCES.websites,
            recipe: {
                titleKey: "avocadoToast",
                subtitleKey: "cafeStyle",
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
                titleKey: "momsLasagna",
                subtitleKey: "handwrittenRecipe",
                image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=600",
                time: 90,
                calories: 620,
            },
        },
        {
            source: SOURCES.screenshots,
            recipe: {
                titleKey: "smoothieBowl",
                subtitleKey: "instagramStory",
                image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=600",
                time: 5,
                calories: 240,
            },
        },
        {
            source: SOURCES.photos,
            recipe: {
                titleKey: "caesarSalad",
                subtitleKey: "restaurantMenu",
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
                titleKey: "applePie",
                subtitleKey: "grandmasSecret",
                image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&q=80&w=600",
                time: 60,
                calories: 410,
            },
        },
    ],
];

export default function HeroVisual() {
    const tSources = useTranslations("sources");
    const tRecipes = useTranslations("recipeExamples");
    const tVisuals = useTranslations("visuals");
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
        <div className="relative w-full max-w-[320px] h-[420px] lg:max-w-[480px] lg:h-[620px] mx-auto flex items-center justify-center">
            {/* Satellite Sources */}
            {currentItems.map((item, idx) => (
                <SatelliteSource
                    key={`${item.source.id}-${idx}`}
                    item={item}
                    isActive={idx === activeIndex}
                    index={idx}
                    sourceName={tSources(item.source.id)}
                />
            ))}

            {/* Central Deck */}
            <CentralDeck
                activeIndex={activeIndex}
                currentItems={currentItems}
                tRecipes={tRecipes}
                tVisuals={tVisuals}
            />
        </div>
    );
}

function SatelliteSource({ item, isActive, index, sourceName }: { item: ShowcaseItem; isActive: boolean; index: number; sourceName: string }) {
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
                className={`flex items-center p-2.5 lg:p-3 rounded-2xl shadow-lg border transition-colors duration-500 ${isActive ? "bg-white border-stone-200" : "bg-white/60 border-white/40"
                    }`}
            >
                <div
                    className="h-6 w-6 lg:h-8 lg:w-8 rounded-md lg:rounded-lg flex items-center justify-center"
                    style={{
                        background: `linear-gradient(135deg, ${item.source.colors[0]}, ${item.source.colors[1]})`,
                    }}
                >
                    <Icon size={16} className="lg:hidden" color="white" weight="fill" />
                    <Icon size={20} className="hidden lg:block" color="white" weight="fill" />
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
                    <span className="pl-2 text-[10px] lg:text-xs font-bold uppercase tracking-wider text-stone-600 whitespace-nowrap block">
                        {sourceName}
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
}

function CentralDeck({ activeIndex, currentItems, tRecipes, tVisuals }: { activeIndex: number; currentItems: ShowcaseItem[]; tRecipes: (key: string) => string; tVisuals: (key: string) => string }) {
    return (
        <div className="relative z-20 w-[248px] lg:w-[360px] aspect-[3/4]">
            <div className="absolute inset-0 bg-white rounded-2xl lg:rounded-3xl flex flex-col shadow-2xl overflow-hidden">
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
                                        alt={tRecipes(item.recipe.titleKey)}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 lg:p-4 pb-2 lg:pb-3 flex flex-col justify-end h-full pointer-events-none">
                        <div className="flex gap-2 mb-2 lg:mb-3">
                            <span className="px-2 py-1 lg:px-3 lg:py-1.5 rounded-md bg-white/20 border border-white/10 text-[10px] lg:text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                                {tVisuals("imported")}
                            </span>
                        </div>

                        <div className="h-12 lg:h-16 relative">
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
                                            <h3 className="text-2xl lg:text-3xl font-serif text-white leading-none mb-1 lg:mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                                                {tRecipes(item.recipe.titleKey)}
                                            </h3>
                                            <p className="text-white/70 text-xs lg:text-sm font-medium">
                                                {tRecipes(item.recipe.subtitleKey)}
                                            </p>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex-1 bg-white px-4 lg:px-5 flex items-center justify-between">
                    <div className="flex items-center gap-1 lg:gap-1.5">
                        <Clock size={16} className="text-stone-400 lg:hidden" weight="duotone" />
                        <Clock size={20} className="text-stone-400 hidden lg:block" weight="duotone" />
                        <div className="h-5 lg:h-6 w-[54px] lg:w-[65px] relative overflow-hidden">
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
                                            <span className="text-sm lg:text-base font-medium text-stone-500 whitespace-nowrap">
                                                {item.recipe.time} {tVisuals("min")}
                                            </span>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 lg:gap-1.5">
                        <Fire size={16} className="text-stone-400 lg:hidden" weight="duotone" />
                        <Fire size={20} className="text-stone-400 hidden lg:block" weight="duotone" />
                        <div className="h-5 lg:h-6 w-[60px] lg:w-[72px] relative overflow-hidden">
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
                                            <span className="text-sm lg:text-base font-medium text-stone-500 whitespace-nowrap">
                                                {item.recipe.calories} {tVisuals("kcal")}
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
