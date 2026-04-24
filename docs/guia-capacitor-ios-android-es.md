# Guia Capacitor para iOS y Android (Espanol)

> Guia practica para instalar y configurar Capacitor en un proyecto web (por ejemplo React + Vite) y generar builds para iOS y Android.

## 1) Requisitos previos

Antes de empezar, asegurate de tener:

- Node.js y npm instalados.
- Un proyecto web funcionando (por ejemplo con `npm run build`).
- **Para iOS:** macOS + Xcode instalado.
- **Para Android:** Android Studio instalado + SDK configurado.

---

## 2) Instalar Capacitor (proyecto existente)

En la raiz de tu proyecto:

```bash
npm install @capacitor/core
npm install -D @capacitor/cli
```

Inicializar Capacitor:

```bash
npx cap init
```

Cuando pregunte:
- **App name:** nombre visible de tu app (ejemplo: Habit Orbit)
- **App ID:** identificador unico (ejemplo: `com.tuempresa.tuapp`)

---

## 3) Configurar build web

Capacitor copia el contenido de tu build web (`dist`, `build`, etc.) a los proyectos nativos.

En Vite normalmente se usa `dist`, por lo que este comando debe funcionar:

```bash
npm run build
```

Luego sincroniza:

```bash
npx cap sync
```

---

## 4) Agregar plataforma iOS

Instalar dependencia:

```bash
npm install @capacitor/ios
```

Agregar plataforma:

```bash
npx cap add ios
```

Sincronizar cambios:

```bash
npx cap sync ios
```

Abrir en Xcode:

```bash
npx cap open ios
```

### Build iOS (resumen)

1. Abrir el proyecto en Xcode.
2. Configurar **Signing & Capabilities** (Team, Bundle ID, etc.).
3. Seleccionar dispositivo o simulador.
4. Ejecutar con Run o generar Archive para App Store/TestFlight.

---

## 5) Agregar plataforma Android

Instalar dependencia:

```bash
npm install @capacitor/android
```

Agregar plataforma:

```bash
npx cap add android
```

Sincronizar cambios:

```bash
npx cap sync android
```

Abrir en Android Studio:

```bash
npx cap open android
```

### Build Android (resumen)

1. Abrir Android Studio y esperar Gradle Sync.
2. Probar en emulador/dispositivo.
3. Para Play Console, generar **Android App Bundle (AAB)**:
   - Build > Generate Signed Bundle / APK
   - Elegir Android App Bundle
   - Configurar/usar keystore
   - Build variant `release`

---

## 6) Flujo recomendado para desarrollo diario

Cada vez que cambies código web:

```bash
npm run build
npx cap sync
```

Si solo trabajas en una plataforma:

```bash
npx cap sync ios
# o
npx cap sync android
```

---

## 7) Comandos utiles

- Inicializar Capacitor:
  - `npx cap init`
- Agregar iOS:
  - `npx cap add ios`
- Agregar Android:
  - `npx cap add android`
- Sincronizar todo:
  - `npx cap sync`
- Abrir iOS:
  - `npx cap open ios`
- Abrir Android:
  - `npx cap open android`

---

## 8) Problemas comunes

### No se reflejan cambios en iOS/Android

- Ejecuta:
  - `npm run build`
  - `npx cap sync`

### Error de firma en iOS

- Revisar Team, Bundle ID y certificados en Xcode.

### Error de build en Android

- Abrir Android Studio y dejar que termine Gradle Sync.
- Verificar SDK y licencias.

---

## 9) Buenas practicas

- Mantener `appId` estable desde el inicio.
- Guardar seguro el keystore de Android y sus contrasenas.
- Probar en dispositivo real antes de publicar.
- Versionar cambios de codigo, pero nunca subir secretos.

---

## 10) Nota final

Capacitor permite mantener una sola base web y empaquetarla para iOS/Android. El paso clave siempre es:

1. Build web (`npm run build`)
2. Sync nativo (`npx cap sync`)
3. Build desde Xcode o Android Studio
