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
                // 🔧 RESPONSIVE: Padding y altura
                "flex flex-col sm:flex-row items-start sm:items-center justify-between",
                "px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5",
                "border-b border-border bg-card/60 backdrop-blur-sm"
            )}
        >
            {/* Izquierda: Logo + Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <h1 className={cn(
                    "text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-foreground",
                    "order-2 sm:order-1"
                )}>
                    Ventura<span className="text-primary">-Coffee</span>
                </h1>

                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto order-1 sm:order-2">
                    <div className="h-4 w-px sm:h-5 sm:w-px bg-border hidden sm:block" />

                    <div
                        className={cn(
                            "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg",
                            "text-xs sm:text-sm lg:text-base font-semibold",
                            config.className
                        )}
                    >
                        <Icon size={14} className="sm:[size:16]" />
                        <span className="truncate">{config.label}</span>
                    </div>
                </div>
            </div>

            {/* Derecha: Steps + User */}
            <div className="flex items-center gap-3 sm:gap-4 sm:gap-6 w-full sm:w-auto mt-3 sm:mt-0">
                {/* Step indicator RESPONSIVE */}
                <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-center sm:justify-start">
                    {Array.from({ length: totalSteps }, (_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-1 sm:h-1.5 lg:h-2 rounded-full transition-all duration-300 flex-shrink-0",
                                i < currentStep
                                    ? "w-4 sm:w-6 lg:w-8 bg-primary"
                                    : i === currentStep
                                        ? "w-5 sm:w-8 lg:w-10 bg-primary animate-pulse"
                                        : "w-3 sm:w-4 lg:w-6 bg-muted"
                            )}
                        />
                    ))}
                </div>

                {/* User info RESPONSIVE */}
                {userName && (
                    <div className={cn(
                        "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground",
                        "w-full sm:w-auto justify-center sm:justify-end mt-2 sm:mt-0"
                    )}>
                        <User size={14} className="sm:[size:16]" />
                        <span className="truncate max-w-[120px] sm:max-w-none">{userName}</span>
                        {userLevel && (
                            <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md bg-primary/15 text-primary text-xs sm:text-sm font-semibold whitespace-nowrap">
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
