"use client";

import { useState } from "react";
import { CircleArrowUp, CheckCircle2, Coffee } from "lucide-react";
import NormativeMessage from "../NormativeMessage";
import { cn } from "@/lib/utils";

const CompletionStep = () => {
    const [ejected, setEjected] = useState(false);

    return (
        <div className="flex-1 flex items-center justify-center animate-slide-up">
            <div className="w-full max-w-lg space-y-10">
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className={cn(
                            "w-20 h-20 rounded-full flex items-center justify-center ring-2 ring-offset-2 ring-offset-background shadow-lg",
                            "bg-emerald-500/15 ring-emerald-500/30"
                        )}>
                            <Coffee size={40} className="text-emerald-500 drop-shadow-sm" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">¡Extracción completada!</h2>
                    <p className="text-xl text-muted-foreground">Su café está listo</p>
                </div>

                {/* Eject capsule */}
                <div className="space-y-3">
                    <NormativeMessage level="must" message="DEBE expulsar la cápsula usada antes de retirarse." />
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setEjected(true)}
                            disabled={ejected}
                            className={cn(
                                "touch-target flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-lg",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                ejected
                                    ? "bg-emerald-500/15 text-emerald-500 border-2 border-emerald-500/30 ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-background"
                                    : "bg-orange-500/15 text-orange-500 border-2 border-orange-500/30 hover:bg-orange-500/25 ring-2 ring-orange-500/50 ring-offset-2 ring-offset-background hover:shadow-xl"
                            )}
                        >
                            {ejected ? (
                                <>
                                    <CheckCircle2 size={24} />
                                    Cápsula expulsada
                                </>
                            ) : (
                                <>
                                    <CircleArrowUp size={24} className="animate-bounce" />
                                    Expulsar cápsula usada
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {ejected && (
                    <div className={cn(
                        "text-center p-6 rounded-2xl shadow-2xl",
                        "bg-emerald-500/10 border-2 border-emerald-500/20 ring-1 ring-emerald-500/30 ring-offset-2 ring-offset-background"
                    )}>
                        <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-3 animate-pulse" />
                        <p className="text-xl font-bold text-foreground">¡Disfrute su café!</p>
                        <p className="text-muted-foreground mt-1">Gracias por usar Ventura-Coffee</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompletionStep;
