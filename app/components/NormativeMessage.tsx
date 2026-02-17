"use client";

import { ShieldAlert, Lightbulb, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type NormativeLevel = "must" | "should" | "may";

interface NormativeMessageProps {
    level: NormativeLevel;
    message: string;
}

const config: Record<
    NormativeLevel,
    { icon: React.ElementType; label: string; className: string }
> = {
    must: {
        icon: ShieldAlert,
        label: "DEBE",
        className: "bg-destructive/15 border-destructive/30 text-destructive",
    },
    should: {
        icon: Lightbulb,
        label: "DEBERÍA",
        className: "bg-info/10 border-info/20 text-info",
    },
    may: {
        icon: Info,
        label: "",
        className: "text-muted-foreground",
    },
};

const NormativeMessage = ({ level, message }: NormativeMessageProps) => {
    const c = config[level];
    const Icon = c.icon;

    if (level === "may") {
        return (
            <div className={cn("flex items-center gap-2 text-sm", c.className)}>
                <Icon size={14} className="flex-shrink-0" />
                <span>{message}</span>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg border",
                c.className
            )}
        >
            <Icon size={18} className="flex-shrink-0" />
            <span className="text-sm font-medium">{message}</span>
        </div>
    );
};

export default NormativeMessage;
