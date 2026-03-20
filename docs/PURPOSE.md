# El punto de la app — Habit Tracker

## Por qué existe

Un **rastreador de hábitos** sirve cuando:
1. **Definís** qué querés hacer (ej. "Leer 10 min", "Correr", "Dormir antes de las 23").
2. **Cada día** marcás si lo hiciste o no.
3. **Ves** un poco de progreso (ej. "3 días seguidos") para que tenga sentido seguir.

Si solo podés agregar y borrar hábitos pero no "marcar hecho hoy", no es un rastreador de verdad: es una lista. Lo que hace que la gente lo sienta **útil** es el loop: **hoy → marqué hecho → veo que llevo X días**.

---

## Qué queremos que sienta la gente

- **Útil:** "Sirve para recordarme y ver si cumplí hoy."
- **Sencillo:** Una pantalla, sin cuentas ni pasos raros. Abro, veo hoy, tildo, listo.
- **Concreto:** Ver "Hecho hoy" y, si podemos, un número tipo "3 días" (racha) para que motive.

---

## Alcance mínimo (para desarrollarlo rápido)

| Qué | Para qué |
|-----|----------|
| **Persistencia (localStorage)** | Que no se pierda nada al cerrar. Sin esto la app no es seria. |
| **"Hecho hoy"** | Un checkbox (o botón) por hábito: "¿Lo hiciste hoy?" → sí/no. Guardar la fecha en `completedDates`. |
| **Mostrar hoy** | Que se vea claro "Hoy es [fecha]" y la lista de hábitos con su checkbox de hoy. |
| **Racha opcional** | Junto a cada hábito, un "3 días" (días seguidos). Da sensación de progreso sin complicar. |

**No hacemos (por ahora):** cuentas de usuario, backend, estadísticas complejas, recordatorios. Todo local, una pantalla.

---

## Plan rápido de desarrollo (orden sugerido)

1. **localStorage** — Guardar/cargar la lista de hábitos al iniciar y al cambiar. Así la app ya "cuenta".
2. **Marcar "Hecho hoy"** — Por cada hábito: botón/checkbox "Hecho hoy". Al tocarlo, agregar la fecha de hoy a `completedDates` (como string YYYY-MM-DD para no liar con Date en JSON). Actualizar estado y guardar en localStorage.
3. **Mostrar racha** — Función que recibe `completedDates` y calcula días consecutivos hasta hoy. Mostrar "X días" al lado del nombre (o "Hoy ✓" si ya marcó).
4. **Un toque de UI** — Que "Hoy" y los hábitos se vean claros (ej. sección "Hoy", cards o filas legibles). Sin rediseño enorme.

Con eso tenés un rastreador **meaningful**, **útil** y **sencillo**. Lo demás (más stats, temas, etc.) puede venir después.

---

## Resumen en una frase

**"Agregás hábitos, cada día marcás si los hiciste, y ves una racha para seguir motivado — todo en una pantalla, sin cuenta, guardado en tu navegador."**
