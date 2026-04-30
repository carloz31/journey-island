// Mock data for the counselor interface

export interface Student {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  avatar: string;
  estado: 'activo' | 'pendiente' | 'no_invitado';
  ultimaActividad: string | null;
  porcentajeCompletado: number;
  diasInactivo: number;
  hollandType: string;
  learningStyle: string;
  riesgo: boolean;
  tags: string[];
  apoderado1: { nombre: string; correo: string; estado: 'activo' | 'pendiente' | 'sin_cuenta'; ultimoLogin: string | null; invitacionEnviada: string | null };
  apoderado2: { nombre: string; correo: string; estado: 'activo' | 'pendiente' | 'sin_cuenta'; ultimoLogin: string | null; invitacionEnviada: string | null } | null;
  bloques: { nombre: string; completado: number; total: number }[];
  actividadesDetalle: ActivityDetail[];
  classroomId: string;
}

export interface ActivityDetail {
  bloqueId: number;
  bloque: string;
  nombre: string;
  tipo: 'test' | 'respuesta_abierta' | 'subida_archivo' | 'reflexion';
  completada: boolean;
  fechaCompletada: string | null;
  resultado?: string;
  respuestaAbierta?: string;
  archivo?: string;
  revisado: boolean;
  comentarioOrientador?: string;
}

export interface CoTeacher {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
}

export interface Message {
  id: string;
  de: string;
  para: string;
  asunto: string;
  contenido: string;
  fecha: string;
  leido: boolean;
  tipo: 'recibido' | 'enviado';
}

export interface ActivityBlock {
  id: number;
  nombre: string;
  actividades: {
    id: string;
    nombre: string;
    tipo: 'test' | 'respuesta_abierta' | 'subida_archivo' | 'reflexion';
    mandatoria: boolean;
    deadline: string | null;
    completados: number;
    total: number;
  }[];
}

export interface RecentAction {
  id: string;
  estudiante: string;
  accion: string;
  bloque: string;
  fecha: string;
  classroomId: string;
}

export interface Classroom {
  id: string;
  nombre: string;
  anioAcademico: string;
  accessCode: string;
  totalEstudiantes: number;
  coTutores: number;
  health: 'green' | 'yellow' | 'red';
  hollandDominant: string;
  completionPct: number;
  atRiskCount: number;
  noAccountParents: number;
  bloquesProgress: { nombre: string; pct: number }[];
  careerInterests: { area: string; count: number }[];
  hollandDistribution: { name: string; value: number; fill: string }[];
  learningStylesDistribution: { name: string; value: number; fill: string }[];
  weeklyHeatmap: number[][];
  coTeachers: CoTeacher[];
  activityBlocks: ActivityBlock[];
}

const nombres1 = ['Alejandro','Valentina','Sebastián','Camila','Diego','Lucía','Mateo','Isabella','Santiago','Sofía','Rodrigo','Daniela','Andrés','Mariana','Fernando','Gabriela','Carlos','Natalia','Miguel','Andrea','Joaquín','Paula','Luis','Carolina','José','María Fernanda','Rafael','Claudia'];
const apellidos1 = ['García Quispe','Torres Mendoza','Huamán Rivera','López Castillo','Ramírez Flores','Vargas Salazar','Cruz Delgado','Morales Chávez','Fernández Paredes','Sánchez Rojas','Gutiérrez Herrera','Ortiz Medina','Mendoza Silva','Ruiz Campos','Peña Vásquez','Díaz Ramos','Alvarez Ríos','Jiménez Luna','Cortez Espinoza','Navarro Aguilar','Romero Palacios','Vega Contreras','Reyes Valdivia','Espinoza Tapia','Montes Arce','Cárdenas Vera','Salas Ponce','Rivas Solano'];

const nombres2 = ['Renato','Ariana','Thiago','Valeria','Iker','Bianca','Franco','Kiara','Emilio','Antonella','Bruno','Jimena','Nicolás','Fátima','Leonardo','Milagros','Adrián','Paloma','Gonzalo','Estrella','Facundo','Ivana','Álvaro','Brenda'];
const apellidos2 = ['Chávez Huamán','Quispe Flores','Rivera Castillo','Salazar Mendoza','Delgado Torres','Paredes García','Campos Rojas','Herrera Vásquez','Silva Medina','Luna Ríos','Aguilar Ramos','Palacios Contreras','Valdivia Espinoza','Tapia Arce','Vera Ponce','Solano Cruz','Ramos Ortiz','Flores Díaz','Castillo Peña','Mendoza Alvarez','Torres Jiménez','García Cortez','Quispe Navarro','Rivera Romero'];

const hollandTypes = ['Social','Investigativo','Artístico','Emprendedor','Realista','Convencional'];
const learningStyles = ['Visual','Kinestésico','Lectura/Escritura','Auditivo'];
const actividadTipos: ('test' | 'respuesta_abierta' | 'subida_archivo' | 'reflexion')[] = ['test','respuesta_abierta','subida_archivo','reflexion'];

const bloquesBase = [
  { nombre: 'Autoconocimiento', total: 5 },
  { nombre: 'Exploración de Intereses', total: 4 },
  { nombre: 'Estilos de Aprendizaje', total: 4 },
  { nombre: 'Mundo Laboral', total: 5 },
  { nombre: 'Proyecto Vocacional', total: 3 },
];

const actividadNombres: Record<string, string[]> = {
  'Autoconocimiento': ['Mi autobiografía vocacional','Test de personalidad Holland','Mis fortalezas y áreas de mejora','Línea de vida','Reflexión: ¿Quién soy?'],
  'Exploración de Intereses': ['Inventario de intereses','Mapa de carreras','Entrevista a un profesional','Feria de carreras virtual'],
  'Estilos de Aprendizaje': ['Test VARK','Mi estilo de estudio','Estrategias de aprendizaje','Reflexión: ¿Cómo aprendo mejor?'],
  'Mundo Laboral': ['Investigación de campo laboral','Perfil profesional ideal','Simulación de entrevista','Análisis del mercado','Tendencias laborales'],
  'Proyecto Vocacional': ['Mi plan vocacional','Carta de motivación','Presentación final'],
};

function pickFromDist(items: string[], dist: number[]): string[] {
  const result: string[] = [];
  items.forEach((item, i) => { for (let j = 0; j < dist[i]; j++) result.push(item); });
  return result;
}

function generateStudentsForClassroom(
  classroomId: string,
  nombres: string[],
  apellidos: string[],
  count: number,
  hollandDist: number[],
  learningDist: number[],
  activeCount: number,
  pendingCount: number,
): Student[] {
  const hollandPool = pickFromDist(hollandTypes, hollandDist);
  const learningPool = pickFromDist(learningStyles, learningDist);
  const students: Student[] = [];
  const noInvitedCount = count - activeCount - pendingCount;

  for (let i = 0; i < count; i++) {
    const estado: 'activo' | 'pendiente' | 'no_invitado' = i < activeCount ? 'activo' : i < activeCount + pendingCount ? 'pendiente' : 'no_invitado';
    const completado = estado === 'activo' ? Math.floor(Math.random() * 60) + 30 : estado === 'pendiente' ? Math.floor(Math.random() * 30) : 0;
    const diasInactivo = estado === 'no_invitado' ? 30 : Math.floor(Math.random() * 15);
    const riesgo = diasInactivo >= 7 && completado < 80;

    const bloques = bloquesBase.map(b => {
      const done = Math.min(b.total, Math.floor(b.total * (completado / 100) + (Math.random() - 0.5)));
      return { nombre: b.nombre, completado: Math.max(0, done), total: b.total };
    });

    const actividadesDetalle: ActivityDetail[] = [];
    bloquesBase.forEach((bloque, bi) => {
      const noms = actividadNombres[bloque.nombre];
      noms.forEach((nom, ai) => {
        const done = ai < bloques[bi].completado;
        actividadesDetalle.push({
          bloqueId: bi, bloque: bloque.nombre, nombre: nom,
          tipo: actividadTipos[ai % 4], completada: done,
          fechaCompletada: done ? `2025-0${Math.floor(Math.random() * 4) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}` : null,
          resultado: done && ai % 4 === 0 ? `Puntuación: ${Math.floor(Math.random() * 40) + 60}/100` : undefined,
          respuestaAbierta: done && ai % 4 === 1 ? 'Me gustaría explorar carreras relacionadas con la tecnología y el diseño.' : undefined,
          archivo: done && ai % 4 === 2 ? `tarea_${nom.replace(/ /g, '_').toLowerCase()}.pdf` : undefined,
          revisado: done ? Math.random() > 0.4 : false,
        });
      });
    });

    const p1Estado: 'activo' | 'pendiente' | 'sin_cuenta' = i < Math.floor(count * 0.4) ? 'activo' : i < Math.floor(count * 0.7) ? 'pendiente' : 'sin_cuenta';

    students.push({
      id: `${classroomId}-est-${String(i + 1).padStart(3, '0')}`,
      nombre: nombres[i], apellido: apellidos[i],
      correo: `${nombres[i].toLowerCase().replace(/ /g, '')}@colegio.edu.pe`,
      avatar: '', estado, ultimaActividad: estado !== 'no_invitado' ? `2025-04-${String(16 - diasInactivo).padStart(2, '0')}` : null,
      porcentajeCompletado: completado, diasInactivo, hollandType: hollandPool[i % hollandPool.length],
      learningStyle: learningPool[i % learningPool.length], riesgo, tags: riesgo ? ['Seguimiento prioritario'] : [],
      apoderado1: {
        nombre: `${['Ana','María','Rosa','Julia','Elena','Carmen','Gloria','Teresa','Pilar','Marta'][i % 10]} ${apellidos[i].split(' ')[0]}`,
        correo: `padre_${classroomId}_${i + 1}@gmail.com`, estado: p1Estado,
        ultimoLogin: p1Estado === 'activo' ? '2025-04-15' : null,
        invitacionEnviada: p1Estado !== 'sin_cuenta' ? '2025-03-01' : null,
      },
      apoderado2: i % 3 === 0 ? {
        nombre: `${['Pedro','Juan','Roberto','Carlos','Miguel'][i % 5]} ${apellidos[i].split(' ')[1] || apellidos[i].split(' ')[0]}`,
        correo: `padre2_${classroomId}_${i + 1}@gmail.com`,
        estado: (['activo', 'pendiente', 'sin_cuenta'] as const)[Math.floor(Math.random() * 3)],
        ultimoLogin: null, invitacionEnviada: '2025-03-05',
      } : null,
      bloques, actividadesDetalle, classroomId,
    });
  }
  return students;
}

function generateActivityBlocks(totalStudents: number): ActivityBlock[] {
  return bloquesBase.map((bloque, i) => ({
    id: i + 1,
    nombre: bloque.nombre,
    actividades: actividadNombres[bloque.nombre].map((nom, j) => ({
      id: `act-${i + 1}-${j + 1}`,
      nombre: nom,
      tipo: actividadTipos[j % 4],
      mandatoria: j < 3,
      deadline: j < 2 ? `2025-04-${18 + i * 3}` : null,
      completados: Math.floor(Math.random() * Math.floor(totalStudents * 0.7)) + Math.floor(totalStudents * 0.1),
      total: totalStudents,
    })),
  }));
}

// Classroom 1
const students1 = generateStudentsForClassroom('c1', nombres1, apellidos1, 28, [8,7,5,4,3,1], [12,8,5,3], 18, 6);
// Classroom 2
const students2 = generateStudentsForClassroom('c2', nombres2, apellidos2, 24, [4,3,7,5,3,2], [6,10,4,4], 12, 5);

export const allStudents: Student[] = [...students1, ...students2];

export const classrooms: Classroom[] = [
  {
    id: 'c1',
    nombre: '4to Año B — Promoción 2025',
    anioAcademico: '2025',
    accessCode: 'AULA-4B25-X9KM',
    totalEstudiantes: 28,
    coTutores: 3,
    health: 'yellow',
    hollandDominant: 'Social',
    completionPct: Math.round(students1.reduce((a, s) => a + s.porcentajeCompletado, 0) / 28),
    atRiskCount: students1.filter(s => s.riesgo).length,
    noAccountParents: students1.filter(s => s.apoderado1.estado === 'sin_cuenta' || s.apoderado2?.estado === 'sin_cuenta').length,
    bloquesProgress: [
      { nombre: 'Autoconocimiento', pct: 68 },
      { nombre: 'Exploración de Intereses', pct: 52 },
      { nombre: 'Estilos de Aprendizaje', pct: 45 },
      { nombre: 'Mundo Laboral', pct: 30 },
      { nombre: 'Proyecto Vocacional', pct: 15 },
    ],
    careerInterests: [
      { area: 'Tecnología', count: 9 },
      { area: 'Salud', count: 7 },
      { area: 'Arte y Diseño', count: 5 },
      { area: 'Ciencias', count: 4 },
      { area: 'Negocios', count: 3 },
    ],
    hollandDistribution: [
      { name: 'Social', value: 8, fill: 'hsl(187, 52%, 48%)' },
      { name: 'Investigativo', value: 7, fill: 'hsl(213, 100%, 70%)' },
      { name: 'Artístico', value: 5, fill: 'hsl(262, 45%, 77%)' },
      { name: 'Emprendedor', value: 4, fill: 'hsl(43, 86%, 63%)' },
      { name: 'Realista', value: 3, fill: 'hsl(140, 45%, 58%)' },
      { name: 'Convencional', value: 1, fill: 'hsl(205, 15%, 70%)' },
    ],
    learningStylesDistribution: [
      { name: 'Visual', value: 12, fill: 'hsl(187, 52%, 48%)' },
      { name: 'Kinestésico', value: 8, fill: 'hsl(140, 45%, 58%)' },
      { name: 'Lectura/Escritura', value: 5, fill: 'hsl(262, 45%, 77%)' },
      { name: 'Auditivo', value: 3, fill: 'hsl(43, 86%, 63%)' },
    ],
    weeklyHeatmap: Array.from({ length: 8 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))),
    coTeachers: [
      { id: 'ct-1', nombre: 'Prof. Ana María Gutiérrez', correo: 'agutierrez@colegio.edu.pe', rol: 'Tutora de Comunicación' },
      { id: 'ct-2', nombre: 'Prof. Carlos Mendoza', correo: 'cmendoza@colegio.edu.pe', rol: 'Tutor de Matemáticas' },
      { id: 'ct-3', nombre: 'Ps. Laura Fernández', correo: 'lfernandez@colegio.edu.pe', rol: 'Psicóloga escolar' },
    ],
    activityBlocks: generateActivityBlocks(28),
  },
  {
    id: 'c2',
    nombre: '3ro Año A — Promoción 2026',
    anioAcademico: '2026',
    accessCode: 'AULA-3A26-P7LQ',
    totalEstudiantes: 24,
    coTutores: 2,
    health: 'red',
    hollandDominant: 'Artístico',
    completionPct: Math.round(students2.reduce((a, s) => a + s.porcentajeCompletado, 0) / 24),
    atRiskCount: students2.filter(s => s.riesgo).length,
    noAccountParents: students2.filter(s => s.apoderado1.estado === 'sin_cuenta' || s.apoderado2?.estado === 'sin_cuenta').length,
    bloquesProgress: [
      { nombre: 'Autoconocimiento', pct: 42 },
      { nombre: 'Exploración de Intereses', pct: 30 },
      { nombre: 'Estilos de Aprendizaje', pct: 25 },
      { nombre: 'Mundo Laboral', pct: 15 },
      { nombre: 'Proyecto Vocacional', pct: 5 },
    ],
    careerInterests: [
      { area: 'Arte y Diseño', count: 8 },
      { area: 'Tecnología', count: 6 },
      { area: 'Ciencias', count: 4 },
      { area: 'Salud', count: 3 },
      { area: 'Negocios', count: 3 },
    ],
    hollandDistribution: [
      { name: 'Artístico', value: 7, fill: 'hsl(262, 45%, 77%)' },
      { name: 'Emprendedor', value: 5, fill: 'hsl(43, 86%, 63%)' },
      { name: 'Social', value: 4, fill: 'hsl(187, 52%, 48%)' },
      { name: 'Investigativo', value: 3, fill: 'hsl(213, 100%, 70%)' },
      { name: 'Realista', value: 3, fill: 'hsl(140, 45%, 58%)' },
      { name: 'Convencional', value: 2, fill: 'hsl(205, 15%, 70%)' },
    ],
    learningStylesDistribution: [
      { name: 'Kinestésico', value: 10, fill: 'hsl(140, 45%, 58%)' },
      { name: 'Visual', value: 6, fill: 'hsl(187, 52%, 48%)' },
      { name: 'Auditivo', value: 4, fill: 'hsl(43, 86%, 63%)' },
      { name: 'Lectura/Escritura', value: 4, fill: 'hsl(262, 45%, 77%)' },
    ],
    weeklyHeatmap: Array.from({ length: 8 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 4))),
    coTeachers: [
      { id: 'ct-4', nombre: 'Prof. Silvia Ramos', correo: 'sramos@colegio.edu.pe', rol: 'Tutora de Historia' },
      { id: 'ct-5', nombre: 'Prof. Jorge Tapia', correo: 'jtapia@colegio.edu.pe', rol: 'Tutor de Ciencias' },
    ],
    activityBlocks: generateActivityBlocks(24),
  },
];

export const recentActions: RecentAction[] = [
  { id: 'ra-1', estudiante: 'Valentina Torres', accion: 'completó Test de personalidad Holland', bloque: 'Autoconocimiento', fecha: '2025-04-16 09:15', classroomId: 'c1' },
  { id: 'ra-2', estudiante: 'Santiago Fernández', accion: 'subió archivo de Entrevista a un profesional', bloque: 'Exploración de Intereses', fecha: '2025-04-16 08:50', classroomId: 'c1' },
  { id: 'ra-3', estudiante: 'Camila Huamán', accion: 'completó Test VARK', bloque: 'Estilos de Aprendizaje', fecha: '2025-04-16 08:30', classroomId: 'c1' },
  { id: 'ra-4', estudiante: 'Mateo López', accion: 'envió reflexión ¿Quién soy?', bloque: 'Autoconocimiento', fecha: '2025-04-15 17:20', classroomId: 'c1' },
  { id: 'ra-5', estudiante: 'Ariana Quispe', accion: 'completó Mi autobiografía vocacional', bloque: 'Autoconocimiento', fecha: '2025-04-16 09:00', classroomId: 'c2' },
  { id: 'ra-6', estudiante: 'Thiago Rivera', accion: 'completó Inventario de intereses', bloque: 'Exploración de Intereses', fecha: '2025-04-15 16:45', classroomId: 'c2' },
  { id: 'ra-7', estudiante: 'Diego Ramírez', accion: 'completó Mi autobiografía vocacional', bloque: 'Autoconocimiento', fecha: '2025-04-15 15:30', classroomId: 'c1' },
  { id: 'ra-8', estudiante: 'Sofía Sánchez', accion: 'completó Mapa de carreras', bloque: 'Exploración de Intereses', fecha: '2025-04-15 14:10', classroomId: 'c1' },
  { id: 'ra-9', estudiante: 'Franco Delgado', accion: 'subió archivo Simulación de entrevista', bloque: 'Mundo Laboral', fecha: '2025-04-15 11:00', classroomId: 'c2' },
  { id: 'ra-10', estudiante: 'Carlos Gutiérrez', accion: 'completó Investigación de campo laboral', bloque: 'Mundo Laboral', fecha: '2025-04-14 14:20', classroomId: 'c1' },
];

export const messages: Message[] = [
  { id: 'msg-1', de: 'Valentina Torres Mendoza', para: 'Orientador', asunto: 'Consulta sobre actividad de Holland', contenido: 'Profesor, no entiendo bien cómo responder las preguntas del test de Holland. ¿Podría ayudarme?', fecha: '2025-04-16 09:30', leido: false, tipo: 'recibido' },
  { id: 'msg-2', de: 'Ana García (Apoderada)', para: 'Orientador', asunto: 'Reunión para hablar del avance de Alejandro', contenido: 'Buenos días, me gustaría coordinar una reunión para hablar sobre el progreso de mi hijo Alejandro.', fecha: '2025-04-15 14:20', leido: false, tipo: 'recibido' },
  { id: 'msg-3', de: 'Diego Ramírez Flores', para: 'Orientador', asunto: 'Entrega tardía de reflexión', contenido: 'Profesor, no pude entregar la reflexión a tiempo. ¿Puedo enviarla mañana?', fecha: '2025-04-15 08:45', leido: true, tipo: 'recibido' },
  { id: 'msg-4', de: 'Prof. Ana María Gutiérrez', para: 'Orientador', asunto: 'Coordinación bloque 3', contenido: 'Estimado colega, necesitamos coordinar las actividades del bloque de Estilos de Aprendizaje.', fecha: '2025-04-14 16:00', leido: true, tipo: 'recibido' },
  { id: 'msg-5', de: 'Orientador', para: 'Todos los estudiantes — 4to Año B', asunto: 'Recordatorio: Fecha límite Bloque 2', contenido: 'Estimados estudiantes, les recuerdo que la fecha límite para completar las actividades del Bloque 2 es el viernes 18 de abril.', fecha: '2025-04-14 10:00', leido: true, tipo: 'enviado' },
  { id: 'msg-6', de: 'Orientador', para: 'María García (Apoderada)', asunto: 'Re: Reunión para hablar del avance', contenido: 'Estimada señora García, con mucho gusto. ¿Le parece el miércoles a las 4pm?', fecha: '2025-04-15 15:00', leido: true, tipo: 'enviado' },
  { id: 'msg-7', de: 'Sofía Sánchez Rojas', para: 'Orientador', asunto: 'Duda sobre carreras de salud', contenido: 'Profesora, me interesa saber más sobre las carreras de medicina y enfermería.', fecha: '2025-04-13 11:30', leido: true, tipo: 'recibido' },
  { id: 'msg-8', de: 'Ariana Quispe Flores', para: 'Orientador', asunto: 'No puedo acceder a la actividad', contenido: 'Profesora, no me carga la actividad del Test VARK. Me sale un error.', fecha: '2025-04-12 09:15', leido: true, tipo: 'recibido' },
];

export const counselorProfile = {
  nombre: 'Lic. Patricia Morales Huamán',
  correo: 'pmorales@colegio.edu.pe',
  rol: 'Orientadora Vocacional',
};

// Legacy exports for backward compat
export const students = allStudents.filter(s => s.classroomId === 'c1');
export const coTeachers = classrooms[0].coTeachers;
export const activityBlocks = classrooms[0].activityBlocks;
export const careerInterests = classrooms[0].careerInterests;
export const hollandDistribution = classrooms[0].hollandDistribution;
export const learningStylesDistribution = classrooms[0].learningStylesDistribution;
export const weeklyHeatmap = classrooms[0].weeklyHeatmap;
