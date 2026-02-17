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
        <div className="flex-1 flex items-center justify-center animate-slide-up">
            <div className="w-full max-w-2xl space-y-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-foreground">Paso 3 de 5</h2>
                    <p className="text-xl text-muted-foreground">Tipo de vaso</p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {cups.map((cup) => {
                        const Icon = cup.icon;
                        return (
                            <button
                                key={cup.id}
                                onClick={() => cup.enabled && setSelected(cup.id)}
                                disabled={!cup.enabled}
                                className={cn(
                                    "group relative p-8 rounded-2xl border-2 transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                    !cup.enabled
                                        ? "border-border bg-muted/50 opacity-40 cursor-not-allowed line-through"
                                        : selected === cup.id
                                            ? "border-primary bg-card ring-4 ring-primary/20 scale-[1.03] ring-offset-2 ring-offset-background shadow-xl"
                                            : "border-border bg-card hover:border-primary/30 hover:shadow-xl"
                                )}
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <Icon
                                        size={48}
                                        className={cn(
                                            !cup.enabled
                                                ? "text-muted-foreground"
                                                : selected === cup.id
                                                    ? "text-primary shadow-sm"
                                                    : "text-foreground"
                                        )}
                                    />
                                    <span className={cn(
                                        "text-lg font-semibold",
                                        !cup.enabled ? "text-muted-foreground" : "text-foreground"
                                    )}>
                                        {cup.label}
                                    </span>
                                </div>

                                {!cup.enabled && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-20 h-0.5 bg-destructive/80 rotate-45 shadow-sm" />
                                    </div>
                                )}

                                {selected === cup.id && (
                                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md ring-1 ring-white/50">
                                        <span className="text-primary-foreground text-sm font-bold">✓</span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="space-y-2">
                    <NormativeMessage level="must" message="DEBE usar cerámica o vidrio templado." />
                    <NormativeMessage level="may" message="Se recomienda precalentar el vaso con agua caliente." />
                </div>
            </div>
        </div>
    );
};

export default CupVerifyStep;
