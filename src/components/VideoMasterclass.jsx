import React, { useState } from 'react';
import { Play, ExternalLink, Video, CheckCircle2, Crown, Sparkles, Clock, Volume2, Eye } from 'lucide-react';
import { soundFX } from '../utils/audio';

const MASTERCLASSES = [
  {
    id: 'obama_selma',
    speaker: 'Barack Obama',
    title: 'El Dominio del Silencio & Cadencia Barítona',
    event: 'Discurso en Selma (50° Aniversario)',
    duration: '15 min',
    thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=gvAQIhb38mA',
    keyTechnique: 'La Pausa de 2 Segundos & Barrido Visual Lento',
    timestamps: [
      { time: '0:45', action: 'Hace una pausa de 2.5s mirando fijo a la audiencia antes de soltar el punchline.' },
      { time: '3:12', action: 'Baja el tono de voz en la última palabra de cada tricolon para proyectar certeza absoluta.' },
      { time: '8:30', action: 'Usa la Pirámide de Confianza con las manos mientras sostiene la mirada en un punto focal.' }
    ],
    takeaway: 'La autoridad no se mide por la velocidad de la palabra, sino por el control absoluto del silencio previo a la idea.'
  },
  {
    id: 'jobs_stanford',
    speaker: 'Steve Jobs',
    title: 'La Regla de Tres & Estructura de Historia Simple',
    event: 'Stanford Commencement 2005',
    duration: '14 min',
    thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=UF8uR6Z6KLc',
    keyTechnique: 'Tricolon Retórico & Vulnerabilidad Controlada',
    timestamps: [
      { time: '0:20', action: 'Punchline directo: "Today I want to tell you three stories from my life. That\'s it. No big deal. Just three stories."' },
      { time: '4:15', action: 'Usa frases breves, pausas dramáticas y lenguaje cercano sin tecnicismos innecesarios.' },
      { time: '12:10', action: 'Cierra con una metáfora inolvidable ("Stay Hungry, Stay Foolish").' }
    ],
    takeaway: 'Estructurá cualquier pitch C-Level en 3 actos claros. Si no entra en 3 pilares, el cerebro del Board lo olvida.'
  },
  {
    id: 'sinek_why',
    speaker: 'Simon Sinek',
    title: 'El Círculo Dorado: Por qué vs Qué',
    event: 'TED Talk: How Great Leaders Inspire Action',
    duration: '18 min',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=qp0HIF3sfI4',
    keyTechnique: 'Framing de Propósito & Tono Conversacional',
    timestamps: [
      { time: '1:10', action: 'Arranca con una pregunta desafiante sobre por qué algunos líderes triunfan y otros no.' },
      { time: '5:40', action: 'Repite la frase ancla ("People don\'t buy what you do; they buy why you do it").' }
    ],
    takeaway: 'En entrevistas C-Level, no expliques solo qué tecnología usaste; explicá por qué esa visión transforma el P&L.'
  },
  {
    id: 'jensen_nvidia',
    speaker: 'Jensen Huang (CEO NVIDIA)',
    title: 'Visión C-Level & Pragmatismo Tecnológico',
    event: 'GTC Keynote Speech',
    duration: '20 min',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=Y2F8yisiS6E',
    keyTechnique: 'Metáforas Industriales & Lenguaje de ROI',
    timestamps: [
      { time: '2:15', action: 'Traduce arquitectura de chips en velocidad de mercado y ahorro de data centers.' }
    ],
    takeaway: 'El CTO moderno no habla de servidor o código; habla de aceleración de negocio y eficiencia de capital.'
  }
];

const REEL_TECNIQUES = [
  {
    title: '🛑 Pausa de 2 Segundos vs Muletillas',
    type: 'Técnica Física',
    desc: 'Cuando te hagan la repregunta difícil, cerrá los labios y contá "1... 2..." mentalmente mientras asentís.',
    impact: 'Elimina el 100% de los "Eh...", "A ver..." y transmite control del tiempo.'
  },
  {
    title: '📉 Inflexión Descendente Vocal',
    type: 'Modulación de Voz',
    desc: 'Grabate bajando una nota musical la última palabra de tus oraciones. De "regional?" a "regional."',
    impact: 'Transforma una duda tímida en una afirmación de autoridad diplomática.'
  },
  {
    title: '🔺 La Caja de Gestos y Pirámide',
    type: 'Lenguaje Corporal',
    desc: 'Mantené las manos entre ombligo y pecho. Al pausar, juntá las yemas de los dedos suavemente.',
    impact: 'Proyecta compostura, inteligencia emocional y calma executiva.'
  }
];

export default function VideoMasterclass() {
  const [selectedMasterclass, setSelectedMasterclass] = useState(MASTERCLASSES[0]);

  const handleSelect = (mc) => {
    soundFX.playClick();
    setSelectedMasterclass(mc);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER BANNER */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,27,75,0.95))', border: '1px solid rgba(56,189,248,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
          <Video size={20} />
          <span>Biblioteca de Análisis de Oratoria & Reels</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: '#fff' }}>
          Masterclasses & Desglose Visual de los Mejores Oradores
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '4px' }}>
          Estudiá la física del lenguaje corporal, pausas y modulación vocal en los oradores más influyentes del mundo.
        </p>
      </div>

      {/* MASTERCLASS SELECTION GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {MASTERCLASSES.map(mc => (
          <div
            key={mc.id}
            onClick={() => handleSelect(mc)}
            className="glass-card"
            style={{
              padding: 0,
              overflow: 'hidden',
              cursor: 'pointer',
              border: selectedMasterclass.id === mc.id ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
              background: selectedMasterclass.id === mc.id ? 'rgba(56,189,248,0.1)' : 'rgba(15,23,42,0.7)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
              <img src={mc.thumbnail} alt={mc.speaker} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', padding: '4px 8px', borderRadius: '6px', background: 'rgba(0,0,0,0.6)', color: '#38bdf8' }}>
                  {mc.duration}
                </span>
                <Play size={24} style={{ color: '#fff', background: 'rgba(56,189,248,0.8)', padding: '4px', borderRadius: '50%' }} />
              </div>
            </div>

            <div style={{ padding: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '700', textTransform: 'uppercase' }}>
                {mc.speaker}
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', marginTop: '4px', marginBottom: '8px' }}>
                {mc.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                {mc.event}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* SELECTED MASTERCLASS DETAIL BREAKDOWN */}
      <div className="glass-card" style={{ background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(56,189,248,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase' }}>
              Análisis Detallado de Oratoria
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
              {selectedMasterclass.speaker}: {selectedMasterclass.title}
            </h3>
          </div>

          <a
            href={selectedMasterclass.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: 'linear-gradient(135deg, #0284c7, #0369a1)', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: '700' }}
          >
            <ExternalLink size={16} /> Abrir Video Original en YouTube
          </a>
        </div>

        {/* KEY TECHNIQUE HIGHLIGHT */}
        <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: '#7dd3fc', fontWeight: '700', textTransform: 'uppercase' }}>Técnica Clave a Imitar:</span>
          <p style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
            {selectedMasterclass.keyTechnique}
          </p>
        </div>

        {/* TIMESTAMPS BREAKDOWN */}
        <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#e2e8f0', marginBottom: '12px' }}>
          📌 Marcas de Tiempo & Momentos Reveladores:
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {selectedMasterclass.timestamps.map((ts, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#fbbf24', background: 'rgba(245,158,11,0.15)', padding: '2px 8px', borderRadius: '6px', flexShrink: 0 }}>
                {ts.time}
              </span>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                {ts.action}
              </p>
            </div>
          ))}
        </div>

        {/* TAKEAWAY */}
        <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
          <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: '700', textTransform: 'uppercase' }}>💡 Conclusión para tu Pitch CTO ($11M+ ARS):</span>
          <p style={{ fontSize: '1rem', color: '#f1f5f9', fontWeight: '600', marginTop: '4px', lineHeight: '1.6' }}>
            "{selectedMasterclass.takeaway}"
          </p>
        </div>
      </div>

      {/* REELS QUICK TIPS SECTION */}
      <div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} className="text-amber-400" />
          Micro-Técnicas de Oratoria en Formato Reel
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {REEL_TECNIQUES.map((reel, idx) => (
            <div key={idx} className="glass-card" style={{ marginBottom: 0 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#fbbf24', textTransform: 'uppercase' }}>{reel.type}</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', margin: '6px 0' }}>{reel.title}</h4>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '12px' }}>{reel.desc}</p>
              <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: '600', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <strong>Impacto:</strong> {reel.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
