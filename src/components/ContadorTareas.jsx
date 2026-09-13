import React, { useState, useMemo, useEffect } from 'react';

function ContadorTareas() {
  const [tareas, setTareas] = useState([
    { id: 1, nombre: "Revisar arquitectura", duracion: 45 }
  ]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');

  const tiempoTotal = useMemo(() => {
    return tareas.reduce((total, t) => total + t.duracion, 0);
  }, [tareas]);

  useEffect(() => {
    document.title = `Total: ${tiempoTotal} min | Contador Tareas`;
  }, [tiempoTotal]);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim() || !duracion) return;

    setTareas([...tareas, { id: Date.now(), nombre: nuevaTarea.trim(), duracion: parseInt(duracion, 10) }]);
    setNuevaTarea('');
    setDuracion('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', background: '#1e293b', padding: '24px', borderRadius: '12px' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '8px' }}>Contador de Tareas</h2>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px' }}>Revisa el título de la pestaña de tu navegador.</p>
      <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '16px', color: '#38bdf8', fontWeight: 700 }}>
        ⏱️ Tiempo Total: {tiempoTotal} minutos
      </div>
      <form onSubmit={agregarTarea} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nombre de tarea"
          style={{ flex: 2, padding: '8px' }}
        />
        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder="Minutos"
          style={{ width: '100px', padding: '8px' }}
        />
        <button type="submit" style={{ background: '#0284c7', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px' }}>
          Agregar
        </button>
      </form>
      <ul>
        {tareas.map(t => (
          <li key={t.id} style={{ color: '#f8fafc', padding: '6px 0' }}>
            {t.nombre}: {t.duracion} minutos
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContadorTareas;
