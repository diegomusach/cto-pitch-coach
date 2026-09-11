import React, { useState } from 'react';
import { BookOpen, Sparkles, ShieldCheck, Zap, Volume2, Award, ArrowRight, Layers, Target, Crown } from 'lucide-react';
import { soundFX } from '../utils/audio';

const CORE_MODULES = [
  {
    id: 'voice_physics',
    title: '1. Física de la Voz & Método Obama',
    category: 'Técnica Vocal & Presencia',
    icon: Volume2,
    badge: 'Fundamental',
    summary: 'Cómo funciona la acústica de la autoridad: entonación barítona, silencios diafragmáticos y mirada focal.',
    points: [
      {
        subtitle: '🛑 La Pausa Diafragmática (El Silencio de Dominio)',
        desc: 'Al recibir la pregunta, el cerebro acelerado busca hablar inmediatamente para llenar el vacío, generando muletillas ("Eh...", "A ver..."). El método Obama exige cerrar la boca durante 2 segundos completos, inhalar desde el diafragma y asentir lentamente. Demuestra control absoluto del tiempo.'
      },
      {
        subtitle: '📉 Inflexión Descendente Vocal (Barítono)',
        desc: 'Subir la entonación al final de una frase ("¿Convertí la empresa en rentable regional?") proyecta duda e inseguridad. Bajar el tono vocal en la última sílaba ("...un negocio rentable de escala regional.") emite autoridad barítona inquebrantable.'
      },
      {
        subtitle: '👁️ Barrido Visual Focal (15 Segundos)',
        desc: 'Mover la mirada rápido entre personas o mirar al techo transmite nerviosismo. Elegí un punto focal (lente de la cámara o los ojos del entrevistador) y sostené la mirada fija durante 15 segundos completos por cada idea principal.'
      }
    ]
  },
  {
    id: 'pyramid_principle',
    title: '2. The Pyramid Principle (Barbara Minto / McKinsey)',
    category: 'Estructuración de Ideas',
    icon: Layers,
    badge: 'Standard McKinsey / C-Level',
    summary: 'La regla de oro de la comunicación ejecutiva: Conclusión directa primero, evidencia después.',
    points: [
      {
        subtitle: '1. Conclusión Directa (Answer First / Punchline)',
        desc: 'Arrancá siempre respondiendo la pregunta en la primera oración. Nunca hagas un prólogo histórico de 2 minutos antes de dar la respuesta.'
      },
      {
        subtitle: '2. Pilares de Argumentación (Regla de 3)',
        desc: 'Agrupá los fundamentos en 3 pilares clave: 1. Impacto Financiero (P&L), 2. Innovación Pragmática (IA), 3. Autonomía de Equipo.'
      },
      {
        subtitle: '3. Datos & Métricas de Soporte',
        desc: 'Sostené los pilares con números irrefutables: "90% de crecimiento en facturación", "75% de reducción en OpEx", "50% de reducción en Time-to-Market".'
      }
    ]
  },
  {
    id: 'frame_control',
    title: '3. Frame Control (Oren Klaff / Pitch Anything)',
    category: 'Persuasión en Entrevistas de Alto Nivel',
    icon: Target,
    badge: 'Control de Estatus',
    summary: 'Cómo tomar el control psicológico de la conversación cuando te hacen repreguntas hostiles.',
    points: [
      {
        subtitle: '⚡ Power Frame (Marco de Poder)',
        desc: 'No busques la aprobación del entrevistador. Posicionate como el premio: no estás pidiendo trabajo, estás eligiendo dónde aplicar tu capacidad de mover la aguja regional.'
      },
      {
        subtitle: '⏱️ Time Frame (Marco de Tiempo)',
        desc: 'Si la entrevista se vuelve caótica o apurada, marcá la cadencia tranquila. Quien apura la palabra pierde el e-status ejecutiva.'
      },
      {
        subtitle: '🧠 Analyst Frame vs Prize Frame',
        desc: 'Si te acribillan con preguntas hiper-técnicas minuciosas, respondé brevemente con la cifra financiera y devolvé una pregunta estratégica sobre el roadmap de la empresa.'
      }
    ]
  },
  {
    id: 'tech_translation',
    title: '4. Traducción de Tecnología a P&L ($)',
    category: 'Vocabulario & Métricas',
    icon: Zap,
    badge: 'Clave CTO C-Level',
    summary: 'Cómo convertir términos de desarrollo y sistemas en impacto financiero directo.',
    points: [
      {
        subtitle: '❌ "Ahorramos plata de servidores cloud" -> ✅ "Optimización de OpEx en USD"',
        desc: 'El re-platforming a infraestructura dedicada eliminó costos fijos en dólares y transformó un gasto operativo recurrente en un activo amortizable de alto rendimiento.'
      },
      {
        subtitle: '❌ "Desarrollamos el pilar para EDEMSA" -> ✅ "Creación de una Línea de Recurrent Revenue"',
        desc: 'Convertimos una solución de ingeniería de pérdidas eléctricas bajo norma EPRE 129/18 en una vertical de negocio que hizo crecer un 90% la facturación de la división de energía.'
      },
      {
        subtitle: '❌ "Codeamos más rápido con IA" -> ✅ "Reducción del 50% en Time-to-Market & Cycle Time"',
        desc: 'Integrar IA generativa en el pipeline de ingeniería liberó el 75% del tiempo de desarrolladores senior para foco en arquitectura core.'
      }
    ]
  }
];

export default function LaPulpaMaster() {
  const [activeModule, setActiveModule] = useState(CORE_MODULES[0]);

  const handleSelectModule = (mod) => {
    soundFX.playClick();
    setActiveModule(mod);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HERO BANNER */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.9), rgba(15,23,42,0.95))', border: '1px solid rgba(99,102,241,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#c7d2fe', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
          <BookOpen size={20} className="text-amber-400" />
          <span>Paso 1: La Pulpa Teórica & Fuentes Concretas</span>
        </div>
        <h2 style={{ fontSize: '1.9rem', fontWeight: '800', marginTop: '6px', color: '#fff' }}>
          Fundamentos de Oratoria Diplomática & Storytelling C-Level
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '4px', maxWidth: '900px' }}>
          Acá tenés la <strong>pulpa pura</strong>: la física del silencio de Barack Obama, el principio de la pirámide de Barbara Minto (McKinsey) y el control de e-status de Oren Klaff.
        </p>
      </div>

      {/* MODULE SELECTOR GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {CORE_MODULES.map(mod => {
          const IconComp = mod.icon;
          const isSelected = activeModule.id === mod.id;
          return (
            <div
              key={mod.id}
              onClick={() => handleSelectModule(mod)}
              className="glass-card"
              style={{
                cursor: 'pointer',
                border: isSelected ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                background: isSelected ? 'rgba(99,102,241,0.18)' : 'rgba(15,23,42,0.7)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', padding: '4px 8px', borderRadius: '6px', background: 'rgba(245,158,11,0.2)', color: '#fbbf24' }}>
                  {mod.badge}
                </span>
                <IconComp size={20} style={{ color: isSelected ? '#818cf8' : '#64748b' }} />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>{mod.title}</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{mod.summary}</p>
            </div>
          );
        })}
      </div>

      {/* SELECTED MODULE CONTENT */}
      <div className="glass-card" style={{ background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(99,102,241,0.2)' }}>
        <div style={{ marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: '700', textTransform: 'uppercase' }}>
            {activeModule.category}
          </span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
            {activeModule.title}
          </h3>
        </div>

        {/* DETAILED POINTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activeModule.points.map((pt, idx) => (
            <div key={idx} style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fbbf24', marginBottom: '8px' }}>
                {pt.subtitle}
              </h4>
              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                {pt.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
