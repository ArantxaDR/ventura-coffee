"use client";

import { useState } from "react";
import { Milk, CandyCane, CircleArrowUp, CheckCircle2 } from "lucide-react";
import NormativeMessage from "../NormativeMessage";
import { cn } from "@/lib/utils";

const FinalStep = () => {
    const [ejected, setEjected] = useState(false);

    return (
        <div className="flex-1 flex items-center justify-center animate-slide-up">
            <div className="w-full max-w-lg space-y-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-foreground">Paso 5 de 5</h2>
                    <p className="text-xl text-muted-foreground">Aditivos y finalización</p>
                </div>

                {/* Additives */}
                <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground text-center">Aditivos opcionales</p>
                    <div className="flex justify-center gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-sm hover:shadow-md">
                            <Milk size={20} />
                            Leche
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-sm hover:shadow-md">
                            <CandyCane size={20} />
                            Azúcar
                        </button>
                    </div>
                </div>



                <div className="space-y-2">
                    <NormativeMessage level="must" message="NO use cucharas metálicas mientras la taza está en la bandeja." />
                    <NormativeMessage level="may" message="Puede añadir leche o azúcar a su gusto." />
                </div>
            </div>
        </div>
    );
};

export default FinalStep;
