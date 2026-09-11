import React, { useState, useEffect } from 'react';
import { 
  Award, Play, RotateCcw, CheckCircle2, XCircle, AlertCircle, 
  Clock, BookOpen, Calendar, Video, Copy, Sparkles, ChevronRight, Zap, Target, Crown, Volume2, ShieldCheck, Wand2, Trophy, Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from './utils/audio';

import StoryGenerator from './components/StoryGenerator';
import MasterExam from './components/MasterExam';
import VideoMasterclass from './components/VideoMasterclass';
import SpeechStudio from './components/SpeechStudio';
import RhetoricToolkit from './components/RhetoricToolkit';

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
    definition: "Habilidad para negociar, alinear expectativas y comunicar valor tecnológico con Directores, CEOs y Gerentes Generales.",
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
  { day: 9, title: "Simulación Escenario 1", task: "Practicar el pitch de Salida tras 20 años en el Generador de Historias." },
  { day: 10, title: "Simulación Escenario 2", task: "Practicar el pitch del Caso EDEMSA en el Estudio de Ritmo." },
  { day: 11, title: "Simulación Escenario 3", task: "Practicar el pitch de Innovación IA en el Estudio de Ritmo." },
  { day: 12, title: "Barrido Visual Lento", task: "Mantener contacto visual continuo con la lente durante 15 segundos." },
  { day: 13, title: "Ensayo General C-Level", task: "Rendir el Examen de Maestría en Oratoria." },
  { day: 14, title: "Auditoría Final", task: "Comparar tu video del Día 1 con el del Día 13 y validar postura diplomática." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [completedDays, setCompletedDays] = useState({});
  const [copiedMail, setCopiedMail] = useState(false);

  const handleTabChange = (tab) => {
    soundFX.playClick();
    setActiveTab(tab);
  };

  const toggleDayComplete = (day) => {
    soundFX.playClick();
    setCompletedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleCopyMail = () => {
    soundFX.playClick();
    const mailText = `Asunto: Reagendamiento operativo por compromiso ejecutivo - Lunes 14\n\nHola equipo,\nPor compromisos de agenda ejecutiva este lunes 14, moveremos el inicio de nuestras reuniones habituales. Arrancaremos puntualmente a las 10:00 hs (en lugar de las 09:00 hs).\nLes pido que aprovechen esa primera hora para avanzar en sus tareas individuales priorizadas y estar listos con el estado de avance a las 10:00.\n¡Gracias por la flexibilidad!`;
    navigator.clipboard.writeText(mailText);
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 3000);
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
            <h1>CTO Pitch & Storytelling Coach</h1>
            <p>Oratoria Diplomática Estilo Barack Obama & Posicionamiento C-Level ($11M+ ARS)</p>
          </div>
        </div>

        <div className="user-badge">
          <Award size={18} className="text-emerald-400" />
          <span>Candidato: <strong>Diego Musach (CTO)</strong></span>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="nav-tabs">
        <button 
          className={`tab-btn ${activeTab === 'generator' ? 'active' : ''}`}
          onClick={() => handleTabChange('generator')}
        >
          <Wand2 size={18} /> Generador de Historias C-Level
        </button>

        <button 
          className={`tab-btn ${activeTab === 'masterExam' ? 'active' : ''}`}
          onClick={() => handleTabChange('masterExam')}
        >
          <Trophy size={18} /> Examen de Maestría
        </button>

        <button 
          className={`tab-btn ${activeTab === 'masterclass' ? 'active' : ''}`}
          onClick={() => handleTabChange('masterclass')}
        >
          <Video size={18} /> Masterclasses & Video Analysis
        </button>

        <button 
          className={`tab-btn ${activeTab === 'studio' ? 'active' : ''}`}
          onClick={() => handleTabChange('studio')}
        >
          <Clock size={18} /> Estudio de Ritmo & Teleprompter
        </button>

        <button 
          className={`tab-btn ${activeTab === 'rhetoric' ? 'active' : ''}`}
          onClick={() => handleTabChange('rhetoric')}
        >
          <Sparkles size={18} /> Caja de Herramientas Retóricas
        </button>

        <button 
          className={`tab-btn ${activeTab === 'obama' ? 'active' : ''}`}
          onClick={() => handleTabChange('obama')}
        >
          <Crown size={18} /> Método Obama (14 Días)
        </button>

        <button 
          className={`tab-btn ${activeTab === 'vocab' ? 'active' : ''}`}
          onClick={() => handleTabChange('vocab')}
        >
          <BookOpen size={18} /> Vocabulario C-Level
        </button>

        <button 
          className={`tab-btn ${activeTab === 'agenda' ? 'active' : ''}`}
          onClick={() => handleTabChange('agenda')}
        >
          <Calendar size={18} /> Agenda & Checklist Lunes 14
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="content-area">

        {/* TAB 1: STORY GENERATOR */}
        {activeTab === 'generator' && <StoryGenerator />}

        {/* TAB 2: MASTER EXAM */}
        {activeTab === 'masterExam' && <MasterExam />}

        {/* TAB 3: VIDEO MASTERCLASSES */}
        {activeTab === 'masterclass' && <VideoMasterclass />}

        {/* TAB 4: SPEECH STUDIO */}
        {activeTab === 'studio' && <SpeechStudio />}

        {/* TAB 5: RHETORIC TOOLKIT */}
        {activeTab === 'rhetoric' && <RhetoricToolkit />}

        {/* TAB 6: METODO BARACK OBAMA */}
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
              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#34d399', fontWeight: '700', marginBottom: '10px' }}>
                  <Volume2 size={22} />
                  <span>1. La Pausa de 2 Segundos</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  Al recibir la pregunta, <strong>no abras la boca durante 2s</strong>. Mantené la mirada fija y asentí suavemente. Quien domina el silencio domina la sala.
                </p>
              </div>

              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', fontWeight: '700', marginBottom: '10px' }}>
                  <ShieldCheck size={22} />
                  <span>2. Inflexión Descendente</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  Al cerrar cada frase, <strong>baja el tono vocal (tono grave/barítono)</strong>. Nunca la subas como duda. Cierra las oraciones con autoridad categórica.
                </p>
              </div>

              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fbbf24', fontWeight: '700', marginBottom: '10px' }}>
                  <Crown size={22} />
                  <span>3. Caja Gestual & Pirámide</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  Manos dentro de la caja ejecutiva (ombligo a pecho). Durante las pausas, junta yemas de los dedos formando la <strong>Pirámide de Confianza</strong>.
                </p>
              </div>

              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#c7d2fe', fontWeight: '700', marginBottom: '10px' }}>
                  <Sparkles size={22} />
                  <span>4. La Regla de Tres (Tricolon)</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  Estructura siempre en conjuntos de tres: <em>"Mi propuesta se apoya en 1. Eficiencia P&L, 2. Innovación IA, 3. Equipos Autónomos."</em>
                </p>
              </div>
            </div>

            {/* 14 DAY HABIT TRACKER */}
            <div className="glass-card">
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={22} className="text-amber-400" />
                Ruta Didáctica de 14 Días: De Oratoria Monótona a Diplomático
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {OBAMA_PLAN.map(item => {
                  const isDone = completedDays[item.day];
                  return (
                    <div
                      key={item.day}
                      onClick={() => toggleDayComplete(item.day)}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        background: isDone ? 'rgba(52,211,153,0.15)' : 'rgba(15,23,42,0.6)',
                        border: isDone ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: isDone ? '#34d399' : '#fbbf24' }}>
                          DÍA {item.day}
                        </span>
                        {isDone ? <CheckCircle2 size={16} className="text-emerald-400" /> : <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }} />}
                      </div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{item.task}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: VOCABULARIO C-LEVEL */}
        {activeTab === 'vocab' && (
          <div>
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,27,75,0.95))', border: '1px solid rgba(99,102,241,0.3)' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
                Matriz de Vocabulario Ejecutivo & Conceptos Clave
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                Reemplazá expresiones operativas o de trinchera por palabras clave de alto impacto financiero y estratégico.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {VOCABULARY_CARDS.map(card => (
                <div key={card.id} className="glass-card">
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#fbbf24', textTransform: 'uppercase' }}>
                    Término C-Level #0{card.id}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff', margin: '6px 0 12px' }}>
                    {card.term}
                  </h3>

                  <div style={{ padding: '10px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#fca5a5', fontWeight: '700' }}>❌ Evitar Decir:</span>
                    <p style={{ fontSize: '0.88rem', color: '#f8fafc', marginTop: '2px' }}>"{card.avoid}"</p>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700' }}>Definición de Negocio:</span>
                    <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '2px' }}>{card.definition}</p>
                  </div>

                  <div style={{ padding: '10px', borderRadius: '6px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
                    <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: '700' }}>✅ Ejemplo en Oración:</span>
                    <p style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: '600', marginTop: '2px' }}>"{card.example}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: AGENDA & CHECKLIST LUNES 14 */}
        {activeTab === 'agenda' && (
          <div>
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.9), rgba(15,23,42,0.95))', border: '1px solid rgba(245,158,11,0.3)' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
                Agenda & Preparación para el Lunes 14
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                Reorganización de equipo y temas clave para la sesión ejecutiva con Mariana Castrelos (09:00 hs).
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* CHECKLIST MARIANA */}
              <div className="glass-card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} className="text-amber-400" />
                  Dudas Pendientes con Mariana Castrelos
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fbbf24' }}>1. Titular de LinkedIn</h4>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
                      ¿Cómo equilibrar la trayectoria de 20 años con el posicionamiento C-Level regional? (Ej: "CTO | Executive Tech Leader | AI Innovation").
                    </p>
                  </div>

                  <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#38bdf8' }}>2. Estrategia Salarial ($11M+ ARS)</h4>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
                      Desglose de salario fijo, bono por desempeño y equity/stock options en primeras entrevistas.
                    </p>
                  </div>
                </div>
              </div>

              {/* EMAIL TEMPLATE FOR TEAM */}
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Copy size={18} className="text-emerald-400" />
                    Mail para Reorganizar Reuniones de Equipo
                  </h3>

                  <button
                    onClick={handleCopyMail}
                    className="action-btn-primary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', background: copiedMail ? '#10b981' : 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    {copiedMail ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                    {copiedMail ? '¡Copiado!' : 'Copiar Mail'}
                  </button>
                </div>

                <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                  <strong>Asunto: Reagendamiento operativo por compromiso ejecutivo - Lunes 14</strong><br /><br />
                  Hola equipo,<br />
                  Por compromisos de agenda ejecutiva este lunes 14, moveremos el inicio de nuestras reuniones habituales. Arrancaremos puntualmente a las <strong>10:00 hs</strong> (en lugar de las 09:00 hs).<br />
                  Les pido que aprovechen esa primera hora para avanzar en sus tareas individuales priorizadas y estar listos con el estado de avance a las 10:00.<br />
                  ¡Gracias por la flexibilidad!
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
