// Mock vocational profile data for the student

export interface SocialSkill {
  name: string;
  score: number; // 0-100
  category: 'strength' | 'developing';
}

export interface LearningDimension {
  labelA: string;
  labelB: string;
  value: number; // -100 to 100, negative = A, positive = B
}

export interface Intelligence {
  name: string;
  icon: string;
  score: number; // 0-100
  description: string;
}

export interface PersonalityTrait {
  name: string;
  score: number; // 0-100
  description: string;
}

export interface VocationalAffinity {
  name: string;
  icon: string;
  match: number; // 0-100
  description: string;
}

export interface Recommendation {
  type: 'skill' | 'strategy' | 'explore';
  title: string;
  description: string;
  icon: string;
}

export interface VocationalProfile {
  completionPct: number;
  activitiesCompleted: number;
  activitiesTotal: number;
  summary: string;
  socialSkills: SocialSkill[];
  socialGrowthPlan: string[];
  learningDimensions: LearningDimension[];
  learningTips: string[];
  intelligences: Intelligence[];
  personalityTraits: PersonalityTrait[];
  comfortEnvironments: string[];
  stretchEnvironments: string[];
  affinities: VocationalAffinity[];
  recommendations: Recommendation[];
}

export const vocationalProfile: VocationalProfile = {
  completionPct: 65,
  activitiesCompleted: 3,
  activitiesTotal: 4,
  summary:
    'Sofía muestra una combinación de habilidades interpersonales sólidas y un estilo de aprendizaje muy visual y activo. Destaca en inteligencia lingüística e interpersonal, con un perfil de personalidad colaborativo y creativo. Los entornos de trabajo en equipo, con espacio para la expresión y la innovación, parecen ser los que más resuenan con su forma de ser.',

  socialSkills: [
    { name: 'Empatía', score: 88, category: 'strength' },
    { name: 'Comunicación', score: 82, category: 'strength' },
    { name: 'Colaboración', score: 78, category: 'strength' },
    { name: 'Liderazgo', score: 60, category: 'developing' },
    { name: 'Resolución de conflictos', score: 55, category: 'developing' },
    { name: 'Negociación', score: 45, category: 'developing' },
  ],
  socialGrowthPlan: [
    'Practica liderar pequeñas dinámicas grupales en clase.',
    'Experimenta con técnicas de mediación en situaciones cotidianas.',
    'Participa en un taller o actividad extracurricular de debate o negociación.',
  ],

  learningDimensions: [
    { labelA: 'Activo', labelB: 'Reflexivo', value: -35 },
    { labelA: 'Visual', labelB: 'Verbal', value: -60 },
    { labelA: 'Secuencial', labelB: 'Global', value: 20 },
    { labelA: 'Sensorial', labelB: 'Intuitivo', value: -15 },
  ],
  learningTips: [
    'Usa mapas mentales y diagramas para organizar ideas.',
    'Alterna entre períodos de acción y momentos de reflexión.',
    'Combina ejemplos concretos con visiones generales al estudiar.',
    'Busca videos y recursos visuales como complemento de lectura.',
  ],

  intelligences: [
    { name: 'Lingüística', icon: '📝', score: 85, description: 'Facilidad para expresarte con palabras, escribir y comunicar ideas.' },
    { name: 'Interpersonal', icon: '🤝', score: 82, description: 'Habilidad para entender a los demás y trabajar en equipo.' },
    { name: 'Visual-Espacial', icon: '🎨', score: 75, description: 'Capacidad para pensar en imágenes, diseñar y visualizar conceptos.' },
    { name: 'Musical', icon: '🎵', score: 68, description: 'Sensibilidad para el ritmo, la melodía y los patrones sonoros.' },
    { name: 'Naturalista', icon: '🌿', score: 62, description: 'Conexión con la naturaleza y habilidad para clasificar y observar.' },
    { name: 'Lógico-Matemática', icon: '🔢', score: 55, description: 'Razonamiento lógico, análisis numérico y resolución de problemas.' },
    { name: 'Corporal-Kinestésica', icon: '🏃', score: 50, description: 'Coordinación física, expresión corporal y destreza manual.' },
    { name: 'Intrapersonal', icon: '🧘', score: 72, description: 'Autoconocimiento, reflexión interna y gestión emocional.' },
  ],

  personalityTraits: [
    { name: 'Colaborativa', score: 85, description: 'Prefieres trabajar con otros y nutrir ideas en grupo.' },
    { name: 'Creativa', score: 78, description: 'Disfrutas encontrar soluciones originales y explorar nuevas posibilidades.' },
    { name: 'Empática', score: 82, description: 'Te conectas fácilmente con las emociones de los demás.' },
    { name: 'Organizada', score: 60, description: 'Tienes una estructura básica, con espacio para ser más metódica.' },
    { name: 'Curiosa', score: 75, description: 'Te gusta explorar, preguntar y descubrir cómo funcionan las cosas.' },
  ],
  comfortEnvironments: [
    'Equipos pequeños con comunicación abierta',
    'Espacios creativos con libertad de expresión',
    'Proyectos colaborativos con impacto social',
    'Ambientes donde se valora la diversidad de ideas',
  ],
  stretchEnvironments: [
    'Entornos muy competitivos e individuales',
    'Tareas repetitivas sin espacio para innovar',
    'Roles con alta presión de resultados numéricos',
  ],

  affinities: [
    { name: 'Trabajo centrado en personas', icon: '👥', match: 90, description: 'Roles donde el contacto humano y la ayuda a otros son centrales.' },
    { name: 'Entornos creativos', icon: '✨', match: 82, description: 'Espacios donde la innovación, el diseño y la expresión son valorados.' },
    { name: 'Comunicación y medios', icon: '📢', match: 78, description: 'Actividades que involucran escritura, oratoria o producción de contenido.' },
    { name: 'Educación y formación', icon: '📚', match: 75, description: 'Ambientes de enseñanza, mentoría y desarrollo de otros.' },
    { name: 'Liderazgo y gestión', icon: '🧭', match: 60, description: 'Roles de coordinación y toma de decisiones en equipo.' },
    { name: 'Investigación y análisis', icon: '🔍', match: 48, description: 'Tareas centradas en datos, análisis profundo y pensamiento crítico.' },
  ],

  recommendations: [
    {
      type: 'skill',
      title: 'Fortalece tu liderazgo',
      description: 'Ofrécete para coordinar un proyecto grupal esta semana. Empieza con algo pequeño y observa cómo te sientes.',
      icon: '💪',
    },
    {
      type: 'strategy',
      title: 'Prueba el método visual-activo',
      description: 'En tu próximo tema, crea un mapa mental antes de leer y luego explícalo a alguien más.',
      icon: '🧠',
    },
    {
      type: 'explore',
      title: 'Explora carreras de impacto social',
      description: 'Investiga sobre trabajo social, psicología, comunicación social o diseño centrado en el usuario.',
      icon: '🌍',
    },
  ],
};
