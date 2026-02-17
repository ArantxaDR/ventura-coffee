"use client";

import { useState, useEffect } from "react";
import NormativeMessage from "../NormativeMessage";
import { cn } from "@/lib/utils";

interface CapsuleSelectStepProps {
    onSelect: (capsule: string | null) => void;
}

const capsules = [
    { id: "espresso", name: "Espresso", color: "bg-amber-800", accent: "border-amber-700", intensity: "Intenso" },
    { id: "lungo", name: "Lungo", color: "bg-amber-600", accent: "border-amber-500", intensity: "Suave" },
    { id: "decaf", name: "Descafeinado", color: "bg-emerald-800", accent: "border-emerald-700", intensity: "Sin cafeína" },
];

const CapsuleSelectStep = ({ onSelect }: CapsuleSelectStepProps) => {
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
                        Paso 2 de 5
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">Seleccione su cápsula</p>
                </div>

                {/* Grid RESPONSIVE: 1-col móvil → 3-col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
                    {capsules.map((cap) => (
                        <button
                            key={cap.id}
                            onClick={() => setSelected(cap.id)}
                            className={cn(
                                // 🔧 Tamaños responsivos
                                "group relative p-4 sm:p-6 lg:p-8 rounded-2xl border-2 transition-all duration-200 shadow-lg hover:shadow-xl",
                                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",

                                selected === cap.id
                                    ? `${cap.accent} bg-card ring-4 ring-primary/20 scale-[1.02] lg:scale-[1.03] ring-offset-2 ring-offset-background shadow-xl`
                                    : "border-border bg-card hover:border-primary/30 hover:shadow-xl"
                            )}
                        >
                            {/* Capsule shape RESPONSIVE */}
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                                <div className={cn(
                                    "w-14 h-20 sm:w-16 sm:h-24 lg:w-20 lg:h-28 rounded-full shadow-lg",
                                    cap.color
                                )} />

                                {/* Text RESPONSIVE */}
                                <div className="text-center">
                                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight">
                                        {cap.name}
                                    </div>
                                    <div className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
                                        {cap.intensity}
                                    </div>
                                </div>
                            </div>

                            {/* Checkmark RESPONSIVE */}
                            {selected === cap.id && (
                                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                                    <span className="text-primary-foreground text-xs sm:text-sm font-bold">✓</span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Normative RESPONSIVE */}
                <div className="px-2 sm:px-0">
                    <NormativeMessage level="should" message="Utilice cápsulas compatibles con el sistema Ventura." />
                </div>
            </div>
        </div>
    );
};

export default CapsuleSelectStep;
