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
        <div className="flex-1 flex items-center justify-center animate-slide-up">
            <div className="w-full max-w-2xl space-y-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-foreground">Paso 2 de 5</h2>
                    <p className="text-xl text-muted-foreground">Seleccione su cápsula</p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {capsules.map((cap) => (
                        <button
                            key={cap.id}
                            onClick={() => setSelected(cap.id)}
                            className={cn(
                                "group relative p-6 rounded-2xl border-2 transition-all duration-200 shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                selected === cap.id
                                    ? `${cap.accent} bg-card ring-4 ring-primary/20 scale-[1.03] ring-offset-2 ring-offset-background`
                                    : "border-border bg-card hover:border-amber-300/50"
                            )}
                        >
                            {/* Capsule shape */}
                            <div className="flex flex-col items-center gap-4">
                                <div className={cn("w-16 h-24 rounded-full shadow-lg", cap.color)} />
                                <div>
                                    <div className="text-xl font-bold text-foreground">{cap.name}</div>
                                    <div className="text-sm text-muted-foreground">{cap.intensity}</div>
                                </div>
                            </div>
                            {selected === cap.id && (
                                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                                    <span className="text-primary-foreground text-sm font-bold">✓</span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <NormativeMessage level="should" message="Utilice cápsulas compatibles con el sistema Ventura." />
            </div>
        </div>
    );
};

export default CapsuleSelectStep;
