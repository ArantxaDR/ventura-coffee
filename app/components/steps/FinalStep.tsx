"use client";

import { useState } from "react";
import { Milk, CandyCane, CircleArrowUp, CheckCircle2 } from "lucide-react";
import NormativeMessage from "../NormativeMessage";
import { cn } from "@/lib/utils";

const FinalStep = () => {
    // 🆕 Estados para selección múltiple
    const [milk, setMilk] = useState(false);
    const [sugar, setSugar] = useState(false);
    const [ejected, setEjected] = useState(false);

    return (
        <div className="flex-1 flex flex-col items-center justify-center animate-slide-up px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-6 sm:space-y-8 lg:space-y-10">

                {/* Header RESPONSIVE */}
                <div className="text-center space-y-2 sm:space-y-3">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                        Paso 5 de 5
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">
                        Aditivos y finalización
                    </p>
                </div>

                {/* Aditivos RESPONSIVE */}
                <div className="space-y-3 w-full">
                    <p className="text-sm sm:text-base font-medium text-muted-foreground text-center">
                        Aditivos opcionales
                    </p>

                    {/* Botones RESPONSIVE */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        {/* Leche */}
                        <button
                            onClick={() => setMilk(!milk)}
                            className={cn(
                                "flex items-center justify-center gap-3 p-4 sm:p-5 lg:p-6 rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                milk
                                    ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/30 scale-105 shadow-lg"
                                    : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-muted/50"
                            )}
                        >
                            <Milk size={20} className={cn(milk ? "text-primary drop-shadow-sm" : "text-foreground")} />
                            <span className="font-semibold text-sm sm:text-base lg:text-lg whitespace-nowrap">
                                {milk ? "✓ Leche" : "Leche"}
                            </span>
                        </button>

                        {/* Azúcar */}
                        <button
                            onClick={() => setSugar(!sugar)}
                            className={cn(
                                "flex items-center justify-center gap-3 p-4 sm:p-5 lg:p-6 rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                sugar
                                    ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/30 scale-105 shadow-lg"
                                    : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-muted/50"
                            )}
                        >
                            <CandyCane size={20} className={cn(sugar ? "text-primary drop-shadow-sm" : "text-foreground")} />
                            <span className="font-semibold text-sm sm:text-base lg:text-lg whitespace-nowrap">
                                {sugar ? "✓ Azúcar" : "Azúcar"}
                            </span>
                        </button>
                    </div>

                    {/* Resumen selección */}
                    {(milk || sugar) && (
                        <div className="flex flex-wrap gap-2 justify-center p-3 bg-muted/50 rounded-xl text-sm sm:text-base">
                            {milk && <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-medium">Leche</span>}
                            {sugar && <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-medium">Azúcar</span>}
                        </div>
                    )}
                </div>

                {/* Eject capsule (igual que CompletionStep) */}
                <div className="space-y-3">
                    <NormativeMessage level="must" message="NO use cucharas metálicas mientras la taza está en la bandeja." />
                    <NormativeMessage level="may" message="Puede añadir leche o azúcar a su gusto." />
                </div>

                {/* 🆕 Debug info (borrar en prod) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="text-xs text-muted-foreground text-center space-y-1">
                        <div>Debug: Leche={milk ? '✓' : '✗'}, Azúcar={sugar ? '✓' : '✗'}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinalStep;
