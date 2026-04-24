# Checklist rapido de release (Capacitor) - ES

## Antes de compilar

- [ ] `npm install` (si hubo cambios de dependencias)
- [ ] Verificar variables/keys necesarias
- [ ] Confirmar version y nombre de app

## Actualizar build web

- [ ] Ejecutar `npm run build`
- [ ] Validar que se genero `dist/`

## Sincronizar plataformas nativas

- [ ] Ejecutar `npx cap sync ios`
- [ ] Ejecutar `npx cap sync android`

## iOS (Xcode)

- [ ] Abrir con `npx cap open ios`
- [ ] Revisar Signing & Capabilities
- [ ] Confirmar Bundle ID correcto
- [ ] Probar en dispositivo real
- [ ] Archive para TestFlight/App Store

## Android (Android Studio)

- [ ] Abrir con `npx cap open android`
- [ ] Esperar Gradle Sync completo
- [ ] Probar en emulador/dispositivo real
- [ ] Generar Signed Bundle (.aab)
- [ ] Guardar keystore y passwords en lugar seguro

## QA minima antes de subir

- [ ] Navegacion principal funciona
- [ ] Splash e icono correctos
- [ ] Textos/idiomas correctos
- [ ] Sin errores visuales en telefono real
- [ ] No hay bloqueos al abrir/cerrar app

## Publicacion

- [ ] Subir build a TestFlight / Play Console
- [ ] Completar metadata y capturas
- [ ] Verificar notas de version

## Comandos utiles (copia/pega)

```bash
npm run build
npx cap sync ios
npx cap sync android
npx cap open ios
npx cap open android
```
