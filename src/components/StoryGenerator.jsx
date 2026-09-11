import React, { useState } from 'react';
import { Sparkles, Copy, Check, Wand2, BookOpen, Layers, RefreshCw, Volume2, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { soundFX } from '../utils/audio';

const FRAMEWORKS = [
  {
    id: 'par',
    name: 'Framework P-A-R',
    badge: 'Recomendado C-Level',
    description: 'Punchline directo al hueso primero + Acción estratégica + Resultado financiero/operativo.',
    fields: [
      { key: 'punchline', label: '1. Punchline (Respuesta Directa & Impacto)', placeholder: 'Ej: Busco dar el siguiente paso porque alcancé mi techo de impacto...' },
      { key: 'action', label: '2. Acción Estratégica (El Cómo / Liderazgo)', placeholder: 'Ej: Estructuré las verticales de negocio, optimicé la arquitectura y construí equipos autónomos...' },
      { key: 'result', label: '3. Resultado Métrico ($ / % / Time-to-market)', placeholder: 'Ej: Logré un incremento interanual del 90% en facturación y reduje el OpEx un 75%...' }
    ]
  },
  {
    id: 'hero',
    name: 'El Viaje del Héroe Ejecutivo',
    badge: 'Para Storytelling de Transformación',
    description: 'Status Quo -> Crisis/Desafío -> Innovación Pragmática -> Triunfo C-Level.',
    fields: [
      { key: 'statusQuo', label: '1. Status Quo / Situación Inicial', placeholder: 'Ej: Una operación técnica tradicional con altos costos fijos en dólares...' },
      { key: 'challenge', label: '2. El Desafío / La Ineficiencia Detectada', placeholder: 'Ej: Pérdidas no técnicas de energía y cuellos de botella en el ciclo de software...' },
      { key: 'innovation', label: '3. La Innovación Pragmática (Tu Estrategia)', placeholder: 'Ej: Diseñé la arquitectura bajo normativa EPRE e integré IA en el desarrollo...' },
      { key: 'triumph', label: '4. El Triunfo y Legado C-Level', placeholder: 'Ej: Diversificación de ingresos, autonomía operativa y liderazgo regional...' }
    ]
  },
  {
    id: 'hpr',
    name: 'Hook - Problem - Resolution',
    badge: 'Ideal para Pitch Corto (30-60s)',
    description: 'Gancho magnético + Problema de negocio + Resolución de alto impacto.',
    fields: [
      { key: 'hook', label: '1. Hook (Gancho Inusual o Metáfora)', placeholder: 'Ej: El éxito en tecnología no es un sprint desesperado, sino la cadencia del maratonista...' },
      { key: 'problem', label: '2. Problema del Cliente / Empresa', placeholder: 'Ej: Costos desbordados en cloud y falta de tracción comercial corporativa...' },
      { key: 'resolution', label: '3. Resolución Estratégica & ROI', placeholder: 'Ej: Re-platforming a infraestructura dedicada y duplicación de facturación...' }
    ]
  }
];

const PRESETS = [
  {
    name: ' Transición tras 20+ Años',
    framework: 'par',
    data: {
      punchline: "Busco dar el siguiente paso porque alcancé mi techo de impacto: convertí una operación técnica local en un negocio rentable y diversificado de escala regional, y hoy busco un desafío donde mi visión mueva la aguja a mayor escala.",
      action: "Estructuré y lideré dos verticales clave (Video Broadcast y Energía). Construí equipos técnicos autónomos, optimicé costos operativos con innovación pragmática e impulsé soluciones que capturaron mercado corporativo.",
      result: "Dejo una estructura técnica madura que opera con márgenes óptimos sin micromanagement, habiendo generado un crecimiento del 90% interanual en la división de energía."
    }
  },
  {
    name: '⚡ Caso EDEMSA (+90% Facturación)',
    framework: 'par',
    data: {
      punchline: "Lideré el diseño e implementación de la solución de ingeniería de control de pérdidas eléctricas en baja tensión para EDEMSA, lo que impulsó un crecimiento interanual del 90% en la facturación de nuestra vertical de energía.",
      action: "Identifiqué ineficiencias en la red, desarrollé la arquitectura de medición y auditoría conforme a la resolución EPRE 129/18, y negocié directamente con la alta gerencia del cliente.",
      result: "Transformamos una solución de ingeniería de nicho en una línea de ingresos recurrente y de alto margen para la compañía."
    }
  },
  {
    name: '🤖 Eficiencia IA & Migración Cloud (-75%)',
    framework: 'par',
    data: {
      punchline: "Reestructuré el ciclo de vida de software e infraestructura, logrando una reducción del 75% en costos operacionales y reduciendo el time-to-market a la mitad mediante IA y migración dedicada.",
      action: "Audité el gasto cloud recurrente, integré IA generativa para automatizar código, pruebas y documentación, y ejecuté el re-platforming a infraestructura de alto rendimiento.",
      result: "Aceleramos el time-to-market un 50%, liberamos el 75% del tiempo de los ingenieros senior para arquitectura core y eliminamos costos fijos en dólares."
    }
  },
  {
    name: '🏃 Filosofía Maratonista de Liderazgo',
    framework: 'hpr',
    data: {
      hook: "Lidero con la disciplina del maratonista: el éxito en tecnología no es el sprint desesperado de una noche sin dormir, sino la cadencia diaria sostenida de un equipo alineado que no afloja el ritmo.",
      problem: "Los equipos sufren burn-out por entregas desordenadas y falta de claridad estratégica.",
      resolution: "Estructuro metodologías de trabajo claras donde cada desarrollador conoce su impacto directo en la caja, logrando una rotación casi nula y cumplimiento estricto de hitos."
    }
  }
];

export default function StoryGenerator() {
  const [selectedFramework, setSelectedFramework] = useState(FRAMEWORKS[0]);
  const [formData, setFormData] = useState({
    punchline: '', action: '', result: '',
    statusQuo: '', challenge: '', innovation: '', triumph: '',
    hook: '', problem: '', resolution: ''
  });
  const [generatedStory, setGeneratedStory] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFrameworkChange = (fw) => {
    soundFX.playClick();
    setSelectedFramework(fw);
    setGeneratedStory(null);
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleLoadPreset = (preset) => {
    soundFX.playSuccess();
    const fw = FRAMEWORKS.find(f => f.id === preset.framework) || FRAMEWORKS[0];
    setSelectedFramework(fw);
    setFormData(prev => ({ ...prev, ...preset.data }));
    setGeneratedStory(null);
  };

  // C-LEVEL POLISHER ENGINE
  const handlePolishStory = () => {
    soundFX.playFanfare();
    const activeFields = selectedFramework.fields;
    let polishedParts = [];

    activeFields.forEach(field => {
      let val = formData[field.key] || '';
      if (!val) return;

      // Apply executive transformation rules
      let polished = val
        .replace(/hice|hicimos/gi, 'estructuré e impulsé')
        .replace(/ahorré|ahorramos/gi, 'optimicé la estructura de costos (OpEx)')
        .replace(/manejo equipos/gi, 'desarrollo equipos autónomos de alto rendimiento')
        .replace(/rápido/gi, 'con alta agilidad estratégica y reducción del time-to-market')
        .replace(/hablé con el cliente/gi, 'alineé expectativas con los stakeholders C-Level')
        .replace(/cambiamos las herramientas/gi, 'lideré la gestión del cambio tecnológico');

      polishedParts.push({
        label: field.label,
        content: polished
      });
    });

    // Assemble full speech text with Obama pause indicators
    let fullSpeech = '';
    if (selectedFramework.id === 'par') {
      fullSpeech = `🛑 [PAUSA DE 2 SEG | CONTACTO VISUAL]\n\n"${formData.punchline || polishedParts[0]?.content}"\n\n🔻 [BAJA EL TONO VOCAL - CADENCIA GRAVE]\n\n"${formData.action || polishedParts[1]?.content}"\n\n🔺 [PIRÁMIDE DE CONFIANZA]\n\n"${formData.result || polishedParts[2]?.content}"`;
    } else {
      fullSpeech = polishedParts.map((p, idx) => `[PASO ${idx + 1}: ${p.label}]\n"${p.content}"`).join('\n\n');
    }

    const wordCount = fullSpeech.split(/\s+/).length;
    const estSeconds = Math.round((wordCount / 130) * 60); // 130 WPM Obama tempo

    setGeneratedStory({
      framework: selectedFramework.name,
      parts: polishedParts,
      fullSpeech,
      wordCount,
      estSeconds
    });
  };

  const handleCopy = () => {
    if (!generatedStory) return;
    soundFX.playClick();
    navigator.clipboard.writeText(generatedStory.fullSpeech);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER BANNER */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,27,75,0.95))', border: '1px solid rgba(245,158,11,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fbbf24', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              <Wand2 size={20} />
              <span>Generador de Historias C-Level & Pulidor Obama Style</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: '#fff' }}>
              Construí tu Historia Ejecutiva de Alto Impacto
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '4px' }}>
              Transformá descripciones técnicas en discursos de autoridad con estructura P-A-R, métricas financieras y entonación diplomática.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PRESETS.map((preset, i) => (
              <button
                key={i}
                onClick={() => handleLoadPreset(preset)}
                className="tab-btn"
                style={{ fontSize: '0.8rem', padding: '8px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FRAMEWORK SELECTION TABS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {FRAMEWORKS.map(fw => (
          <div
            key={fw.id}
            onClick={() => handleFrameworkChange(fw)}
            className={`glass-card ${selectedFramework.id === fw.id ? 'active-framework' : ''}`}
            style={{
              cursor: 'pointer',
              border: selectedFramework.id === fw.id ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
              background: selectedFramework.id === fw.id ? 'rgba(99,102,241,0.15)' : 'rgba(15,23,42,0.6)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: '800', color: '#fff', fontSize: '1.1rem' }}>{fw.name}</span>
              <span style={{ fontSize: '0.7rem', padding: '4px 8px', borderRadius: '12px', background: 'rgba(245,158,11,0.2)', color: '#fbbf24', fontWeight: '700' }}>
                {fw.badge}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{fw.description}</p>
          </div>
        ))}
      </div>

      {/* INPUT FORM & EDITOR */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* LEFT COLUMN: FORM */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} className="text-indigo-400" />
            1. Completa los Bloques de la Historia
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {selectedFramework.fields.map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                  {field.label}
                </label>
                <textarea
                  rows={3}
                  value={formData[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(15,23,42,0.8)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>
            ))}

            <button
              onClick={handlePolishStory}
              className="action-btn-primary"
              style={{
                width: '100%',
                marginTop: '12px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontSize: '1rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
                borderRadius: '8px',
                border: 'none',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <Wand2 size={20} />
              Generar & Pulir a Tono Obama C-Level
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: GENERATED OUTPUT */}
        <div className="glass-card" style={{ background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} className="text-amber-400" />
              2. Discurso Pulido listo para Oratoria
            </h3>

            {generatedStory && (
              <button
                onClick={handleCopy}
                className="tab-btn"
                style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', background: copied ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.08)', color: copied ? '#34d399' : '#fff' }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? '¡Copiado!' : 'Copiar Discurso'}
              </button>
            )}
          </div>

          {!generatedStory ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '320px', textAlign: 'center', color: '#64748b' }}>
              <BookOpen size={48} style={{ marginBottom: '12px', opacity: 0.4 }} />
              <p style={{ fontSize: '0.95rem' }}>Escribí los puntos a la izquierda o elegí un Preset arriba para ver el discurso transformado.</p>
            </div>
          ) : (
            <div>
              {/* METRICS ROW */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Duración Estimada</span>
                  <p style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fbbf24' }}>~{generatedStory.estSeconds} seg</p>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Cadencia Sugerida</span>
                  <p style={{ fontSize: '1.2rem', fontWeight: '800', color: '#38bdf8' }}>130 WPM (Obama Tempo)</p>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Total Palabras</span>
                  <p style={{ fontSize: '1.2rem', fontWeight: '800', color: '#c7d2fe' }}>{generatedStory.wordCount} palabras</p>
                </div>
              </div>

              {/* SPEECH TEXT DISPLAY */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.95rem',
                  lineHeight: '1.7',
                  color: '#f1f5f9',
                  maxHeight: '380px',
                  overflowY: 'auto'
                }}
              >
                {generatedStory.fullSpeech}
              </div>

              <div style={{ marginTop: '16px', padding: '12px', borderRadius: '8px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <ShieldCheck size={20} className="text-emerald-400" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.85rem', color: '#a7f3d0' }}>
                  <strong>Tip de Entrega Obama:</strong> Iniciá con 2 segundos de silencio absoluto antes de la primera palabra. Cerrá la última oración dejando caer el tono de voz firmemente.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
