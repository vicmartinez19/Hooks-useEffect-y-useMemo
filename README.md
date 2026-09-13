# Actividad 3: Contador de Tareas (Hooks useEffect y useMemo)

## 📌 Descripción del Proyecto
Esta aplicación optimizada para la gestión del tiempo y seguimiento de tareas demuestra:
- Uso de `useMemo` para memorizar la sumatoria de tiempos totales y promedios, evitando recalcular en renderizados irrelevantes.
- Uso de `useEffect` para actualizar el título de la pestaña del navegador (`document.title`).
- Persistencia automática de las tareas en `localStorage` con `useEffect`.
- Filtrado por duración de tareas (cortas vs largas).
- Arquitectura lista para producción y **GitHub Pages** sin problemas de enrutamiento estátic