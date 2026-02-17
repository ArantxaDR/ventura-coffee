☕ Ventura-Coffee: UX Flow Design

De la Norma Técnica a la Interfaz de Usuario.
Transformación de la normativa NT-KAF-E:2024 en una experiencia digital fluida, segura y guiada.

🎯 El Desafío

El objetivo principal fue traducir una norma técnica burocrática y fragmentada en un flujo de usuario donde el cumplimiento de los estándares de calidad y seguridad sea automático. El usuario final logra la excelencia en su café sin necesidad de leer manuales, gracias a un sistema de bloqueos inteligentes y jerarquía visual.

🛠️ Metodología de Diseño (Proceso Iterativo)

1. Análisis de la Norma Técnica (NT-KAF-E:2024)

Desglosamos el documento normativo para extraer la lógica operativa del sistema:

Fases Operativas: Identificación de 8 fases críticas (8.1-8.4 + Anexo B).

Mapeo de Riesgos (RC): * RC-01: Control de nivel de agua.

RC-02: Gestión de precalentamiento.

RC-03: Bloqueo de palanca de carga.

Semántica de Interfaz:

🔴 DEBE (Obligatorio): Bloqueo total de la UI hasta cumplimiento.

🟡 DEBERÍA (Recomendado): Notificaciones y sugerencias visuales.

🔵 PUEDE (Opcional): Personalización y preferencias.

2. Desglose de Tareas UX

Traducción de requisitos normativos a 12 puntos de contacto accionables, incluyendo:

Arquitectura tipo Wizard para guiar el proceso.

Copywriting enfocado en humanos (traduciendo tecnicismos a instrucciones claras).

Selector de cápsulas y volumen según el Anexo A.

3. Implementación Front-end (Arquitectura Técnica)

Preparación del entorno para Next.js + TypeScript:

Máquina de Estados (FSM): Implementación de +10 estados lógicos (OFF, PREHEATING, ERROR_RC01, etc.).

Componentes Atómicos: NivelAgua, SelectorCapsula, NormativeBanner.

Tokens Visuales: Colores semánticos anclados a la criticidad de la norma.

4. Layout & Estructura Visual

Diseño basado en una estructura de 3 zonas clave:

Superior (Header): Estado de la máquina y feedback sistémico.

Central (Canvas): El paso actual del flujo (foco principal).

Inferior (Footer): Acciones de navegación y banners de advertencia normativa.

5. Design System & Accesibilidad

Componentes: ButtonPrimary, StatusBadge, WizardStep.

Accesibilidad: Contraste certificado, tamaños de objetivo táctil optimizados y soporte de texto para iconos.

🔄 Flujo de Usuario Resultante (Happy Path)

Este diagrama representa cómo la interfaz guía al usuario a través de los puntos de control normativos:

graph TD
    Start((INICIO)) --> Auth[DEBE: B.1 Autenticación]
    Auth --> Water{Agua RC-01}
    Water -- Vacío --> Block[BLOQUEO UI]
    Water -- OK --> Preheat[RC-02 Precalentamiento]
    Preheat --> Capsule[Selección Cápsula Anexo A]
    Capsule --> Lever[RC-03 Cierre Palanca]
    Lever --> Extract[Extracción de Volumen]
    Extract --> Additives[Aditivos / No Cuchara Metálica B.4]
    Additives --> Eject[DEBE: Expulsar Cápsula B.3]
    Eject --> End((FIN))

    style Block fill:#ff9999,stroke:#333,stroke-width:2px
    style Auth fill:#e1f5fe,stroke:#01579b


🚀 Conclusión

El resultado es una plataforma donde la tecnología actúa como el "guardián" del proceso. El usuario cumple con el 100% de la normativa técnica de forma orgánica, simplemente siguiendo un camino visualmente intuitivo y seguro.

Este proyecto forma parte del ecosistema de diseño de Ventura-Coffee.

