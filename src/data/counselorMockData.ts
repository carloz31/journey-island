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
}

const nombres = ['Alejandro','Valentina','Sebastián','Camila','Diego','Lucía','Mateo','Isabella','Santiago','Sofía','Rodrigo','Daniela','Andrés','Mariana','Fernando','Gabriela','Carlos','Natalia','Miguel','Andrea','Joaquín','Paula','Luis','Carolina','José','María Fernanda','Rafael','Claudia'];
const apellidos = ['García Quispe','Torres Mendoza','Huamán Rivera','López Castillo','Ramírez Flores','Vargas Salazar','Cruz Delgado','Morales Chávez','Fernández Paredes','Sánchez Rojas','Gutiérrez Herrera','Ortiz Medina','Mendoza Silva','Ruiz Campos','Peña Vásquez','Díaz Ramos','Alvarez Ríos','Jiménez Luna','Cortez Espinoza','Navarro Aguilar','Romero Palacios','Vega Contreras','Reyes Valdivia','Espinoza Tapia','Montes Arce','Cárdenas Vera','Salas Ponce','Rivas Solano'];
const hollandTypes = ['Social','Investigativo','Artístico','Emprendedor','Realista','Convencional'];
const hollandDist = [8,7,5,4,3,1];
const learningStyles = ['Visual','Kinestésico','Lectura/Escritura','Auditivo'];
const learningDist = [12,8,5,3];

function pickFromDist(items: string[], dist: number[]): string[] {
  const result: string[] = [];
  items.forEach((item, i) => { for (let j = 0; j < dist[i]; j++) result.push(item); });
  return result;
}

const hollandPool = pickFromDist(hollandTypes, hollandDist);
const learningPool = pickFromDist(learningStyles, learningDist);

const bloquesBase = [
  { nombre: 'Autoconocimiento', total: 5 },
  { nombre: 'Exploración de Intereses', total: 4 },
  { nombre: 'Estilos de Aprendizaje', total: 4 },
  { nombre: 'Mundo Laboral', total: 5 },
  { nombre: 'Proyecto Vocacional', total: 3 },
];

const actividadTipos: ('test' | 'respuesta_abierta' | 'subida_archivo' | 'reflexion')[] = ['test','respuesta_abierta','subida_archivo','reflexion'];
const actividadNombres: Record<string, string[]> = {
  'Autoconocimiento': ['Mi autobiografía vocacional','Test de personalidad Holland','Mis fortalezas y áreas de mejora','Línea de vida','Reflexión: ¿Quién soy?'],
  'Exploración de Intereses': ['Inventario de intereses','Mapa de carreras','Entrevista a un profesional','Feria de carreras virtual'],
  'Estilos de Aprendizaje': ['Test VARK','Mi estilo de estudio','Estrategias de aprendizaje','Reflexión: ¿Cómo aprendo mejor?'],
  'Mundo Laboral': ['Investigación de campo laboral','Perfil profesional ideal','Simulación de entrevista','Análisis del mercado','Tendencias laborales'],
  'Proyecto Vocacional': ['Mi plan vocacional','Carta de motivación','Presentación final'],
};

function generateStudents(): Student[] {
  const students: Student[] = [];
  const statuses: ('activo' | 'pendiente' | 'no_invitado')[] = [];
  for (let i = 0; i < 18; i++) statuses.push('activo');
  for (let i = 0; i < 6; i++) statuses.push('pendiente');
  for (let i = 0; i < 4; i++) statuses.push('no_invitado');

  for (let i = 0; i < 28; i++) {
    const estado = statuses[i];
    const completado = estado === 'activo' ? Math.floor(Math.random() * 60) + 30 : estado === 'pendiente' ? Math.floor(Math.random() * 30) : 0;
    const diasInactivo = estado === 'no_invitado' ? 30 : Math.floor(Math.random() * 15);
    const riesgo = diasInactivo >= 7 && completado < 80;

    const bloques = bloquesBase.map(b => {
      const done = Math.min(b.total, Math.floor(b.total * (completado / 100) + (Math.random() - 0.5)));
      return { nombre: b.nombre, completado: Math.max(0, done), total: b.total };
    });

    const actividadesDetalle: ActivityDetail[] = [];
    bloquesBase.forEach((bloque, bi) => {
      const nombres_act = actividadNombres[bloque.nombre];
      nombres_act.forEach((nom, ai) => {
        const done = ai < bloques[bi].completado;
        actividadesDetalle.push({
          bloqueId: bi,
          bloque: bloque.nombre,
          nombre: nom,
          tipo: actividadTipos[ai % 4],
          completada: done,
          fechaCompletada: done ? `2025-0${Math.floor(Math.random() * 4) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}` : null,
          resultado: done && ai % 4 === 0 ? `Puntuación: ${Math.floor(Math.random() * 40) + 60}/100` : undefined,
          respuestaAbierta: done && ai % 4 === 1 ? 'Me gustaría explorar carreras relacionadas con la tecnología y el diseño, ya que siento que puedo combinar mi creatividad con herramientas digitales.' : undefined,
          archivo: done && ai % 4 === 2 ? `tarea_${nom.replace(/ /g, '_').toLowerCase()}.pdf` : undefined,
          revisado: done ? Math.random() > 0.4 : false,
        });
      });
    });

    const parentEstados: ('activo' | 'pendiente' | 'sin_cuenta')[] = ['activo', 'pendiente', 'sin_cuenta'];
    const p1Estado = i < 12 ? 'activo' : i < 20 ? 'pendiente' : 'sin_cuenta';

    students.push({
      id: `est-${String(i + 1).padStart(3, '0')}`,
      nombre: nombres[i],
      apellido: apellidos[i],
      correo: `${nombres[i].toLowerCase().replace(/ /g, '')}@colegio.edu.pe`,
      avatar: '',
      estado,
      ultimaActividad: estado !== 'no_invitado' ? `2025-04-${String(16 - diasInactivo).padStart(2, '0')}` : null,
      porcentajeCompletado: completado,
      diasInactivo,
      hollandType: hollandPool[i],
      learningStyle: learningPool[i],
      riesgo,
      tags: riesgo ? ['Seguimiento prioritario'] : [],
      apoderado1: {
        nombre: `${['Ana','María','Rosa','Julia','Elena','Carmen','Gloria','Teresa','Pilar','Marta'][i % 10]} ${apellidos[i].split(' ')[0]}`,
        correo: `padre_${i + 1}@gmail.com`,
        estado: p1Estado,
        ultimoLogin: p1Estado === 'activo' ? '2025-04-15' : null,
        invitacionEnviada: p1Estado !== 'sin_cuenta' ? '2025-03-01' : null,
      },
      apoderado2: i % 3 === 0 ? {
        nombre: `${['Pedro','Juan','Roberto','Carlos','Miguel'][i % 5]} ${apellidos[i].split(' ')[1] || apellidos[i].split(' ')[0]}`,
        correo: `padre2_${i + 1}@gmail.com`,
        estado: parentEstados[Math.floor(Math.random() * 3)],
        ultimoLogin: null,
        invitacionEnviada: '2025-03-05',
      } : null,
      bloques,
      actividadesDetalle,
    });
  }
  return students;
}

export const students = generateStudents();

export const coTeachers: CoTeacher[] = [
  { id: 'ct-1', nombre: 'Prof. Ana María Gutiérrez', correo: 'agutierrez@colegio.edu.pe', rol: 'Tutora de Comunicación' },
  { id: 'ct-2', nombre: 'Prof. Carlos Mendoza', correo: 'cmendoza@colegio.edu.pe', rol: 'Tutor de Matemáticas' },
  { id: 'ct-3', nombre: 'Ps. Laura Fernández', correo: 'lfernandez@colegio.edu.pe', rol: 'Psicóloga escolar' },
];

export const messages: Message[] = [
  { id: 'msg-1', de: 'Valentina Torres Mendoza', para: 'Orientador', asunto: 'Consulta sobre actividad de Holland', contenido: 'Profesor, no entiendo bien cómo responder las preguntas del test de Holland. ¿Podría ayudarme?', fecha: '2025-04-16 09:30', leido: false, tipo: 'recibido' },
  { id: 'msg-2', de: 'Ana García (Apoderada)', para: 'Orientador', asunto: 'Reunión para hablar del avance de Alejandro', contenido: 'Buenos días, me gustaría coordinar una reunión para hablar sobre el progreso de mi hijo Alejandro.', fecha: '2025-04-15 14:20', leido: false, tipo: 'recibido' },
  { id: 'msg-3', de: 'Diego Ramírez Flores', para: 'Orientador', asunto: 'Entrega tardía de reflexión', contenido: 'Profesor, no pude entregar la reflexión a tiempo. ¿Puedo enviarla mañana?', fecha: '2025-04-15 08:45', leido: true, tipo: 'recibido' },
  { id: 'msg-4', de: 'Prof. Ana María Gutiérrez', para: 'Orientador', asunto: 'Coordinación bloque 3', contenido: 'Estimado colega, necesitamos coordinar las actividades del bloque de Estilos de Aprendizaje.', fecha: '2025-04-14 16:00', leido: true, tipo: 'recibido' },
  { id: 'msg-5', de: 'Orientador', para: 'Todos los estudiantes', asunto: 'Recordatorio: Fecha límite Bloque 2', contenido: 'Estimados estudiantes, les recuerdo que la fecha límite para completar las actividades del Bloque 2 es el viernes 18 de abril.', fecha: '2025-04-14 10:00', leido: true, tipo: 'enviado' },
  { id: 'msg-6', de: 'Orientador', para: 'María García (Apoderada)', asunto: 'Re: Reunión para hablar del avance', contenido: 'Estimada señora García, con mucho gusto. ¿Le parece el miércoles a las 4pm?', fecha: '2025-04-15 15:00', leido: true, tipo: 'enviado' },
  { id: 'msg-7', de: 'Sofía Sánchez Rojas', para: 'Orientador', asunto: 'Duda sobre carreras de salud', contenido: 'Profesora, me interesa saber más sobre las carreras de medicina y enfermería.', fecha: '2025-04-13 11:30', leido: true, tipo: 'recibido' },
  { id: 'msg-8', de: 'Mateo López Castillo', para: 'Orientador', asunto: 'Problema con la plataforma', contenido: 'No puedo subir mi archivo de la entrevista. Me sale un error.', fecha: '2025-04-12 09:15', leido: true, tipo: 'recibido' },
];

export const activityBlocks: ActivityBlock[] = bloquesBase.map((bloque, i) => ({
  id: i + 1,
  nombre: bloque.nombre,
  actividades: actividadNombres[bloque.nombre].map((nom, j) => ({
    id: `act-${i + 1}-${j + 1}`,
    nombre: nom,
    tipo: actividadTipos[j % 4],
    mandatoria: j < 3,
    deadline: j < 2 ? `2025-04-${18 + i * 3}` : null,
    completados: Math.floor(Math.random() * 20) + 5,
    total: 28,
  })),
}));

export const recentActions: RecentAction[] = [
  { id: 'ra-1', estudiante: 'Valentina Torres', accion: 'completó Test de personalidad Holland', bloque: 'Autoconocimiento', fecha: '2025-04-16 09:15' },
  { id: 'ra-2', estudiante: 'Santiago Fernández', accion: 'subió archivo de Entrevista a un profesional', bloque: 'Exploración de Intereses', fecha: '2025-04-16 08:50' },
  { id: 'ra-3', estudiante: 'Camila Huamán', accion: 'completó Test VARK', bloque: 'Estilos de Aprendizaje', fecha: '2025-04-16 08:30' },
  { id: 'ra-4', estudiante: 'Mateo López', accion: 'envió reflexión ¿Quién soy?', bloque: 'Autoconocimiento', fecha: '2025-04-15 17:20' },
  { id: 'ra-5', estudiante: 'Lucía Vargas', accion: 'completó Inventario de intereses', bloque: 'Exploración de Intereses', fecha: '2025-04-15 16:45' },
  { id: 'ra-6', estudiante: 'Diego Ramírez', accion: 'completó Mi autobiografía vocacional', bloque: 'Autoconocimiento', fecha: '2025-04-15 15:30' },
  { id: 'ra-7', estudiante: 'Sofía Sánchez', accion: 'completó Mapa de carreras', bloque: 'Exploración de Intereses', fecha: '2025-04-15 14:10' },
  { id: 'ra-8', estudiante: 'Andrés Morales', accion: 'subió archivo Simulación de entrevista', bloque: 'Mundo Laboral', fecha: '2025-04-15 11:00' },
  { id: 'ra-9', estudiante: 'Gabriela Ortiz', accion: 'completó Estrategias de aprendizaje', bloque: 'Estilos de Aprendizaje', fecha: '2025-04-14 16:30' },
  { id: 'ra-10', estudiante: 'Carlos Gutiérrez', accion: 'completó Investigación de campo laboral', bloque: 'Mundo Laboral', fecha: '2025-04-14 14:20' },
];

export const weeklyHeatmap: number[][] = Array.from({ length: 8 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
);

export const counselorProfile = {
  nombre: 'Lic. Patricia Morales Huamán',
  correo: 'pmorales@colegio.edu.pe',
  rol: 'Orientadora Vocacional',
  aula: '4to Año B — Promoción 2025',
  anioAcademico: '2025',
  totalEstudiantes: 28,
  coTutores: 3,
};

export const careerInterests = [
  { area: 'Tecnología', count: 9 },
  { area: 'Salud', count: 7 },
  { area: 'Arte y Diseño', count: 5 },
  { area: 'Ciencias', count: 4 },
  { area: 'Negocios', count: 3 },
];

export const hollandDistribution = [
  { name: 'Social', value: 8, fill: 'hsl(187, 52%, 48%)' },
  { name: 'Investigativo', value: 7, fill: 'hsl(213, 100%, 70%)' },
  { name: 'Artístico', value: 5, fill: 'hsl(262, 45%, 77%)' },
  { name: 'Emprendedor', value: 4, fill: 'hsl(43, 86%, 63%)' },
  { name: 'Realista', value: 3, fill: 'hsl(140, 45%, 58%)' },
  { name: 'Convencional', value: 1, fill: 'hsl(205, 15%, 70%)' },
];

export const learningStylesDistribution = [
  { name: 'Visual', value: 12, fill: 'hsl(187, 52%, 48%)' },
  { name: 'Kinestésico', value: 8, fill: 'hsl(140, 45%, 58%)' },
  { name: 'Lectura/Escritura', value: 5, fill: 'hsl(262, 45%, 77%)' },
  { name: 'Auditivo', value: 3, fill: 'hsl(43, 86%, 63%)' },
];
