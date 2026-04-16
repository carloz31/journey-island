export type RegionStatus = 'locked' | 'available' | 'restored';
export type ActivityStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: string;
  status: ActivityStatus;
  lockedReason?: string;
}

export interface Region {
  id: string;
  name: string;
  subtitle: string;
  status: RegionStatus;
  isParentBlock?: boolean;
  position: { x: number; y: number };
  color: string;
  activities: Activity[];
}

export interface StudentData {
  name: string;
  avatarUrl: string;
  counselorProgress: number;
  platformProgress: number;
  nextGoal: string;
  nextGoalMissing: string;
  totalBadges: number;
  totalPoints: number;
}

export interface Message {
  id: string;
  sender: string;
  senderType: 'counselor' | 'system';
  title: string;
  preview: string;
  body: string[];
  timestamp: string;
  unread: boolean;
  attachments?: MessageAttachment[];
  materialLinks?: MessageMaterialLink[];
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: string;
  size: string;
}

export interface MessageMaterialLink {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface Classmate {
  id: string;
  name: string;
  progress: number;
  badges: number;
  avatar: string;
}

export interface BadgeData {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
}

export interface TutorialStep {
  text: string;
}

export const studentData: StudentData = {
  name: 'Sofía Martínez',
  avatarUrl: '',
  counselorProgress: 25,
  platformProgress: 38,
  nextGoal: 'Desbloquear Zona de Exploración',
  nextGoalMissing: 'Completa 2 actividades más en Autoconocimiento',
  totalBadges: 5,
  totalPoints: 1240,
};

export const messagesData: Message[] = [
  {
    id: 'm1',
    sender: 'Prof. García',
    senderType: 'counselor',
    title: '¡Gran avance!',
    preview: 'He visto tu progreso en Autoconocimiento. Sigue así...',
    body: [
      'He visto tu progreso en Autoconocimiento y me alegra mucho la constancia que estás mostrando.',
      'Tu reflexión sobre fortalezas tiene ideas muy valiosas. Te recomiendo volver a leerla antes de avanzar a la siguiente actividad.',
    ],
    timestamp: 'Hace 2h',
    unread: true,
    materialLinks: [
      {
        id: 'ml1',
        title: 'Guía breve de fortalezas personales',
        description: 'Material para reconocer patrones en tus respuestas.',
        href: '/materials/fortalezas-personales',
      },
    ],
  },
  {
    id: 'm2',
    sender: 'Sistema',
    senderType: 'system',
    title: 'Nueva actividad disponible',
    preview: 'Se ha desbloqueado "Feria de carreras virtual" en Exploración.',
    body: [
      'Se ha desbloqueado "Feria de carreras virtual" en la zona de Exploración.',
      'Puedes revisar stands, comparar rutas formativas y guardar las opciones que más te llamen la atención.',
    ],
    timestamp: 'Hace 1d',
    unread: true,
    attachments: [
      { id: 'a1', name: 'Mapa de feria virtual.pdf', type: 'PDF', size: '1.8 MB' },
    ],
  },
  {
    id: 'm3',
    sender: 'Prof. García',
    senderType: 'counselor',
    title: 'Reunión programada',
    preview: 'Nos vemos el jueves para revisar tu plan vocacional...',
    body: [
      'Nos vemos el jueves para revisar tu plan vocacional y conversar sobre las actividades que más disfrutaste.',
      'Trae dos preguntas sobre carreras o áreas profesionales que quieras explorar con más calma.',
    ],
    timestamp: 'Hace 3d',
    unread: false,
    attachments: [
      { id: 'a2', name: 'Agenda de reunión.docx', type: 'DOCX', size: '240 KB' },
    ],
  },
  {
    id: 'm4',
    sender: 'Sistema',
    senderType: 'system',
    title: 'Insignia obtenida',
    preview: 'Has ganado la insignia "Explorador Inicial" por completar tu primera zona.',
    body: [
      'Has ganado la insignia "Explorador Inicial" por completar tu primera zona.',
      'Tu avance ya se refleja en el mapa de aventura. Sigue completando actividades para desbloquear nuevas zonas.',
    ],
    timestamp: 'Hace 5d',
    unread: false,
  },
  {
    id: 'm5',
    sender: 'Prof. García',
    senderType: 'counselor',
    title: 'Recurso recomendado',
    preview: 'Te comparto un video sobre carreras STEM que puede interesarte...',
    body: [
      'Te comparto un video sobre carreras STEM que puede interesarte por las preferencias que marcaste.',
      'Míralo con calma y anota tres ideas que te hayan sorprendido. Las podemos conversar en la próxima sesión.',
    ],
    timestamp: 'Hace 1sem',
    unread: false,
    materialLinks: [
      {
        id: 'ml2',
        title: 'Video: un día en carreras STEM',
        description: 'Historias cortas de profesionales en ciencia, tecnología e ingeniería.',
        href: '/materials/stem-video',
      },
      {
        id: 'ml3',
        title: 'Ficha de exploración de carreras',
        description: 'Plantilla para registrar intereses, dudas y próximos pasos.',
        href: '/materials/ficha-exploracion',
      },
    ],
  },
];

export const classmatesData: Classmate[] = [
  { id: 'c1', name: 'Carlos López', progress: 52, badges: 7, avatar: 'CL' },
  { id: 'c2', name: 'María Fernández', progress: 45, badges: 6, avatar: 'MF' },
  { id: 'c3', name: 'Sofía Martínez', progress: 38, badges: 5, avatar: 'SM' },
  { id: 'c4', name: 'Andrés Ruiz', progress: 33, badges: 4, avatar: 'AR' },
  { id: 'c5', name: 'Valentina Torres', progress: 28, badges: 3, avatar: 'VT' },
  { id: 'c6', name: 'Diego Morales', progress: 20, badges: 2, avatar: 'DM' },
];

export const badgesData: BadgeData[] = [
  { id: 'b1', name: 'Explorador Inicial', icon: '🧭', earned: true },
  { id: 'b2', name: 'Reflexivo', icon: '💭', earned: true },
  { id: 'b3', name: 'Fortalezas', icon: '💪', earned: true },
  { id: 'b4', name: 'Primer Paso', icon: '👣', earned: true },
  { id: 'b5', name: 'Comunicador', icon: '🗣️', earned: true },
  { id: 'b6', name: 'Decisor', icon: '⚖️', earned: false },
  { id: 'b7', name: 'Visionario', icon: '🔭', earned: false },
  { id: 'b8', name: 'Líder Familiar', icon: '🏠', earned: false },
];

export const tutorialSteps: TutorialStep[] = [
  { text: '¡Hola! Soy Pepe, tu guía en esta aventura vocacional. Estoy aquí para ayudarte a explorar tu isla y descubrir tu camino.' },
  { text: 'Este mapa representa tu viaje vocacional. Cada zona es una parte del camino hacia tu futuro profesional.' },
  { text: 'Las zonas iluminadas y brillantes son las que ya has explorado o están disponibles. Las zonas oscuras aún esperan ser desbloqueadas.' },
  { text: 'Haz clic en cualquier zona activa para ver sus actividades. Completa actividades para restaurar la vida y el color de cada región.' },
  { text: 'A medida que avances, nuevas zonas se desbloquearán y la isla cobrará vida. ¡Tu progreso transforma el mundo!' },
  { text: '¡Buena suerte, aventurero! Recuerda: cada paso cuenta. Nos vemos en el camino.' },
];

export const regions: Region[] = [
  {
    id: 'self-knowledge',
    name: 'Autoconocimiento',
    subtitle: 'Descubre quién eres',
    status: 'restored',
    position: { x: 38, y: 37 },
    color: 'glow-gold',
    activities: [
      { id: 'sk1', title: 'Mi historia personal', description: 'Reflexiona sobre los momentos clave que te han formado.', type: 'Reflexión', status: 'completed' },
      { id: 'sk2', title: 'Test de fortalezas', description: 'Identifica tus fortalezas principales con este cuestionario.', type: 'Cuestionario', status: 'completed' },
      { id: 'sk3', title: 'Mapa de valores', description: 'Prioriza lo que más importa para ti en la vida.', type: 'Ejercicio interactivo', status: 'in_progress' },
      { id: 'sk4', title: 'Carta a mi yo futuro', description: 'Escribe una carta con tus sueños y expectativas.', type: 'Escritura creativa', status: 'available' },
    ],
  },
  {
    id: 'exploration',
    name: 'Exploración',
    subtitle: 'Conoce el mundo profesional',
    status: 'available',
    position: { x: 55, y: 25 },
    color: 'glow-teal',
    activities: [
      { id: 'ex1', title: 'Feria de carreras virtual', description: 'Visita stands virtuales de diferentes universidades.', type: 'Exploración', status: 'available' },
      { id: 'ex2', title: 'Entrevista a un profesional', description: 'Prepara y realiza una entrevista informativa.', type: 'Proyecto', status: 'available' },
      { id: 'ex3', title: 'Un día en la vida de...', description: 'Sigue la jornada de diferentes profesionales.', type: 'Video interactivo', status: 'locked', lockedReason: 'Completa la feria de carreras primero' },
    ],
  },
  {
    id: 'skills',
    name: 'Habilidades',
    subtitle: 'Desarrolla tu potencial',
    status: 'available',
    position: { x: 20, y: 25 },
    color: 'glow-teal',
    activities: [
      { id: 'h1', title: 'Taller de comunicación', description: 'Aprende técnicas para presentar tus ideas con claridad.', type: 'Taller', status: 'available' },
      { id: 'h2', title: 'Pensamiento crítico', description: 'Ejercicios para analizar información de forma objetiva.', type: 'Ejercicio', status: 'locked', lockedReason: 'Disponible próximamente' },
    ],
  },
  {
    id: 'decision',
    name: 'Decisión',
    subtitle: 'Elige tu camino',
    status: 'locked',
    position: { x: 74, y: 41 },
    color: 'glow-coral',
    activities: [
      { id: 'd1', title: 'Matriz de decisión', description: 'Compara opciones usando criterios personalizados.', type: 'Herramienta', status: 'locked', lockedReason: 'Completa Exploración y Habilidades' },
      { id: 'd2', title: 'Plan de acción', description: 'Crea un plan concreto para tu siguiente paso.', type: 'Planificación', status: 'locked', lockedReason: 'Completa Exploración y Habilidades' },
    ],
  },
  {
    id: 'parents',
    name: 'Familia',
    subtitle: 'Comparte con quienes te apoyan',
    status: 'available',
    isParentBlock: true,
    position: { x: 15, y: 45 },
    color: 'glow-coral',
    activities: [
      { id: 'p1', title: 'Conversación guiada', description: 'Una guía para hablar con tu familia sobre tu futuro.', type: 'Guía', status: 'available' },
      { id: 'p2', title: 'Cuestionario familiar', description: 'Invita a tu familia a compartir su perspectiva.', type: 'Cuestionario', status: 'locked', lockedReason: 'Completa la conversación guiada' },
    ],
  },
  {
    id: 'projects',
    name: 'Proyectos',
    subtitle: 'Pon en práctica lo aprendido',
    status: 'locked',
    position: { x: 82, y: 25 },
    color: 'glow-gold',
    activities: [
      { id: 'pr1', title: 'Proyecto integrador', description: 'Un proyecto que conecta todo lo que has aprendido.', type: 'Proyecto', status: 'locked', lockedReason: 'Desbloquea Decisión primero' },
    ],
  },
  {
    id: 'future',
    name: 'Mi Futuro',
    subtitle: 'Tu visión toma forma',
    status: 'locked',
    position: { x: 53, y: 47 },
    color: 'glow-gold',
    activities: [
      { id: 'f1', title: 'Portafolio vocacional', description: 'Reúne todo tu recorrido en un portafolio final.', type: 'Portafolio', status: 'locked', lockedReason: 'Completa todas las zonas anteriores' },
    ],
  },
];

export const availableActivities = [
  { id: 'sk4', title: 'Carta a mi yo futuro', regionId: 'self-knowledge', region: 'Autoconocimiento', type: 'Escritura creativa' },
  { id: 'ex1', title: 'Feria de carreras virtual', regionId: 'exploration', region: 'Exploración', type: 'Exploración' },
  { id: 'h1', title: 'Taller de comunicación', regionId: 'skills', region: 'Habilidades', type: 'Taller' },
  { id: 'p1', title: 'Conversación guiada', regionId: 'parents', region: 'Familia', type: 'Guía' },
];
