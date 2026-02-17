"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean>(false);

    React.useEffect(() => {
        // Verificación SSR para evitar hidratación mismatch
        const checkMobile = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        // Chequeo inicial en cliente
        checkMobile();

        // Listener para cambios de tamaño
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        mql.addEventListener("change", checkMobile);

        // Cleanup
        return () => {
            mql.removeEventListener("change", checkMobile);
        };
    }, []);

    return isMobile;
}
