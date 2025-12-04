"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

interface VideoVisualProps {
    src: string;
    poster?: string;
}

function VideoVisual({ src }: VideoVisualProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, {
        amount: 0.5,
        once: false
    });

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isInView) {
            video.play().catch(() => {
                // Autoplay might be blocked, that's ok
            });
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [isInView]);

    return (
        <div ref={containerRef} className="w-full h-full">
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
            />
        </div>
    );
}

// --- Capture Visual ---
export function CaptureVisual() {
    return <VideoVisual src="/videos/capture.MOV" />;
}

// --- Extract Visual ---
export function ExtractVisual() {
    return <VideoVisual src="/videos/extract.MOV" />;
}

// --- Cook Visual ---
export function CookVisual() {
    return <VideoVisual src="/videos/cook.MOV" />;
}
