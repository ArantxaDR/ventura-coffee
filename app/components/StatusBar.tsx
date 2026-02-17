"use client";

import { Power, Flame, CheckCircle2, AlertTriangle, User } from "lucide-react";
import { cn } from "@/lib/utils";

type MachineStatus = "off" | "heating" | "ready" | "error";

interface StatusBarProps {
    status: MachineStatus;
    userName?: string;
    userLevel?: number;
    currentStep: number;
    totalSteps: number;
}

const statusConfig: Record<
    MachineStatus,
    { label: string; icon: React.ElementType; className: string }
> = {
    off: {
        label: "Apagada",
        icon: Power,
        className: "bg-muted text-muted-foreground",
    },
    heating: {
        label: "Precalentando",
        icon: Flame,
        className: "bg-orange-500/20 text-orange-500 ring-2 ring-orange-500/50 ring-offset-2 ring-offset-background",
    },
    ready: {
        label: "Lista",
        icon: CheckCircle2,
        className: "bg-emerald-500/20 text-emerald-500 ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-background animate-pulse",
    },
    error: {
        label: "Error",
        icon: AlertTriangle,
        className: "bg-destructive/20 text-destructive ring-2 ring-destructive/50 ring-offset-2 ring-offset-background",
    },
};

const StatusBar = ({ status, userName, userLevel, currentStep, totalSteps }: StatusBarProps) => {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div
            className={cn(
                "flex items-center justify-between px-8 py-4 border-b border-border bg-card/60 backdrop-blur-sm"
            )}
        >
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                    Ventura<span className="text-primary">-Coffee</span>
                </h1>
                <div className="h-5 w-px bg-border" />
                <div
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold",
                        config.className
                    )}
                >
                    <Icon size={16} />
                    {config.label}
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Step indicator */}
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalSteps }, (_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                i < currentStep
                                    ? "w-6 bg-primary"
                                    : i === currentStep
                                        ? "w-8 bg-primary animate-pulse"
                                        : "w-4 bg-muted"
                            )}
                        />
                    ))}
                </div>

                {userName && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User size={16} />
                        <span>{userName}</span>
                        {userLevel && (
                            <span className="px-2 py-0.5 rounded-md bg-primary/15 text-primary text-xs font-semibold">
                                Nivel {userLevel}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatusBar;
