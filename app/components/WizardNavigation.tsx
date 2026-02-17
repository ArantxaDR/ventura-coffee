"use client";

import { ArrowLeft, ArrowRight, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardNavigationProps {
    onBack?: () => void;
    onNext?: () => void;
    nextLabel?: string;
    backLabel?: string;
    nextDisabled?: boolean;
    showBack?: boolean;
    isLastStep?: boolean;
}

const WizardNavigation = ({
    onBack,
    onNext,
    nextLabel = "Continuar",
    backLabel = "Atrás",
    nextDisabled = false,
    showBack = true,
    isLastStep = false,
}: WizardNavigationProps) => {
    return (
        <div className="flex items-center justify-between px-8 py-5 border-t border-border bg-card/40">
            {showBack ? (
                <button
                    onClick={onBack}
                    className={cn(
                        "touch-target flex items-center gap-3 px-6 py-3 rounded-xl text-lg font-medium text-muted-foreground bg-muted hover:bg-muted/80 transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    )}
                >
                    <ArrowLeft size={20} />
                    {backLabel}
                </button>
            ) : (
                <div />
            )}

            <button
                onClick={onNext}
                disabled={nextDisabled}
                className={cn(
                    "touch-target flex items-center gap-3 px-8 py-3 rounded-xl text-lg font-bold transition-all shadow-lg",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    nextDisabled
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : isLastStep
                            ? "bg-emerald-500 text-white hover:brightness-110 ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-background"
                            : "bg-primary text-primary-foreground hover:brightness-110 ring-2 ring-primary/50 ring-offset-2 ring-offset-background"
                )}
            >
                {isLastStep ? (
                    <>
                        <Coffee size={20} />
                        {nextLabel}
                    </>
                ) : (
                    <>
                        {nextLabel}
                        <ArrowRight size={20} />
                    </>
                )}
            </button>
        </div>
    );
};

export default WizardNavigation;
