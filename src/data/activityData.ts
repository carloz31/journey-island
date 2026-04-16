export type StepType = 'rpg'; // extend later: 'content' | 'reflection' | 'quiz' …

export interface RpgStep {
  type: 'rpg';
  character: string;
  avatar: string;
  text: string;
}

// Union — add new step interfaces here
export type ActivityStep = RpgStep;

export interface Activity {
  id: string;
  nodeId: string;           // links back to IslandNode.id
  title: string;
  backgroundUrl?: string;   // optional custom bg image
  pointsReward: number;
  steps: ActivityStep[];
}

/** Demo activity for the first main node */
export const activitiesMap: Record<string, Activity> = {
  'act-sk1': {
    id: 'act-sk1',
    nodeId: 'sk1',
    title: 'Bienvenido al viaje',
    pointsReward: 10,
    steps: [
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        text: '¡Hola, aventurero! Soy Pepe y seré tu compañero durante todo este viaje vocacional. 🌟',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        text: 'Estás a punto de emprender un recorrido que te ayudará a conocerte mejor y a descubrir caminos que quizás nunca habías imaginado.',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        text: 'A lo largo de estas islas encontrarás actividades, reflexiones y retos. Cada paso cuenta, ¡así que no te preocupes si algo parece difícil!',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        text: 'Recuerda: no hay respuestas incorrectas. Este camino es tuyo y lo que descubras aquí será valioso para tu futuro. ¡Vamos! 🚀',
      },
    ],
  },
  'act-sk3': {
    id: 'act-sk3',
    nodeId: 'sk3',
    title: 'Mi punto de partida',
    pointsReward: 15,
    steps: [
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        text: 'Antes de avanzar, necesitamos saber dónde estás parado. ¿Qué tan claro tienes hoy lo que te gustaría hacer en el futuro?',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        text: 'No te preocupes si todavía no lo tienes claro. Precisamente para eso estamos aquí, para ir descubriéndolo juntos. 🧭',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        text: '¡Genial! Ahora ya tengo una mejor idea de cómo acompañarte. ¡Sigamos adelante!',
      },
    ],
  },
};

/** Helper to find activity by node id */
export const getActivityByNodeId = (nodeId: string): Activity | undefined =>
  Object.values(activitiesMap).find(a => a.nodeId === nodeId);
