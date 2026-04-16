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
  body: string;
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
  isCorrect?: boolean;
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
  accept?: string;
  withDialogue?: boolean;
  dialogue?: { character: string; avatar: string; text: string };
}

export interface DragDropItem {
  id: string;
  label: string;
}

export interface MatchPair {
  id: string;
  concept: string;
  match: string;
}

export interface DragDropStep {
  type: 'drag_drop';
  mode?: 'order' | 'match';
  instruction: string;
  items: DragDropItem[];
  correctOrder?: string[];
  /** For mode: 'match' */
  pairs?: MatchPair[];
  requireAllCorrect?: boolean;
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

  /* Activity with one sample of every step type */
  'act-sk3': {
    id: 'act-sk3',
    nodeId: 'sk3',
    title: 'Explora todos los tipos de paso',
    pointsReward: 25,
    steps: [
      // 1 — RPG intro
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        text: '¡Vamos a probar todos los tipos de actividades que tenemos! Prepárate. 🎮',
      },
      // 2 — Content with dialogue
      {
        type: 'content',
        title: 'Los tipos de inteligencia',
        body: 'Howard Gardner propuso que existen múltiples tipos de inteligencia: lingüística, lógico-matemática, musical, espacial, corporal, interpersonal, intrapersonal y naturalista. Cada persona tiene un perfil único.',
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Lee con atención esta información, es clave para entenderte mejor. 📚',
        },
      },
      // 3 — Multiple choice (free) with dialogue
      {
        type: 'multiple_choice',
        question: '¿Cuál de estas inteligencias sientes más fuerte en ti?',
        mode: 'free',
        layout: 'cards',
        options: [
          { id: 'a', label: 'Lingüística 📝' },
          { id: 'b', label: 'Lógico-matemática 🔢' },
          { id: 'c', label: 'Musical 🎵' },
          { id: 'd', label: 'Interpersonal 🤝' },
        ],
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'No hay respuesta correcta, elige la que más te represente. 🧭',
        },
      },
      // 4 — Open question with dialogue
      {
        type: 'open_question',
        question: '¿Por qué elegiste esa inteligencia? Describe un momento donde la hayas usado.',
        placeholder: 'Escribe aquí tu reflexión...',
        maxLength: 500,
        required: true,
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Tómate tu tiempo para reflexionar. ✍️',
        },
      },
      // 5 — Likert with dialogue
      {
        type: 'likert',
        question: '¿Qué tanto disfrutas aprender cosas nuevas?',
        min: 1,
        max: 5,
        minLabel: 'Nada',
        maxLabel: 'Muchísimo',
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Sé honesto, no hay respuestas buenas ni malas. 🌟',
        },
      },
      // 6 — Multiple choice (validation) — no dialogue
      {
        type: 'multiple_choice',
        question: '¿Quién propuso la teoría de las inteligencias múltiples?',
        mode: 'validation',
        layout: 'list',
        options: [
          { id: 'a', label: 'Sigmund Freud' },
          { id: 'b', label: 'Howard Gardner', isCorrect: true },
          { id: 'c', label: 'Albert Einstein' },
          { id: 'd', label: 'Jean Piaget' },
        ],
      },
      // 7 — File upload with dialogue
      {
        type: 'file_upload',
        prompt: 'Sube una imagen o documento que represente algo que te apasione.',
        accept: '.png,.jpg,.jpeg,.pdf',
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Puede ser una foto, un dibujo, o cualquier cosa que te inspire. 📎',
        },
      },
      // 8 — Drag & drop with dialogue
      {
        type: 'drag_drop',
        instruction: 'Ordena estos valores de más a menos importante para ti:',
        items: [
          { id: 'v1', label: 'Creatividad 🎨' },
          { id: 'v2', label: 'Estabilidad 🏠' },
          { id: 'v3', label: 'Aventura 🌍' },
          { id: 'v4', label: 'Ayudar a otros 💛' },
        ],
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Arrastra los elementos para ordenarlos según tu preferencia. ↕️',
        },
      },
      // 9 — RPG closing
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        text: '¡Excelente trabajo! Has completado todos los tipos de actividad. ¡Eres increíble! 🏆',
      },
    ],
  },
};

/** Helper to find activity by node id */
export const getActivityByNodeId = (nodeId: string): Activity | undefined =>
  Object.values(activitiesMap).find(a => a.nodeId === nodeId);
