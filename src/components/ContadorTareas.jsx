import React, { useState, useEffect, useMemo } from 'react';
import './ContadorTareas.css';

const tareasIniciales = [
  { id: 1, nombre: "Revisar arquitectura de componentes", duracion: 45, prioridad: "Alta" },
  { id: 2, nombre: "Escribir pruebas unitarias con Jest", duracion: 30, prioridad: "Media" },
  { id: 3, nombre: "Documentar endpoints de la API", duracion: 60, prioridad: "Baja" }
];

function ContadorTareas() {
  const [tareas, setTareas] = useState(() => {
    const saved = localStorage.getItem("contador_tareas_react");
    return saved ? JSON.parse(saved) : tareasIniciales;
  });

  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [prioridad, setPrioridad] = useState('Media');
  const [filtro, setFiltro] = useState('todas');
  const [mensaje, setMensaje] = useState('');

  // 1. useMemo: Cálculo del tiempo total memorizado
  // Solo se recalcula cuando el arreglo de tareas cambia (evita recálculo en cada render de input)
  const tiempoTotal = useMemo(() => {
    console.log("⚡ [useMemo] Recalculando tiempo total de tareas...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]);

  // useMemo adicional: Cálculo de estadísticas promedio
  const estadisticas = useMemo(() => {
    console.log("⚡ [useMemo] Recalculando estadísticas globales...");
    const cantidad = tareas.length;
    const promedio = cantidad > 0 ? (tiempoTotal / cantidad).toFixed(1) : 0;
    const horas = (tiempoTotal / 60).toFixed(2);
    return { cantidad, promedio, horas };
  }, [tareas, tiempoTotal]);

  // 2. useEffect: Efecto secundario para actualizar el título de la pestaña del navegador
  useEffect(() => {
    document.title = `Total: ${tiempoTotal} min (${estadisticas.horas}h) | Tareas`;
  }, [tiempoTotal, estadisticas.horas]);

  // 3. useEffect: Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem("contador_tareas_react", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim() || !duracion) {
      setMensaje("⚠️ Ingresa el nombre y la duración en minutos.");
      return;
    }

    const duracionNum = parseInt(duracion, 10);
    if (isNaN(duracionNum) || duracionNum <= 0) {
      setMensaje("⚠️ La duración debe ser un número mayor a 0.");
      return;
    }

    const nuevoItem = {
      id: Date.now(),
      nombre: nuevaTarea.trim(),
      duracion: duracionNum,
      prioridad
    };

    setTareas([...tareas, nuevoItem]);
    setNuevaTarea('');
    setDuracion('');
    setMensaje('');
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  const tareasFiltradas = tareas.filter(t => {
    if (filtro === 'cortas') return t.duracion <= 30;
    if (filtro === 'largas') return t.duracion > 30;
    return true;
  });

  return (
    <div className="tareas-card">
      <h2 style={{ fontSize: '1.6rem', color: '#38bdf8', marginBottom: '8px' }}>
        ⏱️ Contador y Gestor de Tareas
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>
        Optimización con <code>useMemo</code> para sumatorias y <code>useEffect</code> para sincronizar el título del documento y <code>localStorage</code>.
      </p>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-number">{tiempoTotal} min</div>
          <div className="stat-label">Tiempo Total ({estadisticas.horas} hrs)</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{estadisticas.cantidad}</div>
          <div className="stat-label">Total de Tareas</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{estadisticas.promedio} min</div>
          <div className="stat-label">Promedio por Tarea</div>
        </div>
      </div>

      <form onSubmit={agregarTarea} className="tarea-form">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nombre de la tarea (ej. Estudiar React)"
        />
        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder="Minutos"
          min="1"
        />
        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        <button type="submit" className="btn-add-tarea">
          + Agregar
        </button>
      </form>

      {mensaje && (
        <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '14px' }}>{mensaje}</p>
      )}

      <div className="tareas-filtro-bar">
        <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Filtrar duración:</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setFiltro('todas')}
            style={{
              padding: '4px 10px',
              fontSize: '0.8rem',
              background: filtro === 'todas' ? '#38bdf8' : '#334155',
              color: filtro === 'todas' ? '#0f172a' : '#cbd5e1'
            }}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltro('cortas')}
            style={{
              padding: '4px 10px',
              fontSize: '0.8rem',
              background: filtro === 'cortas' ? '#38bdf8' : '#334155',
              color: filtro === 'cortas' ? '#0f172a' : '#cbd5e1'
            }}
          >
            ≤ 30 min
          </button>
          <button
            onClick={() => setFiltro('largas')}
            style={{
              padding: '4px 10px',
              fontSize: '0.8rem',
              background: filtro === 'largas' ? '#38bdf8' : '#334155',
              color: filtro === 'largas' ? '#0f172a' : '#cbd5e1'
            }}
          >
            &gt; 30 min
          </button>
        </div>
      </div>

      <ul style={{ listStyle: 'none' }}>
        {tareasFiltradas.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '24px 0' }}>
            No hay tareas en este filtro.
          </p>
        ) : (
          tareasFiltradas.map((t) => (
            <li key={t.id} className="tarea-item">
              <div>
                <strong style={{ fontSize: '0.98rem' }}>{t.nombre}</strong>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ color: '#38bdf8', fontSize: '0.85rem' }}>⏳ {t.duracion} minutos</span>
                  <span className={`badge-prioridad-${t.prioridad.toLowerCase()}`}>
                    {t.prioridad}
                  </span>
                </div>
              </div>
              <button
                onClick={() => eliminarTarea(t.id)}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#f87171',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '6px 12px',
                  fontSize: '0.8rem'
                }}
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ContadorTareas;