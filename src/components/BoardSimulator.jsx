import React, { useState } from 'react';
import { ShieldCheck, Trophy, AlertCircle, CheckCircle2, UserCheck, RefreshCw, Zap, Crown, MessageSquare, DollarSign, Building2, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

const PERSONAS = [
  {
    id: 'cfo',
    name: 'El CFO Escéptico',
    role: 'Chief Financial Officer',
    focus: 'ROI, OpEx en USD, Márgenes de Ganancia, P&L',
    avatar: '💼',
    color: '#34d399',
    questions: [
      {
        id: 'cfo_q1',
        question: '"Todo desarrollo técnico suena bonito, pero ¿cuánto le aportó exactamente a la caja de la empresa la solución de EDEMSA?"',
        options: [
          {
            id: 'opt1',
            type: 'defensive',
            points: 0,
            text: 'Bueno, aumentamos la facturación bastante en esa vertical porque EDEMSA quedó muy satisfecha con la ingeniería.',
            feedback: '❌ EVITAR: Al CFO no le interesa si el cliente quedó "satisfecho"; le interesa la cifra y el margen.'
          },
          {
            id: 'opt2',
            type: 'c-level',
            points: 10,
            text: '[Pausa de 2s] Convertimos un proyecto de ingeniería bajo norma EPRE 129/18 en una línea de recurrent revenue que impulsó un crecimiento interanual del 90% en la facturación de la vertical de energía con márgenes operativos superiores al 40%.',
            feedback: '🏆 PERFECTO (Obama C-Level): Le diste la cifra exacta (+90%), la naturaleza del ingreso (recurrente) y el margen operativo.'
          },
          {
            id: 'opt3',
            type: 'regular',
            points: 5,
            text: 'Desarrollamos el pilar de auditoría de pérdidas no técnicas y eso nos permitió facturar más horas de ingeniería.',
            feedback: '⚠️ REGULAR: Vender "horas de ingeniería" suena a consultora júnior, no a producto de alto margen C-Level.'
          }
        ]
      },
      {
        id: 'cfo_q2',
        question: '"La Inteligencia Artificial está sobrevalorada. ¿Qué ahorro real de OpEx generó en tu equipo o fue solo marketing?"',
        options: [
          {
            id: 'opt1',
            type: 'c-level',
            points: 10,
            text: '[Pausa de 2s] No hago innovación por moda; audité la estructura de costos. La integración de IA en el pipeline de desarrollo junto con la migración cloud redujo un 75% el OpEx operacional y aceleró el time-to-market a la mitad.',
            feedback: '🏆 PERFECTO: Demostrás pragmatismo, recorte directo de gasto en USD y aceleración de entregables.'
          },
          {
            id: 'opt2',
            type: 'defensive',
            points: 0,
            text: 'Usamos ChatGPT y copilot para codear más rápido y ahorramos plata de servidores.',
            feedback: '❌ EVITAR: Lenguaje demasiado informal. Falta terminología financiera.'
          }
        ]
      }
    ]
  },
  {
    id: 'ceo',
    name: 'El CEO Exigente',
    role: 'Chief Executive Officer',
    focus: 'Visión Regional, Liderazgo de Equipos, Escalabilidad',
    avatar: '👑',
    color: '#818cf8',
    questions: [
      {
        id: 'ceo_q1',
        question: '"Estuviste más de 20 años en Bromteck. ¿Por qué estás buscando dar el salto ahora y qué te diferencia de otros candidatos?"',
        options: [
          {
            id: 'opt1',
            type: 'c-level',
            points: 10,
            text: '[Pausa de 2s | Inflexión Descendente] Busco dar el siguiente paso porque alcancé mi techo de impacto: convertí una operación técnica local en un negocio rentable y diversificado de escala regional, y hoy busco una organización donde mi visión mueva la aguja a una escala superior.',
            feedback: '🏆 PERFECTO: Muestra orgullo de gestión, éxito comprobado y ambición ejecutiva alineada con el crecimiento del CEO.'
          },
          {
            id: 'opt2',
            type: 'defensive',
            points: 0,
            text: 'Sentía que en Bromteck ya había hecho todo lo que podía hacer y quería cambiar de aire.',
            feedback: '❌ EVITAR: Transmite desgano o que te quedaste sin ideas.'
          }
        ]
      }
    ]
  },
  {
    id: 'investor',
    name: 'El Inversor Agresivo',
    role: 'Board Member & Managing Partner',
    focus: 'Resiliencia, Manejo de Repreguntas Hostiles, E-Status',
    avatar: '🔥',
    color: '#fbbf24',
    questions: [
      {
        id: 'inv_q1',
        question: '"¿No te preocupa que haber estado 20 años en la misma empresa te haya hecho demasiado rígido para adaptarte a nuestra cultura ágil?"',
        options: [
          {
            id: 'opt1',
            type: 'c-level',
            points: 10,
            text: '[Pausa de 2s | Asentimiento Lento] No estuve 20 años en la misma empresa; lideré la transformación de 4 etapas distintas de un negocio: desde ingeniería pura hasta la creación de una división de energía de cero. Mi lealtad no fue a la inercia, fue a la capacidad constante de reinventar el negocio.',
            feedback: '🏆 MAESTRÍA (Re-framing Hostil): Diste vuelta la objeción usando la antigüedad como evidencia de resiliencia y adaptabilidad.'
          },
          {
            id: 'opt2',
            type: 'defensive',
            points: 0,
            text: 'No bueno, la verdad que la tecnología en 20 años cambió muchísimo así que siempre me tuve que adaptar.',
            feedback: '❌ EVITAR: Ponerte a la defensiva valida la duda del inversor.'
          }
        ]
      }
    ]
  }
];

export default function BoardSimulator() {
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const currentQ = selectedPersona.questions[currentQIdx] || selectedPersona.questions[0];

  const handlePersonaChange = (p) => {
    soundFX.playClick();
    setSelectedPersona(p);
    setCurrentQIdx(0);
  };

  const handleSelectOption = (opt) => {
    soundFX.playClick();
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: opt }));
    if (opt.type === 'c-level') {
      soundFX.playSuccess();
      setScore(s => s + 10);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HERO BANNER */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.9), rgba(15,23,42,0.95))', border: '1px solid rgba(251,191,36,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fbbf24', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
          <Trophy size={20} />
          <span>Paso 3: Simulador de Board C-Level (Examen de Elite)</span>
        </div>
        <h2 style={{ fontSize: '1.9rem', fontWeight: '800', marginTop: '6px', color: '#fff' }}>
          Enfrentá a las 4 Personalidades del Board Executive
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.98rem', marginTop: '4px' }}>
          Practicá respuestas con el CFO, CEO e Inversores agresivos. Recibí coaching instantáneo en tiempo real.
        </p>
      </div>

      {/* PERSONA SELECTOR TABS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {PERSONAS.map(p => {
          const isSelected = selectedPersona.id === p.id;
          return (
            <div
              key={p.id}
              onClick={() => handlePersonaChange(p)}
              className="glass-card"
              style={{
                cursor: 'pointer',
                border: isSelected ? `2px solid ${p.color}` : '1px solid rgba(255,255,255,0.1)',
                background: isSelected ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.7)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.8rem' }}>{p.avatar}</span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>{p.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: p.color, fontWeight: '700' }}>{p.role}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Focus: {p.focus}</p>
            </div>
          );
        })}
      </div>

      {/* QUESTION AREA */}
      <div className="glass-card" style={{ background: 'rgba(15,23,42,0.85)', border: `1px solid ${selectedPersona.color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.5rem' }}>{selectedPersona.avatar}</span>
          <div>
            <span style={{ fontSize: '0.8rem', color: selectedPersona.color, fontWeight: '700', textTransform: 'uppercase' }}>
              {selectedPersona.name} Pregunta:
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginTop: '2px', lineHeight: '1.5' }}>
              {currentQ.question}
            </h3>
          </div>
        </div>

        {/* OPTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
          {currentQ.options.map(opt => {
            const isSelected = userAnswers[currentQ.id]?.id === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: isSelected
                    ? (opt.type === 'c-level' ? 'rgba(52,211,153,0.15)' : 'rgba(239,68,68,0.15)')
                    : 'rgba(15,23,42,0.7)',
                  border: isSelected
                    ? (opt.type === 'c-level' ? '2px solid #34d399' : '2px solid #ef4444')
                    : '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.2s ease'
                }}
              >
                <p style={{ fontSize: '0.95rem', color: '#fff', lineHeight: '1.6' }}>{opt.text}</p>
                {isSelected && (
                  <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', color: '#cbd5e1' }}>
                    <strong>Feedback de Coaching:</strong> {opt.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
