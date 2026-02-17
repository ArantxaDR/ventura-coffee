"use client";

import { useState, useEffect } from "react";
import { Wine, GlassWater, Ban } from "lucide-react";
import NormativeMessage from "../NormativeMessage";
import { cn } from "@/lib/utils";

interface CupVerifyStepProps {
    onSelect: (cup: string | null) => void;
}

const cups = [
    { id: "ceramic", label: "Cerámica", icon: Wine, enabled: true },
    { id: "glass", label: "Vidrio templado", icon: GlassWater, enabled: true },
    { id: "plastic", label: "Plástico", icon: Ban, enabled: false },
];

const CupVerifyStep = ({ onSelect }: CupVerifyStepProps) => {
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        onSelect(selected);
    }, [selected, onSelect]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center animate-slide-up px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-2xl space-y-6 sm:space-y-8 lg:space-y-10">
                {/* Header RESPONSIVE */}
                <div className="text-center space-y-2 sm:space-y-3">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                        Paso 3 de 5
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">Tipo de vaso</p>
                </div>

                {/* Grid RESPONSIVE: 1-col móvil → 3-col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
                    {cups.map((cup) => {
                        const Icon = cup.icon;
                        return (
                            <button
                                key={cup.id}
                                onClick={() => cup.enabled && setSelected(cup.id)}
                                disabled={!cup.enabled}
                                className={cn(
                                    // 🔧 Tamaños responsivos
                                    "group relative p-4 sm:p-6 lg:p-8 rounded-2xl border-2 transition-all duration-200 shadow-lg hover:shadow-xl",
                                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",

                                    !cup.enabled
                                        ? "border-border bg-muted/50 opacity-40 cursor-not-allowed line-through"
                                        : selected === cup.id
                                            ? "border-primary bg-card ring-4 ring-primary/20 scale-[1.02] lg:scale-[1.03] ring-offset-2 ring-offset-background shadow-xl"
                                            : "border-border bg-card hover:border-primary/30 hover:shadow-xl"
                                )}
                            >
                                <div className="flex flex-col items-center gap-3 sm:gap-4">
                                    {/* Icon RESPONSIVE */}
                                    <Icon
                                        size={32}
                                        className={cn(
                                            "flex-shrink-0",
                                            !cup.enabled
                                                ? "text-muted-foreground"
                                                : selected === cup.id
                                                    ? "text-primary shadow-sm"
                                                    : "text-foreground"
                                        )}
                                    />

                                    {/* Label RESPONSIVE */}
                                    <span className={cn(
                                        "text-center text-sm sm:text-lg lg:text-xl font-semibold leading-tight",
                                        !cup.enabled ? "text-muted-foreground" : "text-foreground"
                                    )}>
                                        {cup.label}
                                    </span>
                                </div>

                                {/* ❌ Disabled overlay RESPONSIVE */}
                                {!cup.enabled && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-destructive/80 rotate-45 shadow-sm" />
                                    </div>
                                )}

                                {/* ✅ Checkmark RESPONSIVE */}
                                {selected === cup.id && (
                                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center shadow-md ring-1 ring-white/50">
                                        <span className="text-primary-foreground text-xs sm:text-sm font-bold">✓</span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Normative RESPONSIVE */}
                <div className="space-y-2 px-2 sm:px-0 w-full max-w-md mx-auto">
                    <NormativeMessage level="must" message="DEBE usar cerámica o vidrio templado." />
                    <NormativeMessage level="may" message="Se recomienda precalentar el vaso con agua caliente." />
                </div>
            </div>
        </div>
    );
};

export default CupVerifyStep;
