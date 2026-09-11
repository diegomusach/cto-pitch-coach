import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, AlertCircle, RefreshCw, Trophy, Crown, Sparkles, ShieldCheck, Zap, ArrowRight, Download, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

const MASTER_QUESTIONS = [
  {
    id: 1,
    category: "Salida y Transición",
    question: "¿Por qué estás buscando un cambio profesional tras más de 20 años en Bromteck?",
    options: [
      {
        id: 'opt1',
        type: 'defensive',
        points: 0,
        tag: '❌ Defensiva / Monótona',
        text: "Sentía que en la empresa ya no había más oportunidades de crecer para mí y las dos divisiones estaban un poco estancadas.",
        coaching: "EVITAR: Te posiciona desde la queja o la pasividad ante la estructura corporativa."
      },
      {
        id: 'opt2',
        type: 'regular',
        points: 5,
        tag: '⚠️ Regular / Técnica',
        text: "Durante 20 años coordiné el desarrollo de sistemas y la red de energía con EDEMSA, pero ahora quiero enfocarme en aplicar Inteligencia Artificial.",
        coaching: "REGULAR: Suena a resumen curricular de tareas técnicas. Le falta visión estratégica de negocio C-Level."
      },
      {
        id: 'opt3',
        type: 'c-level',
        points: 10,
        tag: '🏆 Ejecutiva C-Level (Método Obama)',
        text: "Busco dar el siguiente paso porque alcancé mi techo de impacto: convertí una operación técnica local en un negocio rentable y diversificado de escala regional, y hoy busco un desafío donde mi visión mueva la aguja a una escala superior.",
        coaching: "EXCELENTE: Punchline directo al hueso. Transmite éxito, liderazgo P&L y ambición ejecutiva por mayores escalas."
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
        points: 0,
        tag: '❌ Defensiva / Monótona',
        text: "En la vertical de energía nos fue bastante bien, sobre todo con el cliente EDEMSA donde aumentamos la facturación.",
        coaching: "EVITAR: Pasivo e impreciso. No adueñarte de los números te quita autoridad ejecutiva."
      },
      {
        id: 'opt2',
        type: 'c-level',
        points: 10,
        tag: '🏆 Ejecutiva C-Level (Método Obama)',
        text: "Lideré el diseño y negociación de la solución de control de pérdidas eléctricas para EDEMSA, convirtiendo una innovación de ingeniería en una línea de ingresos recurrente que impulsó un crecimiento interanual del 90% en la facturación de nuestra vertical de energía.",
        coaching: "EXCELENTE: Relaciona la arquitectura técnica con el P&L y muestra capacidad de negociación C-Level."
      },
      {
        id: 'opt3',
        type: 'regular',
        points: 5,
        tag: '⚠️ Regular / Técnica',
        text: "Desarrollé la ingeniería del pilar de medición y auditoría de pérdidas eléctricas en baja tensión para EDEMSA bajo la resolución EPRE 129/18.",
        coaching: "REGULAR: Demasiado enfocado en el detalle normativo sin traducir en impacto financiero directo."
      }
    ]
  },
  {
    id: 3,
    category: "Innovación & OpEx",
    question: "¿Cómo integrás la Inteligencia Artificial y la eficiencia operativa?",
    options: [
      {
        id: 'opt1',
        type: 'c-level',
        points: 10,
        tag: '🏆 Ejecutiva C-Level (Método Obama)',
        text: "Reestructuré el ciclo de desarrollo e infraestructura integrando IA generativa en el flujo de ingeniería y migrando a servidores dedicados de alto rendimiento, lo que redujo un 75% los costos operacionales y aceleró el time-to-market a la mitad.",
        coaching: "EXCELENTE: Usa métricas ejecutivas impecables (Time-to-Market, OpEx, Cycle-time)."
      },
      {
        id: 'opt2',
        type: 'regular',
        points: 5,
        tag: '⚠️ Regular / Técnica',
        text: "Armé un pipeline de desarrollo asistido por IA para que los desarrolladores automaticen pruebas unitarias y refactoricen código.",
        coaching: "REGULAR: Muestra la tarea técnica pero olvida el impacto financiero del gasto cloud en dólares."
      },
      {
        id: 'opt3',
        type: 'defensive',
        points: 0,
        tag: '❌ Defensiva / Monótona',
        text: "Usamos ChatGPT y copilot para codear más rápido y pasamos de la nube a servidores propios para gastar menos.",
        coaching: "EVITAR: Lenguaje de trinchera sin sofisticación ejecutiva."
      }
    ]
  },
  {
    id: 4,
    category: "Liderazgo & Filosofía",
    question: "¿Cómo definís tu filosofía de liderazgo con equipos senior?",
    options: [
      {
        id: 'opt1',
        type: 'regular',
        points: 5,
        tag: '⚠️ Regular / Técnica',
        text: "Hago un seguimiento diario constante, controlo los entregables de cada desarrollador y mantengo una cadencia alta de trabajo.",
        coaching: "REGULAR: Puede sonar a micromanagement si no se resalta la autonomía operativa del equipo."
      },
      {
        id: 'opt2',
        type: 'defensive',
        points: 0,
        tag: '❌ Defensiva / Monótona',
        text: "Intento liderar dando el ejemplo, me gusta correr maratones y aplico la disciplina del deporte en el trabajo diario.",
        coaching: "EVITAR: Arrancar por la metáfora personal antes del concepto de gestión resta contundencia."
      },
      {
        id: 'opt3',
        type: 'c-level',
        points: 10,
        tag: '🏆 Ejecutiva C-Level (Método Obama)',
        text: "Lidero con la disciplina del maratonista: el éxito en tecnología no es el sprint desesperado de una noche sin dormir, sino la cadencia diaria sostenida de un equipo alineado que no afloja el ritmo.",
        coaching: "EXCELENTE: Metáfora inspiradora de constancia, alineamiento estratégico y alta retención."
      }
    ]
  },
  {
    id: 5,
    category: "Repregunta Hostil del Board",
    question: "Board Repregunta: 'Si estuviste 20 años en la misma empresa, ¿no estás acostumbrado a una sola forma de trabajar?'",
    options: [
      {
        id: 'opt1',
        type: 'defensive',
        points: 0,
        tag: '❌ Defensiva / Justificativa',
        text: "No bueno, pasa que en 20 años la tecnología cambió mucho y nosotros siempre estuvimos actualizados con el mercado.",
        coaching: "EVITAR: Ponerte a la defensiva valida la duda del entrevistador."
      },
      {
        id: 'opt2',
        type: 'c-level',
        points: 10,
        tag: '🏆 Ejecutiva C-Level (Método Obama)',
        text: "[Pausa de 2s] No estuve 20 años en la misma empresa; lideré la transformación de 4 etapas distintas de una organización: desde la ingeniería de transmisión hasta la creación de una unidad de negocios de energía de cero. Mi lealtad no fue a la inercia, fue a la capacidad constante de reinventar el negocio.",
        coaching: "MAESTRÍA: Re-frame absoluto de la objeción. Convierte la antigüedad en prueba de resiliencia y adaptabilidad."
      },
      {
        id: 'opt3',
        type: 'regular',
        points: 5,
        tag: '⚠️ Regular / Técnica',
        text: "En realidad pasé por muchos proyectos distintos dentro de la empresa, así que aprendí a trabajar con distintas tecnologías.",
        coaching: "REGULAR: Respuesta aceptable pero no memorable."
      }
    ]
  },
  {
    id: 6,
    category: "Estrategia Salarial ($11M+ ARS)",
    question: "¿Cuáles son tus expectativas salariales para este rol de CTO?",
    options: [
      {
        id: 'opt1',
        type: 'defensive',
        points: 0,
        tag: '❌ Defensiva / Insegura',
        text: "Y la verdad me adapto a lo que la empresa tenga presupuestado para el puesto.",
        coaching: "EVITAR: Regalás tu valor de negociación y transmitís falta de jerarquía C-Level."
      },
      {
        id: 'opt2',
        type: 'regular',
        points: 5,
        tag: '⚠️ Regular / Rígida',
        text: "Mi pretensión es de $11 millones de pesos netos por mes, menos de eso no contemplo un cambio.",
        coaching: "REGULAR: Da una cifra fija sin explorar la estructura compensatoria global (bonus + equity)."
      },
      {
        id: 'opt3',
        type: 'c-level',
        points: 10,
        tag: '🏆 Ejecutiva C-Level (Método Obama)',
        text: "[Pausa de 2s] Mi posicionamiento actual en el mercado para roles de CTO de este volumen se ubica en el rango de $11M+ ARS, estructurado de forma holística: una base competitiva acorde a la responsabilidad del P&L, más un esquema de bonus por hitos de negocio y equity que alinee mi visión a largo plazo con el crecimiento del Board.",
        coaching: "EXCELENTE: Muestra sofisticación financiera, no fija un salario rígido sin ver el paquete total y transmite autoridad."
      }
    ]
  }
];

export default function MasterExam() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examFinished, setExamFinished] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const currentQ = MASTER_QUESTIONS[currentIdx];

  const handleSelect = (option) => {
    soundFX.playClick();
    const newAnswers = { ...answers, [currentQ.id]: option };
    setAnswers(newAnswers);

    if (option.type === 'c-level') {
      soundFX.playSuccess();
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleNext = () => {
    soundFX.playClick();
    if (currentIdx < MASTER_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setExamFinished(true);
      soundFX.playFanfare();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handlePrev = () => {
    soundFX.playClick();
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const calculateResults = () => {
    let totalScore = 0;
    let maxScore = MASTER_QUESTIONS.length * 10;
    let cLevelCount = 0;

    Object.values(answers).forEach(opt => {
      totalScore += opt.points || 0;
      if (opt.type === 'c-level') cLevelCount++;
    });

    const percentage = Math.round((totalScore / maxScore) * 100);
    let level = "Orador en Desarrollo";
    let color = "#ef4444";

    if (percentage >= 90) {
      level = "👑 Maestro Orador C-Level (Estilo Barack Obama)";
      color = "#34d399";
    } else if (percentage >= 70) {
      level = "🥇 Ejecutivo de Alto Impacto";
      color = "#38bdf8";
    } else if (percentage >= 50) {
      level = "🥈 Orador Técnico Intermedio";
      color = "#fbbf24";
    }

    return { totalScore, maxScore, percentage, cLevelCount, level, color };
  };

  const handleRestart = () => {
    soundFX.playClick();
    setAnswers({});
    setCurrentIdx(0);
    setExamFinished(false);
    setShowCertificate(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER BANNER */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.9), rgba(15,23,42,0.95))', border: '1px solid rgba(129,140,248,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#c7d2fe', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              <Trophy size={20} className="text-amber-400" />
              <span>Evaluación de Competencia Ejecutiva</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: '#fff' }}>
              Examen de Maestría en Oratoria C-Level
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '4px' }}>
              Poné a prueba tu capacidad de respuesta diplomática, manejo de repreguntas hostiles y estructura P-A-R.
            </p>
          </div>

          {!examFinished && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.06)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Pregunta</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#6366f1' }}>{currentIdx + 1}</span>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>/ {MASTER_QUESTIONS.length}</span>
            </div>
          )}
        </div>
      </div>

      {!examFinished ? (
        <div className="glass-card">
          
          {/* CATEGORY & QUESTION */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 10px', borderRadius: '8px', background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>
              {currentQ.category}
            </span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#fff', marginTop: '12px', lineHeight: '1.5' }}>
              {currentQ.question}
            </h3>
          </div>

          {/* OPTIONS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {currentQ.options.map(option => {
              const isSelected = answers[currentQ.id]?.id === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: isSelected 
                      ? (option.type === 'c-level' ? 'rgba(52,211,153,0.15)' : option.type === 'regular' ? 'rgba(251,191,36,0.15)' : 'rgba(239,68,68,0.15)')
                      : 'rgba(15,23,42,0.7)',
                    border: isSelected
                      ? (option.type === 'c-level' ? '2px solid #34d399' : option.type === 'regular' ? '2px solid #fbbf24' : '2px solid #ef4444')
                      : '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem', color: isSelected ? (option.type === 'c-level' ? '#34d399' : option.type === 'regular' ? '#fbbf24' : '#ef4444') : '#94a3b8' }}>
                      {option.tag}
                    </span>
                    {isSelected && (
                      <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#fff' }}>
                        +{option.points} pts
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.95rem', color: '#f1f5f9', lineHeight: '1.6' }}>
                    {option.text}
                  </p>

                  {isSelected && (
                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', color: '#cbd5e1' }}>
                      <strong>Coaching Note:</strong> {option.coaching}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* NAVIGATION BUTTONS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="tab-btn"
              style={{ opacity: currentIdx === 0 ? 0.4 : 1, cursor: currentIdx === 0 ? 'not-allowed' : 'pointer' }}
            >
              Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
              className="action-btn-primary"
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                background: !answers[currentQ.id] ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: !answers[currentQ.id] ? '#64748b' : '#fff',
                fontWeight: '700',
                cursor: !answers[currentQ.id] ? 'not-allowed' : 'pointer',
                border: 'none'
              }}
            >
              {currentIdx === MASTER_QUESTIONS.length - 1 ? 'Finalizar Examen ✨' : 'Siguiente Pregunta →'}
            </button>
          </div>

        </div>
      ) : (
        /* RESULTS & DIPLOMA CARD */
        <div className="glass-card" style={{ textAlign: 'center', padding: '36px 24px' }}>
          {(() => {
            const res = calculateResults();
            return (
              <div>
                <Trophy size={64} style={{ color: res.color, margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
                  ¡Examen Finalizado!
                </h3>
                
                <p style={{ fontSize: '1.2rem', fontWeight: '700', color: res.color, marginBottom: '24px' }}>
                  {res.level}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '700px', margin: '0 auto 32px' }}>
                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Puntaje Obtenido</span>
                    <p style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', marginTop: '4px' }}>{res.totalScore} / {res.maxScore}</p>
                  </div>
                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Porcentaje de Impacto</span>
                    <p style={{ fontSize: '1.8rem', fontWeight: '800', color: res.color, marginTop: '4px' }}>{res.percentage}%</p>
                  </div>
                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Respuestas Obama C-Level</span>
                    <p style={{ fontSize: '1.8rem', fontWeight: '800', color: '#34d399', marginTop: '4px' }}>{res.cLevelCount} / {MASTER_QUESTIONS.length}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="action-btn-primary"
                    style={{ padding: '14px 28px', borderRadius: '8px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Crown size={20} /> Ver Certificado Oficial
                  </button>

                  <button
                    onClick={handleRestart}
                    className="tab-btn"
                    style={{ padding: '14px 28px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <RefreshCw size={18} /> Reintentar Examen
                  </button>
                </div>

                {/* CERTIFICATE MODAL DISPLAY */}
                {showCertificate && (
                  <div style={{ marginTop: '36px', padding: '32px', borderRadius: '16px', background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', border: '3px solid #fbbf24', position: 'relative', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
                    <Crown size={48} className="text-amber-400" style={{ margin: '0 auto 12px' }} />
                    <span style={{ fontSize: '0.85rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '800' }}>
                      CERTIFICADO OFICIAL DE COMPETENCIA EJECUTIVA
                    </span>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#fff', margin: '12px 0 4px', fontFamily: 'var(--font-heading)' }}>
                      Diego Musach
                    </h2>
                    <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '20px' }}>
                      ha acreditado con éxito el nivel de <strong>{res.level}</strong> acumulando un {res.percentage}% de efectividad en Oratoria Diplomática Estilo Obama, Structuring P-A-R y Posicionamiento C-Level ($11M+ ARS).
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Fecha de Emisión</span>
                        <p style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '700' }}>Septiembre 2026</p>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>ID Verificación</span>
                        <p style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: '700' }}>C-LEVEL-OBAMA-90-DM</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
}
