import React from "react";
import { Check } from "./Icons";

const Header = () => {
    const today = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    }).format(new Date());

    return (
        <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xs">
            <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3.5 sm:px-6">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-xs">
                        <Check className="h-4 w-4" />
                    </div>
                    <span className="text-base font-semibold tracking-tight text-zinc-900">
                        TaskFlow
                    </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="hidden sm:inline font-normal">{today}</span>
                    <span className="hidden sm:inline text-zinc-300">•</span>
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                        <span className="font-medium text-zinc-600">Online</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;