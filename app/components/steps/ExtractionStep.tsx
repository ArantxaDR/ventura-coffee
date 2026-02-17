"use client";

import { useState, useEffect } from "react";
import { Coffee, Flame, CheckCircle2 } from "lucide-react";
import NormativeMessage from "../NormativeMessage";
import { cn } from "@/lib/utils";

interface ExtractionStepProps {
    capsuleType: string | null;
    onReady: (ready: boolean) => void;
}

const ExtractionStep = ({ capsuleType, onReady }: ExtractionStepProps) => {
    const [heating, setHeating] = useState(true);
    const [volume, setVolume] = useState<"small" | "large">(capsuleType === "lungo" ? "large" : "small");

    useEffect(() => {
        const timer = setTimeout(() => setHeating(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        onReady(!heating);
    }, [heating, onReady]);

    return (
        <div className="flex-1 flex items-center justify-center animate-slide-up">
            <div className="w-full max-w-lg space-y-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-foreground">Paso 4 de 5</h2>
                    <p className="text-xl text-muted-foreground">Extracción</p>
                </div>

                {/* Status */}
                <div className="flex justify-center">
                    <div className={cn(
                        "inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg ring-1 ring-offset-2 ring-offset-background",
                        heating
                            ? "bg-orange-500/15 text-orange-500 border-orange-500/30 ring-orange-500/50 animate-pulse"
                            : "bg-emerald-500/15 text-emerald-500 border-emerald-500/30 ring-emerald-500/50"
                    )}>
                        {heating ? (
                            <>
                                <Flame size={24} className="animate-ping" />
                                Precalentando...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 size={24} />
                                Listo para extraer
                            </>
                        )}
                    </div>
                </div>

                {/* Volume selector */}
                <div className="space-y-4">
                    <p className="text-center text-sm text-muted-foreground font-medium">Seleccione volumen</p>
                    <div className="flex justify-center gap-6">
                        <button
                            onClick={() => setVolume("small")}
                            className={cn(
                                "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                volume === "small"
                                    ? "border-primary bg-card ring-4 ring-primary/20 scale-[1.02] ring-offset-2 ring-offset-background"
                                    : "border-border bg-card hover:border-primary/30"
                            )}
                        >
                            <Coffee size={32} className={cn(
                                volume === "small" ? "text-primary shadow-sm" : "text-muted-foreground"
                            )} />
                            <span className="font-semibold text-foreground">Corto</span>
                            <span className="text-sm text-muted-foreground">40 ml</span>
                        </button>
                        <button
                            onClick={() => setVolume("large")}
                            className={cn(
                                "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                volume === "large"
                                    ? "border-primary bg-card ring-4 ring-primary/20 scale-[1.02] ring-offset-2 ring-offset-background"
                                    : "border-border bg-card hover:border-primary/30"
                            )}
                        >
                            <Coffee size={44} className={cn(
                                volume === "large" ? "text-primary shadow-sm" : "text-muted-foreground"
                            )} />
                            <span className="font-semibold text-foreground">Largo</span>
                            <span className="text-sm text-muted-foreground">110 ml</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <NormativeMessage level="must" message="NO interactúe mientras las luces parpadeen." />
                    {heating && <NormativeMessage level="should" message="Espere a que la máquina alcance la temperatura óptima." />}
                </div>
            </div>
        </div>
    );
};

export default ExtractionStep;
