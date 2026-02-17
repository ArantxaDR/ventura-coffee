"use client";

import { useState, useEffect } from "react";
import { Droplets } from "lucide-react";
import NormativeMessage from "../NormativeMessage";
import { cn } from "@/lib/utils";

interface WaterCheckStepProps {
    onValidated: (valid: boolean) => void;
}

const WaterCheckStep = ({ onValidated }: WaterCheckStepProps) => {
    const [waterLevel, setWaterLevel] = useState(0);

    // Estados completos
    const isEmpty = waterLevel === 0;
    const isLow = waterLevel > 0 && waterLevel < 20;
    const isOk = waterLevel >= 20;

    // ✅ Simulación inteligente para TODOS los casos
    useEffect(() => {
        const timers: NodeJS.Timeout[] = [];

        if (waterLevel === 0) {        // VACÍO → LLENO
            timers.push(setTimeout(() => setWaterLevel(72), 2000));
        } else if (waterLevel < 20) {  // BAJO → MEDIO → LLENO
            timers.push(setTimeout(() => setWaterLevel(35), 1000));
            timers.push(setTimeout(() => setWaterLevel(72), 2500));
        }
        // Si ≥20 ya está OK

        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        onValidated(isOk);
    }, [isOk, onValidated]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center animate-slide-up px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-6 sm:space-y-8 lg:space-y-10">

                {/* Header RESPONSIVE */}
                <div className="text-center space-y-2 sm:space-y-3">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                        Paso 1 de 5
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">
                        Verificar nivel de agua
                    </p>
                </div>

                {/* Tanque + Info RESPONSIVE */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 sm:gap-8 w-full">

                    {/* Water tank RESPONSIVE */}
                    <div className={cn(
                        "relative w-28 sm:w-32 lg:w-36 h-48 sm:h-56 lg:h-64",
                        "rounded-2xl border-2 border-border bg-card overflow-hidden shadow-xl"
                    )}>
                        {/* Water fill con TODOS los estados */}
                        <div
                            className={cn(
                                "absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out rounded-b-xl animate-pulse",
                                isEmpty ? "bg-destructive/30"
                                    : isLow ? "bg-destructive/40"
                                        : "bg-blue-500/30"
                            )}
                            style={{ height: `${waterLevel}%` }}
                        >
                            <div className={cn(
                                "absolute inset-0 animate-pulse",
                                isEmpty ? "bg-destructive/20"
                                    : isLow ? "bg-destructive/20"
                                        : "bg-blue-500/10"
                            )} />
                        </div>

                        {/* MIN/MAX markers RESPONSIVE */}
                        <div className="absolute left-0 right-0 bottom-[20%] border-t-2 border-dashed border-destructive/50 px-1 sm:px-2">
                            <span className="absolute -top-4 sm:-top-5 right-1 sm:right-2 text-[10px] sm:text-xs font-bold text-destructive bg-background px-1 rounded whitespace-nowrap">
                                MIN
                            </span>
                        </div>
                        <div className="absolute left-0 right-0 top-[10%] border-t-2 border-dashed border-blue-500/50 px-1 sm:px-2">
                            <span className="absolute -top-4 sm:-top-5 right-1 sm:right-2 text-[10px] sm:text-xs font-bold text-blue-500 bg-background px-1 rounded whitespace-nowrap">
                                MAX
                            </span>
                        </div>

                        {/* Icon RESPONSIVE con estados */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Droplets
                                size={28}
                                className={cn(
                                    "drop-shadow-sm transition-colors duration-500",
                                    isEmpty || isLow ? "text-destructive" : "text-blue-500"
                                )}
                            />
                        </div>
                    </div>

                    {/* Datos numéricos RESPONSIVE */}
                    <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                        <div className={cn(
                            "text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-md tracking-tight",
                            isEmpty || isLow ? "text-destructive" : "text-blue-500"
                        )}>
                            {waterLevel}%
                        </div>

                        {/* 🆕 Status con TODOS los textos */}
                        <div className={cn(
                            "text-sm sm:text-base lg:text-lg font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-sm",
                            isEmpty
                                ? "bg-destructive/20 text-destructive border-2 border-destructive/40 animate-pulse"
                                : isLow
                                    ? "bg-destructive/15 text-destructive border-2 border-destructive/30"
                                    : "bg-blue-500/15 text-success border-2 border-blue-500/30"
                        )}>
                            {isEmpty ? "🚨 DEPÓSITO VACÍO"
                                : isLow ? "⚠️ Nivel insuficiente"
                                    : "✅ Nivel correcto"}
                        </div>
                    </div>
                </div>

                {/* Normative RESPONSIVE con TODOS los casos */}
                <div className="space-y-3 px-2 sm:px-0 w-full max-w-md mx-auto">
                    {isEmpty && (
                        <NormativeMessage
                            level="must"
                            message="🚨 DEPÓSITO COMPLETAMENTE VACÍO. Rellénelo antes de continuar."
                        />
                    )}
                    {isLow && !isEmpty && (
                        <NormativeMessage
                            level="must"
                            message="⚠️ Nivel CRÍTICO de agua. Rellene el depósito antes de continuar."
                        />
                    )}
                    <NormativeMessage level="should" message="💧 Utilice agua filtrada para mejor sabor." />
                </div>
            </div>
        </div>
    );
};

export default WaterCheckStep;
