export type StepType =
  | 'rpg'
  | 'content'
  | 'open_question'
  | 'multiple_choice'
  | 'likert'
  | 'file_upload'
  | 'drag_drop';

/* ── Step interfaces ── */

export interface RpgStep {
  type: 'rpg';
  character: string;
  avatar: string;
  text: string;
}

export interface ContentStep {
  type: 'content';
  title?: string;
  body: string;            // rich text / markdown-ish
  imageUrl?: string;
  withDialogue?: boolean;
  dialogue?: { character: string; avatar: string; text: string };
}

export interface OpenQuestionStep {
  type: 'open_question';
  question: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  withDialogue?: boolean;
  dialogue?: { character: string; avatar: string; text: string };
}

export interface MultipleChoiceOption {
  id: string;
  label: string;
  isCorrect?: boolean;     // used only in 'validation' / 'quiz' modes
}

export interface MultipleChoiceStep {
  type: 'multiple_choice';
  question: string;
  options: MultipleChoiceOption[];
  mode: 'free' | 'validation' | 'quiz';
  layout?: 'list' | 'cards';
  withDialogue?: boolean;
  dialogue?: { character: string; avatar: string; text: string };
}

export interface LikertStep {
  type: 'likert';
  question: string;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  withDialogue?: boolean;
  dialogue?: { character: string; avatar: string; text: string };
}

export interface FileUploadStep {
  type: 'file_upload';
  prompt: string;
  accept?: string;         // e.g. ".pdf,.png,.jpg"
  withDialogue?: boolean;
  dialogue?: { character: string; avatar: string; text: string };
}

export interface DragDropItem {
  id: string;
  label: string;
}

export interface DragDropStep {
  type: 'drag_drop';
  instruction: string;
  items: DragDropItem[];
  correctOrder?: string[]; // optional correct order by id
  withDialogue?: boolean;
  dialogue?: { character: string; avatar: string; text: string };
}

/* ── Union ── */
export type ActivityStep =
  | RpgStep
  | ContentStep
  | OpenQuestionStep
  | MultipleChoiceStep
  | LikertStep
  | FileUploadStep
  | DragDropStep;

/* ── Activity ── */
export interface Activity {
  id: string;
  nodeId: string;
  title: string;
  backgroundUrl?: string;
  pointsReward: number;
  steps: ActivityStep[];
}

/* ── Demo data ── */
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
        type: 'content',
        title: '¿Qué es la orientación vocacional?',
        body: 'Es un proceso que te ayuda a descubrir tus intereses, habilidades y valores para tomar decisiones informadas sobre tu futuro académico y profesional.',
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Mira esta información importante antes de continuar. 📖',
        },
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
        text: 'Antes de avanzar, necesitamos saber dónde estás parado. ¡Vamos a explorar juntos!',
      },
      {
        type: 'multiple_choice',
        question: '¿Qué tan claro tienes lo que te gustaría hacer en el futuro?',
        mode: 'free',
        layout: 'cards',
        options: [
          { id: 'a', label: 'Muy claro 🎯' },
          { id: 'b', label: 'Tengo algunas ideas 💡' },
          { id: 'c', label: 'No estoy seguro 🤔' },
          { id: 'd', label: 'No tengo idea 🌀' },
        ],
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: '¿Qué tan claro tienes hoy lo que te gustaría hacer en el futuro? 🧭',
        },
      },
      {
        type: 'open_question',
        question: '¿Qué es lo que más disfrutas hacer en tu tiempo libre?',
        placeholder: 'Escribe aquí tu respuesta...',
        maxLength: 500,
        required: true,
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Cuéntame un poco sobre ti. No hay respuestas incorrectas. ✍️',
        },
      },
      {
        type: 'likert',
        question: '¿Qué tanto te gusta trabajar en equipo?',
        min: 1,
        max: 5,
        minLabel: 'Nada',
        maxLabel: 'Mucho',
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Responde con honestidad, esto nos ayudará a conocerte mejor. 🌟',
        },
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        text: '¡Genial! Ahora ya tengo una mejor idea de cómo acompañarte. ¡Sigamos adelante! 🚀',
      },
    ],
  },
};

/** Helper to find activity by node id */
export const getActivityByNodeId = (nodeId: string): Activity | undefined =>
  Object.values(activitiesMap).find(a => a.nodeId === nodeId);
