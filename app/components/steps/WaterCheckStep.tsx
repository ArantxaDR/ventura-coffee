"use client";

import { useState, useEffect } from "react";
import { Droplets } from "lucide-react";
import NormativeMessage from "../NormativeMessage";
import { cn } from "@/lib/utils";

interface WaterCheckStepProps {
    onValidated: (valid: boolean) => void;
}

const WaterCheckStep = ({ onValidated }: WaterCheckStepProps) => {
    const [waterLevel, setWaterLevel] = useState(35);
    const isLow = waterLevel < 20;
    const isOk = waterLevel >= 20;

    useEffect(() => {
        // Simulate water level rising
        const timer = setTimeout(() => setWaterLevel(72), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        onValidated(isOk);
    }, [isOk, onValidated]);

    return (
        <div className="flex-1 flex items-center justify-center animate-slide-up">
            <div className="w-full max-w-lg space-y-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-foreground">Paso 1 de 5</h2>
                    <p className="text-xl text-muted-foreground">Verificar nivel de agua</p>
                </div>

                {/* Water tank visual */}
                <div className="flex items-end justify-center gap-8">
                    <div className="relative w-32 h-56 rounded-2xl border-2 border-border bg-card overflow-hidden shadow-xl">
                        {/* Water fill */}
                        <div
                            className={cn(
                                "absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out rounded-b-xl animate-pulse",
                                isLow ? "bg-destructive/40" : "bg-blue-500/30"
                            )}
                            style={{ height: `${waterLevel}%` }}
                        >
                            <div className={cn(
                                "absolute inset-0 animate-pulse",
                                isLow ? "bg-destructive/20" : "bg-blue-500/10"
                            )} />
                        </div>

                        {/* MIN / MAX markers */}
                        <div className="absolute left-0 right-0 bottom-[20%] border-t-2 border-dashed border-destructive/50 px-2">
                            <span className="absolute -top-5 right-2 text-xs font-bold text-destructive bg-background px-1 rounded">MIN</span>
                        </div>
                        <div className="absolute left-0 right-0 top-[10%] border-t-2 border-dashed border-blue-500/50 px-2">
                            <span className="absolute -top-5 right-2 text-xs font-bold text-blue-500 bg-background px-1 rounded">MAX</span>
                        </div>

                        {/* Icon */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Droplets
                                size={36}
                                className={cn(
                                    "drop-shadow-sm",
                                    isLow ? "text-destructive" : "text-blue-500"
                                )}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pb-4 text-center">
                        <div className={cn(
                            "text-5xl font-bold drop-shadow-md",
                            isLow ? "text-destructive" : "text-blue-500"
                        )}>
                            {waterLevel}%
                        </div>
                        <div className={cn(
                            "text-sm font-medium px-3 py-1 rounded-lg",
                            isLow
                                ? "bg-destructive/10 text-destructive border border-destructive/20"
                                : "bg-blue-500/10 text-success border border-blue-500/20"
                        )}>
                            {isLow ? "Nivel insuficiente" : "Nivel correcto"}
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {isLow && (
                        <NormativeMessage level="must" message="El depósito de agua está vacío. Rellénelo antes de continuar." />
                    )}
                    <NormativeMessage level="should" message="Utilice agua filtrada para mejor sabor." />
                </div>
            </div>
        </div>
    );
};

export default WaterCheckStep;
