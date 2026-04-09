export type RegionStatus = 'locked' | 'available' | 'in_progress' | 'restored';
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
  position: { x: number; y: number }; // percentage-based
  color: string; // tailwind color token
  activities: Activity[];
}

export interface StudentData {
  name: string;
  avatarUrl: string;
  counselorProgress: number;
  platformProgress: number;
  nextGoal: string;
  nextGoalMissing: string;
}

export const studentData: StudentData = {
  name: 'Sofía Martínez',
  avatarUrl: '',
  counselorProgress: 42,
  platformProgress: 28,
  nextGoal: 'Desbloquear Zona de Exploración',
  nextGoalMissing: 'Completa 2 actividades más en Autoconocimiento',
};

export const regions: Region[] = [
  {
    id: 'self-knowledge',
    name: 'Autoconocimiento',
    subtitle: 'Descubre quién eres',
    status: 'restored',
    position: { x: 35, y: 55 },
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
    status: 'in_progress',
    position: { x: 55, y: 35 },
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
    position: { x: 22, y: 30 },
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
    position: { x: 70, y: 55 },
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
    position: { x: 15, y: 65 },
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
    position: { x: 75, y: 28 },
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
    position: { x: 50, y: 70 },
    color: 'glow-gold',
    activities: [
      { id: 'f1', title: 'Portafolio vocacional', description: 'Reúne todo tu recorrido en un portafolio final.', type: 'Portafolio', status: 'locked', lockedReason: 'Completa todas las zonas anteriores' },
    ],
  },
];

export const availableActivities = [
  { id: 'sk4', title: 'Carta a mi yo futuro', region: 'Autoconocimiento', type: 'Escritura creativa' },
  { id: 'ex1', title: 'Feria de carreras virtual', region: 'Exploración', type: 'Exploración' },
  { id: 'h1', title: 'Taller de comunicación', region: 'Habilidades', type: 'Taller' },
  { id: 'p1', title: 'Conversación guiada', region: 'Familia', type: 'Guía' },
];
