import React from 'react';
import ContadorTareas from './components/ContadorTareas.jsx'

function App() {
  return (
    <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', background: '#0284c7', color: '#fff', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>
          MÓDULO 4: ACTIVIDAD 3
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>
          Hooks <code>useEffect</code> y <code>useMemo</code>
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '600px' }}>
          Gestión de efectos secundarios para manipular el DOM del navegador y memorización de cálculos intensivos para máximo rendimiento.
        </p>
      </header>

      <ContadorTareas />

      <footer style={{ marginTop: '50px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        React + Vite + GitHub Pages | Optimización con useMemo & Efectos Secundarios
      </footer>
    </div>
  );
}

export default App;