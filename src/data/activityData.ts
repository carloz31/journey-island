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
  /** Visual ambient for this step. Activity background reacts to it. */
  ambient?: 'dark' | 'light';
  /** If set, look up the answer of step at index `branchOn.fromStep` and use
   *  the matching text from `branchOn.byOption`. Falls back to `text`. */
  branchOn?: {
    fromStep: number;
    byOption: Record<string, string>;
  };
}

export interface ContentStep {
  type: 'content';
  title?: string;
  body: string;
  imageUrl?: string;
  /** Content mode: 'text' (default), 'image', or 'video' */
  contentMode?: 'text' | 'image' | 'video';
  /** YouTube or video URL (used when contentMode is 'video') */
  videoUrl?: string;
  withDialogue?: boolean;
  dialogue?: { character: string; avatar: string; text: string };
}

export interface OpenQuestionStep {
  type: 'open_question';
  question: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  /** Optional list of suggestion prompts shown under the textarea. */
  subQuestions?: string[];
  /** Optional small note shown below the sub-questions. */
  note?: string;
  /** Hide character counter even if maxLength is set. */
  hideCounter?: boolean;
  /** Visual ambient for this step. */
  ambient?: 'dark' | 'light';
  /** Custom label for the next/save button. */
  submitLabel?: string;
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
    title: 'Bienvenida al viaje',
    pointsReward: 10,
    steps: [
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'dark',
        text: 'Hola, {nombre}. Soy Pepe.',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'dark',
        text: 'Antes de empezar cualquier cosa, quiero que sepas algo: este programa no está diseñado para decirte qué estudiar. Eso lo vas a decidir tú. Lo que sí vamos a hacer juntos es que esa decisión sea tuya de verdad — no la de tus papás, no la de tus amigos, no la de nadie más.',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'dark',
        text: "Salir del colegio es una de esas cosas que parece que está lejos hasta que de repente está encima. Y en algún momento alguien te va a preguntar — si es que no lo ha hecho ya — '¿y tú qué vas a hacer cuando termines?'",
      },
      {
        type: 'multiple_choice',
        question: '¿Qué sientes cuando te hacen esa pregunta?',
        mode: 'free',
        layout: 'list',
        options: [
          { id: 'emocion', label: 'Me emociona, tengo ganas de lo que viene' },
          { id: 'presion', label: 'Me genera presión o ansiedad' },
          { id: 'mixto', label: 'Me da un poco de todo — ilusión y miedo a la vez' },
          { id: 'no_pensado', label: 'La verdad, todavía no me he puesto a pensarlo' },
        ],
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'dark',
        text: 'Gracias por contarme.',
        branchOn: {
          fromStep: 3,
          byOption: {
            emocion:
              'Me alegra escuchar eso. Que llegues con ganas es un buen punto de partida. En este viaje vamos a asegurarnos de que esas ganas estén bien fundamentadas.',
            presion:
              'Tiene sentido. Es una pregunta que carga demasiado para hacerse así, de golpe. La buena noticia es que en este viaje vamos a desmontarla poco a poco.',
            mixto:
              'Eso es más honesto de lo que parece. Ilusión y miedo juntos casi siempre significan que algo importante está pasando.',
            no_pensado:
              'Perfecto punto de partida. Mejor empezar sabiendo que no se sabe, que creyendo que ya se tiene todo claro.',
          },
        },
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'dark',
        text: 'Este programa dura varias semanas. No te voy a pedir que decidas nada hoy.',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'dark',
        text: 'Lo que sí te voy a pedir ahora mismo es una sola cosa.',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'dark',
        text: 'Quiero que le escribas una carta a la versión de ti que va a leer esto al final del programa — dentro de unas semanas, cuando el viaje haya terminado.',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'dark',
        text: 'Esa versión futura tuya va a haber pensado un montón de cosas sobre su futuro. Pero todavía no sabe nada de eso. Tú, en cambio, estás justo aquí — al inicio, con todo lo que sientes hoy. Eso tiene valor.',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'dark',
        text: 'Esta carta no la voy a leer yo. No la va a leer tu psicóloga ni tus papás. La vas a leer tú, y solo tú, cuando lleguemos al final.',
      },
      {
        type: 'open_question',
        question: 'Carta para mí — {today}',
        placeholder: 'Empieza a escribir aquí... esta carta es solo para ti.',
        required: true,
        ambient: 'light',
        hideCounter: true,
        submitLabel: 'Guardar carta',
        subQuestions: [
          '¿Cómo te sientes hoy frente al hecho de que el colegio está terminando?',
          '¿Sientes que estás preparado para tomar una decisión sobre tu futuro? ¿Por qué sí o por qué no?',
          '¿Qué te gustaría que la versión de ti del futuro recordara sobre cómo te sientes hoy?',
        ],
        note: 'No tienes que responder las tres. Son solo puntos de partida por si no sabes por dónde empezar. La carta es tuya — escribe lo que quieras.',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'light',
        text: 'Guardada. Nadie más la va a ver.',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'light',
        text: 'Lo que acabas de escribir me dice algo sobre desde dónde partes. Y cuando lleguemos al final del viaje, tú mismo vas a poder ver cuánto cambió — o cuánto no.',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'light',
        text: 'La siguiente parte del viaje es tomar algo que llamamos la Foto del Punto de Partida. Es un diagnóstico — nada de exámenes, ninguna respuesta correcta. Solo una imagen de cómo llegas hoy.',
      },
      {
        type: 'rpg',
        character: 'Pepe',
        avatar: '🐒',
        ambient: 'light',
        text: 'Cuando quieras, nos vemos ahí.',
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
      // 2 — Content: reading (text) with dialogue
      {
        type: 'content',
        contentMode: 'text',
        title: 'Los tipos de inteligencia',
        body: 'Howard Gardner propuso que existen múltiples tipos de inteligencia: lingüística, lógico-matemática, musical, espacial, corporal, interpersonal, intrapersonal y naturalista. Cada persona tiene un perfil único.',
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Lee con atención esta información, es clave para entenderte mejor. 📚',
        },
      },
      // 2b — Content: video
      {
        type: 'content',
        contentMode: 'video',
        title: 'Mira este video sobre orientación vocacional',
        body: 'Este video te ayudará a comprender mejor cómo descubrir tu vocación. Míralo completo antes de continuar.',
        videoUrl: 'https://www.youtube.com/watch?v=IfYkcuiq3X8',
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Pon atención al video, luego continuaremos. 🎬',
        },
      },
      // 2c — Content: image
      {
        type: 'content',
        contentMode: 'image',
        title: 'Observa esta imagen',
        body: 'Analiza la imagen con cuidado. ¿Qué emociones o ideas te provoca?',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Tómate un momento para observar con calma. 🖼️',
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
      // 8 — Drag & drop ORDER mode with dialogue
      {
        type: 'drag_drop',
        mode: 'order',
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
      // 9 — Drag & drop MATCH mode with dialogue
      {
        type: 'drag_drop',
        mode: 'match',
        instruction: 'Asocia cada profesión con su descripción:',
        items: [],
        pairs: [
          { id: 'p1', concept: 'Se encarga de capturar delincuentes', match: 'Policía' },
          { id: 'p2', concept: 'Diseña edificios y estructuras', match: 'Arquitecto' },
          { id: 'p3', concept: 'Cura enfermedades y cuida la salud', match: 'Doctor' },
          { id: 'p4', concept: 'Enseña y educa a los estudiantes', match: 'Profesor' },
        ],
        requireAllCorrect: true,
        withDialogue: true,
        dialogue: {
          character: 'Pepe',
          avatar: '🐒',
          text: 'Arrastra cada profesión al concepto que le corresponde. ¡Todas deben ser correctas! 🎯',
        },
      },
      // 10 — RPG closing
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
