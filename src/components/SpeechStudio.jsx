import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Clock, Eye, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../utils/audio';

const PITCH_SCRIPTS = [
  {
    id: 'script1',
    title: 'Pitch 1: Transición tras 20+ Años (60s)',
    targetTime: 60,
    text: `🛑 [PAUSA DE 2 SEG | CONTACTO VISUAL]\n\n"Busco dar el siguiente paso porque alcancé mi techo de impacto: convertí una operación técnica local en un negocio rentable y diversificado de escala regional..."\n\n📉 [BAJA EL TONO VOCAL - CADENCIA GRAVE]\n\n"Durante mi trayectoria estructuré y lideré las verticales de Video Broadcast y Energía, armando equipos técnicos autónomos y optimizando la estructura operativa con innovación pragmática..."\n\n🔺 [PIRÁMIDE DE CONFIANZA]\n\n"Dejo una operación consolidada, altamente eficiente que funciona sin micromanagement y con un crecimiento del 90% interanual en la división de energía."`
  },
  {
    id: 'script2',
    title: 'Pitch 2: Caso EDEMSA (+90% Revenue) (90s)',
    targetTime: 90,
    text: `🛑 [PAUSA DE 2 SEG | CONTACTO VISUAL]\n\n"Lideré el diseño e implementación de la solución de ingeniería de control de pérdidas eléctricas en baja tensión para EDEMSA, lo que impulsó un crecimiento interanual del 90% en la facturación de nuestra vertical de energía..."\n\n📉 [BAJA EL TONO VOCAL]\n\n"Identifiqué ineficiencias en la red, desarrollé la arquitectura de medición y auditoría conforme a la resolución EPRE 129/18, y negocié directamente la adopción con la alta gerencia del cliente..."\n\n🔺 [PIRÁMIDE DE CONFIANZA]\n\n"Transformamos una solución de ingeniería de nicho en una línea de ingresos recurrente y de alto margen para nuestra compañía."`
  },
  {
    id: 'script3',
    title: 'Pitch 3: IA Generativa & OpEx Cloud (-75%) (60s)',
    targetTime: 60,
    text: `🛑 [PAUSA DE 2 SEG | CONTACTO VISUAL]\n\n"Reestructuré el ciclo de desarrollo e infraestructura, logrando una reducción del 75% en costos operacionales y acelerando el time-to-market a la mitad mediante IA y migración dedicada..."\n\n📉 [BAJA EL TONO VOCAL]\n\n"Audité el gasto cloud recurrente, integré IA generativa para automatizar código, pruebas y documentación, y ejecuté el re-platforming a infraestructura de alto rendimiento..."\n\n🔺 [PIRÁMIDE DE CONFIANZA]\n\n"Liberamos el 75% del tiempo de nuestros seniors para arquitectura core y eliminamos costos fijos en dólares."`
  }
];

export default function SpeechStudio() {
  const [selectedScript, setSelectedScript] = useState(PITCH_SCRIPTS[0]);
  const [timeLeft, setTimeLeft] = useState(PITCH_SCRIPTS[0].targetTime);
  const [isRunning, setIsRunning] = useState(false);
  const [audioTicks, setAudioTicks] = useState(false);
  const [teleprompterSpeed, setTeleprompterSpeed] = useState(2); // 1: Slow, 2: Med, 3: Fast
  const [scrollPos, setScrollPos] = useState(0);

  // TIMER EFFECT
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
        if (audioTicks) soundFX.playTick();
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      soundFX.playSuccess();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, audioTicks]);

  // TELEPROMPTER AUTO SCROLL
  useEffect(() => {
    let scrollInterval = null;
    if (isRunning) {
      scrollInterval = setInterval(() => {
        setScrollPos(prev => prev + teleprompterSpeed);
      }, 100);
    }
    return () => clearInterval(scrollInterval);
  }, [isRunning, teleprompterSpeed]);

  const handleScriptChange = (script) => {
    soundFX.playClick();
    setSelectedScript(script);
    setTimeLeft(script.targetTime);
    setIsRunning(false);
    setScrollPos(0);
  };

  const handleToggleTimer = () => {
    soundFX.playClick();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    soundFX.playClick();
    setIsRunning(false);
    setTimeLeft(selectedScript.targetTime);
    setScrollPos(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER BANNER */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.9), rgba(15,23,42,0.95))', border: '1px solid rgba(52,211,153,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#34d399', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              <Clock size={20} />
              <span>Estudio de Grabación & Teleprompter</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: '#fff' }}>
              Pitch Timer & Metrónomo Visual de Ritmo (130 WPM)
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '4px' }}>
              Practicá la cadencia tranquila de Barack Obama con teleprompter interactivo y guías de pausa visuales.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PITCH_SCRIPTS.map(s => (
              <button
                key={s.id}
                onClick={() => handleScriptChange(s)}
                className="tab-btn"
                style={{
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  background: selectedScript.id === s.id ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.05)',
                  border: selectedScript.id === s.id ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.1)',
                  color: selectedScript.id === s.id ? '#34d399' : '#fff'
                }}
              >
                {s.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTROLS & TIMER DASHBOARD */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        
        {/* LEFT COLUMN: TIMER & METRONOME */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Tiempo Restante</span>
          
          <div style={{ fontSize: '4.5rem', fontWeight: '900', color: timeLeft <= 10 ? '#ef4444' : '#34d399', margin: '8px 0', fontFamily: 'monospace' }}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>

          {/* VISUAL METRONOME PULSE */}
          <div style={{ margin: '16px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isRunning ? '#34d399' : '#64748b',
                boxShadow: isRunning ? '0 0 20px #34d399' : 'none',
                transform: isRunning ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.4s ease-in-out'
              }}
            />
            <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: '600' }}>
              Metrónomo Obama (130 WPM)
            </span>
          </div>

          {/* TIMER BUTTONS */}
          <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '12px' }}>
            <button
              onClick={handleToggleTimer}
              className="action-btn-primary"
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                background: isRunning ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
              {isRunning ? 'Pausar Ensayo' : 'Arrancar Ensayo'}
            </button>

            <button
              onClick={handleReset}
              className="tab-btn"
              style={{ padding: '12px', borderRadius: '8px' }}
            >
              <RotateCcw size={18} />
            </button>
          </div>

          {/* AUDIO TICK TOGGLE */}
          <button
            onClick={() => setAudioTicks(!audioTicks)}
            className="tab-btn"
            style={{ width: '100%', marginTop: '12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            {audioTicks ? <Volume2 size={16} className="text-emerald-400" /> : <VolumeX size={16} />}
            {audioTicks ? 'Tic Sonoro Activado' : 'Activar Tic Sonoro'}
          </button>
        </div>

        {/* RIGHT COLUMN: TELEPROMPTER */}
        <div className="glass-card" style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(52,211,153,0.3)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: '700', fontSize: '0.9rem' }}>
              <Eye size={18} />
              <span>Teleprompter de Oratoria</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Velocidad:</span>
              {[1, 2, 3].map(speed => (
                <button
                  key={speed}
                  onClick={() => setTeleprompterSpeed(speed)}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    background: teleprompterSpeed === speed ? '#34d399' : 'rgba(255,255,255,0.1)',
                    color: teleprompterSpeed === speed ? '#0f172a' : '#fff',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {speed === 1 ? 'Lento' : speed === 2 ? 'Normal' : 'Rápido'}
                </button>
              ))}
            </div>
          </div>

          {/* TELEPROMPTER DISPLAY AREA */}
          <div
            style={{
              flex: 1,
              height: '300px',
              overflowY: 'auto',
              padding: '20px',
              color: '#f8fafc',
              fontSize: '1.25rem',
              lineHeight: '1.8',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              whiteSpace: 'pre-wrap',
              scrollBehavior: 'smooth'
            }}
          >
            {selectedScript.text}
          </div>
        </div>

      </div>

    </div>
  );
}
