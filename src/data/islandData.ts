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
  /** Position on the circular island (angle in degrees from top, radius 0-1) */
  angle: number;
  radius: number;
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
  mainPath: ['sk1', 'sk2', 'sk3', 'sk4'],
  nodes: [
    {
      id: 'sk1',
      title: 'Mi historia personal',
      description: 'Reflexiona sobre los momentos clave que te han formado. Escribe sobre las experiencias que han moldeado quien eres hoy.',
      type: 'main',
      activityType: 'Reflexión',
      status: 'completed',
      duration: '20 min',
      imageEmoji: '📖',
      angle: 220,
      radius: 0.55,
    },
    {
      id: 'sk2',
      title: 'Test de fortalezas',
      description: 'Identifica tus fortalezas principales con este cuestionario interactivo. Descubre qué te hace único.',
      type: 'main',
      activityType: 'Cuestionario',
      status: 'completed',
      duration: '15 min',
      imageEmoji: '💪',
      angle: 290,
      radius: 0.55,
    },
    {
      id: 'sk3',
      title: 'Mapa de valores',
      description: 'Prioriza lo que más importa para ti en la vida. Un ejercicio visual e interactivo para entender tus prioridades.',
      type: 'main',
      activityType: 'Ejercicio interactivo',
      status: 'in_progress',
      duration: '25 min',
      imageEmoji: '🧭',
      angle: 0,
      radius: 0.55,
    },
    {
      id: 'sk4',
      title: 'Carta a mi yo futuro',
      description: 'Escribe una carta con tus sueños y expectativas para tu yo del futuro. Un momento de introspección profunda.',
      type: 'main',
      activityType: 'Escritura creativa',
      status: 'locked',
      lockedReason: 'Completa "Mapa de valores" primero',
      duration: '30 min',
      imageEmoji: '✉️',
      angle: 70,
      radius: 0.55,
    },
    {
      id: 'exp1',
      title: 'Diario de emociones',
      description: 'Registra tus emociones durante una semana para entender mejor tus patrones emocionales.',
      type: 'exploration',
      activityType: 'Actividad libre',
      status: 'available',
      duration: '10 min/día',
      imageEmoji: '📝',
      angle: 150,
      radius: 0.82,
    },
    {
      id: 'exp2',
      title: 'Mi collage personal',
      description: 'Crea un collage digital que represente quién eres y quién quieres ser.',
      type: 'exploration',
      activityType: 'Creatividad',
      status: 'available',
      duration: '35 min',
      imageEmoji: '🎨',
      angle: 330,
      radius: 0.85,
    },
  ],
};
