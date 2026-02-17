"use client";

import { useState } from "react";
import { KeyRound, CreditCard } from "lucide-react";
import NormativeMessage from "../NormativeMessage";
import { cn } from "@/lib/utils";

interface LoginStepProps {
    onLogin: (name: string) => void;
}

const LoginStep = ({ onLogin }: LoginStepProps) => {
    const [pin, setPin] = useState("");

    const handleDigit = (d: string) => {
        if (pin.length < 4) setPin(pin + d);
    };

    const handleDelete = () => setPin(pin.slice(0, -1));

    const handleSubmit = () => {
        if (pin.length === 4) onLogin("Usuario");
    };

    return (
        <div className="flex-1 flex items-center justify-center animate-slide-up">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 mb-2">
                        <KeyRound size={32} className="text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Identificación</h2>
                    <p className="text-lg text-muted-foreground">Introduzca su PIN de acceso</p>
                </div>

                {/* PIN display */}
                <div className="flex justify-center gap-4">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition-all",
                                pin[i]
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border bg-card"
                            )}
                        >
                            {pin[i] ? "•" : ""}
                        </div>
                    ))}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "←"].map((key) =>
                        key === "" ? (
                            <div key="empty" />
                        ) : key === "←" ? (
                            <button
                                key="del"
                                onClick={handleDelete}
                                className="touch-target h-14 rounded-xl bg-muted text-muted-foreground text-xl font-semibold hover:bg-muted/80 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                ←
                            </button>
                        ) : (
                            <button
                                key={key}
                                onClick={() => handleDigit(key)}
                                className="touch-target h-14 rounded-xl bg-card border border-border text-foreground text-xl font-semibold hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                {key}
                            </button>
                        )
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={pin.length !== 4}
                    className={cn(
                        "w-full touch-target py-4 rounded-xl text-lg font-bold transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        pin.length === 4
                            ? "bg-primary text-primary-foreground hover:brightness-110 ring-2 ring-primary/50 ring-offset-2 ring-offset-background"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                >
                    Acceder
                </button>

                <div className="flex items-center gap-3 justify-center text-sm text-muted-foreground">
                    <CreditCard size={16} />
                    <span>También puede usar su tarjeta de empleado</span>
                </div>

                <NormativeMessage level="must" message="DEBE identificarse (Nivel 2) para usar la máquina." />
            </div>
        </div>
    );
};

export default LoginStep;
