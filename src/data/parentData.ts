// Parent module data, types, and seed activity content (Spanish content, English code)

export type SlideType =
  | 'informational'
  | 'classification'
  | 'frequency'
  | 'open_input'
  | 'completion';

export interface InformationalSlide {
  id: string;
  type: 'informational';
  title?: string;
  body: string; // markdown-ish: paragraphs separated by \n\n, • for bullets
  backgroundImage?: string;
}

export interface ClassificationRow {
  phrase: string;
  correct: string; // category key
}
export interface ClassificationSlide {
  id: string;
  type: 'classification';
  title: string;
  instructions: string;
  categories: { key: string; label: string }[];
  rows: ClassificationRow[];
  completionMessage: string;
  backgroundImage?: string;
}

export interface FrequencyStatement {
  id: string;
  text: string;
}
export interface FrequencySlide {
  id: string;
  type: 'frequency';
  title: string;
  instructions: string;
  options: string[];
  statements: FrequencyStatement[];
  completionMessage: string;
  backgroundImage?: string;
}

export interface OpenInputSlide {
  id: string;
  type: 'open_input';
  title?: string;
  body?: string;
  question: string;
  inputType: 'multi_select' | 'single_select' | 'open_text';
  options?: string[];
  maxSelections?: number;
  allowOpenText?: boolean;
  openTextLabel?: string;
  storeAs?: 'output1' | 'output2' | 'context';
  visibility?: 'student_and_counselor' | 'counselor_only';
  backgroundImage?: string;
}

export interface CompletionSlide {
  id: string;
  type: 'completion';
  title: string;
  body: string;
  backgroundImage?: string;
}

export type Slide =
  | InformationalSlide
  | ClassificationSlide
  | FrequencySlide
  | OpenInputSlide
  | CompletionSlide;

export interface ParentActivity {
  id: string;
  title: string; // may include [Nombre] placeholder
  description: string;
  category: 'informational' | 'child_related';
  estimatedMinutes: number;
  slides: Slide[];
}

export interface Child {
  id: string;
  name: string;
  grade: string;
  avatarColor: string;
}

export interface ParentProfile {
  id: string;
  name: string;
  children: Child[];
}

// ===== Mock parent + children =====
export const parentProfile: ParentProfile = {
  id: 'parent-001',
  name: 'María González',
  children: [
    { id: 'child-001', name: 'Lucía', grade: '4to Año B', avatarColor: 'hsl(var(--primary))' },
    { id: 'child-002', name: 'Mateo', grade: '2do Año A', avatarColor: 'hsl(var(--secondary))' },
  ],
};

// ===== Activities =====
export const informationalActivity: ParentActivity = {
  id: 'act-p01-info',
  title: 'Mi rol en el proceso vocacional de mi hijo/a',
  description:
    'Reflexiona sobre cómo acompañas, sin presionar, el proceso de orientación vocacional de tu hijo/a. 15 a 20 minutos.',
  category: 'informational',
  estimatedMinutes: 18,
  slides: [
    {
      id: 's1',
      type: 'informational',
      title: 'Bienvenida',
      body: `Bienvenido/a a este espacio que hemos preparado especialmente para ti.

Tu hijo/a está comenzando un proceso muy importante: explorar quién es, qué le apasiona y hacia dónde quiere ir. Y tú eres parte de ese camino, aunque a veces no sepas exactamente cómo.

En esta actividad vas a reflexionar sobre el rol que cumples como madre o padre en el proceso de orientación vocacional. No hay respuestas correctas ni incorrectas. No te vamos a juzgar. Solo te invitamos a detenerte un momento y mirarte con honestidad.

Esto no te tomará más de 15 a 20 minutos.`,
    },
    {
      id: 's2',
      type: 'informational',
      title: '¿Qué es la orientación vocacional y por qué te involucra a ti?',
      body: `La orientación vocacional no es solo elegir una carrera. Es un proceso en el que tu hijo/a aprende a conocerse: sus intereses, sus habilidades, sus valores y sus sueños.

¿Y tú qué tienes que ver con eso? Mucho más de lo que imaginas. La familia —y especialmente los padres— es uno de los factores que más influye en la elección vocacional de los adolescentes. Esa influencia puede ser positiva: un adolescente que se siente escuchado y respaldado toma decisiones con más seguridad y claridad. Pero también puede convertirse en un obstáculo: cuando las expectativas familiares pesan más que los propios deseos del joven, el proceso se vuelve confuso, cargado de culpa o de conflicto.

No se trata de hacer todo bien ni de tener todas las respuestas. Se trata de acompañar de manera consciente.`,
    },
    {
      id: 's3',
      type: 'informational',
      title: '¿Factor protector u obstáculo?',
      body: `Lee con calma cada situación. ¿Te identificas con alguna?

"Sé que a él le gusta el arte, pero yo le digo que estudie algo con más salida laboral. Por su bien." → El padre quiere proteger a su hijo. Pero sin darse cuenta, está enviando un mensaje: "lo que tú quieres no es suficiente."

"Le pregunté qué le gustaría estudiar y me puse a investigar con ella las opciones disponibles." → Este padre está acompañando: muestra interés sin tomar el control.

"No me meto mucho. Eso es cosa de él, que decida solo." → La ausencia también es un mensaje. A veces los hijos interpretan el desinterés como falta de apoyo.

"Le dije que si estudia lo que yo le digo, le pago la universidad. Si no, que se las arregle." → Esto es presión directa. Puede funcionar en el corto plazo, pero genera resentimiento y decisiones que no son realmente del joven.

Ninguno de nosotros actúa solo de una manera. A veces acompañamos, a veces presionamos, a veces nos alejamos. Lo importante es reconocerlo.`,
    },
    {
      id: 's4',
      type: 'classification',
      title: 'Mini-actividad: ¿Acompañar o Presionar?',
      instructions: 'Clasifica cada frase según si representa acompañar o presionar a tu hijo/a.',
      categories: [
        { key: 'acompanar', label: 'Acompañar' },
        { key: 'presionar', label: 'Presionar' },
      ],
      rows: [
        { phrase: 'Te ayudo a investigar esa carrera para conocerla mejor.', correct: 'acompanar' },
        { phrase: 'En esta familia todos han estudiado medicina, tú no vas a ser la excepción.', correct: 'presionar' },
        { phrase: '¿Qué te emociona cuando piensas en tu futuro?', correct: 'acompanar' },
        { phrase: 'Esa carrera no da dinero, elige algo serio.', correct: 'presionar' },
        { phrase: 'Si decides estudiar eso, lo respeto, aunque me genere dudas.', correct: 'acompanar' },
        { phrase: 'No te compliques, haz lo que yo hice y no te va a ir mal.', correct: 'presionar' },
        { phrase: 'Cuéntame más sobre lo que estás pensando.', correct: 'acompanar' },
        { phrase: 'Ya habla con tu tío, que él sabe más de eso que tú.', correct: 'presionar' },
      ],
      completionMessage: '¡Bien! Ya tienes claro en qué se diferencia acompañar de presionar. Sigamos.',
    },
    {
      id: 's5',
      type: 'informational',
      title: 'De dónde vienen nuestras expectativas',
      body: `Todos los padres tienen expectativas sobre el futuro de sus hijos. Es natural, es humano. Vienen de varios lugares:

• De tus propias experiencias: lo que estudiaste, lo que te fue bien o mal, lo que no pudiste hacer.
• Del contexto en que creciste: lo que tu familia valoraba, lo que "se esperaba" en tu época.
• Del amor y la preocupación genuina: quieres que tu hijo/a tenga estabilidad, éxito, una buena vida.
• Del miedo: a la precariedad, a que elija mal, a que sufra.

Ninguna de estas fuentes es mala en sí misma. El problema aparece cuando nuestras expectativas se confunden con los deseos de nuestros hijos, o cuando sin darnos cuenta esperamos que ellos cumplan lo que nosotros no pudimos.

La pregunta que vale hacerse es: ¿Esto que espero… ¿es para él/ella… o es para mí?`,
    },
    {
      id: 's6',
      type: 'informational',
      title: 'Lo que la evidencia dice',
      body: `No decimos esto para generar culpa, sino para que tengas información real:

Cuando un adolescente elige una carrera principalmente para satisfacer a sus padres —y no por convicción propia— es más probable que abandone los estudios en los primeros años, que se sienta insatisfecho/a con su trabajo en el futuro, y que viva el proceso con ansiedad y conflicto interno.

Por el contrario, cuando el adolescente se siente respaldado sin sentirse dirigido, toma decisiones más sólidas, con mayor autoconocimiento y motivación.

Acompañar no es desaparecer. Es estar presente sin ocupar el lugar de tu hijo/a.`,
    },
    {
      id: 's7',
      type: 'frequency',
      title: '¿Qué tipo de padre/madre eres en este proceso?',
      instructions: 'Lee cada afirmación y selecciona con qué frecuencia te ocurre.',
      options: ['Casi siempre', 'A veces', 'Casi nunca'],
      statements: [
        { id: 'q1', text: 'Escucho a mi hijo/a sin interrumpir cuando habla de su futuro.' },
        { id: 'q2', text: 'Expreso mis opiniones sobre carreras o trabajos sin que me lo pregunten.' },
        { id: 'q3', text: 'Me preocupa mucho que elija "mal" y no puedo evitar decírselo.' },
        { id: 'q4', text: 'Le hago preguntas para conocer mejor sus intereses.' },
        { id: 'q5', text: 'Comparo sus decisiones con las de otros jóvenes de su edad.' },
        { id: 'q6', text: 'Le doy espacio para dudar sin presionarlo/a a tener todo claro.' },
      ],
      completionMessage: 'Gracias por tu honestidad. Este tipo de reflexión ya es un paso de acompañamiento.',
    },
    {
      id: 's8',
      type: 'informational',
      title: 'La diferencia que sí puedes hacer',
      body: `Acompañar bien no requiere saber de carreras ni del mercado laboral. Requiere actitud.

✅ Preguntar antes de opinar. "¿Qué te atrae de eso?" antes que "eso no tiene futuro."
✅ Validar la incertidumbre. Es normal no saber a los 15 o 16 años. No hay que apurar.
✅ Informarte junto a él/ella. Investigar una carrera desconocida muestra interés genuino.
✅ Hablar de tus miedos con honestidad, pero sin cargarlos sobre tu hijo/a. "Me preocupa tu estabilidad económica, ¿podemos conversar de eso?"
✅ Confiar en el proceso. Tu hijo/a está trabajando en esto con herramientas concretas. Tú eres parte del equipo, no el director técnico.`,
    },
    {
      id: 's9',
      type: 'completion',
      title: '¡Felicitaciones por llegar hasta aquí!',
      body: `Has llegado al final de esta sección. Esperamos que algo de lo que leíste te haya hecho pensar, reconocerte o simplemente recordar por qué estás aquí.

En la siguiente parte —que encontrarás en la sección de actividades por hijo/a— te pediremos algo más personal: que pienses en cada hijo/a en particular y registres algunas cosas que serán útiles para su proceso.

Gracias por tomarte este tiempo. Eso ya dice mucho de ti como madre o padre.`,
    },
  ],
};

export const childActivity: ParentActivity = {
  id: 'act-p01-child',
  title: 'Mi acompañamiento a [Nombre]',
  description:
    'Reflexión personalizada sobre cómo acompañar a [Nombre] en su proceso vocacional. Los resultados se comparten con el estudiante y el orientador.',
  category: 'child_related',
  estimatedMinutes: 12,
  slides: [
    {
      id: 'c1',
      type: 'informational',
      title: 'Introducción',
      body: `Ahora que reflexionaste sobre tu rol general como padre o madre, queremos pedirte algo más personal.

Esta sección está pensada para [Nombre] específicamente. Lo que registres aquí formará parte de su proceso y podrá ser visto por él/ella y por el orientador/a.

Tómate unos minutos para responder con honestidad. No hay respuestas correctas.`,
    },
    {
      id: 'c2',
      type: 'open_input',
      title: '¿En qué áreas imaginas a [Nombre]?',
      body: 'Antes de que [Nombre] comparta sus propias preferencias, queremos conocer tu mirada.',
      question: '¿En qué áreas o tipos de trabajo te imaginas a [Nombre] en el futuro? (Puedes seleccionar varias)',
      inputType: 'multi_select',
      options: [
        'Ciencias y tecnología',
        'Arte, diseño y comunicación',
        'Salud y bienestar',
        'Negocios y emprendimiento',
        'Educación y ciencias sociales',
        'Leyes, política o gestión pública',
        'Trabajo con personas / servicio comunitario',
        'Naturaleza, medio ambiente, agricultura',
      ],
      allowOpenText: true,
      openTextLabel: '¿Hay alguna carrera o profesión específica que tengas en mente para él/ella? (opcional)',
      storeAs: 'output1',
      visibility: 'student_and_counselor',
    },
    {
      id: 'c3',
      type: 'open_input',
      title: 'Lo que te preocupa',
      question: '¿Qué es lo que más te preocupa respecto al futuro de [Nombre]? (Selecciona hasta 2)',
      inputType: 'multi_select',
      maxSelections: 2,
      options: [
        'Que elija una carrera sin salida laboral',
        'Que no sepa qué quiere y pierda tiempo',
        'Que no tenga los recursos para estudiar lo que quiere',
        'Que se deje influenciar por sus amigos',
        'Que elija algo por presión mía o de la familia',
        'Que no termine lo que empiece',
      ],
      allowOpenText: true,
      openTextLabel: 'Otra (opcional)',
      storeAs: 'context',
      visibility: 'counselor_only',
    },
    {
      id: 'c4',
      type: 'open_input',
      title: 'Tu compromiso de acompañamiento',
      body: 'Ya reflexionaste sobre tu rol. Ahora te pedimos que te comprometas con algo concreto.',
      question:
        '¿Qué acción específica te comprometes a hacer para acompañar mejor a [Nombre] en este proceso? (Elige una o escribe la tuya)',
      inputType: 'single_select',
      options: [
        'Preguntarle sobre sus intereses sin opinar de inmediato',
        'Investigar juntos/as al menos una carrera que le llame la atención',
        'Evitar compararlo/a con otros jóvenes durante este proceso',
        'Hablar de mis miedos con honestidad, sin presionarlo/a',
        'Darle espacio para dudar sin exigirle que ya tenga todo claro',
        'Escuchar más y hablar menos cuando me cuente sus ideas',
      ],
      allowOpenText: true,
      openTextLabel: 'Otra (escribe tu propio compromiso)',
      storeAs: 'output2',
      visibility: 'student_and_counselor',
    },
    {
      id: 'c5',
      type: 'completion',
      title: '¡Felicitaciones por llegar hasta aquí!',
      body: 'Esperamos que esta actividad haya sido útil para acompañar mejor a [Nombre] en su proceso.',
    },
  ],
};

export const parentActivities: ParentActivity[] = [informationalActivity, childActivity];

export const getActivityById = (id: string): ParentActivity | undefined =>
  parentActivities.find(a => a.id === id);

// Replace [Nombre] tokens
export const interpolateChildName = (text: string | undefined, name: string): string => {
  if (!text) return '';
  return text.replaceAll('[Nombre]', name);
};
