import React, { useState } from 'react';
import { BookOpen, Sparkles, Crown, Zap, ShieldCheck, Flame, Volume2, ArrowRight } from 'lucide-react';
import { soundFX } from '../utils/audio';

const RHETORICAL_DEVICES = [
  {
    id: 'tricolon',
    name: '1. Tricolon Retórico (La Regla de Tres)',
    concept: 'El cerebro humano procesa, comprende y recuerda patrones de información en conjuntos de tres.',
    formula: '[Elemento 1] + [Elemento 2] + [Elemento 3 de Mayor Carga]',
    example: '"Mi propuesta como CTO se apoya en tres pilares: eficiencia de P&L, innovación pragmática con IA y desarrollo de equipos autónomos."',
    proTip: 'Asegurate de que el tercer elemento sea el de mayor peso ejecutivo o financiero.'
  },
  {
    id: 'anaphora',
    name: '2. Anáfora (Repetición de Apertura)',
    concept: 'Repetición intencionada de una frase al inicio de oraciones consecutivas para crear un crescendo emocional.',
    formula: '"No vine a [Acción 1]. Vine a [Acción 2]. Vine a [Acción 3]."',
    example: '"No gestioné tecnología por inercia; gestioné la infraestructura para crecer. No armé equipos para cumplir entregables; armé equipos autónomos para adueñarse del producto."',
    proTip: 'Usalo en momentos de cierre o respuestas a repreguntas sobre tu motivación.'
  },
  {
    id: 'metaphor',
    name: '3. Metáfora Ejecutiva del Maratonista',
    concept: 'Conectar un atributo o disciplina personal con tu estilo de gestión de tecnología.',
    formula: '[Hábito Personal] -> [Principio de Liderazgo] -> [Resultado para la Empresa]',
    example: '"El éxito en tecnología no es el sprint desesperado de una noche sin dormir, sino la cadencia diaria sostenida de un equipo alineado que no afloja el ritmo."',
    proTip: 'Nunca arranques por la metáfora sin antes dar la conclusión de gestión.'
  },
  {
    id: 'reframing',
    name: '4. Re-framing Hostil (Giro de Judo Retórico)',
    concept: 'Aceptar la premisa de una repregunta agresiva pero cambiar radicalmente su ángulo de interpretación.',
    formula: 'Aceptar contexto + Cambiar significado de la palabra clave + Mostrar triunfo',
    example: 'Objeción: "¿No estás acostumbrado a la inercia tras 20 años?" -> Respuesta: "No estuve 20 años en la misma empresa; lideré la transformación de 4 etapas distintas de un negocio."',
    proTip: 'Hacé siempre una pausa de 2 segundos antes de responder a una repregunta hostil.'
  },
  {
    id: 'pause',
    name: '5. La Pausa de Dominio (2 Segundos de Silencio)',
    concept: 'El silencio incomoda al inseguro, pero el verdadero líder demuestra que es dueño del tiempo en la sala.',
    formula: '[Pregunta del Board] -> [2s Silencio + Asentimiento Lento] -> [Inicio en Tono Grave]',
    example: 'Cuando te preguntan por expectativas salariales o por qué dejás la empresa, sostené la mirada fija y contá 1... 2... en silencio.',
    proTip: 'Elimina por completo el "Eh..." o "A ver..." al inicio de la frase.'
  },
  {
    id: 'cadence',
    name: '6. Inflexión Descendente Vocal (Tono Barítono)',
    concept: 'Cerrar la última palabra de cada oración bajando una nota vocal en lugar de subirla.',
    formula: 'Incorrecto: "¿Convertí el negocio en rentable regional?" -> Correcto: "Convertí una operación técnica local en un negocio rentable regional."',
    example: 'Bajá el tono en la sílaba final de la última palabra.',
    proTip: 'Pracitcá leyendo noticias en voz alta forzando la caída de tono al final de cada punto y seguido.'
  }
];

export default function RhetoricToolkit() {
  const [selectedDevice, setSelectedDevice] = useState(RHETORICAL_DEVICES[0]);

  const handleSelect = (device) => {
    soundFX.playClick();
    setSelectedDevice(device);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER BANNER */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.9), rgba(15,23,42,0.95))', border: '1px solid rgba(245,158,11,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fbbf24', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
          <Sparkles size={20} />
          <span>Caja de Herramientas Retóricas C-Level</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: '#fff' }}>
          Técnicas Avanzadas de Persuasión & Storytelling
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '4px' }}>
          Dominá los recursos retóricos utilizados por presidentes, CEOs globales y grandes diplomáticos.
        </p>
      </div>

      {/* DEVICES GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {RHETORICAL_DEVICES.map(device => (
          <div
            key={device.id}
            onClick={() => handleSelect(device)}
            className="glass-card"
            style={{
              cursor: 'pointer',
              border: selectedDevice.id === device.id ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.1)',
              background: selectedDevice.id === device.id ? 'rgba(245,158,11,0.12)' : 'rgba(15,23,42,0.7)',
              transition: 'all 0.3s ease'
            }}
          >
            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
              {device.name}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5' }}>
              {device.concept}
            </p>
          </div>
        ))}
      </div>

      {/* SELECTED DEVICE DETAIL */}
      <div className="glass-card" style={{ background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: '700', textTransform: 'uppercase' }}>
          Recurso Seleccionado
        </span>
        <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', marginTop: '4px', marginBottom: '16px' }}>
          {selectedDevice.name}
        </h3>

        {/* FORMULA */}
        <div style={{ padding: '14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Fórmula de Estructuración:</span>
          <p style={{ fontSize: '1rem', fontWeight: '700', color: '#c7d2fe', marginTop: '4px' }}>
            {selectedDevice.formula}
          </p>
        </div>

        {/* EXAMPLE */}
        <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: '#fbbf24', textTransform: 'uppercase', fontWeight: '700' }}>Ejemplo Real para tu Pitch CTO ($11M+ ARS):</span>
          <p style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', marginTop: '6px', lineHeight: '1.6' }}>
            {selectedDevice.example}
          </p>
        </div>

        {/* PRO TIP */}
        <div style={{ padding: '14px', borderRadius: '8px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={20} className="text-emerald-400" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.88rem', color: '#a7f3d0' }}>
            <strong>Consejo de Ejecución:</strong> {selectedDevice.proTip}
          </p>
        </div>
      </div>

    </div>
  );
}
