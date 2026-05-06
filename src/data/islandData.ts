export type NodeStatus = "locked" | "available" | "in_progress" | "completed";
export type NodeType = "main" | "exploration";

export interface IslandNode {
  id: string;
  title: string;
  description: string;
  type: NodeType;
  activityType: string;
  status: NodeStatus;
  lockedReason?: string;
  duration: string;
  imageEmoji: string;
  /** Position on the island canvas (0-1000 x, 0-700 y) */
  x: number;
  y: number;
}

export interface IslandData {
  id: string;
  regionId: string;
  name: string;
  subtitle: string;
  pepeIntro: string[];
  nodes: IslandNode[];
  /** Ordered list of main node IDs defining the progression path */
  mainPath: string[];
}

export const startIsland: IslandData = {
  id: "island-self-knowledge",
  regionId: "self-knowledge",
  name: "Isla del Autoconocimiento",
  subtitle: "Descubre quién eres",
  pepeIntro: [
    "¡Bienvenido a la Isla del Autoconocimiento! Este es el primer paso de tu viaje vocacional.",
    "Aquí aprenderás a conocerte mejor: tus fortalezas, tus valores y tus sueños.",
    "Sigue el camino principal para avanzar. Cada actividad que completes iluminará un poco más la isla.",
    "También encontrarás actividades de exploración alrededor de la isla. Son opcionales pero muy valiosas.",
    "¡Adelante, aventurero! Haz clic en cualquier nodo activo para comenzar.",
  ],
  mainPath: ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"],
  nodes: [
    {
      id: "sk1",
      title: "Bienvenido al viaje",
      description:
        "Estás por comenzar una aventura importante. En esta primera parada conocerás de qué trata este recorrido vocacional, cómo te acompañará Pepe y qué irás descubriendo a lo largo del camino.",
      type: "main",
      activityType: "Información",
      status: "available",
      duration: "20 min",
      imageEmoji: "📖",
      x: 100,
      y: 350,
    },
    {
      id: "sk2",
      title: "Cómo llego a este momento?",
      description:
        "Antes de avanzar, hagamos una pausa. Aquí podrás expresar cómo te sientes frente al cierre del colegio y a la decisión sobre tu futuro.",
      type: "main",
      activityType: "Cuestionario",
      status: "available",
      duration: "15 min",
      imageEmoji: "💪",
      x: 280,
      y: 400,
    },
    {
      id: "sk3",
      title: "Mi punto de partida",
      description:
        "Cada viaje comienza reconociendo desde dónde partimos. En esta actividad explorarás qué tan claro tienes hoy tu futuro, cuánto sabes sobre ti y qué conoces del mundo de las profesiones.",
      type: "main",
      activityType: "Ejercicio interactivo",
      status: "available",
      duration: "25 min",
      imageEmoji: "🧭",
      x: 420,
      y: 280,
    },
    {
      id: "sk4",
      title: "Cómo me veo hoy",
      description:
        "Esta actividad te ayudará a mirar cómo te percibes actualmente. Reflexionarás sobre tus fortalezas, intereses y nivel de claridad personal al iniciar este proceso.",
      type: "main",
      activityType: "Escritura creativa",
      status: "locked",
      lockedReason: 'Completa "Mapa de valores" primero',
      duration: "30 min",
      imageEmoji: "✉️",
      x: 550,
      y: 400,
    },
    {
      id: "sk5",
      title: "Mis expectativas para este viaje",
      description:
        "Aquí podrás registrar qué esperas de este programa, qué dudas o intereses traes contigo y cómo sientes que tu entorno influye en esta decisión.",
      type: "main",
      activityType: "Escritura creativa",
      status: "locked",
      lockedReason: 'Completa "Mapa de valores" primero',
      duration: "30 min",
      imageEmoji: "✉️",
      x: 700,
      y: 300,
    },
    {
      id: "sk6",
      title: "Mi primera entrada del diario",
      description:
        "Tu diario vocacional será un espacio personal para guardar pensamientos, emociones y descubrimientos. En esta primera entrada escribirás cómo llegas al inicio de esta experiencia y qué esperas encontrar.",
      type: "main",
      activityType: "Escritura creativa",
      status: "locked",
      lockedReason: 'Completa "Mapa de valores" primero',
      duration: "30 min",
      imageEmoji: "✉️",
      x: 850,
      y: 350,
    },
    {
      id: "exp1",
      title: "Conoce a Pepe",
      description:
        "Pepe será tu compañero durante esta aventura. En esta breve actividad descubrirás cómo te guiará y de qué manera te acompañará en cada isla.",
      type: "exploration",
      activityType: "Actividad libre",
      status: "available",
      duration: "10 min/día",
      imageEmoji: "📝",
      x: 180,
      y: 180,
    },
    {
      id: "exp2",
      title: "Por qué es importante este proceso?",
      description:
        "Elegir qué hacer después del colegio no es una decisión menor. Aquí descubrirás por qué vale la pena tomarte este proceso con tiempo, reflexión e información.",
      type: "exploration",
      activityType: "Creatividad",
      status: "available",
      duration: "35 min",
      imageEmoji: "🎨",
      x: 400,
      y: 520,
    },
    {
      id: "exp3",
      title: "Decidir a ciegas",
      description:
        "A través de una situación sencilla, reflexionarás sobre lo que puede pasar cuando una decisión vocacional se toma sin considerar todos los factores importantes.",
      type: "exploration",
      activityType: "Creatividad",
      status: "available",
      duration: "35 min",
      imageEmoji: "🎨",
      x: 600,
      y: 150,
    },
    {
      id: "exp4",
      title: "Cómo utilizar el diario vocacional",
      description:
        "En este espacio aprenderás para qué sirve tu diario, qué tipo de cosas puedes escribir en él y cómo puede ayudarte a lo largo de todo el recorrido.",
      type: "exploration",
      activityType: "Creatividad",
      status: "available",
      duration: "35 min",
      imageEmoji: "🎨",
      x: 700,
      y: 500,
    },
  ],
};
