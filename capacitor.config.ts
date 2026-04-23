import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sonitasv.habitorbit',
  appName: 'Habit Orbit',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2500,
      launchAutoHide: true,
      showSpinner: false,
      backgroundColor: '#020b2c',
    },
  },
}

export default config
