export type NodeStatus = 'locked' | 'available' | 'in_progress' | 'completed';
export type NodeType = 'main' | 'exploration';

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
  id: 'island-self-knowledge',
  regionId: 'self-knowledge',
  name: 'Isla del Autoconocimiento',
  subtitle: 'Descubre quién eres',
  pepeIntro: [
    '¡Bienvenido a la Isla del Autoconocimiento! Este es el primer paso de tu viaje vocacional.',
    'Aquí aprenderás a conocerte mejor: tus fortalezas, tus valores y tus sueños.',
    'Sigue el camino principal para avanzar. Cada actividad que completes iluminará un poco más la isla.',
    'También encontrarás actividades de exploración alrededor de la isla. Son opcionales pero muy valiosas.',
    '¡Adelante, aventurero! Haz clic en cualquier nodo activo para comenzar.',
  ],
  mainPath: ['sk1', 'sk2', 'sk3', 'sk4', 'sk5', 'sk6'],
  nodes: [
    {
      id: 'sk1',
      title: 'Bienvenida al viaje',
      description: 'Reflexiona sobre los momentos clave que te han formado. Escribe sobre las experiencias que han moldeado quien eres hoy.',
      type: 'main',
      activityType: 'Información',
      status: 'completed',
      duration: '20 min',
      imageEmoji: '📖',
      x: 100,
      y: 350,
    },
    {
      id: 'sk2',
      title: 'Cómo llego a este momento?',
      description: 'Identifica tus fortalezas principales con este cuestionario interactivo. Descubre qué te hace único.',
      type: 'main',
      activityType: 'Cuestionario',
      status: 'completed',
      duration: '15 min',
      imageEmoji: '💪',
      x: 280,
      y: 400,
    },
    {
      id: 'sk3',
      title: 'Mi punto de partida',
      description: 'Prioriza lo que más importa para ti en la vida. Un ejercicio visual e interactivo para entender tus prioridades.',
      type: 'main',
      activityType: 'Ejercicio interactivo',
      status: 'in_progress',
      duration: '25 min',
      imageEmoji: '🧭',
      x: 420,
      y: 280,
    },
    {
      id: 'sk4',
      title: 'Cómo me veo hoy',
      description: 'Escribe una carta con tus sueños y expectativas para tu yo del futuro. Un momento de introspección profunda.',
      type: 'main',
      activityType: 'Escritura creativa',
      status: 'locked',
      lockedReason: 'Completa "Mapa de valores" primero',
      duration: '30 min',
      imageEmoji: '✉️',
      x: 520,
      y: 400,
    },
    {
      id: 'sk5',
      title: 'Mis expectativas para este viaje',
      description: 'Escribe una carta con tus sueños y expectativas para tu yo del futuro. Un momento de introspección profunda.',
      type: 'main',
      activityType: 'Escritura creativa',
      status: 'locked',
      lockedReason: 'Completa "Mapa de valores" primero',
      duration: '30 min',
      imageEmoji: '✉️',
      x: 650,
      y: 300,
    },
    {
      id: 'sk6',
      title: 'Mi primera entrada del diario',
      description: 'Escribe una carta con tus sueños y expectativas para tu yo del futuro. Un momento de introspección profunda.',
      type: 'main',
      activityType: 'Escritura creativa',
      status: 'locked',
      lockedReason: 'Completa "Mapa de valores" primero',
      duration: '30 min',
      imageEmoji: '✉️',
      x: 800,
      y: 350,
    },
    {
      id: 'exp1',
      title: 'Conoce a Pepe',
      description: 'Registra tus emociones durante una semana para entender mejor tus patrones emocionales.',
      type: 'exploration',
      activityType: 'Actividad libre',
      status: 'available',
      duration: '10 min/día',
      imageEmoji: '📝',
      x: 180,
      y: 180,
    },
    {
      id: 'exp2',
      title: 'Por qué es importante este proceso?',
      description: 'Crea un collage digital que represente quién eres y quién quieres ser.',
      type: 'exploration',
      activityType: 'Creatividad',
      status: 'available',
      duration: '35 min',
      imageEmoji: '🎨',
      x: 400,
      y: 520,
    },
    {
      id: 'exp3',
      title: 'Decidir a ciegas',
      description: 'Crea un collage digital que represente quién eres y quién quieres ser.',
      type: 'exploration',
      activityType: 'Creatividad',
      status: 'available',
      duration: '35 min',
      imageEmoji: '🎨',
      x: 500,
      y: 150,
    },
    {
      id: 'exp4',
      title: 'Cómo utilizar el diario vocacional',
      description: 'Crea un collage digital que represente quién eres y quién quieres ser.',
      type: 'exploration',
      activityType: 'Creatividad',
      status: 'available',
      duration: '35 min',
      imageEmoji: '🎨',
      x: 700,
      y: 520,
    },
  ],
};
