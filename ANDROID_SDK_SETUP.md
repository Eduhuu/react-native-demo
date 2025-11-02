# Configuración de Android SDK para WSL

Este documento describe la configuración del Android SDK instalado directamente en WSL para ejecutar proyectos React Native/Expo.

## Migración Completada

✅ **Android SDK instalado localmente en WSL**  
✅ **Ubicación**: `/home/eduardo/Android/sdk`  
✅ **Configuración**: Variables de entorno configuradas en `~/.bashrc`

## Configuración Implementada

### 1. Ubicación del Android SDK

El Android SDK está instalado en:
```
/home/eduardo/Android/sdk
```

**Nota importante**: El directorio debe llamarse `sdk` (minúsculas) porque Expo busca específicamente `/home/eduardo/Android/sdk` como ubicación por defecto.

### 2. Variables de Entorno

La configuración en `~/.bashrc` (al inicio del archivo, antes del return temprano):

```bash
# Android SDK configuration (instalado localmente en WSL) - debe estar antes del return temprano
export ANDROID_HOME="$HOME/Android/sdk"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/emulator:$PATH"
```

**Ubicación crítica**: Esta configuración debe estar **antes** del bloque `case $- in` que retorna temprano para shells no interactivos, para que Expo y otras herramientas puedan acceder a las variables incluso en scripts no interactivos.

### 3. Componentes Instalados

- **Android Command Line Tools**: Versión 12.0
- **Platform-tools**: ADB versión 36.0.0-13206524
- **Platform**: Android 34
- **Build-tools**: 34.0.0

### 4. Java

Se requiere Java 17 o superior. En este sistema se instaló OpenJDK 17:
```bash
java -version
# openjdk version "17.0.16"
```

## Instalación del SDK (Referencia)

Si necesitas reinstalar o replicar la instalación en otro sistema:

### Paso 1: Crear directorio
```bash
mkdir -p ~/Android/sdk
cd ~/Android/sdk
```

### Paso 2: Descargar Android Command Line Tools
```bash
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip commandlinetools-linux-11076708_latest.zip
mkdir -p cmdline-tools/latest
mv cmdline-tools/bin cmdline-tools/lib cmdline-tools/NOTICE.txt cmdline-tools/source.properties cmdline-tools/latest/
rm commandlinetools-linux-11076708_latest.zip
```

### Paso 3: Instalar Java 17 (si no está instalado)
```bash
sudo apt update
sudo apt install -y openjdk-17-jdk
```

### Paso 4: Aceptar licencias e instalar componentes
```bash
export ANDROID_HOME="$HOME/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools"

yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

### Paso 5: Configurar variables de entorno
Agregar al inicio de `~/.bashrc` (antes del return temprano):
```bash
export ANDROID_HOME="$HOME/Android/sdk"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/emulator:$PATH"
```

## Verificación

### Verificar configuración
```bash
source ~/.bashrc
echo $ANDROID_HOME
# Debe mostrar: /home/eduardo/Android/sdk

which adb
# Debe mostrar: /home/eduardo/Android/sdk/platform-tools/adb

adb version
# Debe mostrar la versión del ADB instalado
```

### Verificar dispositivos
```bash
adb devices
```

**Nota sobre dispositivos USB**: Los dispositivos físicos conectados por USB a Windows no son directamente accesibles desde WSL sin configuración adicional. Para acceder a dispositivos USB desde WSL, puedes:

1. **Usar usbipd** (Windows USB/IP):
   ```powershell
   # En Windows (PowerShell como administrador)
   winget install usbipd
   usbipd wsl list
   usbipd bind --busid <BUSID>
   usbipd attach --wsl --busid <BUSID>
   ```

2. **Conectar dispositivo vía TCP/IP**:
   ```bash
   # En Windows, encontrar la IP del dispositivo
   adb.exe tcpip 5555
   # En WSL
   adb connect <IP_DEL_DISPOSITIVO>:5555
   ```

3. **Usar emulador**: Ejecutar un emulador de Android en Windows y conectarlo desde WSL vía TCP/IP.

## Ventajas de Instalar SDK en WSL

✅ **Configuración estándar**: Sigue las guías oficiales sin ajustes especiales  
✅ **Sin wrappers**: No necesitas scripts adicionales para ejecutables  
✅ **Mejor rendimiento**: Acceso directo sin pasar por `/mnt/c/`  
✅ **Compatibilidad**: Funciona igual que en Linux nativo  
✅ **Actualizaciones**: Puedes actualizar el SDK independientemente de Windows  

## Troubleshooting

### Expo no encuentra el SDK

1. Verifica que el directorio se llame `sdk` (minúsculas), no `Sdk`:
   ```bash
   ls -la ~/Android/
   ```

2. Verifica que las variables estén antes del return temprano en `.bashrc`:
   ```bash
   head -10 ~/.bashrc | grep -i android
   ```

3. Verifica que `ANDROID_HOME` esté configurado:
   ```bash
   echo $ANDROID_HOME
   ```

### ADB no encuentra dispositivos

- Si el dispositivo está conectado a Windows, necesitas configurar acceso USB desde WSL (ver sección "Verificar dispositivos" arriba)
- Si usas un emulador, inícialo en Windows y conéctalo vía TCP/IP desde WSL

### Error de Java

Si obtienes errores relacionados con Java:
```bash
java -version  # Debe ser Java 17 o superior
sudo update-alternatives --config java  # Si hay múltiples versiones
```

## Comparación: SDK en Windows vs WSL

### SDK en Windows (Configuración anterior)
- ✅ Reutiliza recursos existentes
- ❌ Requiere configuración manual y wrappers
- ❌ Acceso más lento a través de `/mnt/c/`

### SDK en WSL (Configuración actual)
- ✅ Configuración estándar y simple
- ✅ Mejor rendimiento
- ✅ Compatibilidad completa con herramientas Linux
- ❌ Duplica espacio en disco (si también tienes SDK en Windows)
- ❌ Requiere descargar e instalar componentes

## Referencias

- [Expo Android Setup](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Android SDK Command Line Tools](https://developer.android.com/studio/command-line)
- [Android Debug Bridge (ADB)](https://developer.android.com/studio/command-line/adb)
- [WSL USB Device Access](https://learn.microsoft.com/en-us/windows/wsl/connect-usb)

---

**Fecha de migración**: Noviembre 2024  
**Versión de Expo**: ~54.0.20  
**Versión de Node.js**: v20.11.0  
**Ubicación del SDK**: `/home/eduardo/Android/sdk`  
**Java**: OpenJDK 17.0.16
