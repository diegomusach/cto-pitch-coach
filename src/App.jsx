import React, { useState, useEffect } from 'react';
import { 
  Award, Play, RotateCcw, CheckCircle2, XCircle, AlertCircle, 
  Clock, BookOpen, Calendar, Video, Copy, Sparkles, ChevronRight, Zap, Target, Crown, Volume2, ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

// ----------------------------------------------------
// DATA: QUIZ SCENARIOS
// ----------------------------------------------------
const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "Salida y Transición",
    question: "¿Por qué estás buscando un cambio profesional tras más de 20 años en Bromteck?",
    options: [
      {
        id: 'opt1',
        type: 'defensive',
        tag: 'Defensiva / Monótona',
        text: "Sentía que en la empresa ya no había más oportunidades de crecer para mí y las dos divisiones (video broadcast y energía) estaban un poco estancadas.",
        coaching: "❌ EVITAR: Te posiciona desde la queja o el desgano, dando la sensación de que te quedaste sin ideas o fuiste pasivo ante la estructura corporativa."
      },
      {
        id: 'opt2',
        type: 'regular',
        tag: 'Regular / Técnica',
        text: "Durante 20 años coordiné el desarrollo de sistemas y la red de energía con EDEMSA, pero ahora quiero enfocarme en aplicar Inteligencia Artificial en un nuevo proyecto.",
        coaching: "⚠️ REGULAR: Suena a resumen curricular de tareas. Habla de proyectos técnicos, pero no demuestra liderazgo de negocio ni ambición C-Level."
      },
      {
        id: 'opt3',
        type: 'c-level',
        tag: 'Ejecutiva C-Level ✨',
        text: "Busco dar el siguiente paso porque alcancé mi techo de impacto: convertí una operación técnica local en un negocio rentable y diversificado de escala regional, y hoy busco un desafío donde mi visión de arquitectura estratégica y tracción de negocio muevan la aguja a una escala superior.",
        coaching: "🏆 EXCELENTE (C-Level): Arranca con el PUNCHLINE directo al hueso. Transmite éxito, liderazgo P&L, orgullo de gestión y ambición ejecutiva por mayores escalas."
      }
    ]
  },
  {
    id: 2,
    category: "Impacto en Negocio & EDEMSA",
    question: "¿Cuál es tu mayor logro de impacto tecnológico y comercial?",
    options: [
      {
        id: 'opt1',
        type: 'defensive',
        tag: 'Defensiva / Monótona',
        text: "En la vertical de energía nos fue bastante bien, sobre todo con el cliente EDEMSA donde aumentamos la facturación.",
        coaching: "❌ EVITAR: Pasivo e impreciso. No adueñarte de los números te quita la autoridad ejecutiva que ganaste con 25 años de carrera."
      },
      {
        id: 'opt2',
        type: 'regular',
        tag: 'Regular / Técnica',
        text: "Desarrollé la ingeniería del pilar de medición y auditoría de pérdidas eléctricas en baja tensión para EDEMSA bajo la resolución EPRE 129/18.",
        coaching: "⚠️ REGULAR: Demasiado enfocado en el detalle regulatorio e ingeniería pura. A un Board C-Level le falta la traducción en revenue."
      },
      {
        id: 'opt3',
        type: 'c-level',
        tag: 'Ejecutiva C-Level ✨',
        text: "Lideré el diseño y negociación de la solución de control de pérdidas eléctricas para EDEMSA, convirtiendo una innovación de ingeniería en una línea de ingresos recurrente que impulsó un crecimiento interanual del 90% en la facturación de nuestra vertical de energía.",
        coaching: "🏆 EXCELENTE: Relaciona la arquitectura de software directa con la caja ($). Muestra capacidad de negociación C-Level y visión P&L."
      }
    ]
  },
  {
    id: 3,
    category: "Innovación & Eficiencia",
    question: "¿Cómo aplicás la Inteligencia Artificial y la innovación pragmática en tus proyectos?",
    options: [
      {
        id: 'opt1',
        type: 'defensive',
        tag: 'Defensiva / Monótona',
        text: "Usamos ChatGPT y copilot para codear más rápido en el equipo y pasamos de la nube a servidores propios para gastar menos.",
        coaching: "❌ EVITAR: Suena a 'hacker de trinchera' o solución casera. Falta sofisticación ejecutiva en la dicción."
      },
      {
        id: 'opt2',
        type: 'c-level',
        tag: 'Ejecutiva C-Level ✨',
        text: "Reestructuré el ciclo de desarrollo e infraestructura integrando IA generativa en el flujo de ingeniería y migrando a servidores dedicados de alto rendimiento, lo que redujo un 75% los costos operacionales y aceleró el time-to-market a la mitad.",
        coaching: "🏆 EXCELENTE: Palabras clave impecables (Cycle-time, OpEx, Time-to-Market). Traduce tecnología en eficiencia operacional medible."
      },
      {
        id: 'opt3',
        type: 'regular',
        tag: 'Regular / Técnica',
        text: "Armé un pipeline de desarrollo asistido por IA para que los desarrolladores automaticen pruebas unitarias y refactoricen código antiguo.",
        coaching: "⚠️ REGULAR: Vende la tarea técnica del desarrollador pero olvida el impacto financiero de alto nivel."
      }
    ]
  },
  {
    id: 4,
    category: "Estilo de Liderazgo",
    question: "¿Cómo definís tu estilo de liderazgo de equipos?",
    options: [
      {
        id: 'opt1',
        type: 'regular',
        tag: 'Regular / Técnica',
        text: "Hago un seguimiento diario constante, controlo los entregables de cada desarrollador y mantengo una cadencia alta de trabajo.",
        coaching: "⚠️ REGULAR: Puede sonar a micromanagement o supervisión rígida de tareas si no se enfatiza la autonomía."
      },
      {
        id: 'opt2',
        type: 'c-level',
        tag: 'Ejecutiva C-Level ✨',
        text: "Lidero con la disciplina del maratonista: el éxito en tecnología no es el sprint desesperado de una noche sin dormir, sino la cadencia diaria sostenida de un equipo alineado que no afloja el ritmo.",
        coaching: "🏆 EXCELENTE: Usa la analogía del running como filosofía inspiradora de constancia y alineamiento estratégico de alto rendimiento."
      },
      {
        id: 'opt3',
        type: 'defensive',
        tag: 'Defensiva / Monótona',
        text: "Intento liderar dando el ejemplo, me gusta correr maratones y aplico la disciplina del deporte en el trabajo diario.",
        coaching: "❌ EVITAR: Arrancar por la metáfora personal antes del concepto de gestión puede sonar ensayado o poco profesional."
      }
    ]
  }
];

// ----------------------------------------------------
// DATA: STORIES PAR FOR PITCH TIMER
// ----------------------------------------------------
const PAR_STORIES = [
  {
    id: 'story1',
    title: 'Transición tras 20+ Años',
    targetTime: 60,
    punchline: "Busco dar el siguiente paso porque alcancé mi techo de impacto: convertí una operación técnica local en un negocio rentable y diversificado de escala regional, y hoy busco un desafío donde mi visión de arquitectura estratégica mueva la aguja a otra escala.",
    action: "Durante mi trayectoria estructuré y lideré las verticales de Video Broadcast y Energía, armando equipos autónomos y optimizando la estructura operativa con innovación pragmática.",
    result: "Dejo una operación consolidada, altamente eficiente que funciona sin micromanagement y con un crecimiento del 90% interanual en la división de energía."
  },
  {
    id: 'story2',
    title: 'Caso EDEMSA (+90% Facturación)',
    targetTime: 90,
    punchline: "Lideré el diseño e implementación de la solución de ingeniería de control de pérdidas eléctricas en baja tensión para EDEMSA, impulsando un 90% de incremento interanual en la facturación de nuestra vertical de energía.",
    action: "Identifiqué ineficiencias en la red, diseñé la arquitectura de medición y auditoría conforme a la normativa EPRE, y negocié directamente la adopción con el Directorio del cliente.",
    result: "Transformamos un proyecto de ingeniería en una línea de ingresos recurrente y de alto margen para la compañía."
  },
  {
    id: 'story3',
    title: 'Eficiencia IA & Migración Cloud (-75%)',
    targetTime: 60,
    punchline: "Reestructuré el ciclo de desarrollo e infraestructura, logrando una reducción del 75% en costos operacionales y acelerando el time-to-market a la mitad mediante IA y migración on-premise.",
    action: "Audité los costos cloud, integré herramientas de IA generativa para automatizar testing y refactorización, y re-platformeamos a servidores dedicados de alta disponibilidad.",
    result: "Liberamos el 75% del tiempo de nuestros seniors y eliminamos costos fijos mensuales recurrentes en dólares."
  }
];

// ----------------------------------------------------
// DATA: FLASHCARDS VOCABULARIO
// ----------------------------------------------------
const VOCABULARY_CARDS = [
  {
    id: 1,
    term: "Visión & P&L (Profit and Loss)",
    avoid: "Manejo el presupuesto o la plata del proyecto",
    definition: "Capacidad de tomar decisiones técnicas priorizando el margen financiero, los ingresos y la sostenibilidad económica del negocio.",
    example: "Mis decisiones de arquitectura siempre están alineadas con la optimización del P&L y el margen operativo."
  },
  {
    id: 2,
    term: "Reducción del Time-to-Market",
    avoid: "Hacemos los desarrollos más rápido",
    definition: "Disminución del tiempo total que transcurre desde la concepción de una idea hasta su puesta en producción en manos del cliente.",
    example: "Al integrar IA en la suite de ingeniería, recortamos el time-to-market de nuestras soluciones a la mitad."
  },
  {
    id: 3,
    term: "Gestión de Stakeholders C-Level",
    avoid: "Le explico las cosas técnicas al cliente",
    definition: "Habilidad para negociar, alinear expectativas y comunicar valor tecnológico con Directores, CEOS y Gerentes Generales.",
    example: "Negocié directamente con los stakeholders de EDEMSA la implementación del marco regulatorio de pérdidas."
  },
  {
    id: 4,
    term: "Gestión del Cambio (Change Management)",
    avoid: "Les enseñé a usar nuevas herramientas",
    definition: "Proceso estructurado para acompañar a los equipos en la adopción fluida de nuevas metodologías, tecnologías y culturas de trabajo.",
    example: "Lideré la gestión del cambio para que la adopción de herramientas de IA no generara resistencia en los desarrolladores."
  },
  {
    id: 5,
    term: "Optimización de OpEx & CapEx",
    avoid: "Ahorramos costos de servidores",
    definition: "Gestión eficiente entre gastos de capital en infraestructura (CapEx) y gastos operativos continuos (OpEx).",
    example: "La migración on-premise nos permitió transformar un OpEx en dólares en una inversión amortizable altamente rentable."
  }
];

// ----------------------------------------------------
// DATA: OBAMA METHOD 14 DAY TRACKER
// ----------------------------------------------------
const OBAMA_PLAN = [
  { day: 1, title: "El Arte de la Pausa de 2 Segundos", task: "Grabate respondiendo una pregunta forzando 2s de silencio antes de abrir la boca." },
  { day: 2, title: "Tonalidad Descendente", task: "Leé 5 oraciones del Playbook haciendo que la última palabra caiga en tono grave." },
  { day: 3, title: "La Caja de Gestos", task: "Grabate usando la Pirámide de Confianza (Finger Steeple) durante cada pausa." },
  { day: 4, title: "Eliminación de Muletillas", task: "Reemplazá todos los 'Eh...' por silencios absolutos de 1 segundo." },
  { day: 5, title: "La Regla de Tres", task: "Estructurá tu presentación en 3 pilares clarísimos." },
  { day: 6, title: "Toma 1 (Video Exagerado)", task: "Grabate gesticulando al máximo para soltar músculos faciales." },
  { day: 7, title: "Toma 2 (Video Robótico)", task: "Grabate totalmente plano para tomar conciencia del modo automático." },
  { day: 8, title: "Toma 3 (Video Diplomático)", task: "Grabate en modo Obama: pausas, mirada fija y cadencia barítona." },
  { day: 9, title: "Simulación Escenario 1", task: "Practicar el pitch de Salida tras 20 años en la Web App." },
  { day: 10, title: "Simulación Escenario 2", task: "Practicar el pitch del Caso EDEMSA en el Pitch Timer." },
  { day: 11, title: "Simulación Escenario 3", task: "Practicar el pitch de Innovación IA en el Pitch Timer." },
  { day: 12, title: "Barrido Visual Lento", task: "Mantener contacto visual continuo con la lente durante 15 segundos sin pestañear desordenado." },
  { day: 13, title: "Ensayo General C-Level", task: "Grabar tu pitch completo de 3 minutos integrando las 3 historias P-A-R." },
  { day: 14, title: "Auditoría Final", task: "Comparar tu video del Día 1 con el del Día 13 y validar postura diplomática." }
];

// ----------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------
export default function App() {
  const [activeTab, setActiveTab] = useState('obama');

  // QUIZ STATE
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);

  // TIMER STATE
  const [selectedStory, setSelectedStory] = useState(PAR_STORIES[0]);
  const [timeLeft, setTimeLeft] = useState(PAR_STORIES[0].targetTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // CHECKLIST STATE
  const [checklist, setChecklist] = useState({
    linkedin: false,
    salary: false,
    tone: false,
    teamMail: false
  });

  const [copiedMail, setCopiedMail] = useState(false);

  // OBAMA TRACKER STATE
  const [completedDays, setCompletedDays] = useState({});

  // TIMER EFFECT
  useEffect(() => {
    let timer = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const handleStoryChange = (story) => {
    setSelectedStory(story);
    setTimeLeft(story.targetTime);
    setIsTimerRunning(false);
  };

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(selectedStory.targetTime);
  };

  // QUIZ OPTION SELECT
  const handleSelectOption = (questionId, option) => {
    setSelectedOptions(prev => ({ ...prev, [questionId]: option }));
    if (option.type === 'c-level') {
      setScore(s => s + 10);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleCopyMail = () => {
    const mailText = `Asunto: Reagendamiento operativo por compromiso ejecutivo - Lunes 14\n\nHola equipo,\nPor compromisos de agenda ejecutiva este lunes 14, moveremos el inicio de nuestras reuniones habituales. Arrancaremos puntualmente a las 10:00 hs (en lugar de las 09:00 hs).\nLes pido que aprovechen esa primera hora para avanzar en sus tareas individuales priorizadas y estar listos con el estado de avance a las 10:00.\n¡Gracias por la flexibilidad!`;
    navigator.clipboard.writeText(mailText);
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 3000);
  };

  const toggleDayComplete = (day) => {
    setCompletedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">
            <Crown size={26} />
          </div>
          <div className="brand-text">
            <h1>CTO Pitch Coach</h1>
            <p>Método Barack Obama & Oratoria Diplomática C-Level ($11M+ ARS)</p>
          </div>
        </div>

        <div className="user-badge">
          <Award size={18} className="text-emerald-400" />
          <span>Candidato: <strong>Diego Musach</strong></span>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="nav-tabs">
        <button 
          className={`tab-btn ${activeTab === 'obama' ? 'active' : ''}`}
          onClick={() => setActiveTab('obama')}
        >
          <Crown size={18} /> Método Barack Obama (Diplomático)
        </button>

        <button 
          className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          <Target size={18} /> Simulador Opción Múltiple
        </button>

        <button 
          className={`tab-btn ${activeTab === 'timer' ? 'active' : ''}`}
          onClick={() => setActiveTab('timer')}
        >
          <Clock size={18} /> Pitch Timer & Teleprompter
        </button>

        <button 
          className={`tab-btn ${activeTab === 'vocab' ? 'active' : ''}`}
          onClick={() => setActiveTab('vocab')}
        >
          <BookOpen size={18} /> Vocabulario C-Level
        </button>

        <button 
          className={`tab-btn ${activeTab === 'agenda' ? 'active' : ''}`}
          onClick={() => setActiveTab('agenda')}
        >
          <Calendar size={18} /> Agenda & Checklist Lunes 14
        </button>

        <button 
          className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTab('video')}
        >
          <Video size={18} /> Ejercicio Video Extremos
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="content-area">

        {/* TAB 0: METODO BARACK OBAMA */}
        {activeTab === 'obama' && (
          <div>
            {/* HERO BARACK OBAMA METHOD */}
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.8), rgba(15,23,42,0.9))', border: '1px solid rgba(129,140,248,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#c7d2fe', marginBottom: '8px' }}>
                <Crown size={24} className="text-amber-400" />
                <span style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
                  Metodología de Oratoria de Alto Impacto
                </span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
                De Oratoria de Trinchera ("Mono") a Presencia Diplomática (Estilo Barack Obama)
              </h2>
              <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '900px' }}>
                Para dejar de expresarte de forma acelerada, rígida o defensiva y transmitir la calma inquebrantable de un líder internacional, tenés que dominar la física del silencio, la entonación barítona descendente y la gesticulación de caja.
              </p>
            </div>

            {/* 5 PILARES DIPLOMATICOS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              
              <div className="glass-card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#34d399', fontWeight: '700', marginBottom: '10px' }}>
                  <Volume2 size={22} />
                  <span>1. La Pausa de 2 Segundos</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Al recibir la pregunta, <strong>no abras la boca durante 2s</strong>. Mantené la mirada fija y asentí suavemente. Quien domina el silencio domina la sala.
                </p>
              </div>

              <div className="glass-card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', fontWeight: '700', marginBottom: '10px' }}>
                  <ShieldCheck size={22} />
                  <span>2. Inflexión Descendente</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Al cerrar cada frase, <strong>baja el tono vocal (tono grave/barítono)</strong>. Nunca la subas como duda. Cierra las oraciones con autoridad categórica.
                </p>
              </div>

              <div className="glass-card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a78bfa', fontWeight: '700', marginBottom: '10px' }}>
                  <Sparkles size={22} />
                  <span>3. Pirámide de Confianza</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Manos dentro de la "Caja Ejecutivo" (ombligo a pecho). Al pausar, juntá suavemente las yemas de los dedos (Finger Steeple diplomático).
                </p>
              </div>

              <div className="glass-card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#facc15', fontWeight: '700', marginBottom: '10px' }}>
                  <Target size={22} />
                  <span>4. La Regla de Tres</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  El cerebro recuerda en tríadas. Estructurá tus ideas en 3 puntos claros: <em>"Eficiencia de P&L, IA pragmática y equipos autónomos"</em>.
                </p>
              </div>

            </div>

            {/* COMPARATIVA REEL / VIDEO SCRIPT */}
            <div className="glass-card">
              <h3 className="card-title">
                <Video size={22} className="text-purple-400" />
                Desglose Didáctico Comparativo (Reel & Video Script)
              </h3>
              <p className="card-subtitle">Comparación escena por escena de cómo suena la respuesta según la postura:</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* LADO TRINCHERA */}
                <div style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)', padding: '20px', borderRadius: '12px' }}>
                  <h4 style={{ color: '#f87171', fontWeight: '700', marginBottom: '12px' }}>❌ Estilo Trinchera / "Mono" (Acelerado)</h4>
                  <ul style={{ fontSize: '0.9rem', color: '#fda4af', lineHeight: '1.7', listStyle: 'none' }}>
                    <li style={{ marginBottom: '8px' }}>• <strong>Arrancás inmediato:</strong> <em>"A ver, en 21 años el status quo..."</em> (Sin pausa).</li>
                    <li style={{ marginBottom: '8px' }}>• <strong>Tono vocal:</strong> Agudo, acelerado, con muletillas (<em>"Eh...", "O sea..."</em>).</li>
                    <li style={{ marginBottom: '8px' }}>• <strong>Postura:</strong> Hombros caídos o tensos, mirada perdida hacia arriba.</li>
                    <li>• <strong>Frase final:</strong> <em>"Y bueno, las dos verticales se estancaron un poco?"</em> (Subiendo tono).</li>
                  </ul>
                </div>

                {/* LADO OBAMA */}
                <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', padding: '20px', borderRadius: '12px' }}>
                  <h4 style={{ color: '#34d399', fontWeight: '700', marginBottom: '12px' }}>👑 Estilo Diplomático / Barack Obama</h4>
                  <ul style={{ fontSize: '0.9rem', color: '#6ee7b7', lineHeight: '1.7', listStyle: 'none' }}>
                    <li style={{ marginBottom: '8px' }}>• <strong>Pausa de 2s:</strong> Silencio total, asentimiento leve con la mirada fija.</li>
                    <li style={{ marginBottom: '8px' }}>• <strong>Tono vocal:</strong> Grave, pausado, cadencia respirada diafragmática.</li>
                    <li style={{ marginBottom: '8px' }}>• <strong>Postura:</strong> Pecho abierto, manos en la pirámide de confianza.</li>
                    <li>• <strong>Frase final:</strong> <em>"Alcancé mi techo de impacto. Hoy busco mover la aguja a escala regional."</em> (Bajando tono).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* TRACKER DIDACTICO DE 14 DIAS */}
            <div className="glass-card">
              <h3 className="card-title">
                <Calendar size={22} className="text-indigo-400" />
                Ruta Didáctica de 14 Días (Entrenamiento Diario)
              </h3>
              <p className="card-subtitle">Completá una tarea práctica de 5 minutos por día para fijar el hábito en tu memoria muscular:</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {OBAMA_PLAN.map((item) => {
                  const isDone = completedDays[item.day];
                  return (
                    <div 
                      key={item.day}
                      onClick={() => toggleDayComplete(item.day)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '10px',
                        background: isDone ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
                        border: isDone ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <input 
                        type="checkbox" 
                        checked={!!isDone} 
                        onChange={() => {}}
                        style={{ marginTop: '3px', width: '16px', height: '16px' }}
                      />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: isDone ? '#34d399' : 'var(--text-main)' }}>
                          Día {item.day}: {item.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {item.task}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: QUIZ SIMULATOR */}
        {activeTab === 'quiz' && (
          <div>
            <div className="glass-card">
              <div className="quiz-progress">
                <span>Escenario {currentQuizIdx + 1} de {QUIZ_QUESTIONS.length} — <strong>{QUIZ_QUESTIONS[currentQuizIdx].category}</strong></span>
                <span className="text-emerald-400 font-bold">Puntaje C-Level: {score} pts</span>
              </div>

              <h2 className="card-title">
                <Zap size={22} className="text-indigo-400" />
                {QUIZ_QUESTIONS[currentQuizIdx].question}
              </h2>
              <p className="card-subtitle">Elegí la opción que mejor posicione tu seniority frente a un CEO o Headhunter:</p>

              <div className="options-list">
                {QUIZ_QUESTIONS[currentQuizIdx].options.map((opt) => {
                  const isSelected = selectedOptions[QUIZ_QUESTIONS[currentQuizIdx].id]?.id === opt.id;
                  let btnClass = "";
                  if (isSelected) {
                    if (opt.type === 'c-level') btnClass = 'selected-c-level';
                    else if (opt.type === 'regular') btnClass = 'selected-regular';
                    else btnClass = 'selected-defensive';
                  }

                  return (
                    <button 
                      key={opt.id}
                      className={`option-btn ${btnClass}`}
                      onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentQuizIdx].id, opt)}
                    >
                      <span className={`option-tag tag-${opt.type}`}>{opt.tag}</span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* FEEDBACK DISPLAY */}
              {selectedOptions[QUIZ_QUESTIONS[currentQuizIdx].id] && (
                <div className={`feedback-box ${selectedOptions[QUIZ_QUESTIONS[currentQuizIdx].id].type}`}>
                  <div className="feedback-header">
                    {selectedOptions[QUIZ_QUESTIONS[currentQuizIdx].id].type === 'c-level' && <CheckCircle2 size={22} className="text-emerald-400" />}
                    {selectedOptions[QUIZ_QUESTIONS[currentQuizIdx].id].type === 'regular' && <AlertCircle size={22} className="text-amber-400" />}
                    {selectedOptions[QUIZ_QUESTIONS[currentQuizIdx].id].type === 'defensive' && <XCircle size={22} className="text-rose-400" />}
                    <span>Feedback del Coach (Mariana Castrelos Framework)</span>
                  </div>
                  <p>{selectedOptions[QUIZ_QUESTIONS[currentQuizIdx].id].coaching}</p>
                </div>
              )}

              {/* NEXT / PREV NAVIGATION */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                <button 
                  className="btn-secondary"
                  disabled={currentQuizIdx === 0}
                  onClick={() => setCurrentQuizIdx(i => Math.max(0, i - 1))}
                >
                  Anterior
                </button>

                <button 
                  className="btn-primary"
                  disabled={currentQuizIdx === QUIZ_QUESTIONS.length - 1}
                  onClick={() => setCurrentQuizIdx(i => Math.min(QUIZ_QUESTIONS.length - 1, i + 1))}
                >
                  Siguiente Escenario <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PITCH TIMER & TELEPROMPTER */}
        {activeTab === 'timer' && (
          <div className="glass-card">
            <h2 className="card-title">
              <Clock size={22} className="text-indigo-400" />
              Pitch Timer & Teleprompter P-A-R (con Pausas Guiadas [2s])
            </h2>
            <p className="card-subtitle">Entrená la fluidez de tus historias ejecutivas con cronómetro y lectura P-A-R en modo Obama:</p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {PAR_STORIES.map((s) => (
                <button 
                  key={s.id}
                  className={`btn-secondary ${selectedStory.id === s.id ? 'active' : ''}`}
                  style={{ 
                    borderColor: selectedStory.id === s.id ? 'var(--primary)' : 'var(--border-color)',
                    background: selectedStory.id === s.id ? 'rgba(99,102,241,0.15)' : ''
                  }}
                  onClick={() => handleStoryChange(s)}
                >
                  {s.title}
                </button>
              ))}
            </div>

            <div className="timer-container">
              {/* CONTROLS */}
              <div className="timer-controls-card glass-card" style={{ padding: '20px' }}>
                <div className={`timer-circle ${isTimerRunning ? 'running' : ''}`}>
                  <span className="timer-digits">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                  <span className="timer-label">{isTimerRunning ? 'En marcha' : 'Pausado'}</span>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn-primary" onClick={toggleTimer}>
                    {isTimerRunning ? 'Pausar' : 'Arrancar Pitch'}
                  </button>
                  <button className="btn-secondary" onClick={resetTimer}>
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>

              {/* TELEPROMPTER WITH PAUSES */}
              <div className="teleprompter-box">
                <div style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#fde047', marginBottom: '16px' }}>
                  🛑 <strong>REGLA OBAMA:</strong> Cuando leas <code>[PAUSA 2S]</code>, frená la voz por completo, asentí con la mirada fija y continuá en tono barítono grave.
                </div>

                <div className="par-section punchline">
                  <div className="par-title">1. PUNCHLINE (Respuesta Directa Primero)</div>
                  <p style={{ fontSize: '1.05rem', fontWeight: '600', color: '#34d399' }}>
                    <span style={{ color: '#facc15', fontSize: '0.8rem', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', marginRight: '6px' }}>[PAUSA 2S]</span>
                    "{selectedStory.punchline}"
                  </p>
                </div>

                <div className="par-section action">
                  <div className="par-title">2. ACCIÓN (Evidencia Técnica & Gestión)</div>
                  <p style={{ fontSize: '0.95rem' }}>
                    <span style={{ color: '#facc15', fontSize: '0.8rem', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', marginRight: '6px' }}>[PAUSA 1S]</span>
                    "{selectedStory.action}"
                  </p>
                </div>

                <div className="par-section result">
                  <div className="par-title">3. RESULTADO DE NEGOCIO (Métricas P&L)</div>
                  <p style={{ fontSize: '0.95rem', color: '#38bdf8' }}>
                    <span style={{ color: '#facc15', fontSize: '0.8rem', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', marginRight: '6px' }}>[PAUSA 2S]</span>
                    "{selectedStory.result}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VOCABULARIO C-LEVEL */}
        {activeTab === 'vocab' && (
          <div>
            <div className="glass-card" style={{ marginBottom: '20px' }}>
              <h2 className="card-title">
                <BookOpen size={22} className="text-emerald-400" />
                Matriz de Vocabulario & Competencias C-Level
              </h2>
              <p className="card-subtitle">
                Reemplazá términos planos o de trinchera por palabras clave del negocio corporativo ($11M+):
              </p>
            </div>

            <div className="flashcards-grid">
              {VOCABULARY_CARDS.map((item) => (
                <div key={item.id} className="flashcard">
                  <div>
                    <div className="flashcard-avoid">❌ Evitar: "{item.avoid}"</div>
                    <div className="flashcard-term">✨ {item.term}</div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                      {item.definition}
                    </p>
                  </div>

                  <div style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    padding: '10px 14px', 
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--accent-emerald)',
                    fontSize: '0.85rem'
                  }}>
                    <strong>Ejemplo C-Level:</strong> "{item.example}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: AGENDA LUNES 14 */}
        {activeTab === 'agenda' && (
          <div>
            <div className="glass-card">
              <h2 className="card-title">
                <Calendar size={22} className="text-indigo-400" />
                Agenda & Preparación para el Lunes 14
              </h2>
              <p className="card-subtitle">
                Organización de compromisos con Mariana Castrelos (09:00 hs) y reestructuración de tu equipo:
              </p>

              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', color: '#38bdf8' }}>
                  Checklist de Dudas para Mariana Castrelos
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={checklist.linkedin}
                      onChange={(e) => setChecklist(c => ({...c, linkedin: e.target.checked}))}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span>Revisar titular de LinkedIn para balancear 20 años de seniority con búsqueda C-Level</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={checklist.salary}
                      onChange={(e) => setChecklist(c => ({...c, salary: e.target.checked}))}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span>Definir estrategia de pretensión salarial (Base 11M + paquete de beneficios)</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={checklist.tone}
                      onChange={(e) => setChecklist(c => ({...c, tone: e.target.checked}))}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span>Ajustar fluidez discursiva para evitar bloqueo en preguntas de competencias</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#34d399' }}>
                  Plantilla de Mensaje para tu Equipo (Reunión Lunes 10:00 hs)
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Copiá este mensaje para enviarle a tu equipo y mover el arranque habitual de las 09:00 a las 10:00 hs:
                </p>

                <div className="copy-template-box">
                  Asunto: Reagendamiento operativo por compromiso ejecutivo - Lunes 14{"\n\n"}
                  Hola equipo,{"\n"}
                  Por compromisos de agenda ejecutiva este lunes 14, moveremos el inicio de nuestras reuniones habituales. Arrancaremos puntualmente a las 10:00 hs (en lugar de las 09:00 hs).{"\n"}
                  Les pido que aprovechen esa primera hora para avanzar en sus tareas individuales priorizadas y estar listos con el estado de avance a las 10:00.{"\n"}
                  ¡Gracias por la flexibilidad!
                </div>

                <button className="btn-primary" onClick={handleCopyMail}>
                  <Copy size={16} />
                  {copiedMail ? '¡Copiado al Portapapeles!' : 'Copiar Plantilla de Mensaje'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EJERCICIO VIDEO */}
        {activeTab === 'video' && (
          <div className="glass-card">
            <h2 className="card-title">
              <Video size={22} className="text-purple-400" />
              Técnica de los Extremos (Ejercicio en Video)
            </h2>
            <p className="card-subtitle">
              Mariana Castrelos te asignó grabar 3 videos de 1 minuto para romper la rigidez de oratoria:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.3)', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ color: '#f87171', marginBottom: '8px', fontSize: '1.1rem' }}>🎭 Toma 1: Exagerada / Payasesca</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Gesticulá de más, hablá eufórico y apasionado. Es para romper la timidez y soltar la rigidez facial.
                </p>
              </div>

              <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ color: '#fbbf24', marginBottom: '8px', fontSize: '1.1rem' }}>🤖 Toma 2: Monótona / Robótica</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Hablá plano, sin mover la cara ni parpadear. Es para identificar conscientemente cuándo entrás en piloto automático.
                </p>
              </div>

              <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ color: '#34d399', marginBottom: '8px', fontSize: '1.1rem' }}>⚖️ Toma 3: Equilibrada C-Level</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Hablá relajado como en un café con un par. Sonreí al iniciar, hacé pausas de 1 segundo tras el Punchline y proyectá serenidad.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
